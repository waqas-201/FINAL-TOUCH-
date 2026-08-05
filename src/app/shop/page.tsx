import type { Metadata } from "next";
import Link from "next/link";
import { getCatalogFacets, getCatalogProducts } from "@/lib/catalog";
import { ShopGrid } from "@/components/shop-grid";

export const metadata: Metadata = {
  title: "Professional Paint Catalogue",
  description: "Browse the complete Final Touch catalogue with full shade cards and live Karachi stock.",
};
export const dynamic = "force-dynamic";

type Search = Promise<{ category?: string; brand?: string; q?: string; collection?: string; view?: string }>;

export default async function ShopPage({ searchParams }: { searchParams: Search }) {
  const [products, facets, initial] = await Promise.all([getCatalogProducts(), getCatalogFacets(), searchParams]);
  const shadeTotal = products.reduce((sum, product) => sum + product.shadeCount, 0);
  const stockTotal = products.reduce((sum, product) => sum + product.availableStock, 0);

  return (
    <>
      <section className="bg-[#f4f1ee] py-14 sm:py-20">
        <div className="site-container grid items-end gap-8 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="eyebrow">Professional catalogue</p>
            <h1 className="section-title mt-4 max-w-4xl">Full-range systems for every surface.</h1>
          </div>
          <div className="grid grid-cols-3 gap-3 rounded-[24px] bg-white p-5 shadow-sm">
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-black/35">Products</p><p className="mt-1 font-display text-3xl">{products.length}</p></div>
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-black/35">Shades</p><p className="mt-1 font-display text-3xl">{shadeTotal}</p></div>
            <div><p className="text-[10px] font-bold uppercase tracking-wider text-black/35">Stock units</p><p className="mt-1 font-display text-3xl">{stockTotal}</p></div>
          </div>
        </div>
        <div className="site-container mt-8 flex flex-wrap gap-3">
          {facets.categories.map((category) => (
            <Link key={category} href={`/shop?category=${encodeURIComponent(category)}`} className="rounded-full border border-black/10 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-black/60 transition hover:border-[#d71920] hover:text-[#d71920]">{category}</Link>
          ))}
          <Link href="/shades" className="rounded-full bg-[#101010] px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white">Shade library</Link>
        </div>
      </section>
      <div className="site-container py-6 text-[10px] font-semibold uppercase tracking-[.1em] text-black/40"><Link href="/">Home</Link><span className="mx-2">/</span><span className="text-[#101010]">Shop</span></div>
      <ShopGrid
        products={products}
        categories={facets.categories}
        brands={facets.brands}
        finishes={facets.finishes}
        collections={facets.collections}
        initial={initial}
      />
    </>
  );
}
