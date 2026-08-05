"use client";

import Link from "next/link";
import { ArrowRight, Check, Layers3, PaintRoller, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stages = [
  {
    number: "01",
    title: "Prepare the surface",
    copy: "Repair hairline cracks, level porous plaster and remove loose material. A sound base is what makes every coat above it perform.",
    stat: "Smooth · Clean · Dry",
  },
  {
    number: "02",
    title: "Seal with primer",
    copy: "The right primer controls absorption, resists alkalinity and gives the finishing coat an even surface to grip.",
    stat: "1–2 even coats",
  },
  {
    number: "03",
    title: "Build the finish",
    copy: "Apply two balanced topcoats for accurate colour, consistent sheen and protection suited to Karachi’s coastal climate.",
    stat: "Colour · Sheen · Protection",
  },
];

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

export function PaintSystemStory() {
  const section = useRef<HTMLElement>(null);
  const visual = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      visual.current?.style.setProperty("--story-primer", "1");
      visual.current?.style.setProperty("--story-finish", "1");
      return;
    }

    const update = () => {
      const element = section.current;
      const target = visual.current;
      if (!element || !target) return;
      const rect = element.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / distance);
      const primer = clamp(progress * 2.35);
      const finish = clamp((progress - 0.42) * 1.72);
      target.style.setProperty("--story-progress", progress.toFixed(4));
      target.style.setProperty("--story-primer", primer.toFixed(4));
      target.style.setProperty("--story-finish", finish.toFixed(4));
      target.style.setProperty("--story-roller-x", `${-15 + progress * 590}%`);
      const nextStage = progress < 0.31 ? 0 : progress < 0.67 ? 1 : 2;
      setActiveStage((current) => current === nextStage ? current : nextStage);
      frame.current = null;
    };

    const onScroll = () => {
      if (frame.current === null) frame.current = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <section ref={section} className="paint-story relative bg-[#ece9e2]" aria-label="How to build a complete paint system">
      <div className="paint-story-sticky sticky top-[98px] flex min-h-[calc(100dvh-98px)] items-center overflow-hidden py-10 lg:top-[130px] lg:min-h-[calc(100dvh-130px)] lg:py-12">
        <div className="site-container grid w-full items-center gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-16">
          <div>
            <p className="eyebrow">A complete paint system</p>
            <h2 className="mt-4 font-display text-[clamp(2.8rem,5.5vw,5.6rem)] leading-[.9] tracking-[-.05em]">A lasting finish<br /><em>starts underneath.</em></h2>
            <div className="mt-8 grid border-t border-black/12">
              {stages.map((stage, index) => (
                <div key={stage.number} className={`paint-story-stage grid grid-cols-[36px_1fr] gap-3 border-b border-black/12 py-4 transition duration-300 sm:grid-cols-[48px_1fr] sm:gap-4 sm:py-5 ${activeStage === index ? "is-active" : ""}`}>
                  <span className="pt-1 text-[10px] font-bold tracking-wider text-black/28">{stage.number}</span>
                  <div>
                    <h3 className="font-sans text-sm font-bold sm:text-base">{stage.title}</h3>
                    <div className="paint-story-stage-detail overflow-hidden">
                      <p className="mt-2 max-w-md text-xs leading-5 text-black/52 sm:text-sm sm:leading-6">{stage.copy}</p>
                      <p className="mt-3 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.12em] text-[#b11218]"><Check size={12} /> {stage.stat}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/shop?category=Primers+%26+Sealers" className="button-dark mt-7">Build your system <ArrowRight size={14} /></Link>
          </div>

          <div ref={visual} className="paint-story-visual relative mx-auto aspect-[1.18] w-full max-w-[780px] overflow-hidden rounded-[24px] bg-[#c6beb1] shadow-[0_30px_80px_rgba(0,0,0,.16)] sm:rounded-[30px]">
            <div className="paint-story-plaster absolute inset-0" />
            <div className="paint-story-primer absolute inset-0" />
            <div className="paint-story-finish absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 h-[18%] bg-[linear-gradient(180deg,#8b694d,#674a36)] shadow-[inset_0_10px_18px_rgba(0,0,0,.12)]" />
            <div className="absolute bottom-[18%] left-0 right-0 h-3 bg-white/90 shadow-md" />

            <div className="paint-story-window absolute right-[8%] top-[10%] h-[48%] w-[29%] border-[10px] border-[#eeeae3] bg-[linear-gradient(145deg,#c7e0e8,#86aab6)] shadow-[0_18px_32px_rgba(0,0,0,.18)] sm:border-[14px]">
              <span className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-[#eeeae3]" />
              <span className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-[#eeeae3]" />
            </div>
            <div className="absolute bottom-[18%] left-[9%] h-[38%] w-[46%] rounded-t-[22px] bg-[#c7c1b8] shadow-[0_18px_28px_rgba(0,0,0,.18)]">
              <div className="absolute -left-[3%] bottom-0 h-[68%] w-[13%] rounded-t-xl bg-[#afa99f]" />
              <div className="absolute -right-[3%] bottom-0 h-[68%] w-[13%] rounded-t-xl bg-[#afa99f]" />
              <div className="absolute bottom-[10%] left-[10%] h-[47%] w-[25%] rotate-[-4deg] rounded-lg bg-[#982f32] shadow-lg" />
              <div className="absolute bottom-[10%] right-[12%] h-[43%] w-[23%] rotate-[5deg] rounded-lg bg-[#242424] shadow-lg" />
            </div>

            <div className="paint-story-roller absolute left-0 top-[18%] z-20 flex items-center">
              <span className="block h-12 w-24 rounded-lg border-4 border-white/70 bg-[#f7f4ee] shadow-xl sm:h-16 sm:w-32" />
              <span className="-ml-1 block h-2 w-14 bg-[#333] sm:w-20" />
              <span className="block h-3 w-16 rounded-full bg-[#d71920] shadow-lg sm:w-24" />
            </div>

            <div className="absolute left-4 top-4 z-30 flex gap-2 sm:left-6 sm:top-6">
              <span className="rounded-full border border-black/10 bg-white/88 px-3 py-2 text-[9px] font-bold uppercase tracking-[.12em] shadow-sm backdrop-blur"><Layers3 size={12} className="mr-1.5 inline text-[#d71920]" /> Live system layers</span>
            </div>
            <div className="absolute bottom-4 right-4 z-30 hidden items-center gap-4 rounded-2xl border border-white/35 bg-black/75 px-4 py-3 text-white backdrop-blur sm:flex">
              <PaintRoller size={18} className="text-[#ff4147]" />
              <div><p className="text-[9px] font-bold uppercase tracking-wider text-white/45">Current stage</p><p className="mt-1 text-xs font-bold">{stages[activeStage].title}</p></div>
              <ShieldCheck size={17} className="text-white/40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
