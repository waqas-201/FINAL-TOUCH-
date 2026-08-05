import type { NewProduct, ProductShade } from "./schema";
import shadeLibraries from "./shade-libraries.json";
type ShadeLib = Record<string, ProductShade[]>;
const libraries = shadeLibraries as ShadeLib;
const sizes = ["0.91 L (Quarter)", "3.64 L (Gallon)", "16 L (Drum)"];
function labels(slug: string) { return (libraries[slug] || []).map((shade) => `${shade.name} ${shade.code}`); }
function stockOf(slug: string) { return (libraries[slug] || []).reduce((sum, shade) => sum + shade.stock, 0); }
function product(input: NewProduct): NewProduct {
  const shades = input.shades?.length ? input.shades : [];
  const colors = input.colors?.length ? input.colors : shades.map((shade) => `${shade.name} ${shade.code}`);
  const stock = input.stock || shades.reduce((sum, shade) => sum + shade.stock, 0) || 0;
  return { ...input, collection: input.collection || "Professional Range", colors, shades, stock, gallery: input.gallery || [], compareAtPrice: input.compareAtPrice ?? null, featured: Boolean(input.featured), bestseller: Boolean(input.bestseller), active: input.active !== false };
}
export const seedProducts: NewProduct[] = [
product({
  name: "Final Touch Classic Luxury Silk Sheen Emulsion",
  slug: "final-touch-classic-luxury-silk-sheen-emulsion",
  sku: "FT-LSS-01",
  brand: "Final Touch",
  category: "Interior Paints",
  collection: "Final Touch Classic",
  price: 630,
  compareAtPrice: 700,
  image: "/images/products/final-touch-classic-luxury-silk-sheen-emulsion.jpg",
  gallery: [
  "/images/gallery/emulsion-room.jpg",
  "/images/gallery/emulsion-palette.jpg",
  "/images/gallery/emulsion-feature.jpg"
],
  sizes: [
  "0.91 L (Quarter)",
  "3.64 L (Gallon)",
  "16 L (Drum)"
],
  finish: "Silk sheen",
  surface: "Interior walls and ceilings",
  coverage: "12–14 m² per litre per coat",
  dryTime: "Touch dry 1 hour · Recoat 4–5 hours",
  shortDescription: "Washable luxury emulsion with soft sheen, anti-fungal protection and a full Celebrate Colour shade card.",
  description: "Final Touch Classic Luxury Silk Sheen is the hero interior finish for living rooms, bedrooms, halls and family spaces. The smooth washable film resists everyday marks, hides well and keeps colour clean in Karachi’s humid conditions. Choose from the complete silk-sheen shade library and finish over Final Touch Wall Primer for a refined professional result.",
  featured: true,
  bestseller: true,
  active: true,
  shades: libraries["final-touch-classic-luxury-silk-sheen-emulsion"],
  colors: labels("final-touch-classic-luxury-silk-sheen-emulsion"),
  stock: stockOf("final-touch-classic-luxury-silk-sheen-emulsion")
}),
product({
  name: "Final Touch Classic Water Based Matt Finish",
  slug: "final-touch-classic-water-based-matt-finish",
  sku: "FT-WBM-03",
  brand: "Final Touch",
  category: "Interior Paints",
  collection: "Final Touch Classic",
  price: 1215,
  compareAtPrice: 1350,
  image: "/images/products/final-touch-classic-water-based-matt-finish.jpg",
  gallery: [
  "/images/gallery/water-matt.jpg",
  "/images/gallery/water-matt-room.jpg",
  "/images/editorial/warm-room.jpg"
],
  sizes: [
  "0.91 L (Quarter)",
  "3.64 L (Gallon)",
  "16 L (Drum)"
],
  finish: "Velvet matt",
  surface: "Interior walls, ceilings and drywall",
  coverage: "12–14 m² per litre per coat",
  dryTime: "Touch dry 1 hour · Recoat 4–5 hours",
  shortDescription: "Rich non-reflective washable matt with superior hiding and a complete interior shade library.",
  description: "A contemporary velvet-matt emulsion designed for calm modern interiors. Excellent opacity helps cover old colours cleanly, while the low-sheen film keeps walls elegant under both daylight and evening lighting. Ideal for bedrooms, lounges and ceilings across Karachi homes.",
  featured: true,
  bestseller: true,
  active: true,
  shades: libraries["final-touch-classic-water-based-matt-finish"],
  colors: labels("final-touch-classic-water-based-matt-finish"),
  stock: stockOf("final-touch-classic-water-based-matt-finish")
}),
product({
  name: "Final Touch Classic Crystal Weather Sheath",
  slug: "final-touch-classic-crystal-weather-sheat",
  sku: "FT-CWS-02",
  brand: "Final Touch",
  category: "Exterior Paints",
  collection: "Final Touch Classic",
  price: 1125,
  compareAtPrice: 1250,
  image: "/images/products/final-touch-classic-crystal-weather-sheat.jpg",
  gallery: [
  "/images/gallery/weather-room.jpg",
  "/images/gallery/weather-palette.jpg",
  "/images/editorial/contractor.jpg"
],
  sizes: [
  "0.91 L (Quarter)",
  "3.64 L (Gallon)",
  "16 L (Drum)"
],
  finish: "Low sheen exterior",
  surface: "Exterior plaster, concrete and brickwork",
  coverage: "11–13 m² per litre per coat",
  dryTime: "Touch dry 45 minutes · Recoat 4 hours",
  shortDescription: "High-performance exterior acrylic with full Weather Sheath shade card for sun, rain and dust protection.",
  description: "Crystal Weather Sheath forms a flexible, breathable barrier against UV, monsoon rain, dirt pick-up and colour fade. The complete exterior shade library supports both classic villa combinations and contemporary facade schemes. Use with Final Touch Water Based Wall Primer for the full weather-protection system.",
  featured: true,
  bestseller: true,
  active: true,
  shades: libraries["final-touch-classic-crystal-weather-sheat"],
  colors: labels("final-touch-classic-crystal-weather-sheat"),
  stock: stockOf("final-touch-classic-crystal-weather-sheat")
}),
product({
  name: "Final Touch High Gloss Finish Enamel",
  slug: "final-touch-high-gloss-finish-enamel",
  sku: "FT-HGE-04",
  brand: "Final Touch",
  category: "Enamels",
  collection: "Final Touch Classic",
  price: 1260,
  compareAtPrice: 1400,
  image: "/images/products/final-touch-high-gloss-finish-enamel.jpg",
  gallery: [
  "/images/categories/metal.jpg",
  "/images/categories/wood.jpg"
],
  sizes: [
  "0.91 L (Quarter)",
  "3.64 L (Gallon)",
  "16 L (Drum)"
],
  finish: "High gloss",
  surface: "Wood, metal, doors, grills and trim",
  coverage: "13–15 m² per litre per coat",
  dryTime: "Touch dry 2–3 hours · Recoat 16 hours",
  shortDescription: "Hard-wearing mirror-gloss enamel with a complete wood-and-metal shade card.",
  description: "A premium alkyd gloss enamel for doors, windows, grills, furniture and architectural metalwork. Excellent flow and levelling create a sprayed-looking finish, while the full gloss shade library covers both architectural neutrals and bold statement colours.",
  featured: true,
  bestseller: true,
  active: true,
  shades: libraries["final-touch-high-gloss-finish-enamel"],
  colors: labels("final-touch-high-gloss-finish-enamel"),
  stock: stockOf("final-touch-high-gloss-finish-enamel")
}),
product({
  name: "Final Touch Matt Finish Enamel",
  slug: "final-touch-matt-finish-enamel",
  sku: "FT-MFE-05",
  brand: "Final Touch",
  category: "Enamels",
  collection: "Final Touch Classic",
  price: 1500,
  compareAtPrice: null,
  image: "/images/products/final-touch-matt-finish-enamel.jpg",
  gallery: [
  "/images/gallery/matt-room.jpg",
  "/images/gallery/matt-feature.jpg"
],
  sizes: [
  "0.91 L (Quarter)",
  "3.64 L (Gallon)",
  "16 L (Drum)"
],
  finish: "Matt enamel",
  surface: "Interior wood, metal and selected wall details",
  coverage: "12–14 m² per litre per coat",
  dryTime: "Touch dry 3 hours · Recoat 16 hours",
  shortDescription: "Sophisticated low-glare enamel with Pearl Glow richness and an extensive matt enamel shade card.",
  description: "Matt Finish Enamel delivers a refined low-sheen look for interior woodwork, metal details and designer feature surfaces. The broad shade library makes it ideal when doors, frames and wall accents need to match a coordinated interior scheme without high gloss.",
  featured: false,
  bestseller: true,
  active: true,
  shades: libraries["final-touch-matt-finish-enamel"],
  colors: labels("final-touch-matt-finish-enamel"),
  stock: stockOf("final-touch-matt-finish-enamel")
}),
product({
  name: "Final Touch Acrylic Filling Putty",
  slug: "final-touch-acrylic-fillng-putty",
  sku: "FT-AFP-06",
  brand: "Final Touch",
  category: "Putty & Preparation",
  collection: "Final Touch System",
  price: 495,
  compareAtPrice: 550,
  image: "/images/products/final-touch-acrylic-fillng-putty.jpg",
  gallery: [
  "/images/categories/base.jpg"
],
  sizes: [
  "0.91 L (Quarter)",
  "3.64 L (Gallon)",
  "16 L (Drum)"
],
  colors: [
  "White"
],
  shades: [
  {
    "name": "White",
    "code": "FT-P01",
    "hex": "#f7f4ec",
    "stock": 112
  }
],
  finish: "Smooth base",
  surface: "Plaster, cement and masonry",
  coverage: "1.5–2 m² per kg depending on surface",
  dryTime: "Sandable after 2–3 hours",
  shortDescription: "Fine acrylic filler for hairline cracks and a perfectly smooth paint-ready surface.",
  description: "Use before priming to level uneven plaster, fill hairline cracks and create a professional substrate for Final Touch emulsions and enamels. Easy to apply, sand and overcoat.",
  stock: 112,
  featured: false,
  bestseller: true,
  active: true
}),
product({
  name: "Final Touch Wall Primer Sealer",
  slug: "final-touch-wall-primer-sealer",
  sku: "FT-WPS-07",
  brand: "Final Touch",
  category: "Primers & Sealers",
  collection: "Final Touch System",
  price: 915,
  compareAtPrice: 1015,
  image: "/images/products/final-touch-wall-primer-sealer.png",
  gallery: [
  "/images/categories/base.jpg"
],
  sizes: [
  "0.91 L (Quarter)",
  "3.64 L (Gallon)",
  "16 L (Drum)"
],
  colors: [
  "White"
],
  shades: [
  {
    "name": "White",
    "code": "FT-PR01",
    "hex": "#f4f1e8",
    "stock": 76
  }
],
  finish: "Solvent primer",
  surface: "New and previously painted masonry",
  coverage: "14–16 m² per litre per coat",
  dryTime: "Touch dry 2–3 hours · Recoat 16 hours",
  shortDescription: "Alkali-resistant solvent primer that seals porous masonry and improves topcoat adhesion.",
  description: "An essential first coat for demanding masonry. Seals porosity, resists alkali burn and provides a stable base for Final Touch interior and exterior finishes.",
  stock: 76,
  featured: false,
  bestseller: false,
  active: true
}),
product({
  name: "Final Touch Water Based Wall Primer Sealer",
  slug: "final-touch-water-based-wall-primer-sealer",
  sku: "FT-WBP-08",
  brand: "Final Touch",
  category: "Primers & Sealers",
  collection: "Final Touch System",
  price: 855,
  compareAtPrice: 950,
  image: "/images/products/final-touch-water-based-wall-primer-sealer.jpg",
  gallery: [
  "/images/categories/base.jpg"
],
  sizes: [
  "0.91 L (Quarter)",
  "3.64 L (Gallon)",
  "16 L (Drum)"
],
  colors: [
  "White"
],
  shades: [
  {
    "name": "White",
    "code": "FT-PR02",
    "hex": "#f7f5ef",
    "stock": 93
  }
],
  finish: "Water-based primer",
  surface: "Interior and exterior masonry",
  coverage: "13–15 m² per litre per coat",
  dryTime: "Touch dry 1 hour · Recoat 4–5 hours",
  shortDescription: "Fast-drying acrylic primer for strong adhesion, stain sealing and even topcoat coverage.",
  description: "A low-odour water-based primer recommended under Final Touch emulsions and Weather Sheath. Improves hold-out, adhesion and colour uniformity on porous or previously painted walls.",
  stock: 93,
  featured: true,
  bestseller: false,
  active: true
}),
product({
  name: "Final Touch Red Oxide Primer Sealer",
  slug: "final-touch-red-oxide-primer-sealer",
  sku: "FT-ROP-09",
  brand: "Final Touch",
  category: "Primers & Sealers",
  collection: "Final Touch System",
  price: 835,
  compareAtPrice: 930,
  image: "/images/products/final-touch-red-oxide-primer-sealer.jpg",
  gallery: [
  "/images/categories/metal.jpg"
],
  sizes: [
  "0.91 L (Quarter)",
  "3.64 L (Gallon)",
  "16 L (Drum)"
],
  colors: [
  "Red Oxide"
],
  shades: [
  {
    "name": "Red Oxide",
    "code": "FT-RO1",
    "hex": "#8d3a2d",
    "stock": 47
  }
],
  finish: "Anti-corrosive primer",
  surface: "Iron and structural steel",
  coverage: "14–16 m² per litre per coat",
  dryTime: "Touch dry 6–12 hours · Recoat 16 hours",
  shortDescription: "Protective anti-corrosive primer for gates, grills, steelwork and fabrication projects.",
  description: "Designed for ferrous metal preparation before Final Touch gloss enamel. Provides adhesion and corrosion resistance on gates, railings, frames and structural steel common across Karachi buildings.",
  stock: 47,
  featured: false,
  bestseller: false,
  active: true
}),
product({
  name: "Final Touch Professional Roller Kit",
  slug: "final-touch-professional-roller-kit",
  sku: "FT-TOOL-33",
  brand: "Final Touch",
  category: "Tools & Applicators",
  collection: "Application Tools",
  price: 1650,
  compareAtPrice: 1850,
  image: "/images/categories/project-tools.jpg",
  gallery: [
  "/images/categories/brushes.jpg"
],
  sizes: [
  "9-inch kit"
],
  colors: [
  "Blue"
],
  shades: [
  {
    "name": "Blue",
    "code": "FT-T01",
    "hex": "#2a4f73",
    "stock": 88
  }
],
  finish: "Lint-resistant woven pile",
  surface: "Smooth and lightly textured walls",
  coverage: "For water- and oil-based coatings",
  dryTime: "Reusable after correct cleaning",
  shortDescription: "Professional 9-inch roller, frame, tray and extension-ready handle in one kit.",
  description: "A complete applicator kit for emulsion and exterior wall systems. Designed for smooth release, clean edges and efficient large-area work.",
  stock: 88,
  featured: false,
  bestseller: true,
  active: true
}),
product({
  name: "Final Touch Premium Wall Brush",
  slug: "final-touch-premium-wall-brush",
  sku: "FT-TOOL-34",
  brand: "Final Touch",
  category: "Tools & Applicators",
  collection: "Application Tools",
  price: 650,
  compareAtPrice: null,
  image: "/images/categories/brushes.jpg",
  gallery: [],
  sizes: [
  "2 inch",
  "3 inch",
  "4 inch"
],
  colors: [
  "Red handle",
  "Blue handle"
],
  shades: [
  {
    "name": "Red Handle",
    "code": "FT-T02",
    "hex": "#d71920",
    "stock": 80
  },
  {
    "name": "Blue Handle",
    "code": "FT-T03",
    "hex": "#2a4f73",
    "stock": 74
  }
],
  finish: "Synthetic filament",
  surface: "Walls, trim, wood and metal",
  coverage: "For water- and oil-based coatings",
  dryTime: "Reusable after correct cleaning",
  shortDescription: "High paint pick-up, clean release and a comfortable grip for neat professional work.",
  description: "A premium wall and trim brush for precise cutting-in and controlled application across emulsions and enamels.",
  stock: 154,
  featured: false,
  bestseller: false,
  active: true
}),
product({
  name: "Final Touch Ceiling Pure Matt",
  slug: "final-touch-ceiling-pure-matt",
  sku: "FT-CM-35",
  brand: "Final Touch",
  category: "Interior Paints",
  collection: "Final Touch Classic",
  price: 980,
  compareAtPrice: 1080,
  image: "/images/products/final-touch-classic-water-based-matt-finish.jpg",
  gallery: [
  "/images/editorial/elegant-room.jpg"
],
  sizes: [
  "0.91 L (Quarter)",
  "3.64 L (Gallon)",
  "16 L (Drum)"
],
  colors: [
  "Brilliant White",
  "Optical White",
  "Soft White",
  "Cool Mist"
],
  shades: [
  {
    "name": "Brilliant White",
    "code": "FT-C01",
    "hex": "#f8f7f0",
    "stock": 34
  },
  {
    "name": "Optical White",
    "code": "FT-C02",
    "hex": "#f4f6f8",
    "stock": 28
  },
  {
    "name": "Soft White",
    "code": "FT-C03",
    "hex": "#f2eee4",
    "stock": 24
  },
  {
    "name": "Cool Mist",
    "code": "FT-C04",
    "hex": "#e7eef1",
    "stock": 19
  }
],
  finish: "Pure matt",
  surface: "Ceilings and low-traffic overhead surfaces",
  coverage: "12–14 m² per litre per coat",
  dryTime: "Touch dry 45 minutes · Recoat 3 hours",
  shortDescription: "Ultra-flat ceiling finish that hides imperfections and reduces glare.",
  description: "A dedicated ceiling matt for clean, non-reflective overhead surfaces. Excellent for living rooms, bedrooms and commercial interiors where light scatter must be controlled.",
  stock: 105,
  featured: false,
  bestseller: false,
  active: true
}),
product({
  name: "Final Touch Kitchen & Bath Semi Gloss",
  slug: "final-touch-kitchen-bath-semi-gloss",
  sku: "FT-KB-36",
  brand: "Final Touch",
  category: "Interior Paints",
  collection: "Final Touch Classic",
  price: 1490,
  compareAtPrice: 1620,
  image: "/images/products/final-touch-classic-luxury-silk-sheen-emulsion.jpg",
  gallery: [
  "/images/editorial/warm-room.jpg"
],
  sizes: [
  "0.91 L (Quarter)",
  "3.64 L (Gallon)",
  "16 L (Drum)"
],
  colors: [
  "Brilliant White",
  "Sea Salt",
  "Soft Sage",
  "Cloud Grey",
  "Warm Sand"
],
  shades: [
  {
    "name": "Brilliant White",
    "code": "FT-K01",
    "hex": "#f8f7f0",
    "stock": 22
  },
  {
    "name": "Sea Salt",
    "code": "FT-K02",
    "hex": "#dfe8e4",
    "stock": 18
  },
  {
    "name": "Soft Sage",
    "code": "FT-K03",
    "hex": "#b9d5c2",
    "stock": 16
  },
  {
    "name": "Cloud Grey",
    "code": "FT-K04",
    "hex": "#d0d0cc",
    "stock": 15
  },
  {
    "name": "Warm Sand",
    "code": "FT-K05",
    "hex": "#e7d7b8",
    "stock": 14
  }
],
  finish: "Semi gloss",
  surface: "Kitchens, bathrooms and service areas",
  coverage: "11–13 m² per litre per coat",
  dryTime: "Touch dry 1 hour · Recoat 4 hours",
  shortDescription: "Moisture-tolerant washable finish for kitchens, baths and high-use interiors.",
  description: "A tougher interior finish for humidity-prone rooms. Resists stains and frequent cleaning while keeping a refined semi-gloss appearance.",
  stock: 85,
  featured: true,
  bestseller: false,
  active: true
}),
product({
  name: "Final Touch Facade Cool Coat",
  slug: "final-touch-facade-cool-coat",
  sku: "FT-FC-37",
  brand: "Final Touch",
  category: "Exterior Paints",
  collection: "Final Touch Classic",
  price: 1680,
  compareAtPrice: 1825,
  image: "/images/products/final-touch-classic-crystal-weather-sheat.jpg",
  gallery: [
  "/images/categories/project-exterior.jpg"
],
  sizes: [
  "0.91 L (Quarter)",
  "3.64 L (Gallon)",
  "16 L (Drum)"
],
  finish: "Heat-reflective exterior",
  surface: "Exterior walls and parapets",
  coverage: "10–12 m² per litre per coat",
  dryTime: "Touch dry 1 hour · Recoat 4 hours",
  shortDescription: "Heat-conscious exterior finish for sun-facing Karachi elevations.",
  description: "A weather-resistant exterior system tuned for intense sunlight and heat build-up. Helps maintain cleaner colour and more comfortable exterior surfaces on exposed facades.",
  featured: true,
  bestseller: false,
  active: true,
  shades: libraries["final-touch-classic-crystal-weather-sheat"].slice(0,24),
  colors: labels("final-touch-classic-crystal-weather-sheat").slice(0,24),
  stock: libraries["final-touch-classic-crystal-weather-sheat"].slice(0,24).reduce((sum, shade) => sum + shade.stock, 0)
}),
product({
  name: "Final Touch Metal Shield Enamel",
  slug: "final-touch-metal-shield-enamel",
  sku: "FT-MS-38",
  brand: "Final Touch",
  category: "Enamels",
  collection: "Final Touch Classic",
  price: 1390,
  compareAtPrice: 1510,
  image: "/images/products/final-touch-high-gloss-finish-enamel.jpg",
  gallery: [
  "/images/categories/metal.jpg"
],
  sizes: [
  "0.91 L (Quarter)",
  "3.64 L (Gallon)",
  "16 L (Drum)"
],
  finish: "Protective gloss",
  surface: "Gates, grills, frames and exterior metal",
  coverage: "12–14 m² per litre per coat",
  dryTime: "Touch dry 3 hours · Recoat 16 hours",
  shortDescription: "Protective gloss enamel system for exterior metalwork after red oxide priming.",
  description: "Specified for metal gates, railings and architectural steel. Combine with Final Touch Red Oxide Primer for a complete protective build.",
  featured: false,
  bestseller: false,
  active: true,
  shades: libraries["final-touch-high-gloss-finish-enamel"].slice(0,20),
  colors: labels("final-touch-high-gloss-finish-enamel").slice(0,20),
  stock: libraries["final-touch-high-gloss-finish-enamel"].slice(0,20).reduce((sum, shade) => sum + shade.stock, 0)
}),
product({
  name: "Final Touch Wood Primer",
  slug: "final-touch-wood-primer",
  sku: "FT-WP-39",
  brand: "Final Touch",
  category: "Primers & Sealers",
  collection: "Final Touch System",
  price: 890,
  compareAtPrice: null,
  image: "/images/products/final-touch-wall-primer-sealer.png",
  gallery: [
  "/images/categories/wood.jpg"
],
  sizes: [
  "0.91 L (Quarter)",
  "3.64 L (Gallon)",
  "16 L (Drum)"
],
  colors: [
  "White"
],
  shades: [
  {
    "name": "White",
    "code": "FT-WP1",
    "hex": "#f4f1e8",
    "stock": 58
  }
],
  finish: "Wood primer",
  surface: "Interior and exterior timber",
  coverage: "12–14 m² per litre per coat",
  dryTime: "Touch dry 2 hours · Recoat 8 hours",
  shortDescription: "Adhesion primer for bare and previously coated wood before enamel finishing.",
  description: "Seals timber, improves enamel hold-out and reduces grain raise before Final Touch gloss or matt enamel systems.",
  stock: 58,
  featured: false,
  bestseller: false,
  active: true
}),
product({
  name: "Final Touch Stain Block Primer",
  slug: "final-touch-stain-block-primer",
  sku: "FT-SB-40",
  brand: "Final Touch",
  category: "Primers & Sealers",
  collection: "Final Touch System",
  price: 975,
  compareAtPrice: null,
  image: "/images/products/final-touch-water-based-wall-primer-sealer.jpg",
  gallery: [],
  sizes: [
  "0.91 L (Quarter)",
  "3.64 L (Gallon)",
  "16 L (Drum)"
],
  colors: [
  "White"
],
  shades: [
  {
    "name": "White",
    "code": "FT-SB1",
    "hex": "#f7f5ef",
    "stock": 49
  }
],
  finish: "Stain-blocking primer",
  surface: "Stained masonry, smoke marks and repaired walls",
  coverage: "11–13 m² per litre per coat",
  dryTime: "Touch dry 1 hour · Recoat 4 hours",
  shortDescription: "Seals nicotine, water marks and stubborn stains before decorative finishing.",
  description: "A specialist primer for renovation work where existing stains risk bleeding through new emulsion coats.",
  stock: 49,
  featured: false,
  bestseller: false,
  active: true
}),
product({
  name: "Final Touch Cutting-In Brush Set",
  slug: "final-touch-cutting-in-brush-set",
  sku: "FT-TOOL-46",
  brand: "Final Touch",
  category: "Tools & Applicators",
  collection: "Application Tools",
  price: 980,
  compareAtPrice: 1100,
  image: "/images/categories/project-tools.jpg",
  gallery: [],
  sizes: [
  "Set of 3"
],
  colors: [
  "Red"
],
  shades: [
  {
    "name": "Red",
    "code": "FT-T04",
    "hex": "#d71920",
    "stock": 62
  }
],
  finish: "Angled synthetic",
  surface: "Edges, frames and detailing",
  coverage: "For water- and oil-based coatings",
  dryTime: "Reusable after correct cleaning",
  shortDescription: "Three angled brushes for clean edges, frames and detailed cutting-in.",
  description: "A professional detailing set for neat junctions between walls, ceilings, frames and trims.",
  stock: 62,
  featured: false,
  bestseller: false,
  active: true
}),
product({
  name: "Final Touch Masking & Prep Kit",
  slug: "final-touch-masking-prep-kit",
  sku: "FT-TOOL-47",
  brand: "Final Touch",
  category: "Tools & Applicators",
  collection: "Application Tools",
  price: 1250,
  compareAtPrice: null,
  image: "/images/categories/brushes.jpg",
  gallery: [],
  sizes: [
  "Standard kit"
],
  colors: [
  "Multi"
],
  shades: [
  {
    "name": "Multi",
    "code": "FT-T05",
    "hex": "#8d8f8c",
    "stock": 54
  }
],
  finish: "Site preparation kit",
  surface: "General project preparation",
  coverage: "Includes tape, sheets and detailing tools",
  dryTime: "Ready to use",
  shortDescription: "Masking tape, drop sheets and detailing essentials for cleaner site work.",
  description: "Helps protect floors and fittings while improving edge quality during professional painting.",
  stock: 54,
  featured: false,
  bestseller: false,
  active: true
}),
];

export const seedReviews = [
  {
    "slug": "final-touch-classic-luxury-silk-sheen-emulsion",
    "author": "Ayesha R.",
    "location": "Gulshan-e-Iqbal",
    "rating": 5,
    "title": "The finish looks genuinely premium",
    "body": "Used Moonflower in our lounge. Two coats covered beautifully and marks wipe off without leaving shiny patches.",
    "daysAgo": 12
  },
  {
    "slug": "final-touch-classic-luxury-silk-sheen-emulsion",
    "author": "Bilal Ahmed",
    "location": "North Nazimabad",
    "rating": 5,
    "title": "Great recommendation for a family home",
    "body": "The shade was accurate and the silk level is subtle, not overly glossy. Delivery packaging was very secure.",
    "daysAgo": 26
  },
  {
    "slug": "final-touch-classic-crystal-weather-sheat",
    "author": "Hamza Builders",
    "location": "SITE Karachi",
    "rating": 5,
    "title": "Holding up well on a west-facing elevation",
    "body": "Applied after the recommended primer. The colour is still clean after strong sun and two heavy rain spells.",
    "daysAgo": 18
  },
  {
    "slug": "final-touch-classic-water-based-matt-finish",
    "author": "Zain Qureshi",
    "location": "Clifton Karachi",
    "rating": 5,
    "title": "Soft modern matt",
    "body": "Exactly the non-reflective look our architect wanted. Covered old cream walls in two full coats.",
    "daysAgo": 31
  },
  {
    "slug": "final-touch-high-gloss-finish-enamel",
    "author": "Rashid Painting Works",
    "location": "Korangi Karachi",
    "rating": 5,
    "title": "Flows out smoothly on doors",
    "body": "Good gloss and no brush drag when thinned as instructed. The final coat looks sprayed.",
    "daysAgo": 67
  },
  {
    "slug": "final-touch-professional-roller-kit",
    "author": "Ali Renovations",
    "location": "Federal B Area",
    "rating": 5,
    "title": "Everything needed to start",
    "body": "Roller does not shed and the frame is sturdier than typical local kits. Cleaned up well after emulsion.",
    "daysAgo": 14
  },
  {
    "slug": "final-touch-kitchen-bath-semi-gloss",
    "author": "Sara N.",
    "location": "PECHS Karachi",
    "rating": 5,
    "title": "Perfect for our kitchen walls",
    "body": "Semi-gloss cleans easily around the cooking area and the Sea Salt shade looks fresh all day.",
    "daysAgo": 9
  }
];
