"use server";

import { createAdminSession, validAdminCredentials } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export async function loginAdmin(_state: { error: string }, formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!validAdminCredentials(username, password)) return { error: "Incorrect username or password." };
  await createAdminSession();
  redirect("/admin");
}
