"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ChevronDown, LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { CatalogProduct } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { ProductCard } from "./product-card";

type Props = {
  products: CatalogProduct[];
  categories: string[];
  brands: string[];
  finishes: string[];
  collections: string[];
  initial: { category?: string; brand?: string; q?: string; collection?: string; view?: string };
};

export function ShopGrid({ products, categories, brands, finishes, collections, initial }: Props) {
  const ceiling = Math.ceil(Math.max(...products.map((product) => product.price), 1000) / 1000) * 1000;
  const [category, setCategory] = useState(initial.category ?? "All");
  const [brand, setBrand] = useState(initial.brand ?? "All");
  const [finish, setFinish] = useState("All");
  const [collection, setCollection] = useState(initial.collection ?? "All");
  const [query, setQuery] = useState(initial.q ?? "");
  const [maxPrice, setMaxPrice] = useState(ceiling);
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState<"grid" | "list">(initial.view === "list" ? "list" : "grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    if (!filtersOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [filtersOpen]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const list = products.filter((product) =>
      (category === "All" || product.category === category) &&
      (brand === "All" || product.brand === brand) &&
      (finish === "All" || product.finish === finish) &&
      (collection === "All" || product.collection === collection) &&
      product.price <= maxPrice &&
      (!q || `${product.name} ${product.brand} ${product.category} ${product.collection} ${product.shortDescription} ${product.colors.join(" ")}`.toLowerCase().includes(q)),
    );
    return list.sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "stock") return b.availableStock - a.availableStock;
      return Number(b.featured) - Number(a.featured) || Number(b.bestseller) - Number(a.bestseller) || a.id - b.id;
    });
  }, [products, category, brand, finish, collection, query, maxPrice, sort]);

  const activeCount = [category !== "All", brand !== "All", finish !== "All", collection !== "All", maxPrice < ceiling, Boolean(query)].filter(Boolean).length;
  function clear() { setCategory("All"); setBrand("All"); setFinish("All"); setCollection("All"); setMaxPrice(ceiling); setQuery(""); }

  const filterContent = (
    <>
      <FilterGroup label="Category" values={categories} selected={category} onSelect={setCategory} />
      <FilterGroup label="Collection" values={collections} selected={collection} onSelect={setCollection} />
      <FilterGroup label="Brand" values={brands} selected={brand} onSelect={setBrand} />
      <FilterGroup label="Finish" values={finishes} selected={finish} onSelect={setFinish} />
      <div className="border-b border-black/10 py-6">
        <div className="mb-4 flex items-center justify-between"><p className="text-[10px] font-extrabold uppercase tracking-[.14em]">Price</p><span className="text-xs text-black/45">Up to PKR {maxPrice.toLocaleString()}</span></div>
        <input type="range" min="500" max={ceiling} step="500" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="w-full accent-[#d71920]" />
        <div className="mt-2 flex justify-between text-[10px] text-black/35"><span>PKR 500</span><span>PKR {ceiling.toLocaleString()}</span></div>
      </div>
    </>
  );

  return (
    <section className="site-container pb-24">
      <div className="mb-7 flex flex-col gap-4 border-b border-black/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={() => setFiltersOpen(true)} className="button-outline h-11 min-h-11 px-4 lg:hidden"><SlidersHorizontal size={15} /> Filters {activeCount > 0 && <span className="grid size-5 place-items-center rounded-full bg-[#101010] text-[9px] text-white">{activeCount}</span>}</button>
          <p className="text-xs text-black/50"><span className="font-bold text-[#101010]">{filtered.length}</span> products · professional catalogue</p>
          <div className="inline-flex rounded-full border border-black/12 bg-white p-1">
            <button type="button" onClick={() => setView("grid")} className={`grid size-9 place-items-center rounded-full ${view === "grid" ? "bg-[#101010] text-white" : "text-black/45"}`} aria-label="Grid view"><LayoutGrid size={15} /></button>
            <button type="button" onClick={() => setView("list")} className={`grid size-9 place-items-center rounded-full ${view === "list" ? "bg-[#101010] text-white" : "text-black/45"}`} aria-label="List view"><List size={15} /></button>
          </div>
        </div>
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <label htmlFor="shop-search" className="sr-only">Search products</label>
          <input id="shop-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products or shades" className="h-11 min-w-0 flex-1 rounded-full border border-black/12 bg-white px-4 text-xs outline-none focus:border-[#d71920] sm:w-64 sm:px-5" />
          <div className="relative w-[138px] shrink-0 sm:w-auto">
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="h-11 w-full appearance-none rounded-full border border-black/12 bg-white pl-4 pr-9 text-[11px] font-semibold outline-none sm:pl-5 sm:pr-10 sm:text-xs">
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="rating">Top rated</option>
              <option value="stock">Highest stock</option>
              <option value="name">Name: A–Z</option>
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-3 top-3.5" />
          </div>
        </div>
      </div>

      <div className="grid gap-9 lg:grid-cols-[220px_1fr] xl:grid-cols-[245px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-[150px]">
            <div className="flex items-center justify-between border-b border-black/10 pb-4"><h2 className="font-display text-2xl">Refine by</h2>{activeCount > 0 && <button onClick={clear} className="text-[10px] font-bold uppercase tracking-wider underline">Clear</button>}</div>
            {filterContent}
            <Link href="/shades" className="mt-6 inline-flex text-[11px] font-bold uppercase tracking-wider text-[#d71920] underline underline-offset-4">Browse full shade library</Link>
          </div>
        </aside>

        <div>
          {filtered.length > 0 ? (
            view === "grid" ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                {filtered.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 4} />)}
              </div>
            ) : (
              <div className="overflow-hidden rounded-[24px] border border-black/10 bg-white">
                <div className="hidden grid-cols-[1.4fr_.7fr_.7fr_.5fr_.5fr] gap-4 border-b border-black/10 bg-[#f7f5f0] px-5 py-3 text-[10px] font-bold uppercase tracking-[.12em] text-black/40 md:grid">
                  <span>Product</span><span>Collection</span><span>Finish / shades</span><span>Stock</span><span className="text-right">Price</span>
                </div>
                {filtered.map((product) => (
                  <Link key={product.id} href={`/products/${product.slug}`} className="grid gap-3 border-b border-black/8 px-4 py-4 transition hover:bg-[#faf8f4] md:grid-cols-[1.4fr_.7fr_.7fr_.5fr_.5fr] md:items-center md:gap-4 md:px-5">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[#f0eee8]"><Image src={product.image} alt="" fill sizes="64px" className="object-contain p-1.5" /></div>
                      <div className="min-w-0">
                        <p className="truncate text-[10px] font-bold uppercase tracking-wider text-[#d71920]">{product.brand}</p>
                        <h3 className="mt-1 line-clamp-2 text-sm font-bold text-[#101010]">{product.name}</h3>
                        <p className="mt-1 text-[11px] text-black/40 md:hidden">{product.collection} · {product.shadeCount || 0} shades</p>
                      </div>
                    </div>
                    <div className="hidden text-xs text-black/55 md:block">{product.collection}</div>
                    <div className="hidden md:block">
                      <p className="text-xs font-semibold text-[#101010]">{product.finish}</p>
                      <div className="mt-2 flex -space-x-1">
                        {(product.shades || []).slice(0, 6).map((shade) => <span key={`${product.id}-${shade.code}`} className="size-4 rounded-full border border-white shadow-sm" style={{ backgroundColor: shade.hex }} />)}
                      </div>
                      <p className="mt-1 text-[10px] text-black/40">{product.shadeCount} shades</p>
                    </div>
                    <div className="text-xs font-semibold text-black/60">{product.availableStock} units</div>
                    <div className="text-left text-sm font-bold text-[#101010] md:text-right">{formatPrice(product.price)}</div>
                  </Link>
                ))}
              </div>
            )
          ) : (
            <div className="grid min-h-[440px] place-items-center rounded-3xl bg-[#f0eee6] p-8 text-center">
              <div>
                <p className="eyebrow">No exact match</p>
                <h2 className="mt-3 font-display text-4xl">Try a broader finish</h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-black/50">Clear one or more filters to discover the closest product for your project.</p>
                <button onClick={clear} className="button-dark mt-6">Clear all filters</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`fixed inset-0 z-[120] lg:hidden ${filtersOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <button className={`absolute inset-0 bg-black/50 transition-opacity ${filtersOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setFiltersOpen(false)} aria-label="Close filters" />
        <aside className={`absolute bottom-0 left-0 max-h-[90dvh] w-full overscroll-contain overflow-y-auto rounded-t-[28px] bg-[#fbfaf6] px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-5 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:px-6 ${filtersOpen ? "translate-y-0" : "translate-y-full"}`}>
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-[#fbfaf6] pb-4"><div><p className="eyebrow">Shop smarter</p><h2 className="font-display text-3xl">Filters</h2></div><button className="icon-button" onClick={() => setFiltersOpen(false)}><X size={20} /></button></div>
          {filterContent}
          <div className="sticky bottom-0 flex gap-3 bg-[#fbfaf6] pt-5"><button onClick={clear} className="button-outline flex-1">Clear</button><button onClick={() => setFiltersOpen(false)} className="button-dark flex-[2]">Show {filtered.length} products</button></div>
        </aside>
      </div>
    </section>
  );
}

function FilterGroup({ label, values, selected, onSelect }: { label: string; values: string[]; selected: string; onSelect: (value: string) => void }) {
  return (
    <div className="border-b border-black/10 py-6">
      <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[.14em]">{label}</p>
      <div className="grid gap-2.5">
        {["All", ...values].map((value) => (
          <button key={value} onClick={() => onSelect(value)} className={`flex items-center gap-3 text-left text-xs ${selected === value ? "font-bold text-[#101010]" : "text-black/50 hover:text-[#101010]"}`}>
            <span className={`grid size-4 place-items-center rounded border ${selected === value ? "border-[#d71920] bg-[#d71920] text-white" : "border-black/20"}`}>{selected === value && <Check size={11} strokeWidth={3} />}</span>{value}
          </button>
        ))}
      </div>
    </div>
  );
}
