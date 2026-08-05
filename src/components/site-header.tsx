"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useCart } from "./cart-provider";

const links = [
  ["Interior", "/shop?category=Interior+Paints"],
  ["Exterior", "/shop?category=Exterior+Paints"],
  ["Waterproofing", "/shop?category=Waterproofing"],
  ["Primers & Putty", "/shop?category=Primers+%26+Sealers"],
  ["Wood & Metal", "/shop?category=Enamels"],
  ["Primers", "/shop?category=Primers+%26+Sealers"],
];

export function SiteHeader() {
  const cart = useCart();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [mobileOpen]);

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    if (query.trim()) router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-[#fbfaf6]/95 shadow-[0_1px_0_rgba(0,0,0,.08)] backdrop-blur-xl">
      <div className="bg-[#101010] px-2 py-2 text-center text-[9px] font-semibold uppercase leading-4 tracking-[0.11em] text-white/85 sm:px-4 sm:text-[11px] sm:tracking-[0.16em]">
        Free Karachi delivery above PKR 15,000 <span className="mx-1.5 text-[#ff4147] sm:mx-2">•</span> Delivering in Karachi only
      </div>
      <div className="site-container flex h-[66px] items-center justify-between gap-1 sm:h-[72px] sm:gap-5 lg:h-[82px]">
        <button className="icon-button lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={21} /></button>
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Final Touch home">
          <Image src="/images/brand/alliance-mark.png" alt="Alliance Paints logo" width={52} height={52} className="size-11 object-contain sm:size-12" priority />
          <span className="hidden leading-none min-[390px]:block">
            <span className="block font-display text-[25px] font-bold tracking-[-.03em] text-[#101010]">Final Touch</span>
            <span className="mt-1 block text-[8px] font-bold uppercase tracking-[.25em] text-black/45">by Alliance Paints</span>
          </span>
        </Link>

        <form onSubmit={submitSearch} className="mx-auto hidden h-11 max-w-[560px] flex-1 items-center rounded-full border border-black/10 bg-[#f1f0ea] px-5 lg:flex">
          <Search size={17} className="text-black/40" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="h-full flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-black/35" placeholder="Search paint, finish or project..." />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-black/30">Enter</span>
        </form>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button onClick={() => setSearchOpen(!searchOpen)} className="icon-button lg:hidden" aria-label="Search"><Search size={20} /></button>
          <Link href="/admin" className="icon-button hidden sm:grid" aria-label="Admin account"><UserRound size={19} /></Link>
          <button onClick={cart.openCart} className="icon-button relative" aria-label={`Open cart with ${cart.count} items`}>
            <ShoppingBag size={20} />
            {cart.count > 0 && <span className="absolute -right-0.5 -top-0.5 grid size-[17px] place-items-center rounded-full bg-[#d71920] text-[9px] font-bold text-white">{cart.count > 99 ? "99" : cart.count}</span>}
          </button>
        </div>
      </div>

      <nav className="hidden border-t border-black/7 lg:block">
        <div className="site-container flex h-12 items-center justify-center gap-8 xl:gap-11">
          {links.map(([label, href]) => <Link key={label} href={href} className="nav-link">{label}</Link>)}
          <Link href="/shades" className="nav-link">Shade library</Link>
          <Link href="/calculator" className="nav-link text-[#d71920]">Paint calculator</Link>
        </div>
      </nav>

      {searchOpen && (
        <form onSubmit={submitSearch} className="absolute left-0 top-full flex w-full min-w-0 gap-2 border-t border-black/10 bg-[#fbfaf6] p-3 shadow-lg sm:p-4 lg:hidden">
          <div className="flex h-11 min-w-0 flex-1 items-center rounded-full bg-[#efede6] px-3 sm:px-4"><Search size={16} className="shrink-0" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} className="h-full min-w-0 flex-1 bg-transparent px-2 text-sm outline-none sm:px-3" placeholder="Search paint..." /></div>
          <button className="button-dark px-5">Search</button>
        </form>
      )}

      <div className={`fixed inset-0 z-[110] lg:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <button onClick={() => setMobileOpen(false)} className={`absolute inset-0 bg-black/50 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`} aria-label="Close menu" />
        <aside className={`absolute left-0 top-0 h-dvh w-[88%] max-w-sm overflow-y-auto bg-[#fbfaf6] px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] transition-transform duration-500 sm:w-[86%] sm:p-6 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center justify-between border-b border-black/10 pb-5">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3"><Image src="/images/brand/alliance-mark.png" alt="Alliance Paints" width={44} height={44} /><span className="font-display text-2xl font-bold">Final Touch</span></Link>
            <button className="icon-button" onClick={() => setMobileOpen(false)}><X size={20} /></button>
          </div>
          <nav className="flex flex-col py-5">
            <Link href="/shop" onClick={() => setMobileOpen(false)} className="mobile-nav-link font-semibold">Shop all products</Link>
            {links.map(([label, href]) => <Link key={label} href={href} onClick={() => setMobileOpen(false)} className="mobile-nav-link">{label}</Link>)}
            <Link href="/shades" onClick={() => setMobileOpen(false)} className="mobile-nav-link">Shade library</Link>
            <Link href="/calculator" onClick={() => setMobileOpen(false)} className="mobile-nav-link">Paint calculator</Link>
            <Link href="/admin" onClick={() => setMobileOpen(false)} className="mobile-nav-link">Admin dashboard</Link>
          </nav>
          <div className="mt-3 rounded-2xl bg-[#fbe7e8] p-5"><p className="eyebrow">Need expert advice?</p><p className="mt-2 font-display text-2xl">Let’s plan your finish.</p><a href="tel:+9221111112222" className="mt-4 inline-block text-sm font-bold underline">+92 21 111 112 222</a></div>
        </aside>
      </div>
    </header>
  );
}
