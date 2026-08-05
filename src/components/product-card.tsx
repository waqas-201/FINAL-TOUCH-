"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus, Star } from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog";
import { formatPrice, shadeLabel } from "@/lib/format";
import { useCart } from "./cart-provider";

export function ProductCard({ product, priority = false }: { product: CatalogProduct; priority?: boolean }) {
  const cart = useCart();
  const badge = product.compareAtPrice ? "Save " + Math.round((1 - product.price / product.compareAtPrice) * 100) + "%" : product.bestseller ? "Bestseller" : product.featured ? "Featured" : null;
  const firstShade = product.shades?.find((shade) => shade.stock > 0) || product.shades?.[0];

  return (
    <article className="product-card group min-w-0">
      <div className="product-card-image relative aspect-[1/1.08] overflow-hidden rounded-[20px] bg-[#efeee9] sm:rounded-[24px]">
        <Link href={`/products/${product.slug}`} className="absolute inset-0" aria-label={product.name}>
          <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="product-packshot object-contain p-5 sm:p-8" priority={priority} />
        </Link>
        {badge && <span className={`absolute left-3 top-3 rounded-full px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[.1em] ${product.compareAtPrice ? "bg-[#d71920] text-white" : "bg-white/90 text-[#101010] backdrop-blur"}`}>{badge}</span>}
        <button
          onClick={() => cart.addItem({
            slug: product.slug,
            name: product.name,
            image: product.image,
            price: product.price,
            size: product.sizes[0] ?? "Standard",
            color: firstShade ? shadeLabel(firstShade) : product.colors[0] ?? "Standard",
            shadeCode: firstShade?.code,
            shadeHex: firstShade?.hex,
          })}
          className="quick-add absolute bottom-3 right-3 grid size-11 place-items-center rounded-full bg-[#101010] text-white shadow-lg hover:bg-[#d71920] sm:bottom-4 sm:right-4"
          aria-label={`Quick add ${product.name}`}
        ><Plus size={18} /></button>
      </div>
      <div className="px-1 pt-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="truncate text-[9px] font-bold uppercase tracking-[.13em] text-[#d71920]">{product.brand} · {product.category}</p>
          <span className="flex shrink-0 items-center gap-1 text-[10px] text-black/55"><Star size={11} className="fill-[#d4a83e] text-[#d4a83e]" /> {product.rating.toFixed(1)}</span>
        </div>
        <Link href={`/products/${product.slug}`} className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 min-h-10 font-sans text-[13px] font-semibold leading-5 text-[#101010] sm:text-sm">{product.name}</h3>
          <ArrowUpRight size={15} className="mt-1 shrink-0 text-black/35 transition group-hover:text-[#101010]" />
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex -space-x-1">
            {(product.shades || []).slice(0, 5).map((shade) => (
              <span key={`${shade.code}-${shade.name}`} className="size-3.5 rounded-full border border-white shadow-sm" style={{ backgroundColor: shade.hex }} title={shadeLabel(shade)} />
            ))}
          </div>
          <span className="text-[10px] text-black/40">{product.shadeCount > 0 ? `${product.shadeCount} shades` : product.finish}</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-sm font-bold text-[#101010]">{formatPrice(product.price)}</span>
          {product.compareAtPrice && <span className="text-[11px] text-black/35 line-through">{formatPrice(product.compareAtPrice)}</span>}
          <span className="ml-auto text-[10px] text-black/40">{product.availableStock} in stock</span>
        </div>
      </div>
    </article>
  );
}
