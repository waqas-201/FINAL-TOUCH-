"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { AddToCartItem, CartItem } from "@/lib/cart-types";
import { formatPrice } from "@/lib/format";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  addItem: (item: AddToCartItem) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "final-touch-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const restoreCart = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(storageKey);
        if (saved) setItems(JSON.parse(saved) as CartItem[]);
      } catch {
        window.localStorage.removeItem(storageKey);
      } finally {
        setHydrated(true);
      }
    }, 0);
    return () => window.clearTimeout(restoreCart);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [hydrated, items]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const addItem = useCallback((item: AddToCartItem) => {
    const key = `${item.slug}|${item.size}|${item.color}`;
    setItems((current) => {
      const existing = current.find((entry) => entry.key === key);
      if (existing) {
        return current.map((entry) =>
          entry.key === key
            ? { ...entry, quantity: entry.quantity + (item.quantity ?? 1) }
            : entry,
        );
      }
      return [...current, { ...item, key, quantity: item.quantity ?? 1 }];
    });
    setOpen(true);
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((current) => current.filter((item) => item.key !== key));
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    if (quantity < 1) return removeItem(key);
    setItems((current) => current.map((item) => item.key === key ? { ...item, quantity } : item));
  }, [removeItem]);

  const clearCart = useCallback(() => setItems([]), []);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const value = useMemo(() => ({
    items, count, subtotal, isOpen, addItem, removeItem, updateQuantity, clearCart,
    openCart: () => setOpen(true), closeCart: () => setOpen(false),
  }), [items, count, subtotal, isOpen, addItem, removeItem, updateQuantity, clearCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

function CartDrawer() {
  const cart = useCart();
  return (
    <div className={`fixed inset-0 z-[100] ${cart.isOpen ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!cart.isOpen}>
      <button
        aria-label="Close cart"
        onClick={cart.closeCart}
        className={`absolute inset-0 bg-[#101713]/55 backdrop-blur-[2px] transition-opacity duration-300 ${cart.isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <aside className={`absolute right-0 top-0 flex h-dvh w-full max-w-[460px] flex-col overscroll-contain bg-[#fbfaf6] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${cart.isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
          <div>
            <p className="eyebrow mb-1">Your selection</p>
            <h2 className="font-display text-3xl text-[#101010]">Shopping cart <span className="text-base font-sans text-black/45">({cart.count})</span></h2>
          </div>
          <button onClick={cart.closeCart} className="icon-button" aria-label="Close cart"><X size={21} /></button>
        </div>

        {cart.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="mb-5 grid size-20 place-items-center rounded-full bg-[#fbe7e8] text-[#d71920]"><ShoppingBag size={30} strokeWidth={1.5} /></div>
            <h3 className="font-display text-3xl text-[#101010]">Your cart is ready for colour</h3>
            <p className="mt-3 max-w-xs text-sm leading-6 text-black/55">Explore premium coatings, preparation products and professional tools for your next project.</p>
            <Link href="/shop" onClick={cart.closeCart} className="button-primary mt-7">Explore all products</Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-3">
              {cart.items.map((item) => (
                <article key={item.key} className="grid grid-cols-[76px_minmax(0,1fr)] gap-3 border-b border-black/8 py-4 sm:grid-cols-[88px_1fr] sm:gap-4 sm:py-5">
                  <Link href={`/products/${item.slug}`} onClick={cart.closeCart} className="relative aspect-square overflow-hidden rounded-xl bg-[#f0eee8]">
                    <Image src={item.image} alt={item.name} fill sizes="88px" className="object-contain p-2" />
                    {item.shadeHex && <span className="absolute bottom-1 right-1 size-4 rounded-full border border-white shadow" style={{ backgroundColor: item.shadeHex }} />}
                  </Link>
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <Link href={`/products/${item.slug}`} onClick={cart.closeCart} className="line-clamp-2 text-sm font-semibold leading-5 text-[#101010] hover:text-[#d71920]">{item.name}</Link>
                      <button onClick={() => cart.removeItem(item.key)} aria-label={`Remove ${item.name}`} className="mt-0.5 text-black/35 transition hover:text-red-700"><Trash2 size={16} /></button>
                    </div>
                    <p className="mt-1 text-xs text-black/45">{item.size} · {item.color}{item.shadeCode ? ` · ${item.shadeCode}` : ""}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex h-8 items-center rounded-full border border-black/12">
                        <button onClick={() => cart.updateQuantity(item.key, item.quantity - 1)} className="grid h-8 w-8 place-items-center" aria-label="Decrease quantity"><Minus size={13} /></button>
                        <span className="w-6 text-center text-xs font-semibold">{item.quantity}</span>
                        <button onClick={() => cart.updateQuantity(item.key, item.quantity + 1)} className="grid h-8 w-8 place-items-center" aria-label="Increase quantity"><Plus size={13} /></button>
                      </div>
                      <p className="text-sm font-bold text-[#101010]">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="border-t border-black/10 bg-white px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5 sm:px-6">
              <div className="mb-2 flex justify-between text-sm text-black/55"><span>Subtotal</span><span className="font-semibold text-[#101010]">{formatPrice(cart.subtotal)}</span></div>
              <div className="mb-5 flex justify-between text-sm text-black/55"><span>Delivery</span><span>Karachi rate at checkout</span></div>
              <Link href="/checkout" onClick={cart.closeCart} className="button-primary w-full justify-center">Secure checkout <span>·</span> {formatPrice(cart.subtotal)}</Link>
              <Link href="/shop" onClick={cart.closeCart} className="mt-3 block text-center text-xs font-semibold underline decoration-black/30 underline-offset-4">Continue shopping</Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
