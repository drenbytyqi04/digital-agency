import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Cursor } from "@/components/layout/Cursor";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Preloader } from "@/components/layout/Preloader";

/* Editorial serif display + technical grotesk + mono labels.
   `display: swap` prevents invisible text while the face loads. */
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Digital Studio · Design · Development`,
    template: `%s — ${site.name}`,
  },
  description:
    "We create high-performing websites, powerful brands and digital experiences designed to turn visitors into customers.",
  keywords: [...site.seo.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Digital Studio`,
    description: site.positioning,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Digital Studio`,
    description: site.positioning,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  // Zoom is never disabled.
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    url: site.url,
    description: site.positioning,
    slogan: site.tagline,
    ...(site.contact.email ? { email: site.contact.email } : {}),
    sameAs: site.socials.map((s) => s.href).filter((h) => h !== "#"),
  };

  return (
    <html
      lang="en"
      className={`${instrument.variable} ${interTight.variable} ${jetbrains.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          // Serialised config data, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-void"
        >
          Skip to main content
        </a>
        <Preloader />
        <SmoothScroll />
        <ScrollProgress />
        <Cursor />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
