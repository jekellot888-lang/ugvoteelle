import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const supabase = getSupabaseAdminClient();
  const anonymousSessionId =
    request.cookies.get("vote_elle_session")?.value ?? crypto.randomUUID();

  if (supabase) {
    const { error } = await supabase.from("vote_clicks").insert({
      anonymous_session_id: anonymousSessionId,
      vote_package: body.votePackage ?? null,
      price_usd: body.priceUsd ?? null,
      referral_code: body.referralCode ?? null,
      source: body.source ?? null,
      device_type: request.headers.get("sec-ch-ua-mobile") === "?1" ? "mobile" : "desktop",
      clicked_at: new Date().toISOString(),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("vote_elle_session", anonymousSessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
