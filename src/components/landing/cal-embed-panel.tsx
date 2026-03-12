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

function getCurrentPathname() {
  if (typeof window === "undefined") {
    return undefined;
  }

  return window.location.pathname;
}

function PanelChrome() {
  return (
    <div className="flex items-center justify-between gap-3 px-2 pb-3">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-[#e8b0a5]" />
        <span className="h-3 w-3 rounded-full bg-[#e7cd7d]" />
        <span className="h-3 w-3 rounded-full bg-[#8fb7d1]" />
      </div>

      <div className="flex items-center gap-2">
        <span className="rounded-full border border-black/8 bg-white/58 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#627180]">
          Agenda
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/72 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#44515d]">
          <span className="h-2 w-2 rounded-full bg-[#111821]" />
          Disponibilidade
        </span>
      </div>
    </div>
  );
}

function CalendarScaffold({
  animated = false,
  note,
}: {
  animated?: boolean;
  note: string;
}) {
  const pulseClassName = animated ? "animate-pulse" : "";

  return (
    <div className="h-[38rem] sm:h-[41rem]">
      <div className="grid h-full gap-3 lg:grid-cols-[0.28fr_0.72fr]">
        <div className="flex flex-col rounded-[1.45rem] border border-black/6 bg-[#f6f3ed]/90 p-4 sm:p-5">
          <div className={`h-3 w-24 rounded-full bg-[#d7e0e8] ${pulseClassName}`} />
          <div className="mt-5 space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="rounded-[1.15rem] border border-black/5 bg-white/82 p-3 shadow-[0_10px_28px_rgba(17,20,24,0.04)]"
              >
                <div className={`h-3 w-20 rounded-full bg-[#dbe4eb] ${pulseClassName}`} />
                <div className={`mt-3 h-10 rounded-[0.95rem] bg-[#eef3f6] ${pulseClassName}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col rounded-[1.45rem] border border-black/6 bg-white/90 p-4 shadow-[0_18px_42px_rgba(17,20,24,0.08)] sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <div className={`h-10 w-40 rounded-full bg-[#eef3f6] ${pulseClassName}`} />
            <div className={`h-10 w-28 rounded-full bg-[#f3ede4] ${pulseClassName}`} />
            <div className={`h-10 w-24 rounded-full bg-[#e4edf4] ${pulseClassName}`} />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className={`h-20 rounded-[1.1rem] border border-black/5 ${
                  index === 2
                    ? "bg-[linear-gradient(160deg,#e8edf2_0%,#f1e8db_100%)]"
                    : "bg-[#f7f9fa]"
                } ${pulseClassName}`}
              />
            ))}
          </div>

          <div className="mt-4 flex-1 rounded-[1.35rem] border border-black/5 bg-[linear-gradient(180deg,#fbfcfd_0%,#f5f1ea_100%)] p-4 sm:p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className={`h-4 w-24 rounded-full bg-[#d7e0e8] ${pulseClassName}`} />
              <div className={`h-4 w-20 rounded-full bg-[#e4d8c6] ${pulseClassName}`} />
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className={`h-14 rounded-[1rem] border border-black/5 ${
                    index === 4 ? "bg-[#111821]" : "bg-white/92"
                  } ${pulseClassName}`}
                />
              ))}
            </div>

            <div className="mt-5 rounded-[1.2rem] border border-black/5 bg-white/76 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
              <div className={`h-4 w-32 rounded-full bg-[#d7e0e8] ${pulseClassName}`} />
              <div className={`mt-3 h-20 rounded-[1rem] bg-[#f2f5f7] ${pulseClassName}`} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-[1.2rem] border border-black/6 bg-[linear-gradient(135deg,rgba(255,255,255,0.8),rgba(239,244,247,0.9))] px-4 py-3 text-sm leading-6 text-[#56626f] shadow-[0_12px_30px_rgba(17,20,24,0.05)]">
        {note}
      </div>
    </div>
  );
}

function LoadingCard() {
  return (
    <div className="absolute inset-0 z-10 rounded-[1.65rem] bg-[linear-gradient(180deg,rgba(248,244,238,0.92),rgba(241,245,248,0.96))] p-2.5 backdrop-blur-[2px] sm:p-3">
      <CalendarScaffold animated note="Carregando a agenda da equipe." />
    </div>
  );
}

function FallbackPreview() {
  return (
    <CalendarScaffold note="A disponibilidade aparece aqui assim que a agenda estiver pronta." />
  );
}

export function CalEmbedPanel() {
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
      cal_link: normalizedCalLink ?? null,
      pathname: getCurrentPathname(),
      provided_cal_link: rawCalLink ?? null,
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
        pathname: getCurrentPathname(),
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
        pathname: getCurrentPathname(),
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
        pathname: getCurrentPathname(),
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
          pathname: getCurrentPathname(),
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
    <div className="relative h-full min-h-[38rem]">
      <div className="pointer-events-none absolute inset-x-10 top-6 h-32 rounded-full bg-[#8fb7d1]/18 blur-3xl" />
      <div className="pointer-events-none absolute bottom-4 left-8 h-24 w-24 rounded-full bg-[#dfc49f]/20 blur-3xl" />

      <div className="relative flex h-full min-h-[38rem] flex-col overflow-hidden rounded-[2.25rem] border border-white/12 bg-[linear-gradient(165deg,rgba(248,244,236,0.98)_0%,rgba(240,244,247,0.98)_54%,rgba(224,232,239,0.98)_100%)] p-3 shadow-[0_30px_90px_rgba(17,20,24,0.24)] sm:min-h-[41rem] sm:p-4">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.48),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(143,183,209,0.22),transparent_24%)]" />

        <div className="relative flex h-full flex-col">
          <PanelChrome />

          <div className="relative flex-1 overflow-hidden rounded-[1.85rem] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(247,244,238,0.95))] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.42)] sm:p-3">
            {status === "fallback" ? (
              <FallbackPreview />
            ) : (
              <>
                <div
                  ref={containerRef}
                  className="h-[38rem] rounded-[1.45rem] bg-white shadow-[0_18px_42px_rgba(17,20,24,0.08)] sm:h-[41rem]"
                />
                {status === "loading" ? <LoadingCard /> : null}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
