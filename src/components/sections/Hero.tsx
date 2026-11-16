"use client";

import { m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ScrollImage } from "@/components/ui/ScrollImage";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

/* Cinematic stagger — each element fades up with increasing delay */
const cinema = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4 + i * 0.14,
      duration: 0.82,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/* Reveal line animation */
const lineReveal = {
  hidden: { scaleX: 0 },
  visible: (i: number) => ({
    scaleX: 1,
    transition: {
      delay: 0.65 + i * 0.12,
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const initialReveal = reduceMotion ? false : "hidden";

  return (
    <section className="hero-section relative overflow-hidden bg-luxe-bg">
      <div className="hero-art absolute inset-0">
        <ScrollImage>
          <Image
            src={photos.blackDressStanding}
            alt={`${site.name} in a black dress standing in a spotlight`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_22%]"
          />
        </ScrollImage>
        <div className="hero-night-shade pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-luxe-bg opacity-70" />
          <div className="absolute inset-0 bg-vignette opacity-[0.92]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-luxe-gold/10" />
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-luxe-bg via-luxe-bg/80 to-transparent" />
        </div>
        <div className="hero-day-shade pointer-events-none absolute inset-0 hidden" />
      </div>

      {/* Main content */}
      <div className="hero-content relative z-[11] mx-auto flex min-h-[100dvh] max-w-[1200px] flex-col items-center justify-center px-5 pb-16 pt-20 text-center sm:px-6 sm:pb-20 sm:pt-24 md:px-12 md:pb-24 md:pt-28">
        {/* Location */}
        <m.div
          custom={0}
          variants={cinema}
          initial={initialReveal}
          animate="visible"
          className="hero-location mb-4 flex flex-col items-center gap-5 md:mb-6"
        >
          <div className="flex items-center gap-3">
            <m.span
              className="editorial-rule w-10 sm:w-16 md:w-24"
              custom={0}
              variants={lineReveal}
              initial={initialReveal}
              animate="visible"
              style={{ transformOrigin: "right" }}
            />
            <p className="text-[10px] uppercase tracking-editorial text-luxe-muted md:text-[11px]">
              {site.location}
            </p>
            <m.span
              className="editorial-rule w-10 scale-x-[-1] sm:w-16 md:w-24"
              custom={1}
              variants={lineReveal}
              initial={initialReveal}
              animate="visible"
              style={{ transformOrigin: "left" }}
            />
          </div>
        </m.div>

        <m.h1
          custom={1}
          variants={cinema}
          initial={initialReveal}
          animate="visible"
          className="hero-wordmark bg-gradient-to-br from-[#f0e6d0] via-[#e0c88a] to-luxe-gold bg-clip-text pb-1 font-display text-[clamp(2.65rem,10.5vw,8.25rem)] font-medium uppercase leading-none tracking-[0.035em] text-transparent"
        >
          {site.brand}
        </m.h1>

        <m.p
          custom={2}
          variants={cinema}
          initial={initialReveal}
          animate="visible"
          className="mt-2 font-display text-[clamp(1.1rem,3.5vw,1.65rem)] font-normal tracking-[0.08em] text-luxe-white md:mt-4"
        >
          {site.name}
        </m.p>

        {/* Tagline */}
        <m.p
          custom={3}
          variants={cinema}
          initial={initialReveal}
          animate="visible"
          className="hero-tagline mx-auto mt-3 max-w-md font-sans text-[13px] leading-relaxed text-luxe-white/75 md:mt-5 md:text-sm"
        >
          Fashion and beauty model with a focus on web development and IT operations.
        </m.p>

        {/* Portfolio links */}
        <m.div
          custom={4}
          variants={cinema}
          initial={initialReveal}
          animate="visible"
          className="hero-links mt-6 flex w-full flex-wrap justify-center gap-2.5 sm:mt-9 md:mt-11 md:gap-4"
        >
          <Link
            href="#work"
            className="group relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-sm gold-ring-soft px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-luxe-on-gold transition-colors duration-700 sm:px-4 md:px-7 md:py-4 md:text-[11px] md:text-luxe-white md:hover:text-luxe-on-gold"
          >
            <span aria-hidden="true" className="absolute inset-0 bg-luxe-white/[0.04]" />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-luxe-gold/25 via-transparent to-luxe-gold/10 opacity-100 transition-opacity duration-700 md:opacity-0 md:group-hover:opacity-100" />
            <span className="relative z-10">Modeling &amp; Beauty</span>
            <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-100 bg-luxe-gold transition-transform duration-[850ms] ease-luxe md:scale-x-0 md:group-hover:scale-x-100" />
          </Link>
          <Link
            href="#technology"
            className="inline-flex min-h-11 items-center justify-center rounded-sm border border-luxe-gold/40 bg-luxe-bg-elevated/50 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-luxe-white transition-colors duration-500 hover:border-luxe-gold hover:bg-luxe-gold/15 sm:px-4 md:px-7 md:py-4 md:text-[11px]"
          >
            Education &amp; Technology
          </Link>
        </m.div>

        <div
          className="hero-scroll-hint pointer-events-none absolute bottom-4 left-1/2 z-[11] flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-8"
          aria-hidden="true"
        >
          <span className="font-sans text-[9px] uppercase tracking-[0.42em] text-luxe-muted">
            Scroll
          </span>
          <div className="h-6 w-px bg-gradient-to-b from-luxe-gold/65 to-transparent motion-safe:animate-scroll-hint md:h-12" />
        </div>
      </div>
    </section>
  );
}
