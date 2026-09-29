import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

// OpenAI Ads Conversions API (server-side) + Web3Forms passthrough.
// Ref: https://developers.openai.com/ads/conversions-api
//
// Boundary: this route is the single server conversion boundary for the
// contact form. It forwards the lead to Web3Forms and only fires the CAPI
// event once Web3Forms accepts the submission. Failures never block the
// lead flow: Web3Forms errors are surfaced to the form, CAPI errors are
// swallowed (reporting must not break the business action).

const PIXEL_ID = process.env.OPENAI_ADS_PIXEL_ID; // same value as NEXT_PUBLIC_OPENAI_ADS_PIXEL_ID
const CAPI_KEY = process.env.OPENAI_ADS_CONVERSIONS_API_KEY;
const CAPI_URL = "https://bzr.openai.com/v1/events";
const CANONICAL_ORIGIN = "https://www.holdingai.io";
const WEB3FORMS_KEY =
  process.env.WEB3FORMS_ACCESS_KEY || "5047e6e2-ede1-4dbe-a14b-54a7d333d0cd";
const WEB3FORMS_URL = "https://api.web3forms.com/submit";

// ---------------------------------------------------------------------------
// Quality gate v1: deterministic keyword heuristic (0-100).
// Follow-up: replace with a lightweight LLM score when needed.
// ---------------------------------------------------------------------------
const SIGNALS: Array<[RegExp, number]> = [
  // budget / money intent
  [/\b(budget|price|pricing|cost|quote|estimate|invest|€|£|\$|eur|gbp|usd|funding|financ)/i, 30],
  // concrete project / business intent
  [/\b(build|develop|launch|create|design|mvp|app|platform|product|saas|website|web app|mobile app|prototype|startup|business|company|enterprise|agency|automation|agent|integrat)/i, 25],
  // urgency / timeline
  [/\b(asap|urgent|immediately|deadline|this week|this month|ready|soon|quickly|need)\b/i, 20],
  // specific project detail (longer messages tend to be more qualified)
  [/[\s\S]{120,}/, 15],
  // multiple project signals
  [/(\b(build|develop|launch)\b[\s\S]*\b(app|platform|product|saas|website)\b)|(\b(app|platform|product|saas)\b[\s\S]*\b(build|develop|launch)\b)/i, 10],
];

function scoreLead(message: string): number {
  let score = 0;
  for (const [re, points] of SIGNALS) {
    if (re.test(message)) score += points;
  }
  return Math.min(100, score);
}

function sha256Hex(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

function sanitizeSourceUrl(raw: string | null): string {
  try {
    const url = new URL(raw || CANONICAL_ORIGIN);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return CANONICAL_ORIGIN;
    }
    return url.origin + url.pathname; // strip query + fragment
  } catch {
    return CANONICAL_ORIGIN;
  }
}

export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request." },
      { status: 400 },
    );
  }

  const eventId = String(formData.get("event_id") || "").slice(0, 200);
  const email = String(formData.get("email") || "").slice(0, 200);
  const message = String(formData.get("message") || "").slice(0, 4000);
  const name = String(formData.get("name") || "").slice(0, 200);

  // 1) Accept the lead first (Web3Forms). Only then report the conversion.
  formData.set("access_key", WEB3FORMS_KEY);
  let accepted = false;
  try {
    const res = await fetch(WEB3FORMS_URL, {
      method: "POST",
      body: formData,
    });
    const data = await res.json().catch(() => null);
    accepted = Boolean(data?.success);
    if (!accepted) {
      return NextResponse.json(
        { success: false, message: data?.message || "Submission failed." },
        { status: 400 },
      );
    }
  } catch {
    return NextResponse.json(
      { success: false, message: "Submission failed." },
      { status: 502 },
    );
  }

  // 2) Report the conversion to OpenAI Ads (never blocks the lead).
  try {
    if (PIXEL_ID && CAPI_KEY && eventId && email) {
      const score = scoreLead(message);
      const qualified = score >= 40;

      const event: Record<string, unknown> = {
        id: eventId,
        type: qualified ? "lead_created" : "custom",
        timestamp_ms: Date.now(),
        action_source: "web",
        source_url: sanitizeSourceUrl(req.headers.get("referer")),
        user: {
          email_sha256: sha256Hex(email),
          user_agent: req.headers.get("user-agent") || undefined,
        },
        data: qualified ? { type: "customer_action" } : { type: "custom" },
      };
      if (!qualified) event.custom_event_name = "low_intent_lead";

      // Raw opaque attribution context, passed through unchanged.
      const oppref = req.cookies.get("__oppref")?.value;
      if (oppref) event.oppref = oppref;

      const body: Record<string, unknown> = { events: [event] };
      if (process.env.OPENAI_ADS_CAPI_VALIDATE_ONLY === "true") {
        body.validate_only = true;
      }

      await fetch(`${CAPI_URL}?pid=${encodeURIComponent(PIXEL_ID)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CAPI_KEY}`,
        },
        body: JSON.stringify(body),
      });
    }
  } catch {
    // Reporting failure is intentionally non-blocking.
  }

  return NextResponse.json({ success: true, message: "Sent." });
}
