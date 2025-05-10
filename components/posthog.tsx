"use client";

import * as React from "react";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

const COOKIE_CONSENT_KEY = "cookie-consent-accepted";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [hasConsent, setHasConsent] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    setHasConsent(consent === "true");
  }, []);

  React.useEffect(() => {
    if (!hasConsent) return;

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false,
    });
  }, [hasConsent]);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}

export function setCookieConsent(accepted: boolean) {
  localStorage.setItem(COOKIE_CONSENT_KEY, String(accepted));

  if (accepted && typeof window !== "undefined") {
    window.location.reload();
  }
}
