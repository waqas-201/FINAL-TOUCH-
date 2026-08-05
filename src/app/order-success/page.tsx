import Link from "next/link";
import { ArrowRight, Check, PackageCheck, Phone } from "lucide-react";

export const metadata = { title: "Order confirmed", robots: { index: false, follow: false } };

type Search = Promise<{ order?: string }>;

export default async function OrderSuccessPage({ searchParams }: { searchParams: Search }) {
  const { order } = await searchParams;
  return <section className="grid min-h-[70vh] place-items-center bg-[#f4f1ee] px-6 py-20 text-center"><div className="max-w-2xl"><div className="mx-auto grid size-24 place-items-center rounded-full bg-[#101010] text-[#d71920]"><Check size={40} strokeWidth={1.5} /></div><p className="eyebrow mt-7">Order received</p><h1 className="mt-4 font-display text-6xl leading-[.9] tracking-[-.05em] sm:text-8xl">Your colour is on its way.</h1><p className="mx-auto mt-6 max-w-lg text-sm leading-6 text-black/52">Thank you for choosing Final Touch. Our team will confirm stock, shade and Karachi delivery details by phone before dispatch.</p><div className="mx-auto mt-7 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-xs shadow-sm"><PackageCheck size={16} className="text-[#d71920]" /><span>Order reference: <strong>{order || "Pending confirmation"}</strong></span></div><div className="mt-9 flex flex-wrap justify-center gap-3"><Link href="/shop" className="button-dark">Continue shopping <ArrowRight size={14} /></Link><a href="tel:+9221111112222" className="button-light"><Phone size={14} /> Call support</a></div></div></section>;
}
