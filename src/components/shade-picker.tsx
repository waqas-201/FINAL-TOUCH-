"use client";

import { Check, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { ProductShade } from "@/db/schema";
import { shadeLabel, stockLabel } from "@/lib/format";

export function ShadePicker({
  shades,
  value,
  onChange,
}: {
  shades: ProductShade[];
  value: string;
  onChange: (shade: ProductShade) => void;
}) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("All");

  const families = useMemo(() => {
    const buckets = new Map<string, number>();
    for (const shade of shades) {
      const key = shadeFamily(shade.name);
      buckets.set(key, (buckets.get(key) || 0) + 1);
    }
    return ["All", ...[...buckets.entries()].sort((a, b) => b[1] - a[1]).map(([key]) => key)];
  }, [shades]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return shades.filter((shade) => {
      const label = shadeLabel(shade).toLowerCase();
      const matchesQuery = !q || label.includes(q) || shade.code.includes(q);
      const matchesFamily = family === "All" || shadeFamily(shade.name) === family;
      return matchesQuery && matchesFamily;
    });
  }, [shades, query, family]);

  if (!shades.length) return null;

  return (
    <div className="border-t border-black/10 py-6 sm:py-7">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <label className="text-[10px] font-extrabold uppercase tracking-[.13em]">Choose shade</label>
          <p className="mt-1 text-xs text-black/45">{shades.length} shades · live Karachi stock by colour</p>
        </div>
        <div className="flex h-11 items-center gap-2 rounded-full border border-black/12 bg-white px-4">
          <Search size={14} className="text-black/35" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search shade or code"
            className="w-full bg-transparent text-xs outline-none sm:w-48"
          />
        </div>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {families.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFamily(item)}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${family === item ? "border-[#101010] bg-[#101010] text-white" : "border-black/12 bg-white text-black/55"}`}
          >
            {item}
          </button>
        ))}
      </div>

      {/*
        Important: no nested max-height scroll container.
        Nested overflow was trapping touch scroll on mobile after shade selection.
      */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {filtered.map((shade) => {
          const label = shadeLabel(shade);
          const selected = value === label;
          const status = stockLabel(shade.stock);
          return (
            <button
              key={`${shade.code}-${shade.name}`}
              type="button"
              onClick={() => onChange(shade)}
              disabled={shade.stock <= 0}
              className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-left transition ${selected ? "border-[#d71920] bg-[#fff5f5]" : "border-black/10 bg-white hover:border-black/25"} ${shade.stock <= 0 ? "opacity-45" : ""}`}
            >
              <span className="relative grid size-11 place-items-center rounded-full border border-black/10 shadow-sm" style={{ backgroundColor: shade.hex }}>
                {selected && <Check size={14} className={isDark(shade.hex) ? "text-white" : "text-[#101010]"} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-bold text-[#101010]">{shade.name}</span>
                <span className="mt-0.5 block text-[10px] text-black/45">{shade.code}</span>
              </span>
              <span className={`rounded-full px-2 py-1 text-[9px] font-bold ${shade.stock <= 0 ? "bg-black/5 text-black/40" : shade.stock <= 8 ? "bg-[#fff0f0] text-[#b11218]" : "bg-[#f3f3f0] text-black/55"}`}>
                {status}
              </span>
            </button>
          );
        })}
      </div>
      {!filtered.length && <p className="mt-4 text-sm text-black/45">No shades match that search.</p>}
    </div>
  );
}

function shadeFamily(name: string) {
  const lower = name.toLowerCase();
  if (/(white|ivory|cream|magnolia|linen|pearl|snow|off)/.test(lower)) return "Whites";
  if (/(grey|gray|silver|charcoal|smoke|stone)/.test(lower)) return "Greys";
  if (/(beige|sand|almond|camel|buff|taupe|khaki)/.test(lower)) return "Neutrals";
  if (/(yellow|gold|mustard|lemon)/.test(lower)) return "Yellows";
  if (/(orange|peach|coral|terracotta|apricot)/.test(lower)) return "Oranges";
  if (/(red|rose|pink|berry|cherry|crimson)/.test(lower)) return "Reds & Pinks";
  if (/(purple|violet|lilac|lavender|plum)/.test(lower)) return "Purples";
  if (/(blue|azure|navy|ocean|sky|teal)/.test(lower)) return "Blues";
  if (/(green|sage|olive|jade|mint|leaf)/.test(lower)) return "Greens";
  if (/(brown|walnut|chocolate|wood|coffee)/.test(lower)) return "Browns";
  if (lower.includes("black")) return "Blacks";
  return "Accent";
}

function isDark(hex: string) {
  const value = hex.replace("#", "");
  if (value.length < 6) return false;
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 140;
}
