"use client";

import { useEffect, useRef } from "react";

// OpenAI Ads Measurement Pixel (client-side)
// Ref: https://developers.openai.com/ads/measurement-pixel

declare global {
  interface Window {
    oaiq?: (...args: unknown[]) => void;
    oaiqLoaded?: boolean;
  }
}

const PIXEL_ID = process.env.NEXT_PUBLIC_OPENAI_ADS_PIXEL_ID;

/**
 * Fire a confirmed conversion from the browser.
 * The same event_id must be sent server-side (CAPI) to deduplicate.
 */
export function measureLeadCreated(eventId: string) {
  const w = window as unknown as {
    oaiq?: (...args: unknown[]) => void;
  };
  if (typeof w.oaiq === "function") {
    w.oaiq(
      "measure",
      "lead_created",
      { type: "customer_action" },
      { event_id: eventId },
    );
  }
}

export default function OpenAIAdsPixel() {
  const initialized = useRef(false);

  useEffect(() => {
    if (!PIXEL_ID || initialized.current) return;
    initialized.current = true;

    const w = window as unknown as {
      oaiq?: (...args: unknown[]) => void;
      oaiqLoaded?: boolean;
    };

    // Queue stub before the SDK loads (standard loader pattern).
    if (typeof w.oaiq !== "function") {
      const queue: unknown[][] = [];
      w.oaiq = (...args: unknown[]) => {
        queue.push(args);
      };
      (w.oaiq as unknown as { q?: unknown[][] }).q = queue;
    }

    const script = document.createElement("script");
    script.src = "https://bzrcdn.openai.com/sdk/oaiq.min.js";
    script.async = true;
    script.onload = () => {
      if (w.oaiqLoaded) return;
      w.oaiqLoaded = true;
      w.oaiq?.("init", { pixelId: PIXEL_ID });
      w.oaiq?.("measure", "page_viewed", { type: "contents" });
    };
    script.onerror = () => {
      // Measurement must never break the site.
      initialized.current = false;
    };
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
