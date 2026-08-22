import { NextResponse } from "next/server";

/**
 * Project inquiry endpoint.
 *
 * Deliberately transport-agnostic: it validates and normalises the
 * payload, then hands off to whichever destination is configured.
 * Wire ONE of the following by setting the env var and uncommenting
 * its block — no other file needs to change.
 *
 *   INQUIRY_WEBHOOK_URL   generic webhook / Zapier / Make / n8n
 *   RESEND_API_KEY        transactional email
 *   SUPABASE_URL + KEY    write to a Supabase table
 *   CRM_ENDPOINT          post into a CRM
 *
 * With nothing configured it logs server-side and returns 200, so the
 * form is testable end to end before a destination exists.
 */

type Payload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  needs?: string[];
  budget?: string;
  timeline?: string;
  details?: string;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const clamp = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Server-side validation — the client checks are for UX, not trust.
  const inquiry = {
    name: clamp(body.name, 120),
    company: clamp(body.company, 120),
    email: clamp(body.email, 200),
    phone: clamp(body.phone, 60),
    needs: Array.isArray(body.needs) ? body.needs.slice(0, 12).map((n) => clamp(n, 60)) : [],
    budget: clamp(body.budget, 60),
    timeline: clamp(body.timeline, 60),
    details: clamp(body.details, 4000),
    receivedAt: new Date().toISOString(),
  };

  if (!inquiry.name || !inquiry.email || !isEmail(inquiry.email) || !inquiry.details) {
    return NextResponse.json(
      { error: "Name, a valid email and a project description are required." },
      { status: 422 }
    );
  }

  const webhook = process.env.INQUIRY_WEBHOOK_URL;

  try {
    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiry),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } else {
      // No destination configured yet — surface it in the server log.
      console.info("[inquiry] no INQUIRY_WEBHOOK_URL set; payload:", inquiry);
    }

    /* ── Supabase ────────────────────────────────────────────
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);
    await supabase.from("inquiries").insert(inquiry);
    ─────────────────────────────────────────────────────────── */

    /* ── Resend email ────────────────────────────────────────
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "site@yourdomain.com",
        to: "hello@yourdomain.com",
        subject: `New project enquiry — ${inquiry.name}`,
        text: JSON.stringify(inquiry, null, 2),
      }),
    });
    ─────────────────────────────────────────────────────────── */

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[inquiry] delivery failed:", error);
    return NextResponse.json({ error: "Could not deliver the enquiry." }, { status: 502 });
  }
}
