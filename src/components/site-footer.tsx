import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[#080808] text-white">
      <div data-stagger className="site-container grid gap-10 border-b border-white/10 py-14 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-20">
        <div className="max-w-sm">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-14 place-items-center rounded-full bg-white"><Image src="/images/brand/alliance-mark.png" alt="Alliance Paints" width={48} height={48} /></span>
            <span><span className="block font-display text-3xl font-bold">Final Touch</span><span className="text-[9px] uppercase tracking-[.25em] text-white/50">by Alliance Paints Industries</span></span>
          </Link>
          <p className="mt-6 text-sm leading-6 text-white/58">Better colour. Stronger protection. Trusted coatings and expert support for Karachi homes, renovations and construction projects.</p>
          <div className="mt-6 flex gap-2"><a className="footer-social" href="#" aria-label="Instagram"><Camera size={17} /></a><a className="footer-social" href="#" aria-label="Facebook"><MessageCircle size={17} /></a><a className="footer-social" href="mailto:sales@alliancepaintsindustries.com" aria-label="Email"><Mail size={17} /></a></div>
        </div>
        <div>
          <p className="footer-heading">Shop</p>
          <ul className="footer-links"><li><Link href="/shop?category=Interior+Paints">Interior paints</Link></li><li><Link href="/shop?category=Exterior+Paints">Exterior paints</Link></li><li><Link href="/shop?category=Waterproofing">Waterproofing</Link></li><li><Link href="/shop?category=Enamels">Wood & metal</Link></li><li><Link href="/shades">Shade library</Link></li><li><Link href="/shop?category=Tools+%26+Applicators">Tools & applicators</Link></li></ul>
        </div>
        <div>
          <p className="footer-heading">Professionals</p>
          <ul className="footer-links"><li><Link href="/calculator">Paint calculator</Link></li><li><Link href="/shop?view=list">Professional list view</Link></li><li><Link href="/shop?category=Primers+%26+Sealers">Primers & preparation</Link></li><li><Link href="/admin">Dealer & admin portal</Link></li><li><a href="https://alliancepaintsindustries.com/became-a-dealer/">Become a dealer <ArrowUpRight size={12} className="inline" /></a></li><li><a href="https://alliancepaintsindustries.com/contact-us/">Technical support</a></li></ul>
        </div>
        <div>
          <p className="footer-heading">Talk to us</p>
          <ul className="space-y-4 text-sm leading-5 text-white/58">
            <li className="flex gap-3"><Phone size={17} className="mt-0.5 shrink-0 text-[#ff4a4f]" /><a href="tel:+9221111112222">+92 21 111 112 222<br /><span className="text-xs text-white/35">Mon–Sat, 9am–6pm</span></a></li>
            <li className="flex gap-3"><Mail size={17} className="mt-0.5 shrink-0 text-[#ff4a4f]" /><a href="mailto:sales@alliancepaintsindustries.com" className="break-all">sales@alliancepaintsindustries.com</a></li>
            <li className="flex gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-[#ff4a4f]" /><span>Karachi, Sindh, Pakistan<br /><span className="text-xs text-white/35">Delivery within Karachi only</span></span></li>
          </ul>
        </div>
      </div>
      <div className="site-container flex flex-col gap-3 py-6 text-[11px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Alliance Paints Industries. All rights reserved.</p>
        <div className="flex gap-5"><Link href="#">Delivery & returns</Link><Link href="#">Privacy</Link><Link href="#">Terms</Link></div>
      </div>
    </footer>
  );
}
