"use client";

import Link from "next/link";
import { ArrowRight, Calculator, Check, Droplets, Info, PaintBucket, Ruler } from "lucide-react";
import { useMemo, useState } from "react";
import { formatPrice } from "@/lib/format";

export function PaintCalculator() {
  const [length, setLength] = useState(14);
  const [width, setWidth] = useState(12);
  const [height, setHeight] = useState(10);
  const [doors, setDoors] = useState(1);
  const [windows, setWindows] = useState(2);
  const [coats, setCoats] = useState(2);
  const [surface, setSurface] = useState("smooth");

  const result = useMemo(() => {
    const wallSqFt = Math.max(0, 2 * (length + width) * height - doors * 21 - windows * 15);
    const wallSqM = wallSqFt * 0.092903;
    const coverage = surface === "rough" ? 9 : surface === "new" ? 10.5 : 12.5;
    const litres = Math.max(1, wallSqM * coats / coverage * 1.1);
    const drums = Math.floor(litres / 16);
    const remainder = litres - drums * 16;
    const gallons = Math.floor(remainder / 3.64);
    const quarters = Math.ceil(Math.max(0, remainder - gallons * 3.64) / 0.91);
    const cost = litres * 1450;
    return { wallSqFt, wallSqM, litres, drums, gallons, quarters, cost };
  }, [length, width, height, doors, windows, coats, surface]);

  return <div className="grid gap-7 lg:grid-cols-[1fr_.78fr]">
    <div data-reveal className="rounded-[20px] bg-white p-5 shadow-sm sm:rounded-[26px] sm:p-9">
      <div className="mb-8 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-full bg-[#fbe7e8] text-[#d71920]"><Ruler size={20} /></span><div><p className="eyebrow">Room details</p><h2 className="mt-1 font-display text-3xl">Measure your space</h2></div></div>
      <div className="grid gap-5 sm:grid-cols-3">
        <NumberField label="Room length" suffix="ft" value={length} onChange={setLength} />
        <NumberField label="Room width" suffix="ft" value={width} onChange={setWidth} />
        <NumberField label="Wall height" suffix="ft" value={height} onChange={setHeight} />
      </div>
      <div className="mt-7 grid gap-5 sm:grid-cols-3">
        <NumberField label="Doors" suffix="avg." value={doors} onChange={setDoors} min={0} />
        <NumberField label="Windows" suffix="avg." value={windows} onChange={setWindows} min={0} />
        <label><span className="form-label">Number of coats</span><select className="form-field" value={coats} onChange={(event) => setCoats(Number(event.target.value))}><option value="1">1 coat</option><option value="2">2 coats</option><option value="3">3 coats</option></select></label>
      </div>
      <div className="mt-8 border-t border-black/10 pt-7"><p className="form-label mb-4">Surface condition</p><div data-stagger className="grid gap-3 sm:grid-cols-3">{[["smooth", "Smooth / painted", "Best coverage"], ["new", "New plaster", "Primer required"], ["rough", "Rough / textured", "Higher absorption"]].map(([value, label, copy]) => <button key={value} onClick={() => setSurface(value)} className={`rounded-2xl border p-4 text-left transition ${surface === value ? "border-[#d71920] bg-[#fff0f0]" : "border-black/10 hover:border-black/25"}`}><span className="flex items-center gap-2 text-xs font-bold"><span className={`grid size-4 place-items-center rounded-full border ${surface === value ? "border-[#d71920] bg-[#d71920] text-white" : "border-black/20"}`}>{surface === value && <Check size={10} />}</span>{label}</span><span className="mt-2 block pl-6 text-[10px] text-black/38">{copy}</span></button>)}</div></div>
      <div className="mt-7 flex gap-3 rounded-xl bg-[#f5f3ed] p-4 text-[10px] leading-5 text-black/45"><Info size={16} className="mt-0.5 shrink-0 text-[#d71920]" /><p>This estimate includes a 10% allowance for application loss and future touch-ups. Highly porous or strongly contrasting surfaces may need more.</p></div>
    </div>

    <div data-reveal className="relative overflow-hidden rounded-[20px] bg-[#101010] p-6 text-white sm:rounded-[26px] sm:p-9">
      <div className="absolute -right-16 -top-16 size-52 rounded-full border-[38px] border-[#d71920]/10" />
      <div className="relative"><div className="flex items-center justify-between"><div><p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#d71920]">Your estimate</p><h2 className="mt-2 font-display text-3xl">Paint required</h2></div><Calculator size={24} className="text-white/30" /></div>
        <div className="mt-8 border-y border-white/12 py-7"><div className="flex items-end gap-3"><span className="font-display text-7xl leading-none">{result.litres.toFixed(1)}</span><span className="pb-2 text-sm text-white/50">litres</span></div><p className="mt-3 text-xs text-white/42">For {result.wallSqFt.toFixed(0)} sq ft ({result.wallSqM.toFixed(1)} m²) of paintable wall area</p></div>
        <div className="mt-7"><p className="text-[9px] font-bold uppercase tracking-[.14em] text-white/35">Recommended pack mix</p><div className="mt-4 flex flex-wrap gap-3">{result.drums > 0 && <Pack amount={result.drums} label="16 L drums" />}{result.gallons > 0 && <Pack amount={result.gallons} label="3.64 L gallons" />}{result.quarters > 0 && <Pack amount={result.quarters} label="0.91 L quarters" />}</div></div>
        <div className="mt-8 rounded-2xl bg-white/8 p-5"><div className="flex justify-between text-xs"><span className="text-white/48">Indicative paint budget</span><strong>{formatPrice(Math.round(result.cost / 100) * 100)}</strong></div><p className="mt-2 text-[9px] leading-4 text-white/30">Based on an average premium emulsion rate. Actual price varies by finish, shade and pack size.</p></div>
        <Link href="/shop?category=Interior+Paints" className="button-primary mt-6 w-full">Shop recommended paints <ArrowRight size={14} /></Link>
        <p className="mt-4 flex items-center justify-center gap-2 text-[9px] text-white/35"><Droplets size={12} /> Always confirm on-site measurements before ordering.</p>
      </div>
    </div>
  </div>;
}

function NumberField({ label, suffix, value, onChange, min = 1 }: { label: string; suffix: string; value: number; onChange: (value: number) => void; min?: number }) { return <label><span className="form-label">{label}</span><span className="relative block"><input type="number" min={min} max="500" step="1" value={value} onChange={(event) => onChange(Math.max(min, Number(event.target.value) || min))} className="form-field pr-12" /><span className="absolute right-4 top-[18px] text-[10px] font-bold text-black/35">{suffix}</span></span></label>; }
function Pack({ amount, label }: { amount: number; label: string }) { return <div className="flex items-center gap-3 rounded-xl border border-white/12 bg-white/5 px-4 py-3"><PaintBucket size={17} className="text-[#d71920]" /><span><strong className="block text-sm">{amount} ×</strong><span className="text-[9px] text-white/40">{label}</span></span></div>; }
