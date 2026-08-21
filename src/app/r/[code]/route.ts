import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: RouteContext<"/r/[code]">) {
  const { code: rawCode } = await context.params;
  const code = rawCode.toUpperCase();
  const url = new URL("/", request.url);
  url.searchParams.set("ref", code);

  const response = NextResponse.redirect(url);
  response.cookies.set("vote_elle_ref", code, {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
