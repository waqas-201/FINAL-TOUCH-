import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export type ProductShade = {
  name: string;
  code: string;
  hex: string;
  stock: number;
};

export type OrderItem = {
  slug: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  shadeCode?: string;
  shadeHex?: string;
  quantity: number;
};

export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 180 }).notNull(),
    slug: varchar("slug", { length: 180 }).notNull().unique(),
    sku: varchar("sku", { length: 60 }).notNull(),
    brand: varchar("brand", { length: 80 }).notNull(),
    category: varchar("category", { length: 80 }).notNull(),
    collection: varchar("collection", { length: 100 }).notNull().default("Professional Range"),
    shortDescription: text("short_description").notNull(),
    description: text("description").notNull(),
    price: integer("price").notNull(),
    compareAtPrice: integer("compare_at_price"),
    image: text("image").notNull(),
    gallery: jsonb("gallery").$type<string[]>().notNull().default([]),
    sizes: jsonb("sizes").$type<string[]>().notNull().default([]),
    colors: jsonb("colors").$type<string[]>().notNull().default([]),
    shades: jsonb("shades").$type<ProductShade[]>().notNull().default([]),
    finish: varchar("finish", { length: 80 }).notNull(),
    surface: varchar("surface", { length: 120 }).notNull(),
    coverage: varchar("coverage", { length: 120 }).notNull(),
    dryTime: varchar("dry_time", { length: 120 }).notNull(),
    stock: integer("stock").notNull().default(0),
    featured: boolean("featured").notNull().default(false),
    bestseller: boolean("bestseller").notNull().default(false),
    active: boolean("active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("products_category_idx").on(table.category),
    index("products_brand_idx").on(table.brand),
    index("products_collection_idx").on(table.collection),
  ],
);

export const reviews = pgTable(
  "reviews",
  {
    id: serial("id").primaryKey(),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    author: varchar("author", { length: 100 }).notNull(),
    location: varchar("location", { length: 100 }).notNull(),
    rating: integer("rating").notNull(),
    title: varchar("title", { length: 160 }).notNull(),
    body: text("body").notNull(),
    verified: boolean("verified").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("reviews_product_idx").on(table.productId)],
);

export const orders = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    orderNumber: varchar("order_number", { length: 40 }).notNull().unique(),
    customerName: varchar("customer_name", { length: 120 }).notNull(),
    email: varchar("email", { length: 180 }).notNull(),
    phone: varchar("phone", { length: 40 }).notNull(),
    address: text("address").notNull(),
    city: varchar("city", { length: 80 }).notNull(),
    notes: text("notes"),
    paymentMethod: varchar("payment_method", { length: 40 }).notNull(),
    items: jsonb("items").$type<OrderItem[]>().notNull(),
    subtotal: integer("subtotal").notNull(),
    shipping: integer("shipping").notNull(),
    total: integer("total").notNull(),
    status: varchar("status", { length: 40 }).notNull().default("New"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("orders_status_idx").on(table.status)],
);

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Review = typeof reviews.$inferSelect;
export type Order = typeof orders.$inferSelect;
