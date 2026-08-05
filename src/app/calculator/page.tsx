import type { Metadata } from "next";
import Image from "next/image";
import { PaintCalculator } from "@/components/paint-calculator";

export const metadata: Metadata = { title: "Paint Calculator", description: "Estimate how much Final Touch paint your room or project needs." };

export default function CalculatorPage() {
  return <>
    <section className="relative min-h-[350px] overflow-hidden bg-[#101010] text-white sm:min-h-[380px]"><Image src="/images/editorial/elegant-room.jpg" alt="Elegant painted living room" fill sizes="100vw" data-parallax="0.03" className="object-cover opacity-55" /><div className="absolute inset-0 bg-gradient-to-r from-[#101010]/90 to-[#101010]/20" /><div className="site-container relative flex min-h-[350px] items-end py-12 sm:min-h-[380px] sm:items-center sm:py-14"><div><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#ff4147]">Plan with confidence</p><h1 className="mt-4 max-w-3xl font-display text-[clamp(3rem,14vw,6rem)] leading-[.88] tracking-[-.05em]">How much paint do I need?</h1><p className="mt-5 max-w-xl text-sm leading-6 text-white/62">Turn a few simple room measurements into a practical paint and pack estimate.</p></div></div></section>
    <section className="bg-[#f1f0eb] py-14 sm:py-20"><div className="site-container"><PaintCalculator /></div></section>
  </>;
}
