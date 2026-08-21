import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const supabase = getSupabaseAdminClient();
  const supporterId = request.cookies.get("vote_elle_supporter")?.value ?? null;
  const anonymousSessionId =
    request.cookies.get("vote_elle_session")?.value ?? crypto.randomUUID();

  if (supabase) {
    const { error } = await supabase.from("vote_self_attestations").insert({
      supporter_id: supporterId,
      anonymous_session_id: anonymousSessionId,
      declared_voted: true,
      created_at: new Date().toISOString(),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
