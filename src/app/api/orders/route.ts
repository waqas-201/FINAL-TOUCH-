import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders, products, type OrderItem } from "@/db/schema";
import { inArray } from "drizzle-orm";
import { randomBytes } from "crypto";

function multiplier(size: string) {
  const value = size.toLowerCase();
  if (value.includes("20 kg") || value.includes("20 l") || value.includes("drum") || value.includes("16 l")) return 13.5;
  if (value.includes("5 kg")) return 4;
  if (value.includes("4 kg") || value.includes("4 l") || value.includes("gallon") || value.includes("3.64")) return 3.55;
  return 1;
}

export async function POST(request: Request) {
  try {
    const payload = await request.json() as {
      customer?: Record<string, unknown>;
      items?: Array<{ slug?: string; size?: string; color?: string; shadeCode?: string; shadeHex?: string; quantity?: number }>;
    };
    const customer = payload.customer ?? {};
    const requested = Array.isArray(payload.items) ? payload.items.slice(0, 50) : [];
    const required = ["name", "email", "phone", "address", "city", "paymentMethod"];
    if (!requested.length || required.some((key) => String(customer[key] ?? "").trim().length < 2)) {
      return NextResponse.json({ error: "Please complete all required checkout fields." }, { status: 400 });
    }
    if (String(customer.city).trim().toLowerCase() !== "karachi") {
      return NextResponse.json({ error: "Final Touch currently delivers within Karachi only." }, { status: 400 });
    }

    const slugs = [...new Set(requested.map((item) => String(item.slug ?? "")).filter(Boolean))];
    const catalog = await db.select().from(products).where(inArray(products.slug, slugs));
    const bySlug = new Map(catalog.filter((item) => item.active).map((item) => [item.slug, item]));
    const orderItems: OrderItem[] = requested.flatMap((entry) => {
      const product = bySlug.get(String(entry.slug));
      if (!product) return [];
      const size = product.sizes.includes(String(entry.size)) ? String(entry.size) : product.sizes[0] ?? "Standard";
      const shades = product.shades || [];
      const requestedColor = String(entry.color ?? "");
      const matchedShade = shades.find((shade) => `${shade.name} ${shade.code}` === requestedColor || shade.code === String(entry.shadeCode ?? "") || shade.name === requestedColor);
      const color = matchedShade ? `${matchedShade.name} ${matchedShade.code}` : product.colors.includes(requestedColor) ? requestedColor : product.colors[0] ?? "Standard";
      const quantity = Math.max(1, Math.min(99, Math.floor(Number(entry.quantity) || 1)));
      const price = Math.round(product.price * multiplier(size) / 10) * 10;
      return [{ slug: product.slug, name: product.name, image: product.image, price, size, color, shadeCode: matchedShade?.code || entry.shadeCode, shadeHex: matchedShade?.hex || entry.shadeHex, quantity }];
    });
    if (!orderItems.length) return NextResponse.json({ error: "Your cart products are no longer available." }, { status: 409 });

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 15000 ? 0 : 450;
    const orderNumber = `FT-${Date.now().toString(36).toUpperCase()}-${randomBytes(2).toString("hex").toUpperCase()}`;
    await db.insert(orders).values({
      orderNumber,
      customerName: String(customer.name).trim().slice(0, 120),
      email: String(customer.email).trim().slice(0, 180),
      phone: String(customer.phone).trim().slice(0, 40),
      address: `${String(customer.address).trim()}${customer.postalCode ? `, ${String(customer.postalCode).trim()}` : ""}`.slice(0, 1000),
      city: "Karachi",
      notes: String(customer.notes ?? "").trim().slice(0, 1000) || null,
      paymentMethod: String(customer.paymentMethod).trim().slice(0, 40),
      items: orderItems,
      subtotal,
      shipping,
      total: subtotal + shipping,
      status: "New",
    });
    return NextResponse.json({ orderNumber }, { status: 201 });
  } catch (error) {
    console.error("Order creation failed", error);
    return NextResponse.json({ error: "We could not place your order. Please try again." }, { status: 500 });
  }
}
