import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { CartProvider } from "@/components/cart-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ScrollEffects } from "@/components/scroll-effects";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://finaltouch.pk"),
  title: { default: "Final Touch Paints Karachi | Colour Made to Last", template: "%s | Final Touch Karachi" },
  description: "Shop premium interior and exterior paints, enamels, primers, waterproofing and professional supplies with delivery across Karachi, Sindh.",
  keywords: ["paint Karachi", "paint delivery Karachi", "Final Touch paints", "exterior paint Karachi", "interior emulsion", "waterproofing Karachi", "Alliance Paints Sindh"],
  openGraph: {
    title: "Final Touch Paints Karachi — Colour Made to Last",
    description: "Premium coatings for Karachi homes, renovations and professional construction, delivered within Karachi only.",
    images: ["/images/editorial/hero-room.jpg"],
    type: "website",
  },
  icons: { icon: "/images/brand/alliance-mark.png", apple: "/images/brand/alliance-mark.png" },
};

export const viewport: Viewport = { themeColor: "#d71920", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <ScrollEffects />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
