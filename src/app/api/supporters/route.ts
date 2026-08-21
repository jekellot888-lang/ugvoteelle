import { NextRequest, NextResponse } from "next/server";
import { campaign } from "@/lib/campaign";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { supporterSchema } from "@/lib/validation";

function normalizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

function referralCode(firstName: string) {
  const prefix = firstName.replace(/[^a-z0-9]/gi, "").slice(0, 4).toUpperCase() || "ELLE";
  const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `${prefix}${suffix}`;
}

export async function POST(request: NextRequest) {
  const parsed = supporterSchema.safeParse(await request.json().catch(() => ({})));

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid supporter details" },
      { status: 400 },
    );
  }

  const input = parsed.data;
  const supabase = getSupabaseAdminClient();
  const code = referralCode(input.firstName);
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin;
  const now = new Date().toISOString();

  if (!supabase) {
    return NextResponse.json({
      supporterId: crypto.randomUUID(),
      referralCode: code,
      referralUrl: `${origin}/r/${code}`,
      mode: "demo-no-supabase",
    });
  }

  const { data: referrer } = input.referralCode
    ? await supabase
        .from("supporters")
        .select("id")
        .eq("referral_code", input.referralCode)
        .maybeSingle()
    : { data: null };

  const { data, error } = await supabase
    .from("supporters")
    .insert({
      first_name: input.firstName,
      phone: input.phone,
      phone_normalized: normalizePhone(input.phone),
      email: input.email || null,
      country: input.country,
      district: input.district || null,
      age_range: input.ageRange || null,
      marketing_consent: input.marketingConsent,
      terms_consent: input.termsConsent,
      terms_version: campaign.consentVersion,
      referral_code: code,
      referred_by: referrer?.id ?? null,
      source: input.source || null,
      created_at: now,
      updated_at: now,
    })
    .select("id, referral_code")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (referrer?.id) {
    await supabase.from("referrals").insert({
      referrer_id: referrer.id,
      referred_supporter_id: data.id,
      referral_code: input.referralCode,
      status: "registered",
      created_at: now,
    });
  }

  const response = NextResponse.json({
    supporterId: data.id,
    referralCode: data.referral_code,
    referralUrl: `${origin}/r/${data.referral_code}`,
  });
  response.cookies.set("vote_elle_supporter", data.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 90,
  });
  return response;
}
