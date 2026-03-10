import posthog from "posthog-js";

type PostHogProperties = Record<string, string | number | boolean | null | undefined>;

const posthogToken = process.env.NEXT_PUBLIC_POSTHOG_TOKEN;
const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

let posthogInitialized = false;

function compactProperties(properties: PostHogProperties) {
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined),
  );
}

export function isPostHogConfigured() {
  return Boolean(posthogToken && posthogHost);
}

export function initPostHog() {
  if (typeof window === "undefined" || !isPostHogConfigured() || posthogInitialized) {
    return posthogInitialized;
  }

  posthog.init(posthogToken!, {
    api_host: posthogHost!,
    capture_pageview: false,
  });

  posthogInitialized = true;

  return posthogInitialized;
}

export function capturePostHogEvent(eventName: string, properties: PostHogProperties = {}) {
  if (!initPostHog()) {
    return;
  }

  posthog.capture(eventName, compactProperties(properties));
}
