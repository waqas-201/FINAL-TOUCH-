import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { db } from "@/db";
import { products } from "@/db/schema";
import { AdminProductForm } from "@/components/admin-product-form";
import { isAdmin } from "@/lib/admin-auth";

export const metadata: Metadata = { title: "Edit product", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

export default async function EditProductPage({ params }: { params: Params }) {
  if (!(await isAdmin())) redirect("/admin/login");
  const { id } = await params;
  const [product] = await db.select().from(products).where(eq(products.id, Number(id))).limit(1);
  if (!product) notFound();
  return <section className="min-h-screen bg-[#f1f0eb] py-10"><div className="mx-auto w-[min(100%-2rem,980px)]"><Link href="/admin" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-black/45"><ArrowLeft size={13} /> Back to dashboard</Link><div className="mt-6 rounded-[26px] bg-white p-6 sm:p-10"><p className="eyebrow">Catalog editor · {product.sku}</p><h1 className="mt-3 font-display text-4xl tracking-[-.04em] sm:text-5xl">Edit product.</h1><p className="mt-3 text-sm text-black/45">Changes publish to the live storefront after saving.</p><div className="mt-8 border-t border-black/10 pt-8"><AdminProductForm product={product} /></div></div></div></section>;
}
