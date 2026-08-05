"use server";

import { db } from "@/db";
import { reviews } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function addReview(formData: FormData) {
  const productId = Number(formData.get("productId"));
  const slug = String(formData.get("slug") ?? "");
  const author = String(formData.get("author") ?? "").trim().slice(0, 100);
  const location = String(formData.get("location") ?? "").trim().slice(0, 100);
  const title = String(formData.get("title") ?? "").trim().slice(0, 160);
  const body = String(formData.get("body") ?? "").trim().slice(0, 2000);
  const rating = Math.min(5, Math.max(1, Number(formData.get("rating"))));

  if (!Number.isInteger(productId) || !slug || !author || !location || !title || body.length < 20) return;
  await db.insert(reviews).values({ productId, author, location, title, body, rating, verified: false });
  revalidatePath(`/products/${slug}`);
}
