"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ChevronDown, Droplets, Home, Minus, PackageCheck, Plus, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
import { useState } from "react";
import type { CatalogProduct } from "@/lib/catalog";
import type { ProductShade, Review } from "@/db/schema";
import { formatDate, formatPrice, shadeColor, shadeLabel, stockLabel } from "@/lib/format";
import { HouseShadePreview } from "./house-shade-preview";
import { ShadePicker } from "./shade-picker";
import { useCart } from "./cart-provider";

type DetailedProduct = CatalogProduct & { reviews: Review[] };

function sizeMultiplier(size: string) {
  const value = size.toLowerCase();
  if (value.includes("20 kg") || value.includes("20 l") || value.includes("drum") || value.includes("20 kg bag") || value.includes("40 kg")) return 13.5;
  if (value.includes("16 l") || value.includes("25 kg")) return 13.5;
  if (value.includes("5 kg")) return 4;
  if (value.includes("4 kg") || value.includes("4 l") || value.includes("gallon") || value.includes("3.64")) return 3.55;
  if (value.includes("1 kg") || value.includes("quarter") || value.includes("0.91")) return 1;
  if (value.includes("cartridge") || value.includes("inch") || value.includes("kit") || value.includes("set")) return 1;
  return 1;
}

export function ProductDetail({ product, reviewAction }: { product: DetailedProduct; reviewAction: (formData: FormData) => void }) {
  const cart = useCart();
  const shades = product.shades || [];
  const initialShade = shades.find((shade) => shade.stock > 0) || shades[0] || null;
  const [preview, setPreview] = useState<"product" | "house">("product");
  const [size, setSize] = useState(product.sizes[0] ?? "Standard");
  const [selectedShade, setSelectedShade] = useState<ProductShade | null>(initialShade);
  const [color, setColor] = useState(initialShade ? shadeLabel(initialShade) : product.colors[0] ?? "Standard");
  const [quantity, setQuantity] = useState(1);

  const selectedPrice = Math.round((product.price * sizeMultiplier(size)) / 10) * 10;
  const selectedStock = selectedShade?.stock ?? product.availableStock;
  const canAdd = selectedStock > 0;
  const activeHex = selectedShade?.hex || shadeColor(color, shades);
  const activeName = selectedShade?.name || color;
  const activeCode = selectedShade?.code;

  function chooseShade(shade: ProductShade) {
    setSelectedShade(shade);
    setColor(shadeLabel(shade));
    setPreview("house");
  }

  function add() {
    if (!canAdd) return;
    cart.addItem({
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: selectedPrice,
      size,
      color,
      shadeCode: selectedShade?.code,
      shadeHex: activeHex,
      quantity,
    });
  }

  return (
    <>
      <section className="site-container pb-28 pt-2 sm:pb-16 lg:grid lg:grid-cols-[1.05fr_.95fr] lg:gap-14 lg:pb-24 xl:gap-16">
        <div className="min-w-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-[#efeee8] sm:aspect-[5/5.1] sm:rounded-[26px] lg:top-[150px] lg:aspect-square">
            {preview === "product" ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-[8%] sm:p-[7%]"
                priority
              />
            ) : (
              <HouseShadePreview
                shadeHex={activeHex}
                shadeName={activeName}
                shadeCode={activeCode}
                className="absolute inset-0 h-full w-full"
              />
            )}

            {product.compareAtPrice && preview === "product" && (
              <span className="absolute left-3 top-3 rounded-full bg-[#d71920] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[.12em] text-white sm:left-5 sm:top-5 sm:px-4 sm:py-2">
                Save {Math.round((1 - product.price / product.compareAtPrice) * 100)}%
              </span>
            )}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4">
            <button
              type="button"
              onClick={() => setPreview("product")}
              className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${preview === "product" ? "border-[#d71920] bg-[#fff5f5]" : "border-black/10 bg-white"}`}
            >
              <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-[#efeee8]">
                <Image src={product.image} alt="" fill sizes="56px" className="object-contain p-1.5" />
              </span>
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-black/40">Image 1</span>
                <span className="mt-0.5 block text-xs font-bold text-[#101010]">Product tin</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => setPreview("house")}
              className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${preview === "house" ? "border-[#d71920] bg-[#fff5f5]" : "border-black/10 bg-white"}`}
            >
              <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-[#d7e6f0]">
                <span className="absolute inset-x-2 bottom-2 top-3 rounded-sm" style={{ backgroundColor: activeHex }} />
                <Home size={16} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow" />
              </span>
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-black/40">Image 2</span>
                <span className="mt-0.5 block text-xs font-bold text-[#101010]">House preview</span>
              </span>
            </button>
          </div>
          <p className="mt-2 text-[11px] leading-5 text-black/40">
            Only two previews: the Final Touch packshot and one live house. Pick any shade and the house walls update instantly.
          </p>
        </div>

        <div className="mt-8 min-w-0 lg:mt-0 lg:pt-1">
          <p className="eyebrow">{product.brand} · {product.category}</p>
          <h1 className="mt-3 font-display text-[clamp(2.1rem,8vw,4.6rem)] leading-[.94] tracking-[-.045em] sm:mt-4">{product.name}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold uppercase tracking-wider text-black/45">
            <span>{product.collection}</span>
            <span className="opacity-40">·</span>
            <span>{product.shadeCount} shades</span>
            <span className="opacity-40">·</span>
            <span>{product.availableStock} units</span>
          </div>

          <Link href="#reviews" className="mt-4 inline-flex items-center gap-2 sm:mt-5">
            <span className="flex text-[#bf902a]">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={14} fill={star <= Math.round(product.rating) ? "currentColor" : "none"} />)}</span>
            <span className="text-xs font-bold">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-black/40">({product.reviewCount} reviews)</span>
          </Link>

          <p className="mt-5 text-sm leading-6 text-black/56 sm:mt-6 sm:text-[15px] sm:leading-7">{product.shortDescription}</p>

          <div className="mt-6 flex flex-wrap items-baseline gap-3 border-b border-black/10 pb-6 sm:mt-7 sm:pb-7">
            <span className="text-2xl font-bold">{formatPrice(selectedPrice)}</span>
            {product.compareAtPrice && sizeMultiplier(size) === 1 && (
              <span className="text-sm text-black/35 line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
            <span className="text-xs text-black/35">incl. GST</span>
          </div>

          <div className="py-6 sm:py-7">
            <div className="mb-3 flex items-center justify-between gap-3">
              <label className="text-[10px] font-extrabold uppercase tracking-[.13em]">Choose pack size</label>
              <span className="text-[10px] text-black/40">Price updates by pack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((value) => (
                <button
                  key={value}
                  onClick={() => setSize(value)}
                  className={`rounded-full border px-3.5 py-2.5 text-[11px] font-semibold transition sm:px-4 ${size === value ? "border-[#101010] bg-[#101010] text-white" : "border-black/15 bg-white hover:border-black/40"}`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {shades.length > 0 ? (
            <ShadePicker shades={shades} value={color} onChange={chooseShade} />
          ) : (
            <div className="border-t border-black/10 py-6 sm:py-7">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-[10px] font-extrabold uppercase tracking-[.13em]">Choose colour</label>
                <span className="text-xs font-semibold">{color}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((value) => (
                  <button
                    key={value}
                    onClick={() => {
                      setColor(value);
                      setSelectedShade(null);
                      setPreview("house");
                    }}
                    title={value}
                    aria-label={value}
                    className={`relative size-9 rounded-full border border-black/10 shadow-sm transition ${color === value ? "ring-2 ring-[#101010] ring-offset-2" : "hover:scale-110"}`}
                    style={{ backgroundColor: shadeColor(value) }}
                  >
                    {color === value && <Check size={14} className="absolute inset-0 m-auto text-[#101010]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="product-buy-bar mt-2 border-t border-black/10 bg-[#fbfaf6]/95 px-4 py-3 backdrop-blur sm:mt-0 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none sm:pt-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:border-t sm:border-black/10 sm:pt-7">
              <div className="flex h-12 items-center justify-between rounded-full border border-black/15 bg-white px-2 sm:inline-flex sm:w-auto sm:justify-start sm:px-0">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="grid size-11 place-items-center" aria-label="Decrease quantity">
                  <Minus size={15} />
                </button>
                <span className="w-8 text-center text-sm font-bold sm:w-6">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(selectedStock || 99, quantity + 1))} className="grid size-11 place-items-center" aria-label="Increase quantity">
                  <Plus size={15} />
                </button>
              </div>
              <button onClick={add} disabled={!canAdd} className="button-primary w-full flex-1 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto">
                <ShoppingBag size={16} />
                {canAdd ? <>Add to cart · {formatPrice(selectedPrice * quantity)}</> : "Out of stock"}
              </button>
            </div>
            <p className={`mt-2 flex items-center justify-center gap-2 text-[10px] font-semibold sm:mt-3 ${canAdd ? "text-[#a81117]" : "text-black/40"}`}>
              <span className={`size-1.5 rounded-full ${canAdd ? "animate-[pulseRed_1.8s_ease-in-out_infinite] bg-[#d71920]" : "bg-black/25"}`} />
              {stockLabel(selectedStock)}
              {selectedShade ? ` · ${selectedShade.stock} units in ${selectedShade.name}` : ` · ${product.availableStock} units available`}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl bg-[#f0eee7] px-2 py-4 text-center sm:mt-7 sm:gap-0 sm:divide-x sm:divide-black/10 sm:px-2 sm:py-5">
            <div className="px-1 sm:px-2">
              <Truck size={18} className="mx-auto mb-2 text-[#d71920]" />
              <p className="text-[9px] font-bold uppercase leading-3 tracking-wider">Karachi delivery</p>
            </div>
            <div className="px-1 sm:px-2">
              <PackageCheck size={18} className="mx-auto mb-2 text-[#d71920]" />
              <p className="text-[9px] font-bold uppercase leading-3 tracking-wider">Shade stock checked</p>
            </div>
            <div className="px-1 sm:px-2">
              <ShieldCheck size={18} className="mx-auto mb-2 text-[#d71920]" />
              <p className="text-[9px] font-bold uppercase leading-3 tracking-wider">Quality assured</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#101010] py-14 text-white sm:py-16 lg:py-24">
        <div className="site-container grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-12">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#d71920]">Know your coating</p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,7vw,4.8rem)] leading-[.94] tracking-[-.04em]">Confident from prep to final coat.</h2>
          </div>
          <div>
            <p className="max-w-2xl text-sm leading-7 text-white/60">{product.description}</p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:grid-cols-4">
              {[[Droplets, "Finish", product.finish], [ShieldCheck, "Best for", product.surface], [PackageCheck, "Coverage", product.coverage], [Truck, "Drying", product.dryTime]].map(([Icon, label, value]) => {
                const DetailIcon = Icon as typeof Droplets;
                return (
                  <div key={String(label)} className="border-t border-white/15 pt-4 sm:pt-5">
                    <DetailIcon size={18} className="mb-3 text-[#d71920] sm:mb-4" />
                    <p className="text-[9px] font-bold uppercase tracking-[.14em] text-white/35">{String(label)}</p>
                    <p className="mt-2 text-xs leading-5 text-white/80">{String(value)}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 grid border-y border-white/15 sm:mt-10">
              {[
                ["Surface preparation", "Remove loose material, dust, grease, chalk and fungus. Repair defects and allow new plaster to cure fully before priming."],
                ["Application", "Stir thoroughly. Apply evenly by brush, roller or suitable spray equipment. Use the recommended primer and observe recoat times."],
                ["Safety & storage", "Keep away from children and food. Ensure ventilation, wear suitable protection, keep upright in a cool dry place and never discharge into drains."],
              ].map(([title, content]) => (
                <details key={title} className="group border-b border-white/15 last:border-0">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[11px] font-bold uppercase tracking-[.1em] sm:py-5 sm:text-xs">
                    {title}
                    <ChevronDown size={16} className="shrink-0 transition group-open:rotate-180" />
                  </summary>
                  <p className="max-w-2xl pb-5 text-sm leading-6 text-white/55 sm:pb-6">{content}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="site-container scroll-mt-28 py-14 sm:scroll-mt-40 sm:py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-12">
          <div>
            <p className="eyebrow">Real project results</p>
            <h2 className="section-title mt-4">Customer<br />reviews.</h2>
            <div className="mt-6 flex items-end gap-4 sm:mt-7">
              <span className="font-display text-5xl sm:text-6xl">{product.rating.toFixed(1)}</span>
              <div className="pb-1">
                <span className="flex text-[#bf902a]">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={17} fill="currentColor" />)}</span>
                <p className="mt-1 text-[11px] text-black/40">Based on {product.reviewCount} reviews</p>
              </div>
            </div>
            <form action={reviewAction} className="mt-8 rounded-2xl bg-[#f0eee7] p-4 sm:mt-9 sm:p-6">
              <p className="font-display text-2xl">Share your result</p>
              <input type="hidden" name="productId" value={product.id} />
              <input type="hidden" name="slug" value={product.slug} />
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input name="author" required placeholder="Your name" className="form-field" />
                <input name="location" required placeholder="Karachi area" className="form-field" />
              </div>
              <select name="rating" className="form-field mt-3" defaultValue="5">
                <option value="5">5 — Excellent</option>
                <option value="4">4 — Very good</option>
                <option value="3">3 — Good</option>
                <option value="2">2 — Fair</option>
                <option value="1">1 — Poor</option>
              </select>
              <input name="title" required placeholder="Review title" className="form-field mt-3" />
              <textarea name="body" required minLength={20} placeholder="Tell us about your surface, shade and result..." className="form-field mt-3" />
              <button className="button-dark mt-3 w-full">Submit review</button>
            </form>
          </div>

          <div className="divide-y divide-black/10 border-t border-black/10">
            {product.reviews.length ? product.reviews.map((review) => (
              <article key={review.id} className="py-6 sm:py-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex text-[#bf902a]">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={13} fill={star <= review.rating ? "currentColor" : "none"} />)}</div>
                  <time className="text-[10px] text-black/35">{formatDate(review.createdAt)}</time>
                </div>
                <h3 className="mt-3 font-sans text-base font-bold sm:mt-4">{review.title}</h3>
                <p className="mt-3 text-sm leading-6 text-black/55">{review.body}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[.1em] sm:mt-5">
                  <span>{review.author} · {review.location}</span>
                  {review.verified && (
                    <>
                      <span className="rounded-full bg-[#d71920] p-0.5 text-white"><Check size={12} /></span>
                      <span className="text-[#d71920]">Verified buyer</span>
                    </>
                  )}
                </div>
              </article>
            )) : (
              <div className="py-12 sm:py-14">
                <p className="font-display text-3xl">Be the first to review this finish.</p>
                <p className="mt-3 text-sm text-black/45">Your experience helps homeowners and professionals choose with confidence.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
