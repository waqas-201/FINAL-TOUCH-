import { db } from "@/db";
import { products, reviews, type Product, type ProductShade, type Review } from "@/db/schema";
import { seedProducts, seedReviews } from "@/db/seed-data";
import { asc, desc, eq, inArray, sql } from "drizzle-orm";

export type CatalogProduct = Product & {
  rating: number;
  reviewCount: number;
  shadeCount: number;
  availableStock: number;
};

let seedPromise: Promise<void> | null = null;

function normalizeProduct(product: typeof seedProducts[number]): typeof seedProducts[number] {
  const shades = product.shades ?? [];
  const colors = product.colors?.length ? product.colors : shades.map((shade) => `${shade.name} ${shade.code}`);
  const stock = product.stock || shades.reduce((sum, shade) => sum + shade.stock, 0) || 0;
  return {
    ...product,
    collection: product.collection || "Professional Range",
    colors,
    shades,
    stock,
    gallery: product.gallery || [],
  };
}

export async function ensureSeeded() {
  if (!seedPromise) {
    seedPromise = (async () => {
      const values = seedProducts.map(normalizeProduct);
      for (const product of values) {
        await db.insert(products).values(product).onConflictDoUpdate({
          target: products.slug,
          set: {
            name: product.name,
            sku: product.sku,
            brand: product.brand,
            category: product.category,
            collection: product.collection,
            shortDescription: product.shortDescription,
            description: product.description,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            image: product.image,
            gallery: product.gallery,
            sizes: product.sizes,
            colors: product.colors,
            shades: product.shades,
            finish: product.finish,
            surface: product.surface,
            coverage: product.coverage,
            dryTime: product.dryTime,
            stock: product.stock,
            featured: product.featured,
            bestseller: product.bestseller,
            active: product.active,
            updatedAt: new Date(),
          },
        });
      }

      const [{ count: reviewTotal }] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(reviews);

      if (reviewTotal === 0) {
        const rows = await db
          .select({ id: products.id, slug: products.slug })
          .from(products)
          .where(inArray(products.slug, seedReviews.map((review) => review.slug)));
        const ids = new Map(rows.map((row) => [row.slug, row.id]));
        const reviewValues = seedReviews.flatMap((review) => {
          const productId = ids.get(review.slug);
          if (!productId) return [];
          return [{
            productId,
            author: review.author,
            location: review.location,
            rating: review.rating,
            title: review.title,
            body: review.body,
            verified: true,
            createdAt: new Date(Date.now() - review.daysAgo * 86_400_000),
          }];
        });
        if (reviewValues.length) await db.insert(reviews).values(reviewValues);
      }
    })().catch((error) => {
      seedPromise = null;
      throw error;
    });
  }
  return seedPromise;
}

function availableStock(product: Product) {
  if (product.shades?.length) return product.shades.reduce((sum, shade) => sum + shade.stock, 0);
  return product.stock;
}

function withRatings(items: Product[], productReviews: Review[]): CatalogProduct[] {
  const grouped = new Map<number, Review[]>();
  for (const review of productReviews) {
    grouped.set(review.productId, [...(grouped.get(review.productId) ?? []), review]);
  }
  return items.map((item) => {
    const entries = grouped.get(item.id) ?? [];
    const rating = entries.length
      ? entries.reduce((sum, review) => sum + review.rating, 0) / entries.length
      : item.bestseller
        ? 4.8
        : 4.6;
    return {
      ...item,
      rating,
      reviewCount: entries.length || (item.bestseller ? 18 : 7),
      shadeCount: item.shades?.length || item.colors?.length || 0,
      availableStock: availableStock(item),
    };
  });
}

export async function getCatalogProducts(options: { includeInactive?: boolean } = {}) {
  await ensureSeeded();
  const items = options.includeInactive
    ? await db.select().from(products).orderBy(desc(products.createdAt))
    : await db.select().from(products).where(eq(products.active, true)).orderBy(asc(products.id));
  const reviewRows = await db.select().from(reviews);
  return withRatings(items, reviewRows);
}

export async function getFeaturedProducts(limit = 8) {
  const items = await getCatalogProducts();
  return items
    .filter((product) => product.featured || product.bestseller)
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, limit);
}

export async function getProductBySlug(slug: string) {
  await ensureSeeded();
  const [item] = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  if (!item || !item.active) return null;
  const productReviews = await db
    .select()
    .from(reviews)
    .where(eq(reviews.productId, item.id))
    .orderBy(desc(reviews.createdAt));
  return {
    ...withRatings([item], productReviews)[0],
    reviews: productReviews,
  };
}

export async function getCatalogFacets() {
  const items = await getCatalogProducts();
  return {
    categories: [...new Set(items.map((item) => item.category))].sort(),
    brands: [...new Set(items.map((item) => item.brand))].sort(),
    finishes: [...new Set(items.map((item) => item.finish))].sort(),
    collections: [...new Set(items.map((item) => item.collection))].sort(),
  };
}

export async function getShadeDirectory() {
  const items = await getCatalogProducts();
  return items
    .filter((item) => item.shades.length > 0)
    .map((item) => ({
      productSlug: item.slug,
      productName: item.name,
      brand: item.brand,
      category: item.category,
      collection: item.collection,
      finish: item.finish,
      image: item.image,
      price: item.price,
      shades: item.shades as ProductShade[],
    }));
}
