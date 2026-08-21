import crypto from "crypto";

export const adminCookieName = "vote_elle_admin";

export function adminSessionValue() {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!password || !secret) {
    return null;
  }

  return crypto.createHash("sha256").update(`${password}:${secret}`).digest("hex");
}
