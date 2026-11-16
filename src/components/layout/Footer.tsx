"use client";

import { m, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { DiamondMark } from "@/components/ui/DiamondMark";
import { site } from "@/lib/site";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const inView = useInView(footerRef, { once: true, margin: "-5%" });

  return (
    <footer
      ref={footerRef}
      className="border-t border-luxe-edge/[0.08] bg-luxe-footer px-5 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-7 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="flex items-center gap-3 font-display text-[1.65rem] uppercase tracking-[0.12em] text-luxe-white md:text-3xl">
            <DiamondMark className="size-9" />
            {site.brand}
          </p>
          <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.42em] text-luxe-muted">
            {site.name} · Modeling · Beauty · Technology
          </p>
          <m.div
            className="editorial-rule mt-10 max-w-[11rem]"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{
              delay: 0.3,
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformOrigin: "left" }}
          />
        </m.div>

        <m.nav
          aria-label="Social and contact"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <ul className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-4">
            <li>
              <Link
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-11 items-center justify-center rounded-sm text-luxe-gold focus-visible:outline focus-visible:outline-luxe-gold transition-transform duration-500 hover:scale-110 md:text-luxe-muted md:hover:text-luxe-gold"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href={site.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex size-11 items-center justify-center rounded-sm text-luxe-gold focus-visible:outline focus-visible:outline-luxe-gold transition-transform duration-500 hover:scale-110 md:text-luxe-muted md:hover:text-luxe-gold"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href={`https://www.facebook.com/search/people/?q=${encodeURIComponent(site.social.facebook)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Search Facebook for ${site.social.facebook}`}
                className="flex min-h-11 items-center gap-2 rounded-sm px-2 text-luxe-gold transition-colors focus-visible:outline focus-visible:outline-luxe-gold md:text-luxe-muted md:hover:text-luxe-gold"
              >
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="text-sm">{site.social.facebook}</span>
              </Link>
            </li>
            <li>
              <Link
                href={site.social.snapchat}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Snapchat"
                className="flex size-11 items-center justify-center rounded-sm text-luxe-gold focus-visible:outline focus-visible:outline-luxe-gold transition-transform duration-500 hover:scale-110 md:text-luxe-muted md:hover:text-luxe-gold"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.126 1.487c-.895 0-1.874.195-2.738.563-1.428.608-2.316 1.701-2.613 3.013-.19.83-.176 1.716-.145 2.518.005.14.01.272.012.392-.09.055-.262.155-.426.251-.274.161-.599.351-.832.484-.509.288-.637.525-.634.708.004.285.341.516.892.61.127.022.285.04.456.058.455.048 1.109.117 1.405.31.134.088.19.227.185.459a4.896 4.896 0 0 1-.16.963 8.32 8.32 0 0 1-.397 1.136c-.198.441-.453.906-.708 1.341-.577.986-1.157 1.977-.852 2.656.126.282.35.485.642.585.31.107.697.106 1.096.069.458-.041.97-.132 1.442-.218.497-.091 1.054-.193 1.58-.193.189 0 .348.016.483.045l.08.02c.076.019.259.071.492.203.218.123.513.332.846.611.391.328.78.718 1.05.908.15.105.309.155.45.155h.005c.141 0 .298-.05.449-.155.269-.19.658-.58 1.05-.908.332-.279.627-.488.845-.611.234-.132.417-.184.493-.203l.08-.02c.135-.029.294-.045.483-.045.526 0 1.083.102 1.58.193.473.086.984.177 1.443.218.398.037.785.038 1.096-.069.292-.1.515-.303.641-.585.306-.679-.275-1.67-.852-2.656-.255-.435-.51-.9-.708-1.341a8.318 8.318 0 0 1-.397-1.136 4.887 4.887 0 0 1-.16-.963c-.005-.232.051-.371.185-.459.296-.193.95-.262 1.405-.31.171-.018.329-.036.456-.058.55-.094.888-.325.892-.61.003-.183-.125-.42-.634-.708-.233-.133-.558-.323-.832-.484-.164-.096-.336-.196-.426-.251.002-.12.007-.252.012-.392.031-.802.045-1.688-.145-2.518-.297-1.312-1.185-2.405-2.613-3.013-.865-.368-1.844-.563-2.738-.563z"/>
                </svg>
              </Link>
            </li>
            <li>
              <Link
                href={`mailto:${site.email}`}
                aria-label="Email"
                className="flex size-11 items-center justify-center rounded-sm text-luxe-gold focus-visible:outline focus-visible:outline-luxe-gold transition-transform duration-500 hover:scale-110 md:text-luxe-muted md:hover:text-luxe-gold"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </Link>
            </li>
            <li className="py-2 text-sm text-luxe-muted">
              WhatsApp <span className="text-luxe-gold">{site.social.whatsapp}</span>
            </li>
          </ul>
        </m.nav>
      </div>
      <m.p
        className="mx-auto mt-10 max-w-[1440px] lg:mt-16 font-sans text-[9px] uppercase tracking-[0.32em] text-luxe-muted/75"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        © {new Date().getFullYear()} {site.brand}. All rights reserved.
      </m.p>
    </footer>
  );
}
