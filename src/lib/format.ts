import type { ProductShade } from "@/db/schema";

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const shadeMap: Record<string, string> = {
  white: "#f5f5f0",
  ash: "#e4e1d8",
  magnolia: "#eee4cf",
  moon: "#e5e3dc",
  linen: "#e7d7b8",
  cream: "#f0e6c8",
  ivory: "#f3ead0",
  beige: "#d8c3a1",
  sand: "#d2b48c",
  stone: "#c2b29a",
  almond: "#d9c39d",
  cameo: "#e8d5c0",
  peach: "#efc3a5",
  coral: "#e39a86",
  pink: "#e2a0ad",
  rose: "#d89293",
  lilac: "#c7b7d1",
  lavender: "#d7cfe3",
  violet: "#8d6b9d",
  purple: "#6f4c7a",
  sky: "#9ec5d8",
  azure: "#6fa8c9",
  ocean: "#3f7f95",
  admiral: "#2a4f73",
  navy: "#243b55",
  blue: "#6689a4",
  mint: "#b9d5c2",
  sage: "#9aaa8d",
  jade: "#5f8f72",
  olive: "#7b8062",
  forest: "#355e45",
  green: "#6f8f6a",
  yellow: "#e4c85a",
  gold: "#c9a227",
  mustard: "#c9a03a",
  orange: "#d9813a",
  terracotta: "#c06a45",
  brick: "#a84d3b",
  red: "#b03a2e",
  brown: "#6f4938",
  walnut: "#5c4030",
  chocolate: "#4a2f24",
  charcoal: "#4a4a4a",
  smoke: "#8a8a86",
  grey: "#8d8f8c",
  gray: "#8d8f8c",
  black: "#222222",
  silver: "#c0c4c7",
  pearl: "#ebe6dc",
  champagne: "#e6d5b8",
  clay: "#b08a6c",
  spice: "#a0674b",
  tile: "#9d4c3d",
  clear: "#eee7d7",
  oak: "#b88b5a",
};

export function shadeColor(name: string, shades?: ProductShade[]) {
  if (shades?.length) {
    const match = shades.find((shade) => {
      const full = `${shade.name} ${shade.code}`.toLowerCase();
      return full === name.toLowerCase() || shade.name.toLowerCase() === name.toLowerCase() || shade.code === name;
    });
    if (match) return match.hex;
  }
  const lower = name.toLowerCase();
  const key = Object.keys(shadeMap).find((shade) => lower.includes(shade));
  return key ? shadeMap[key] : "#c8b79d";
}

export function shadeLabel(shade: ProductShade) {
  return `${shade.name} ${shade.code}`.trim();
}

export function stockLabel(stock: number) {
  if (stock <= 0) return "Out of stock";
  if (stock <= 8) return "Low stock";
  if (stock <= 20) return "Limited stock";
  return "In stock";
}
