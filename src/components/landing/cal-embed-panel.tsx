"use client";

import { useEffect, useRef, useState } from "react";
import { capturePostHogEvent } from "@/lib/posthog";

const CAL_SCRIPT_SRC = "https://cal.com/embed/embed.js";
const CAL_ORIGIN = "https://cal.com";
const CAL_SCRIPT_ID = "cal-inline-embed-script";
const CAL_THEME = "light";
const CAL_LAYOUT = "month_view";
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

type CalEmbedPanelProps = {
  placeholderLabel: string;
};

type EmbedStatus = "loading" | "ready" | "fallback";

type FallbackReason =
  | "missing_cal_link"
  | "invalid_cal_link"
  | "script_load_failed"
  | "init_failed";

type CalEmbedConfig = {
  layout: string;
  theme: string;
} & Partial<Record<(typeof UTM_KEYS)[number], string>>;

type CalInlineOptions = {
  calLink: string;
  config?: CalEmbedConfig;
  elementOrSelector: HTMLElement | string;
};

type CalInitOptions = {
  origin: string;
};

type CalUiOptions = {
  styles?: Record<string, unknown>;
  theme?: string;
};

type CalEventDetail<TData = Record<string, unknown>> = {
  data?: TData;
  namespace?: string;
  type?: string;
};

type CalEmbedEvent<TData = Record<string, unknown>> = CustomEvent<CalEventDetail<TData>>;

type CalBookingSuccessfulData = {
  endTime?: string;
  eventTypeId?: number | null;
  isRecurring?: boolean;
  paymentRequired?: boolean;
  startTime?: string;
  status?: string;
  title?: string;
  uid?: string;
  videoCallUrl?: string;
};

type CalLinkFailedData = {
  code?: string;
  msg?: string;
};

type CalInstructionHandler = (event: CalEmbedEvent) => void;

type CalQueueInstruction = [instruction: string, ...args: unknown[]];

type CalNamespaceApi = {
  (...args: unknown[]): void;
  q?: CalQueueInstruction[];
};

type CalApi = {
  (
    instruction: "init",
    options: CalInitOptions,
  ): void;
  (
    instruction: "inline",
    options: CalInlineOptions,
  ): void;
  (
    instruction: "on" | "off",
    options: {
      action: string;
      callback: CalInstructionHandler;
    },
  ): void;
  (
    instruction: "ui",
    options: CalUiOptions,
  ): void;
  loaded?: boolean;
  ns?: Record<string, CalNamespaceApi>;
  q?: CalQueueInstruction[];
  version?: string;
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

let calScriptPromise: Promise<void> | null = null;
let calInitialized = false;

function normalizeCalLink(value: string | undefined) {
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return null;
  }

  try {
    const url = new URL(trimmedValue);
    const normalizedPath = url.pathname.replace(/^\/+|\/+$/g, "").replace(/\/embed$/i, "");

    return normalizedPath || null;
  } catch {
    const normalizedPath = trimmedValue
      .replace(/^(?:https?:\/\/)?(?:www\.)?cal\.com\/?/i, "")
      .replace(/^\/+|\/+$/g, "")
      .replace(/\/embed$/i, "");

    return normalizedPath || null;
  }
}

function getEmbedConfig() {
  const urlParams = new URLSearchParams(window.location.search);
  const utmConfig = Object.fromEntries(
    UTM_KEYS.flatMap((key) => {
      const value = urlParams.get(key);

      return value ? [[key, value] as const] : [];
    }),
  );

  return {
    layout: CAL_LAYOUT,
    theme: CAL_THEME,
    ...utmConfig,
  } satisfies CalEmbedConfig;
}

function getCalScriptElement() {
  return (
    document.querySelector<HTMLScriptElement>(`script[src="${CAL_SCRIPT_SRC}"]`) ??
    document.getElementById(CAL_SCRIPT_ID)
  ) as HTMLScriptElement | null;
}

function ensureCalScriptElement() {
  if (typeof window === "undefined") {
    throw new Error("Cal.com embed can only load in the browser.");
  }

  const existingScript = getCalScriptElement();

  if (existingScript) {
    return existingScript;
  }

  const script = document.createElement("script");

  script.id = CAL_SCRIPT_ID;
  script.src = CAL_SCRIPT_SRC;
  script.async = true;
  script.dataset.calStatus = "loading";
  script.addEventListener(
    "load",
    () => {
      script.dataset.calStatus = "loaded";
    },
    { once: true },
  );
  script.addEventListener(
    "error",
    () => {
      script.dataset.calStatus = "error";
    },
    { once: true },
  );

  document.head.appendChild(script);

  return script;
}

function waitForCalScript() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Cal.com embed can only load in the browser."));
  }

  if (window.Cal?.version) {
    return Promise.resolve();
  }

  if (calScriptPromise) {
    return calScriptPromise;
  }

  const script = ensureCalScriptElement();
  const currentStatus = script.dataset.calStatus;

  if (currentStatus === "loaded") {
    return Promise.resolve();
  }

  if (currentStatus === "error") {
    return Promise.reject(new Error("Failed to load the Cal.com embed script."));
  }

  calScriptPromise = new Promise<void>((resolve, reject) => {
    const cleanupListeners = (onLoad: () => void, onError: () => void) => {
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
    };

    const onLoad = () => {
      cleanupListeners(onLoad, onError);
      script.dataset.calStatus = "loaded";
      resolve();
    };

    const onError = () => {
      cleanupListeners(onLoad, onError);
      script.dataset.calStatus = "error";
      calScriptPromise = null;
      reject(new Error("Failed to load the Cal.com embed script."));
    };

    script.addEventListener("load", onLoad, { once: true });
    script.addEventListener("error", onError, { once: true });
  });

  return calScriptPromise;
}

function queueCalInstruction(target: { q?: CalQueueInstruction[] }, args: unknown[]) {
  target.q = target.q ?? [];
  target.q.push(args as CalQueueInstruction);
}

function createCalBootstrapApi() {
  const cal = ((...args: unknown[]) => {
    queueCalInstruction(cal, args);
  }) as CalApi;

  cal.loaded = true;
  cal.ns = {};
  cal.q = [];

  return cal;
}

function bootstrapCal() {
  if (typeof window === "undefined") {
    throw new Error("Cal.com embed can only load in the browser.");
  }

  if (!window.Cal) {
    window.Cal = createCalBootstrapApi();
  } else {
    window.Cal.loaded = true;
    window.Cal.ns = window.Cal.ns ?? {};
    window.Cal.q = window.Cal.q ?? [];
  }

  void waitForCalScript().catch(() => undefined);

  if (!calInitialized) {
    window.Cal("init", { origin: CAL_ORIGIN });
    calInitialized = true;
  }

  return window.Cal;
}

function getFallbackMessage(reason: FallbackReason) {
  switch (reason) {
    case "missing_cal_link":
      return "Configure NEXT_PUBLIC_CAL_LINK para ativar o agendamento ao vivo nesta area.";
    case "invalid_cal_link":
      return "O valor de NEXT_PUBLIC_CAL_LINK esta invalido. Use um slug do Cal.com ou uma URL completa.";
    case "script_load_failed":
      return "Nao foi possivel carregar o script do calendario agora. O layout foi mantido como fallback.";
    case "init_failed":
      return "Nao foi possivel iniciar o embed do calendario neste momento. O layout foi mantido como fallback.";
    default:
      return "Reservado para o embed real do calendario comercial.";
  }
}

function LoadingCard() {
  return (
    <div className="absolute inset-0 z-10 rounded-[1.2rem] bg-white p-4 sm:p-5">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-black/6 pb-4">
          <div>
            <div className="h-4 w-36 animate-pulse rounded-full bg-[#d7e5ef]" />
            <div className="mt-3 h-4 w-56 animate-pulse rounded-full bg-[#eef3f6]" />
          </div>
          <div className="h-9 w-24 animate-pulse rounded-full bg-[#eef3f6]" />
        </div>

        <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-[0.34fr_0.66fr]">
          <div className="rounded-[1.2rem] border border-black/6 bg-[#fafbfc] p-4">
            <div className="h-4 w-24 animate-pulse rounded-full bg-[#d7e5ef]" />
            <div className="mt-4 space-y-3">
              <div className="h-10 animate-pulse rounded-[0.9rem] bg-[#eef3f6]" />
              <div className="h-10 animate-pulse rounded-[0.9rem] bg-[#eef3f6]" />
              <div className="h-10 animate-pulse rounded-[0.9rem] bg-[#eef3f6]" />
            </div>
          </div>

          <div className="rounded-[1.2rem] border border-black/6 bg-[#fafbfc] p-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="h-16 animate-pulse rounded-[1rem] bg-[#eef3f6]" />
              <div className="h-16 animate-pulse rounded-[1rem] bg-[#eef3f6]" />
              <div className="h-16 animate-pulse rounded-[1rem] bg-[#eef3f6]" />
            </div>
            <div className="mt-4 h-52 animate-pulse rounded-[1.2rem] bg-[linear-gradient(135deg,#f2ede4,#d8e4ee)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FallbackCard({
  placeholderLabel,
  reason,
}: {
  placeholderLabel: string;
  reason: FallbackReason;
}) {
  return (
    <>
      <div className="flex items-center justify-between gap-4 border-b border-black/8 pb-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#6a7684]">
            {placeholderLabel}
          </p>
          <p className="mt-2 text-sm leading-7 text-[#56626f]">{getFallbackMessage(reason)}</p>
        </div>
        <span className="rounded-full border border-black/8 bg-[#111418] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
          Cal.com
        </span>
      </div>

      <div className="mt-5 rounded-[1.6rem] border border-dashed border-[#bfd0dd] bg-[#f9fafb] p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-[0.34fr_0.66fr]">
          <div className="rounded-[1.3rem] border border-black/6 bg-white p-4">
            <div className="h-4 w-24 rounded-full bg-[#d7e5ef]" />
            <div className="mt-4 space-y-3">
              <div className="h-10 rounded-[0.9rem] bg-[#eef3f6]" />
              <div className="h-10 rounded-[0.9rem] bg-[#eef3f6]" />
              <div className="h-10 rounded-[0.9rem] bg-[#eef3f6]" />
            </div>
          </div>

          <div className="rounded-[1.3rem] border border-black/6 bg-white p-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="h-16 rounded-[1rem] bg-[#eef3f6]" />
              <div className="h-16 rounded-[1rem] bg-[#eef3f6]" />
              <div className="h-16 rounded-[1rem] bg-[#eef3f6]" />
            </div>
            <div className="mt-4 h-44 rounded-[1.2rem] bg-[linear-gradient(135deg,#f2ede4,#d8e4ee)]" />
          </div>
        </div>
      </div>
    </>
  );
}

export function CalEmbedPanel({ placeholderLabel }: CalEmbedPanelProps) {
  const rawCalLink = process.env.NEXT_PUBLIC_CAL_LINK;
  const normalizedCalLink = normalizeCalLink(rawCalLink);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fallbackTrackedRef = useRef(false);
  const viewedTrackedRef = useRef(false);
  const [status, setStatus] = useState<EmbedStatus>(normalizedCalLink ? "loading" : "fallback");
  const [fallbackReason, setFallbackReason] = useState<FallbackReason>(
    normalizedCalLink ? "init_failed" : rawCalLink ? "invalid_cal_link" : "missing_cal_link",
  );

  useEffect(() => {
    if (status !== "fallback" || fallbackTrackedRef.current === true) {
      return;
    }

    capturePostHogEvent("cal_embed_fallback_rendered", {
      cal_link: normalizedCalLink ?? rawCalLink ?? null,
      reason: fallbackReason,
    });

    fallbackTrackedRef.current = true;
  }, [fallbackReason, normalizedCalLink, rawCalLink, status]);

  useEffect(() => {
    const containerElement = containerRef.current;

    if (!normalizedCalLink || !containerElement) {
      return;
    }

    fallbackTrackedRef.current = false;
    viewedTrackedRef.current = false;

    let isMounted = true;
    let handlersAttached = false;

    const handleLinkReady: CalInstructionHandler = () => {
      if (!isMounted) {
        return;
      }

      setStatus("ready");
    };

    const handleBookerViewed: CalInstructionHandler = (event) => {
      if (viewedTrackedRef.current) {
        return;
      }

      viewedTrackedRef.current = true;

      capturePostHogEvent("cal_embed_viewed", {
        cal_link: normalizedCalLink,
        namespace: event.detail.namespace,
        type: event.detail.type,
      });
    };

    const handleBookingSuccessful: CalInstructionHandler = (event) => {
      const booking = (event.detail.data ?? {}) as CalBookingSuccessfulData;

      capturePostHogEvent("cal_booking_success", {
        booking_uid: booking.uid,
        cal_link: normalizedCalLink,
        end_time: booking.endTime,
        event_type_id: booking.eventTypeId ?? undefined,
        is_recurring: booking.isRecurring,
        payment_required: booking.paymentRequired,
        start_time: booking.startTime,
        status: booking.status,
        title: booking.title,
        video_call_url: booking.videoCallUrl,
      });
    };

    const handleLinkFailed: CalInstructionHandler = (event) => {
      const failure = (event.detail.data ?? {}) as CalLinkFailedData;

      if (!isMounted) {
        return;
      }

      setFallbackReason("init_failed");
      setStatus("fallback");

      capturePostHogEvent("cal_embed_error", {
        cal_link: normalizedCalLink,
        code: failure.code,
        message: failure.msg,
        reason: "link_failed",
      });
    };

    const cleanupHandlers = () => {
      if (!handlersAttached || !window.Cal) {
        return;
      }

      window.Cal("off", { action: "linkReady", callback: handleLinkReady });
      window.Cal("off", { action: "bookerViewed", callback: handleBookerViewed });
      window.Cal("off", {
        action: "bookingSuccessfulV2",
        callback: handleBookingSuccessful,
      });
      window.Cal("off", { action: "linkFailed", callback: handleLinkFailed });
      handlersAttached = false;
    };

    const mountEmbed = async () => {
      try {
        const cal = bootstrapCal();
        await waitForCalScript();

        if (!isMounted || !window.Cal) {
          return;
        }

        if (!window.Cal.version) {
          throw new Error("Cal.com script loaded without hydrating the embed API.");
        }

        containerElement.replaceChildren();
        cal("on", { action: "linkReady", callback: handleLinkReady });
        cal("on", { action: "bookerViewed", callback: handleBookerViewed });
        cal("on", {
          action: "bookingSuccessfulV2",
          callback: handleBookingSuccessful,
        });
        cal("on", { action: "linkFailed", callback: handleLinkFailed });
        handlersAttached = true;
        cal("ui", { theme: CAL_THEME });
        cal("inline", {
          calLink: normalizedCalLink,
          config: getEmbedConfig(),
          elementOrSelector: containerElement,
        });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        const reason =
          error instanceof Error && error.message === "Failed to load the Cal.com embed script."
            ? "script_load_failed"
            : "init_failed";

        setFallbackReason(reason);
        setStatus("fallback");

        capturePostHogEvent("cal_embed_error", {
          cal_link: normalizedCalLink,
          message: error instanceof Error ? error.message : "Unknown Cal.com embed error.",
          reason,
        });
      }
    };

    void mountEmbed();

    return () => {
      isMounted = false;
      cleanupHandlers();
      containerElement.replaceChildren();
    };
  }, [normalizedCalLink]);

  return (
    <div className="rounded-[2rem] border border-dashed border-[#9bb1c2] bg-white/65 p-5 shadow-[0_16px_40px_rgba(17,20,24,0.06)]">
      {status === "fallback" ? (
        <FallbackCard placeholderLabel={placeholderLabel} reason={fallbackReason} />
      ) : (
        <>
          <div className="flex items-center justify-between gap-4 border-b border-black/8 pb-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#6a7684]">
                Agendamento ao vivo
              </p>
              <p className="mt-2 text-sm leading-7 text-[#56626f]">
                Escolha o melhor horario e fale com a equipe comercial sem sair da landing.
              </p>
            </div>
            <span className="rounded-full border border-black/8 bg-[#111418] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
              Cal.com
            </span>
          </div>

          <div className="relative mt-5 overflow-hidden rounded-[1.6rem] border border-[#bfd0dd] bg-[#f9fafb] p-1.5 sm:p-2">
            <div
              ref={containerRef}
              className="h-[36rem] rounded-[1.2rem] bg-white sm:h-[40rem]"
            />
            {status === "loading" ? <LoadingCard /> : null}
          </div>
        </>
      )}
    </div>
  );
}
