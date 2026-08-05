import type { Product } from "@/db/schema";
import { ImagePlus, Save } from "lucide-react";
import { saveProduct } from "@/app/admin/actions";

const categories = ["Interior Paints", "Exterior Paints", "Enamels", "Primers & Sealers", "Putty & Preparation", "Waterproofing", "Construction Chemicals", "Wood Finishes", "Industrial Coatings", "Tools & Applicators"];
const brands = ["Final Touch"];
const collections = ["Final Touch Classic", "Final Touch System", "Application Tools"];

function shadesToText(product?: Product) {
  if (!product?.shades?.length) return "Brilliant White | FT 100 | #f8f7f0 | 24\nAsh White | FT 101 | #e4e1d8 | 18";
  return product.shades.map((shade) => `${shade.name} | ${shade.code} | ${shade.hex} | ${shade.stock}`).join("\n");
}

export function AdminProductForm({ product }: { product?: Product }) {
  return (
    <form action={saveProduct} className="grid gap-6" encType="multipart/form-data">
      {product && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="existingImage" value={product?.image ?? ""} />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Product name"><input name="name" required className="form-field" defaultValue={product?.name} placeholder="e.g. Final Touch Easy Clean Matt" /></Field>
        <Field label="URL slug"><input name="slug" className="form-field" defaultValue={product?.slug} placeholder="Generated from product name" /></Field>
        <Field label="SKU"><input name="sku" className="form-field" defaultValue={product?.sku} placeholder="FT-ECM-01" /></Field>
        <Field label="Brand"><input name="brand" required className="form-field" defaultValue={product?.brand ?? "Final Touch"} list="brand-list" /><datalist id="brand-list">{brands.map((brand) => <option key={brand} value={brand} />)}</datalist></Field>
        <Field label="Category"><input name="category" required className="form-field" defaultValue={product?.category ?? "Interior Paints"} list="category-list" /><datalist id="category-list">{categories.map((category) => <option key={category} value={category} />)}</datalist></Field>
        <Field label="Collection"><input name="collection" className="form-field" defaultValue={product?.collection ?? "Final Touch Classic"} list="collection-list" /><datalist id="collection-list">{collections.map((collection) => <option key={collection} value={collection} />)}</datalist></Field>
        <Field label="Finish"><input name="finish" className="form-field" defaultValue={product?.finish ?? "Matt"} placeholder="Matt, silk sheen, high gloss..." /></Field>
        <Field label="Base price (PKR)"><input name="price" required min="1" type="number" className="form-field" defaultValue={product?.price} placeholder="1250" /></Field>
        <Field label="Compare-at price (PKR)"><input name="compareAtPrice" min="0" type="number" className="form-field" defaultValue={product?.compareAtPrice ?? ""} placeholder="Optional sale reference" /></Field>
        <Field label="Fallback stock units"><input name="stock" min="0" type="number" className="form-field" defaultValue={product?.stock ?? 0} /></Field>
        <Field label="Best surfaces"><input name="surface" className="form-field" defaultValue={product?.surface} placeholder="Interior walls and ceilings" /></Field>
        <Field label="Coverage"><input name="coverage" className="form-field" defaultValue={product?.coverage} placeholder="12–14 m² per litre per coat" /></Field>
        <Field label="Drying time"><input name="dryTime" className="form-field" defaultValue={product?.dryTime} placeholder="Touch dry 1 hour · Recoat 4 hours" /></Field>
      </div>
      <Field label="Short selling description"><textarea required name="shortDescription" className="form-field" defaultValue={product?.shortDescription} placeholder="A concise benefit-led description shown on the product page." /></Field>
      <Field label="Full product description"><textarea required name="description" className="form-field min-h-[150px]" defaultValue={product?.description} placeholder="Product story, performance and recommended use." /></Field>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Pack sizes (one per line or comma separated)"><textarea name="sizes" className="form-field" defaultValue={product?.sizes.join("\n") ?? "0.91 L (Quarter)\n3.64 L (Gallon)\n16 L (Drum)"} /></Field>
        <Field label="Legacy colour labels (optional)"><textarea name="colors" className="form-field" defaultValue={product?.colors.join("\n") ?? ""} placeholder="Used only if shade card rows are empty" /></Field>
      </div>
      <Field label="Shade card rows (Name | Code | Hex | Stock)">
        <textarea name="shades" className="form-field min-h-[180px] font-mono text-xs" defaultValue={shadesToText(product)} placeholder="Ash White | 1208 | #e4e1d8 | 24" />
      </Field>
      <div className="rounded-2xl border border-dashed border-black/20 bg-[#f5f3ed] p-5">
        <div className="mb-4 flex items-center gap-3"><ImagePlus size={20} className="text-[#d71920]" /><div><p className="text-xs font-bold">Product packshot</p><p className="mt-1 text-[10px] text-black/40">JPG, PNG or WEBP up to 5MB. A square image works best.</p></div></div>
        <div className="grid gap-4 md:grid-cols-2"><input type="file" name="imageFile" accept="image/jpeg,image/png,image/webp,image/gif" className="block w-full text-xs file:mr-3 file:rounded-full file:border-0 file:bg-[#101010] file:px-4 file:py-2 file:text-[10px] file:font-bold file:uppercase file:tracking-wider file:text-white" /><input name="imageUrl" className="form-field h-10" placeholder="Or paste an image URL/path" /></div>
        {product?.image && <p className="mt-3 truncate text-[10px] text-black/40">Current: {product.image}</p>}
      </div>
      <Field label="Gallery paths / URLs (one per line)"><textarea name="gallery" className="form-field" defaultValue={product?.gallery.join("\n")} placeholder="/images/gallery/room.jpg" /></Field>
      <div className="flex flex-wrap gap-x-7 gap-y-3 rounded-2xl bg-[#ecebdc] p-5">
        <CheckField name="active" label="Published" defaultChecked={product?.active ?? true} />
        <CheckField name="featured" label="Featured on homepage" defaultChecked={product?.featured ?? false} />
        <CheckField name="bestseller" label="Bestseller badge" defaultChecked={product?.bestseller ?? false} />
      </div>
      <div className="flex justify-end"><button className="button-primary w-full sm:w-auto sm:min-w-48"><Save size={15} /> {product ? "Save product" : "Create product"}</button></div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label><span className="form-label">{label}</span>{children}</label>; }
function CheckField({ name, label, defaultChecked }: { name: string; label: string; defaultChecked: boolean }) { return <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold"><input type="checkbox" name={name} defaultChecked={defaultChecked} className="size-4 accent-[#d71920]" />{label}</label>; }
