import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { ProductCard } from "@/components/product-card";
import { getCatalogProducts, getProductBySlug } from "@/lib/catalog";
import { addReview } from "./actions";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return { title: product.name, description: product.shortDescription, openGraph: { images: [product.image] } };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const [product, catalog] = await Promise.all([getProductBySlug(slug), getCatalogProducts()]);
  if (!product) notFound();
  const related = catalog.filter((item) => item.id !== product.id && (item.category === product.category || item.brand === product.brand)).slice(0, 4);

  return (
    <>
      <nav className="site-container flex items-center gap-2 overflow-hidden py-6 text-[9px] font-bold uppercase tracking-[.11em] text-black/38">
        <Link href="/">Home</Link><span>/</span><Link href="/shop">Shop</Link><span>/</span><Link href={`/shop?category=${encodeURIComponent(product.category)}`}>{product.category}</Link><span>/</span><span className="truncate text-[#101010]">{product.name}</span>
      </nav>
      <ProductDetail product={product} reviewAction={addReview} />
      {related.length > 0 && <section className="bg-[#f0eee7] py-20 lg:py-24"><div className="site-container"><div className="mb-10 flex items-end justify-between"><div><p className="eyebrow">Complete your system</p><h2 className="section-title mt-4">Pairs well with.</h2></div><Link href="/shop" className="button-outline hidden sm:inline-flex">View all</Link></div><div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-4">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></div></section>}
    </>
  );
}
