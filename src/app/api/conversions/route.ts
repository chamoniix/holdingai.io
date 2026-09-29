import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

// OpenAI Ads Conversions API (server-side reporting).
// Ref: https://developers.openai.com/ads/conversions-api
//
// Boundary: the contact form submits to Web3Forms directly from the browser
// (Web3Forms free plan rejects server-side forwarding). On success, the
// browser reports the same event here, and this route sends the CAPI event
// with hashed email + quality gate. Reporting failures never affect the
// form: the client call is fire-and-forget and this route always answers.

const PIXEL_ID = process.env.OPENAI_ADS_PIXEL_ID; // same value as NEXT_PUBLIC_OPENAI_ADS_PIXEL_ID
const CAPI_KEY = process.env.OPENAI_ADS_CONVERSIONS_API_KEY;
const CAPI_URL = "https://bzr.openai.com/v1/events";
const CANONICAL_ORIGIN = "https://www.holdingai.io";

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
  // Answer fast; never block or fail the client call.
  try {
    const body = await req.json().catch(() => null);
    const eventId = String(body?.event_id || "").slice(0, 200);
    const email = String(body?.email || "").slice(0, 200);
    const message = String(body?.message || "").slice(0, 4000);

    if (!eventId || !email || !message) {
      return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
    }

    if (PIXEL_ID && CAPI_KEY) {
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

      const payload: Record<string, unknown> = { events: [event] };
      if (process.env.OPENAI_ADS_CAPI_VALIDATE_ONLY === "true") {
        payload.validate_only = true;
      }

      await fetch(`${CAPI_URL}?pid=${encodeURIComponent(PIXEL_ID)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CAPI_KEY}`,
        },
        body: JSON.stringify(payload),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
