import type { Metadata } from "next";
import Link from "next/link";
import { getShadeDirectory } from "@/lib/catalog";
import { formatPrice, shadeLabel, stockLabel } from "@/lib/format";

export const metadata: Metadata = {
  title: "Shade Library",
  description: "Explore the complete Final Touch shade cards with live Karachi stock by colour.",
};
export const dynamic = "force-dynamic";

export default async function ShadesPage() {
  const directory = await getShadeDirectory();
  const totalShades = directory.reduce((sum, item) => sum + item.shades.length, 0);

  return (
    <>
      <section className="bg-[#101010] py-16 text-white sm:py-20">
        <div className="site-container grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#ff4147]">Celebrate Colour</p>
            <h1 className="mt-4 max-w-3xl font-display text-[clamp(3rem,7vw,6rem)] leading-[.9] tracking-[-.05em]">The complete shade library.</h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-white/60">Browse every Final Touch decorative shade card, check live stock, then open the product to select pack size and order for Karachi delivery.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 rounded-[24px] bg-white/5 p-6">
            <div><p className="text-[10px] uppercase tracking-wider text-white/35">Shade cards</p><p className="mt-1 font-display text-4xl">{directory.length}</p></div>
            <div><p className="text-[10px] uppercase tracking-wider text-white/35">Total shades</p><p className="mt-1 font-display text-4xl">{totalShades}</p></div>
          </div>
        </div>
      </section>

      <section className="site-container space-y-10 py-14 sm:py-20">
        {directory.map((entry) => (
          <article key={entry.productSlug} className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-black/8 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#d71920]">{entry.brand} · {entry.collection}</p>
                <h2 className="mt-2 font-display text-3xl tracking-[-.03em]">{entry.productName}</h2>
                <p className="mt-1 text-xs text-black/45">{entry.category} · {entry.finish} · {entry.shades.length} shades · from {formatPrice(entry.price)}</p>
              </div>
              <Link href={`/products/${entry.productSlug}`} className="button-dark">Select shade & pack</Link>
            </div>
            <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:p-6">
              {entry.shades.map((shade) => (
                <Link
                  key={`${entry.productSlug}-${shade.code}-${shade.name}`}
                  href={`/products/${entry.productSlug}`}
                  className="rounded-2xl border border-black/8 p-3 transition hover:-translate-y-0.5 hover:border-[#d71920]/40 hover:shadow-md"
                >
                  <div className="aspect-[1.3] rounded-xl border border-black/5 shadow-inner" style={{ backgroundColor: shade.hex }} />
                  <p className="mt-3 truncate text-xs font-bold text-[#101010]">{shade.name}</p>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-black/40">{shade.code}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${shade.stock <= 0 ? "bg-black/5 text-black/35" : shade.stock <= 8 ? "bg-[#fff0f0] text-[#b11218]" : "bg-[#f3f3f0] text-black/50"}`}>{stockLabel(shade.stock)}</span>
                  </div>
                  <p className="mt-1 text-[10px] text-black/35">{shade.stock} units · {shadeLabel(shade)}</p>
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
