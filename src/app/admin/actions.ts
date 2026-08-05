"use server";

import { db } from "@/db";
import { orders, products, type ProductShade } from "@/db/schema";
import { isAdmin, destroyAdminSession } from "@/lib/admin-auth";
import { slugify } from "@/lib/format";
import { eq } from "drizzle-orm";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function text(form: FormData, key: string) { return String(form.get(key) ?? "").trim(); }
function list(value: string) { return value.split(/[,\n]/).map((item) => item.trim()).filter(Boolean); }
function parseShades(value: string): ProductShade[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const [name, code, hex, stock] = line.split("|").map((part) => part.trim());
      if (!name) return null;
      return {
        name,
        code: code || `SH-${index + 1}`,
        hex: hex || "#c8b79d",
        stock: Math.max(0, Math.round(Number(stock) || 0)),
      } satisfies ProductShade;
    })
    .filter((shade): shade is ProductShade => Boolean(shade));
}

async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

async function saveUpload(formData: FormData) {
  const file = formData.get("imageFile");
  if (!(file instanceof File) || file.size === 0) return null;
  if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) throw new Error("Upload must be an image under 5MB.");
  const extensions: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" };
  const extension = extensions[file.type];
  if (!extension) throw new Error("Use JPG, PNG, WEBP or GIF images.");
  const directory = join(process.cwd(), "public", "uploads");
  await mkdir(directory, { recursive: true });
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;
  await writeFile(join(directory, filename), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${filename}`;
}

export async function saveProduct(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const name = text(formData, "name");
  const price = Math.max(0, Math.round(Number(formData.get("price"))));
  const upload = await saveUpload(formData);
  const image = upload || text(formData, "existingImage") || text(formData, "imageUrl");
  if (!name || !price || !image) throw new Error("Name, price and product image are required.");

  const shades = parseShades(text(formData, "shades"));
  const colors = list(text(formData, "colors"));
  const stockFromShades = shades.reduce((sum, shade) => sum + shade.stock, 0);
  const values = {
    name,
    slug: slugify(text(formData, "slug") || name),
    sku: text(formData, "sku") || `FT-${Date.now().toString().slice(-6)}`,
    brand: text(formData, "brand") || "Final Touch",
    category: text(formData, "category") || "Interior Paints",
    collection: text(formData, "collection") || "Professional Range",
    shortDescription: text(formData, "shortDescription"),
    description: text(formData, "description") || text(formData, "shortDescription"),
    price,
    compareAtPrice: Number(formData.get("compareAtPrice")) > price ? Math.round(Number(formData.get("compareAtPrice"))) : null,
    image,
    gallery: list(text(formData, "gallery")),
    sizes: list(text(formData, "sizes")),
    colors: colors.length ? colors : shades.map((shade) => `${shade.name} ${shade.code}`),
    shades,
    finish: text(formData, "finish") || "Matt",
    surface: text(formData, "surface") || "Masonry and plaster",
    coverage: text(formData, "coverage") || "See technical data sheet",
    dryTime: text(formData, "dryTime") || "See product label",
    stock: Math.max(0, Math.round(Number(formData.get("stock")) || stockFromShades || 0)),
    featured: formData.get("featured") === "on",
    bestseller: formData.get("bestseller") === "on",
    active: formData.get("active") === "on",
    updatedAt: new Date(),
  };

  if (Number.isInteger(id) && id > 0) await db.update(products).set(values).where(eq(products.id, id));
  else await db.insert(products).values(values);
  revalidatePath("/"); revalidatePath("/shop"); revalidatePath("/shades"); revalidatePath("/admin");
  redirect("/admin?saved=1");
}

export async function toggleProduct(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const active = formData.get("active") === "true";
  if (Number.isInteger(id)) await db.update(products).set({ active, updatedAt: new Date() }).where(eq(products.id, id));
  revalidatePath("/shop"); revalidatePath("/admin");
}

export async function updateOrderStatus(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const allowed = ["New", "Confirmed", "Packed", "Dispatched", "Delivered", "Cancelled"];
  const status = text(formData, "status");
  if (Number.isInteger(id) && allowed.includes(status)) await db.update(orders).set({ status }).where(eq(orders.id, id));
  revalidatePath("/admin");
}

export async function logoutAdmin() {
  await destroyAdminSession();
  redirect("/admin/login");
}
