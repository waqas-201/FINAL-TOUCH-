"use client";

type Props = {
  shadeHex: string;
  shadeName: string;
  shadeCode?: string;
  className?: string;
};

export function HouseShadePreview({ shadeHex, shadeName, shadeCode, className = "" }: Props) {
  return (
    <div className={`house-shade-preview relative overflow-hidden bg-[#d7e6f0] ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#b9d3e4_0%,#d9e8f2_42%,#c8d7b8_42%,#b7c9a4_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-[linear-gradient(180deg,#8f7a5f,#6d5a43)]" />

      <svg viewBox="0 0 800 640" className="absolute inset-0 h-full w-full" role="img" aria-label={`House preview in ${shadeName}`}>
        <defs>
          <linearGradient id="roofShade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#4b5560" />
            <stop offset="100%" stopColor="#2f3640" />
          </linearGradient>
          <linearGradient id="glassShade" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#d9f0ff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#7eb3d6" stopOpacity="0.9" />
          </linearGradient>
          <filter id="softHouseShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#000" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* Main house body walls */}
        <g filter="url(#softHouseShadow)">
          <path d="M140 290 L400 120 L660 290 L660 560 L140 560 Z" fill={shadeHex} />
          <path d="M400 120 L660 290 L620 290 L400 170 Z" fill="rgba(0,0,0,0.08)" />
          <rect x="170" y="290" width="460" height="270" fill={shadeHex} />
          <rect x="170" y="290" width="460" height="270" fill="rgba(255,255,255,0.04)" />
        </g>

        {/* Roof */}
        <path d="M110 300 L400 95 L690 300 L640 300 L400 145 L160 300 Z" fill="url(#roofShade)" />
        <path d="M250 220 L400 115 L550 220 L520 220 L400 150 L280 220 Z" fill="#3a424c" />

        {/* Chimney */}
        <rect x="520" y="145" width="48" height="90" fill="#5b6570" />
        <rect x="512" y="135" width="64" height="18" rx="3" fill="#343b44" />

        {/* Garage wing */}
        <rect x="560" y="360" width="170" height="200" fill={shadeHex} />
        <rect x="560" y="360" width="170" height="200" fill="rgba(0,0,0,0.05)" />
        <path d="M545 370 L645 300 L745 370 Z" fill="#3d4650" />
        <rect x="585" y="410" width="120" height="150" rx="4" fill="#6b7280" />
        <path d="M595 445 H695 M595 480 H695 M595 515 H695" stroke="#8b93a0" strokeWidth="4" />

        {/* Windows */}
        <g>
          <rect x="210" y="340" width="88" height="110" rx="4" fill="#f2efe8" />
          <rect x="218" y="348" width="72" height="94" fill="url(#glassShade)" />
          <path d="M254 348 V442 M218 395 H290" stroke="#f2efe8" strokeWidth="5" />

          <rect x="355" y="340" width="88" height="110" rx="4" fill="#f2efe8" />
          <rect x="363" y="348" width="72" height="94" fill="url(#glassShade)" />
          <path d="M399 348 V442 M363 395 H435" stroke="#f2efe8" strokeWidth="5" />

          <rect x="500" y="340" width="70" height="90" rx="4" fill="#f2efe8" />
          <rect x="507" y="347" width="56" height="76" fill="url(#glassShade)" />
          <path d="M535 347 V423 M507 385 H563" stroke="#f2efe8" strokeWidth="4" />
        </g>

        {/* Door */}
        <rect x="300" y="430" width="92" height="130" rx="4" fill="#233041" />
        <rect x="312" y="442" width="68" height="50" rx="2" fill="url(#glassShade)" />
        <circle cx="375" cy="505" r="5" fill="#d4a35c" />

        {/* Porch / steps */}
        <rect x="275" y="555" width="142" height="14" fill="#d9d1c4" />
        <rect x="262" y="568" width="168" height="14" fill="#c8beaf" />

        {/* Trim lines */}
        <path d="M170 520 H630" stroke="rgba(255,255,255,0.28)" strokeWidth="6" />
        <path d="M185 305 H615" stroke="rgba(255,255,255,0.18)" strokeWidth="5" />
      </svg>

      <div className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.12em] text-[#101010] shadow-sm backdrop-blur">
        Live house preview
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-2xl bg-[#101010]/82 px-3 py-2 text-white backdrop-blur sm:right-auto">
        <span className="size-7 shrink-0 rounded-full border border-white/30" style={{ backgroundColor: shadeHex }} />
        <div className="min-w-0">
          <p className="truncate text-xs font-bold">{shadeName}</p>
          {shadeCode && <p className="text-[10px] text-white/60">{shadeCode}</p>}
        </div>
      </div>
    </div>
  );
}
