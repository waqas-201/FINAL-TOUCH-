import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Headphones, PaintRoller, Ruler, ShieldCheck, Star, Truck } from "lucide-react";
import { PaintSystemStory } from "@/components/paint-system-story";
import { ProductCard } from "@/components/product-card";
import { RoomColourPreview } from "@/components/room-colour-preview";
import { getFeaturedProducts } from "@/lib/catalog";

export const dynamic = "force-dynamic";

const collections = [
  { title: "Quiet luxury, room by room", label: "Interior paints", href: "/shop?category=Interior+Paints", image: "/images/categories/project-interior.jpg", tone: "bg-[#d8d2c3]" },
  { title: "Protection through every season", label: "Exterior paints", href: "/shop?category=Exterior+Paints", image: "/images/categories/project-exterior.jpg", tone: "bg-[#d2ddd7]" },
  { title: "Stop damp before it starts", label: "Waterproofing", href: "/shop?category=Waterproofing", image: "/images/categories/project-waterproofing.jpg", tone: "bg-[#dcdcc9]" },
  { title: "Tools for a flawless finish", label: "Tools & applicators", href: "/shop?category=Tools+%26+Applicators", image: "/images/categories/project-tools.jpg", tone: "bg-[#e2d3cd]" },
];

const shades = [
  ["Moonflower", "#dddcd5"], ["Ash White", "#d0cec5"], ["Soft Linen", "#ccb994"], ["Tea Rose", "#b77975"],
  ["Olive Grove", "#7b8062"], ["Blue Street", "#5d7587"], ["Terracotta", "#aa5946"], ["Deep Forest", "#263f34"],
];

export default async function HomePage() {
  const featured = await getFeaturedProducts(8);
  return (
    <>
      <section className="relative min-h-[610px] overflow-hidden bg-[#101010] sm:min-h-[760px] lg:min-h-[calc(100dvh-162px)]">
        <div data-parallax="0.035" className="absolute -inset-y-8 inset-x-0"><Image src="/images/editorial/hero-room.jpg" alt="Bright modern living room finished in an elegant neutral wall colour" fill priority sizes="100vw" className="hero-reveal object-cover object-[58%_center]" /></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.84)_0%,rgba(0,0,0,.56)_40%,rgba(0,0,0,.06)_72%)] max-md:bg-[linear-gradient(0deg,rgba(0,0,0,.9)_0%,rgba(0,0,0,.18)_82%)]" />
        <div className="site-container relative flex min-h-[610px] items-end pb-12 pt-24 sm:min-h-[760px] sm:items-center sm:pb-12 lg:min-h-[calc(100dvh-162px)]">
          <div className="home-hero-copy max-w-[760px] text-white">
            <p className="mb-5 text-[10px] font-extrabold uppercase tracking-[.22em] text-[#d71920]">Karachi’s colour & protection experts</p>
            <h1 className="home-hero-title font-display text-[clamp(3.8rem,8vw,7.8rem)] leading-[.82] tracking-[-.065em]">Colour that<br /><em className="font-normal">lives beautifully.</em></h1>
            <p className="mt-7 max-w-lg text-sm leading-6 text-white/72 sm:text-base sm:leading-7">Premium finishes engineered for Karachi homes, hard-working sites, coastal humidity and intense sun.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/shop" className="button-primary">Shop all paint <ArrowRight size={15} /></Link><Link href="/calculator" className="button-light">Plan your project</Link></div>
          </div>
        </div>
        <div className="absolute bottom-5 right-5 hidden max-w-[290px] items-center gap-4 rounded-2xl bg-white/90 p-3 pr-5 shadow-xl backdrop-blur-md md:flex">
          <Image src="/images/products/final-touch-classic-luxury-silk-sheen-emulsion.jpg" alt="Final Touch Silk Sheen Emulsion" width={72} height={72} className="size-[72px] rounded-xl bg-[#f1efe8] object-contain p-1" />
          <div><p className="text-[9px] font-bold uppercase tracking-[.12em] text-[#d71920]">Most loved finish</p><p className="mt-1 text-xs font-semibold leading-4">Classic Luxury Silk Sheen</p><Link href="/products/final-touch-classic-luxury-silk-sheen-emulsion" className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold underline">Discover <ArrowRight size={10} /></Link></div>
        </div>
      </section>

      <section className="border-b border-black/8 bg-[#fbfaf6]">
        <div data-stagger className="mobile-trust-grid site-container grid grid-cols-2 divide-x divide-y divide-black/8 py-2 md:grid-cols-4 md:divide-y-0">
          {[ [Truck, "Karachi delivery", "Local, careful and trackable"], [BadgeCheck, "Original product", "Direct from our factory"], [Headphones, "Expert colour help", "Real advice before you buy"], [ShieldCheck, "Quality assured", "Made for Karachi’s climate"] ].map(([Icon, title, copy]) => {
            const TrustIcon = Icon as typeof Truck;
            return <div key={String(title)} className="flex items-center gap-3 px-3 py-5 sm:px-6"><TrustIcon size={20} strokeWidth={1.5} className="shrink-0 text-[#d71920]" /><div><p className="text-[11px] font-bold sm:text-xs">{String(title)}</p><p className="mt-0.5 hidden text-[10px] text-black/42 sm:block">{String(copy)}</p></div></div>;
          })}
        </div>
      </section>

      <section className="site-container py-20 lg:py-28">
        <div className="mb-10 flex items-end justify-between gap-5 lg:mb-14">
          <div><p className="eyebrow">Shop by project</p><h2 className="section-title mt-4">Where will colour<br className="hidden sm:block" /> take you?</h2></div>
          <Link href="/shop" className="button-outline hidden sm:inline-flex">Explore the range <ArrowRight size={14} /></Link>
        </div>
        <div data-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => (
            <Link href={collection.href} key={collection.label} className={`project-card group relative h-full overflow-hidden rounded-[26px] ${collection.tone}`}>
              <div className="project-card-media relative aspect-[.88] overflow-hidden sm:aspect-[.92]"><Image src={collection.image} alt={collection.label} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover" /><div className="project-card-scrim absolute inset-0" /></div>
              <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white"><p className="mb-2 text-[9px] font-bold uppercase tracking-[.15em] text-white/85">{collection.label}</p><div className="flex items-end justify-between gap-3"><h3 className="max-w-[210px] font-display text-[26px] leading-[1.03] text-white">{collection.title}</h3><span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#d71920] text-white shadow-lg transition duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-[#101010]"><ArrowRight size={15} /></span></div></div>
            </Link>
          ))}
        </div>
        <Link href="/shop" className="button-outline mt-6 w-full sm:hidden">Explore the range <ArrowRight size={14} /></Link>
      </section>

      <section className="bg-[#f0eee7] py-20 lg:py-28">
        <div className="site-container">
          <div className="mb-10 flex items-end justify-between gap-5"><div><p className="eyebrow">The most trusted tins</p><h2 className="section-title mt-4">Best of Final Touch.</h2></div><Link href="/shop" className="hidden items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider underline decoration-black/25 underline-offset-8 sm:flex">Shop every finish <ArrowRight size={13} /></Link></div>
          <div data-stagger className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">{featured.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 4} />)}</div>
        </div>
      </section>

      <PaintSystemStory />

      <section className="grid bg-[#101010] text-white lg:grid-cols-2">
        <div data-reveal="left" className="relative min-h-[470px] overflow-hidden lg:min-h-[720px]"><Image src="/images/editorial/painter.jpg" alt="Professional painter working on an exterior renovation" fill sizes="(max-width: 1024px) 100vw, 50vw" data-parallax="0.035" className="object-cover" /><div className="absolute inset-0 bg-[#d71920]/15 mix-blend-multiply" /><div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-[9px] font-bold uppercase tracking-[.13em] text-[#101010] backdrop-blur">Built for local weather</div></div>
        <div data-reveal="right" className="flex items-center px-7 py-16 sm:px-14 lg:px-[9vw] lg:py-24">
          <div className="max-w-xl"><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#d71920]">Protection, perfected</p><h2 className="mt-5 font-display text-[clamp(3.2rem,6vw,6rem)] leading-[.9] tracking-[-.05em]">Beautiful today.<br /><em>Brilliant for years.</em></h2><p className="mt-7 text-sm leading-7 text-white/62">From humid coastlines to dry summer heat, our coatings are tested for the conditions your walls actually face—not laboratory weather somewhere else.</p>
            <div data-stagger className="mt-9 grid grid-cols-2 gap-x-7 gap-y-6">
              {[ ["UV lock", "Resists fading"], ["Rain shield", "Fights water ingress"], ["Easy clean", "Wipes without shine"], ["Low odour", "More comfortable rooms"] ].map(([title, copy]) => <div key={title} className="border-t border-white/18 pt-4"><p className="font-display text-xl">{title}</p><p className="mt-1 text-[11px] text-white/45">{copy}</p></div>)}
            </div><Link href="/shop?category=Exterior+Paints" className="button-primary mt-10">Explore exterior protection <ArrowRight size={14} /></Link></div>
        </div>
      </section>

      <section className="site-container py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <div data-reveal="left"><p className="eyebrow">The colour edit</p><h2 className="section-title mt-4">A shade for<br />your story.</h2><p className="mt-6 max-w-md text-sm leading-6 text-black/53">Start with eight deeply liveable shades, then explore hundreds more across our emulsion, weather and enamel cards.</p><Link href="/shop?category=Interior+Paints" className="button-dark mt-7">Find your finish <ArrowRight size={14} /></Link></div>
          <div data-stagger className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {shades.map(([name, color], index) => <Link key={name} href={`/shop?q=${encodeURIComponent(name)}`} className={`group flex aspect-[.82] flex-col justify-end rounded-2xl p-4 transition hover:-translate-y-1 ${index === 7 ? "text-white" : "text-[#101010]"}`} style={{ backgroundColor: color }}><span className="translate-y-1 text-xs font-bold transition group-hover:translate-y-0">{name}</span><span className="mt-1 text-[9px] uppercase tracking-wider opacity-0 transition group-hover:opacity-60">Explore shade</span></Link>)}
          </div>
        </div>
      </section>

      <RoomColourPreview />

      <section className="site-container py-20 lg:py-28">
        <div data-reveal className="relative overflow-hidden rounded-[24px] bg-[#d71920] px-6 py-10 text-white sm:rounded-[30px] sm:px-12 lg:px-16 lg:py-14">
          <div className="absolute -bottom-28 -right-12 size-80 rounded-full border-[55px] border-white/10" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div><p className="mb-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-white/75">Planning a full project?</p><h2 className="max-w-4xl font-display text-[clamp(2.5rem,5vw,5rem)] leading-[.92] tracking-[-.045em]">Measure once. Buy the right amount.</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-white/70">Our calculator turns room dimensions, coats and surface type into a practical litre estimate—plus a little allowance for touch-ups.</p></div>
            <div className="flex flex-wrap gap-3 lg:flex-col"><Link href="/calculator" className="button-dark"><Ruler size={15} /> Calculate my paint</Link><a href="tel:+9221111112222" className="button-light"><Headphones size={15} /> Ask an expert</a></div>
          </div>
        </div>
      </section>

      <section className="bg-[#ebe4da] py-20 lg:py-28">
        <div className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div data-reveal="left"><p className="eyebrow">On real projects</p><h2 className="section-title mt-4">Trusted from<br />first coat.</h2><div className="mt-7 flex items-center gap-3"><div className="flex text-[#bd8c27]">{[1,2,3,4,5].map((i) => <Star key={i} size={17} fill="currentColor" />)}</div><span className="text-xs font-bold">4.8 average rating</span></div></div>
          <div data-stagger className="grid gap-4 md:grid-cols-2">
            {[ ["The finish looks genuinely premium", "Used Moonflower in our lounge. Two coats covered beautifully and marks wipe off without leaving shiny patches.", "Ayesha R. · Gulshan-e-Iqbal"], ["Roof is cooler and dry", "Applied two cross coats before monsoon. No seepage so far and the upstairs rooms feel noticeably cooler.", "Imran K. · DHA Karachi"] ].map(([title, quote, author]) => <blockquote key={title} className="rounded-[24px] bg-[#fbfaf6] p-7 sm:p-9"><BadgeCheck size={22} className="text-[#d71920]" /><p className="mt-6 font-display text-2xl leading-tight">“{title}”</p><p className="mt-4 text-sm leading-6 text-black/50">{quote}</p><footer className="mt-6 text-[10px] font-bold uppercase tracking-[.12em]">{author}<span className="ml-2 text-[#d71920]">Verified buyer</span></footer></blockquote>)}
          </div>
        </div>
      </section>

      <section className="grid min-h-[500px] lg:grid-cols-2">
        <div data-reveal="left" className="flex items-center bg-[#d71920] px-7 py-16 text-white sm:px-14 lg:px-[8vw]"><div className="max-w-xl"><PaintRoller size={30} strokeWidth={1.4} /><p className="mt-7 text-[10px] font-extrabold uppercase tracking-[.18em] text-white/60">For builders & contractors</p><h2 className="mt-4 font-display text-[clamp(3rem,5vw,5.5rem)] leading-[.9] tracking-[-.05em]">Pro products.<br />Project pricing.</h2><p className="mt-6 text-sm leading-6 text-white/70">Get technical guidance, bulk estimates and reliable Final Touch supply across decorative systems, primers and exterior protection.</p><Link href="/shop?view=list" className="button-light mt-8">Shop the Final Touch range <ArrowRight size={14} /></Link></div></div>
        <div data-reveal="right" className="relative min-h-[440px] overflow-hidden"><Image src="/images/editorial/contractor.jpg" alt="Professional exterior painting project" fill sizes="(max-width: 1024px) 100vw, 50vw" data-parallax="0.03" className="object-cover" /></div>
      </section>
    </>
  );
}
