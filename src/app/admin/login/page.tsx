import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { AdminLoginForm } from "@/components/admin-login-form";
import { isAdmin } from "@/lib/admin-auth";

export const metadata: Metadata = { title: "Admin sign in", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");
  const usingDemo = !process.env.ADMIN_PASSWORD;
  return <section className="grid min-h-[72vh] bg-[#f4f1ee] lg:grid-cols-2">
    <div className="relative hidden overflow-hidden lg:block"><Image src="/images/editorial/warm-room.jpg" alt="Final Touch interior" fill className="object-cover" sizes="50vw" /><div className="absolute inset-0 bg-gradient-to-t from-[#101010]/70 to-transparent" /><div className="absolute bottom-12 left-12 right-12 text-white"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#d71920]">Alliance Paints Industries</p><p className="mt-3 max-w-xl font-display text-5xl leading-[.95]">Manage every finish from one place.</p></div></div>
    <div className="flex items-center justify-center px-6 py-16"><div className="w-full max-w-md rounded-[28px] bg-[#fbfaf6] p-7 shadow-[0_25px_70px_rgba(23,37,31,.12)] sm:p-10"><div className="flex items-center gap-3"><Image src="/images/brand/alliance-mark.png" alt="Alliance Paints" width={50} height={50} /><div><p className="font-display text-2xl font-bold">Final Touch</p><p className="text-[8px] font-bold uppercase tracking-[.2em] text-black/40">Commerce admin</p></div></div><h1 className="mt-8 font-display text-4xl tracking-[-.04em]">Welcome back.</h1><p className="mt-2 text-sm leading-6 text-black/45">Sign in to manage products, inventory and customer orders.</p><AdminLoginForm />{usingDemo && <div className="mt-6 rounded-xl border border-[#d71920]/20 bg-[#fff0f0] p-4 text-[11px] leading-5 text-black/55"><p className="flex items-center gap-2 font-bold text-[#b11218]"><ShieldCheck size={14} /> Sandbox demo access</p><p className="mt-1">Username: <strong>admin</strong> · Password: <strong>FinalTouch@2026</strong></p><p className="mt-1 text-[9px] text-black/35">Set ADMIN_USER, ADMIN_PASSWORD and ADMIN_SECRET in production.</p></div>}</div></div>
  </section>;
}
