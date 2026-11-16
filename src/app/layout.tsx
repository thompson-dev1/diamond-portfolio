import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MotionProvider } from "@/components/providers/MotionProvider";

import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport = {
  themeColor: "#070707",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "fashion model",
    "beauty modeling",
    "modeling portfolio",
    "web development",
    "IT operations",
    "information technology management",
    site.name,
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    description: site.description,
    url: site.url,
    jobTitle: "Fashion & Beauty Model",
    knowsAbout: ["Web Development", "IT Operations", "Information Technology Management"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Accra",
      addressCountry: "Ghana",
    },
    sameAs: [
      site.social.instagram,
      site.social.tiktok,
      site.social.snapchat,
    ],
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans font-normal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>
          <div className="relative z-[2]">
            <LoadingScreen />
            <ScrollProgress />

            <Navbar />
            {children}
            <Footer />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
