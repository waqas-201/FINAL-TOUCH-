"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Loader2, LockKeyhole, MapPin, PackageCheck, ShoppingBag, Truck } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/format";
import { useCart } from "./cart-provider";

export function CheckoutForm() {
  const cart = useCart();
  const router = useRouter();
  const [payment, setPayment] = useState("Cash on delivery");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const shipping = cart.subtotal >= 15000 ? 0 : 450;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); setError("");
    const form = new FormData(event.currentTarget);
    const customer = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ customer: { ...customer, paymentMethod: payment }, items: cart.items }) });
      const data = await response.json() as { orderNumber?: string; error?: string };
      if (!response.ok || !data.orderNumber) throw new Error(data.error || "We could not place your order.");
      cart.clearCart();
      router.push(`/order-success?order=${encodeURIComponent(data.orderNumber)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (cart.items.length === 0) return (
    <section className="grid min-h-[60vh] place-items-center px-6 py-20 text-center"><div><div className="mx-auto grid size-20 place-items-center rounded-full bg-[#fbe7e8]"><ShoppingBag size={30} strokeWidth={1.4} /></div><h1 className="mt-6 font-display text-5xl">Your cart is empty.</h1><p className="mt-3 text-sm text-black/45">Choose a finish and we’ll keep it here for you.</p><Link href="/shop" className="button-dark mt-7">Explore products</Link></div></section>
  );

  return (
    <form onSubmit={submit} className="site-container grid gap-10 pb-24 lg:grid-cols-[1fr_430px] lg:gap-16">
      <div className="min-w-0">
        <div data-reveal className="rounded-[20px] border border-black/10 bg-white p-5 sm:rounded-[24px] sm:p-8">
          <div className="mb-7 flex items-center justify-between"><div><p className="eyebrow">Step 1 of 3</p><h2 className="mt-2 font-display text-3xl">Contact details</h2></div><span className="grid size-9 place-items-center rounded-full bg-[#fbe7e8] text-[#d71920]"><Check size={16} /></span></div>
          <div className="grid gap-5 sm:grid-cols-2">
            <label><span className="form-label">Full name</span><input className="form-field" name="name" required minLength={2} autoComplete="name" placeholder="Your full name" /></label>
            <label><span className="form-label">Mobile number</span><input className="form-field" name="phone" required minLength={10} autoComplete="tel" placeholder="03XX XXXXXXX" /></label>
            <label className="sm:col-span-2"><span className="form-label">Email address</span><input className="form-field" name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></label>
          </div>
        </div>

        <div data-reveal className="mt-5 rounded-[20px] border border-black/10 bg-white p-5 sm:rounded-[24px] sm:p-8">
          <div className="mb-7"><p className="eyebrow">Step 2 of 3</p><h2 className="mt-2 font-display text-3xl">Delivery address</h2></div>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="sm:col-span-2"><span className="form-label">Street address</span><input className="form-field" name="address" required minLength={8} autoComplete="street-address" placeholder="House / office, street, area" /></label>
            <label><span className="form-label">Delivery city</span><span className="relative block"><input className="form-field bg-[#f8f7f3] pr-10 font-semibold" name="city" value="Karachi" readOnly aria-readonly="true" /><MapPin size={15} className="pointer-events-none absolute right-4 top-[18px] text-[#d71920]" /></span><span className="mt-2 block text-[9px] leading-4 text-black/40">Currently delivering within Karachi city limits only.</span></label>
            <label><span className="form-label">Postal code <i className="font-normal normal-case text-black/30">(optional)</i></span><input className="form-field" name="postalCode" autoComplete="postal-code" placeholder="75300" /></label>
            <label className="sm:col-span-2"><span className="form-label">Order notes <i className="font-normal normal-case text-black/30">(optional)</i></span><textarea className="form-field" name="notes" placeholder="Site access, delivery landmark or special instructions" /></label>
          </div>
        </div>

        <div data-reveal className="mt-5 rounded-[20px] border border-black/10 bg-white p-5 sm:rounded-[24px] sm:p-8">
          <div className="mb-7"><p className="eyebrow">Step 3 of 3</p><h2 className="mt-2 font-display text-3xl">Payment method</h2></div>
          <div className="grid gap-3">
            {[ ["Cash on delivery", "Pay safely when your order arrives", PackageCheck], ["Bank transfer", "Our account details will be shared after confirmation", LockKeyhole] ].map(([title, copy, Icon]) => { const PayIcon = Icon as typeof PackageCheck; return <button type="button" onClick={() => setPayment(String(title))} key={String(title)} className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${payment === title ? "border-[#d71920] bg-[#fff0f0]" : "border-black/10 hover:border-black/25"}`}><span className={`grid size-5 shrink-0 place-items-center rounded-full border ${payment === title ? "border-[#d71920]" : "border-black/20"}`}>{payment === title && <span className="size-2.5 rounded-full bg-[#d71920]" />}</span><PayIcon size={20} strokeWidth={1.5} /><span><span className="block text-xs font-bold">{String(title)}</span><span className="mt-1 block text-[11px] text-black/42">{String(copy)}</span></span></button>; })}
          </div>
        </div>
        {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      </div>

      <aside className="lg:order-last">
        <div data-reveal className="rounded-[20px] bg-[#ecebe3] p-5 sm:rounded-[24px] sm:p-7 lg:sticky lg:top-[150px]">
          <div className="flex items-center justify-between"><h2 className="font-display text-3xl">Your order</h2><Link href="/shop" className="text-[10px] font-bold uppercase tracking-wider underline">Edit cart</Link></div>
          <div className="mt-5 max-h-[310px] divide-y divide-black/8 overflow-y-auto pr-1">
            {cart.items.map((item) => <div key={item.key} className="mobile-checkout-item grid grid-cols-[70px_minmax(0,1fr)_auto] gap-3 py-4"><div className="relative size-[70px] overflow-hidden rounded-xl bg-white"><Image src={item.image} alt={item.name} fill sizes="70px" className="object-contain p-1" /><span className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-[#101010] text-[9px] font-bold text-white">{item.quantity}</span>{item.shadeHex && <span className="absolute bottom-1 left-1 size-3.5 rounded-full border border-white" style={{ backgroundColor: item.shadeHex }} />}</div><div><p className="line-clamp-2 text-[11px] font-bold leading-4">{item.name}</p><p className="mt-1 text-[9px] leading-4 text-black/40">{item.size}<br />{item.color}{item.shadeCode ? ` · ${item.shadeCode}` : ""}</p></div><span className="text-[11px] font-bold">{formatPrice(item.price * item.quantity)}</span></div>)}
          </div>
          <div className="mt-3 space-y-3 border-t border-black/10 pt-5 text-xs"><div className="flex justify-between text-black/50"><span>Subtotal</span><span className="font-semibold text-[#101010]">{formatPrice(cart.subtotal)}</span></div><div className="flex justify-between text-black/50"><span>Delivery</span><span className="font-semibold text-[#101010]">{shipping ? formatPrice(shipping) : "Free"}</span></div><div className="flex justify-between border-t border-black/10 pt-4 font-bold"><span>Total</span><span className="text-lg">{formatPrice(cart.subtotal + shipping)}</span></div></div>
          {shipping > 0 && <div className="mt-5"><div className="mb-2 flex justify-between text-[9px] font-semibold"><span>Add {formatPrice(15000 - cart.subtotal)} for free Karachi delivery</span><span>{Math.min(100, Math.round(cart.subtotal / 150))}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-black/10"><div className="h-full rounded-full bg-[#d71920]" style={{ width: `${Math.min(100, cart.subtotal / 150)}%` }} /></div></div>}
          <button disabled={loading} className="button-primary mt-6 w-full disabled:cursor-wait disabled:opacity-60">{loading ? <><Loader2 size={16} className="animate-spin" /> Placing order...</> : <>Place order · {formatPrice(cart.subtotal + shipping)}</>}</button>
          <p className="mt-4 flex items-center justify-center gap-2 text-[9px] leading-4 text-black/40"><LockKeyhole size={12} /> Your details are securely protected</p>
          <div className="mt-5 flex items-center gap-3 border-t border-black/10 pt-5"><Truck size={19} className="text-[#d71920]" /><p className="text-[10px] leading-4"><strong>Karachi delivery only.</strong><br /><span className="text-black/40">Typical local dispatch in 1–2 working days.</span></p></div>
        </div>
      </aside>
    </form>
  );
}
