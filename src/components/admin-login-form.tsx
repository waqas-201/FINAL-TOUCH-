"use client";

import { LockKeyhole, LogIn } from "lucide-react";
import { useActionState } from "react";
import { loginAdmin } from "@/app/admin/login/actions";

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(loginAdmin, { error: "" });
  return <form action={action} className="mt-7 grid gap-4"><label><span className="form-label">Username</span><input name="username" required autoComplete="username" className="form-field" placeholder="admin" /></label><label><span className="form-label">Password</span><input name="password" required type="password" autoComplete="current-password" className="form-field" placeholder="••••••••••" /></label>{state.error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-xs text-red-700">{state.error}</p>}<button disabled={pending} className="button-primary mt-1 w-full disabled:opacity-60">{pending ? <><LockKeyhole size={15} /> Signing in...</> : <><LogIn size={15} /> Open dashboard</>}</button></form>;
}
