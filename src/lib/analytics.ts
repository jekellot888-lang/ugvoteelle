"use client";

import posthog from "posthog-js";

type CampaignEvent = {
  [key: string]: string | number | boolean | null | undefined;
};

let initialized = false;

export function trackCampaignEvent(name: string, properties: CampaignEvent = {}) {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

  if (key && typeof window !== "undefined") {
    if (!initialized) {
      posthog.init(key, {
        api_host: host,
        capture_pageview: false,
        persistence: "localStorage+cookie",
      });
      initialized = true;
    }

    posthog.capture(name, properties);
  }

  if (process.env.NODE_ENV === "development") {
    console.info(`[campaign event] ${name}`, properties);
  }
}
