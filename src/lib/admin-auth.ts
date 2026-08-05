import "server-only";
import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "crypto";

const cookieName = "final_touch_admin";

function expectedToken() {
  const password = process.env.ADMIN_PASSWORD ?? "FinalTouch@2026";
  const secret = process.env.ADMIN_SECRET ?? "final-touch-local-admin-secret";
  return createHash("sha256").update(`${password}:${secret}`).digest("hex");
}

export async function isAdmin() {
  const value = (await cookies()).get(cookieName)?.value ?? "";
  const expected = expectedToken();
  if (value.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}

export async function createAdminSession() {
  (await cookies()).set(cookieName, expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function destroyAdminSession() {
  (await cookies()).delete(cookieName);
}

export function validAdminCredentials(username: string, password: string) {
  const expectedUser = process.env.ADMIN_USER ?? "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "FinalTouch@2026";
  if (username.length !== expectedUser.length || password.length !== expectedPassword.length) return false;
  return timingSafeEqual(Buffer.from(username), Buffer.from(expectedUser)) && timingSafeEqual(Buffer.from(password), Buffer.from(expectedPassword));
}
