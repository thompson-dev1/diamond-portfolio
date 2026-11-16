import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MotionProvider } from "@/components/providers/MotionProvider";

import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { site } from "@/lib/site";
import { initialThemeScript, themeColors } from "@/lib/theme";
import "./globals.css";

export const viewport = {
  themeColor: themeColors.dark,
};

export const metadata: Metadata = {
  title: {
    default: site.title,
    template: `%s · ${site.brand}`,
  },
  description: site.description,
  icons: { icon: { url: "/diamond-icon.png", type: "image/png", sizes: "128x128" } },
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
    siteName: site.brand,
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
    brand: { "@type": "Brand", name: site.brand },
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initialThemeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Manrope:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
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
