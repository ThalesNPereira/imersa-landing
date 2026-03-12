import posthog from "posthog-js";

type PostHogPropertyValue = string | number | boolean | null | undefined;
type PostHogProperties = Record<string, PostHogPropertyValue>;

declare global {
  interface Window {
    __imersaPostHogCtaTrackingInitialized?: boolean;
    __imersaPostHogInitialized?: boolean;
  }
}

const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_TOKEN ?? process.env.NEXT_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

function compactProperties(properties: PostHogProperties) {
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined),
  );
}

function isBrowser() {
  return typeof window !== "undefined";
}

function getCurrentPathname() {
  if (!isBrowser()) {
    return undefined;
  }

  return window.location.pathname;
}

function isAnalyticsHostnameBlocked() {
  if (!isBrowser()) {
    return false;
  }

  const { hostname } = window.location;

  return hostname === "localhost" || hostname === "127.0.0.1";
}

function getCtaText(element: HTMLElement) {
  const content = (element.innerText || element.textContent || "")
    .replace(/\s+/g, " ")
    .trim();

  return content || undefined;
}

function getElementHref(element: HTMLElement) {
  const href = element.getAttribute("href");

  if (href) {
    return href;
  }

  if (element instanceof HTMLAnchorElement) {
    return element.href || undefined;
  }

  return undefined;
}

export function isPostHogConfigured() {
  return Boolean(posthogToken && posthogHost);
}

export function initPostHog() {
  if (!isBrowser() || !isPostHogConfigured() || isAnalyticsHostnameBlocked()) {
    return false;
  }

  if (window.__imersaPostHogInitialized) {
    return true;
  }

  posthog.init(posthogToken!, {
    api_host: posthogHost!,
    autocapture: false,
    capture_pageleave: "if_capture_pageview",
    capture_pageview: "history_change",
    defaults: "2026-01-30",
    disable_session_recording: true,
  });

  window.__imersaPostHogInitialized = true;

  return true;
}

export function capturePostHogEvent(eventName: string, properties: PostHogProperties = {}) {
  if (!initPostHog()) {
    return;
  }

  posthog.capture(
    eventName,
    compactProperties({
      ...properties,
      pathname: properties.pathname ?? getCurrentPathname(),
    }),
  );
}

export function startPostHogCtaTracking() {
  if (!isBrowser() || window.__imersaPostHogCtaTrackingInitialized) {
    return;
  }

  const handleClick = (event: MouseEvent) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const ctaElement = target.closest<HTMLElement>("[data-cta]");

    if (!ctaElement) {
      return;
    }

    capturePostHogEvent("cta_clicked", {
      cta_id: ctaElement.dataset.cta,
      cta_text: getCtaText(ctaElement),
      href: getElementHref(ctaElement),
      pathname: getCurrentPathname(),
      section: ctaElement.closest<HTMLElement>("[data-section]")?.dataset.section ?? "global",
    });
  };

  document.addEventListener("click", handleClick, { capture: true });
  window.__imersaPostHogCtaTrackingInitialized = true;
}
