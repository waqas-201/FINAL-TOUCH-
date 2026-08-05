import Link from "next/link";
import { ArrowLeft, Paintbrush } from "lucide-react";

export default function NotFound() {
  return <section className="grid min-h-[65vh] place-items-center bg-[#f4f1ee] px-6 py-20 text-center"><div><Paintbrush size={36} strokeWidth={1.3} className="mx-auto text-[#d71920]" /><p className="eyebrow mt-6">404 · Blank canvas</p><h1 className="mt-4 font-display text-6xl tracking-[-.05em] sm:text-8xl">This shade is missing.</h1><p className="mx-auto mt-5 max-w-md text-sm leading-6 text-black/50">The page may have moved, but the right finish is still close by.</p><Link href="/shop" className="button-dark mt-8"><ArrowLeft size={14} /> Back to the shop</Link></div></section>;
}
