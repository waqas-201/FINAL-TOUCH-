import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = { title: "Secure Checkout", robots: { index: false, follow: false } };

export default function CheckoutPage() {
  return <section className="bg-[#f7f5ef]">
    <div className="site-container flex items-end justify-between gap-4 py-8 sm:py-14"><div className="min-w-0"><Link href="/shop" className="mb-4 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-black/45 sm:mb-5 sm:text-[10px]"><ArrowLeft size={13} /> Continue shopping</Link><h1 className="font-display text-[clamp(2.7rem,13vw,4.4rem)] leading-none tracking-[-.045em]">Secure checkout.</h1></div><p className="hidden items-center gap-2 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#d71920] sm:flex"><LockKeyhole size={14} /> Protected order</p></div>
    <CheckoutForm />
  </section>;
}
