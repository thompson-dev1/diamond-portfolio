"use client";

import { m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ScrollImage } from "@/components/ui/ScrollImage";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

const parts = site.name.split(" ");

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
    <section className="relative overflow-hidden bg-luxe-bg">
      <div className="absolute inset-0">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-luxe-bg opacity-70" />
        <div className="absolute inset-0 bg-vignette opacity-[0.92]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-luxe-gold/10" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-luxe-bg via-luxe-bg/80 to-transparent" />
      </div>

      {/* Main content */}
      <div className="hero-content relative z-[11] mx-auto flex min-h-[100svh] max-w-[1200px] flex-col items-center justify-center px-5 pb-20 pt-24 text-center sm:px-6 md:px-12 md:pb-24 md:pt-28">
        {/* Location */}
        <m.div
          custom={0}
          variants={cinema}
          initial={initialReveal}
          animate="visible"
          className="hero-location mb-6 flex flex-col items-center gap-5 md:mb-10"
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

        {/* Name — split into two animated lines */}
        <div className="relative overflow-hidden">
          <m.h1
            className="font-display text-[clamp(3rem,12vw,9rem)] font-medium leading-[0.88] tracking-[-0.02em] text-luxe-white"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.01 }}
          >
            <m.span
              className="block bg-gradient-to-r from-[#f0e6d0] via-luxe-white to-[#e8d5b0] bg-clip-text font-light text-transparent"
              initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                delay: 0.48,
                duration: 0.82,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {parts[0]}
            </m.span>
            <m.span
              className="mt-1 block bg-gradient-to-br from-luxe-gold via-[#e0c88a] to-[#d4b06a] bg-clip-text font-semibold italic text-transparent md:mt-2"
              initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                delay: 0.62,
                duration: 0.82,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {parts.slice(1).join(" ")}
            </m.span>
          </m.h1>

          {/* Gold glow behind name */}
          <m.div
            aria-hidden
            className="pointer-events-none absolute -inset-8 -z-10 rounded-[50%] bg-gold-fade opacity-70 blur-3xl md:-inset-16"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.55, scale: 1 }}
            transition={{ delay: 1.2, duration: 2, ease: "easeOut" }}
          />
        </div>

        {/* Subtitle */}
        <m.p
          custom={2}
          variants={cinema}
          initial={initialReveal}
          animate="visible"
          className="hero-subtitle mt-6 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 font-sans text-[13px] tracking-[0.17em] text-luxe-white/85 md:mt-10 md:gap-x-4 md:text-sm md:tracking-[0.35em]"
        >
          <span>Modeling</span>
          <span aria-hidden="true" className="text-luxe-gold">·</span>
          <span>Beauty</span>
          <span aria-hidden="true" className="text-luxe-gold">·</span>
          <span>Technology</span>
        </m.p>

        {/* Tagline */}
        <m.p
          custom={3}
          variants={cinema}
          initial={initialReveal}
          animate="visible"
          className="hero-tagline mx-auto mt-4 max-w-md font-sans text-[13px] leading-relaxed text-luxe-white/75 md:mt-6 md:text-sm"
        >
          Fashion and beauty model with a focus on web development and IT operations.
        </m.p>

        {/* Portfolio links */}
        <m.div
          custom={4}
          variants={cinema}
          initial={initialReveal}
          animate="visible"
          className="hero-links mt-6 flex w-full flex-wrap justify-center gap-2 md:mt-9 md:gap-4"
        >
          <Link
            href="#work"
            className="group relative inline-flex min-h-11 items-center justify-center overflow-hidden rounded-sm gold-ring-soft px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-luxe-bg transition-colors duration-700 sm:px-4 md:px-7 md:py-4 md:text-[11px] md:text-luxe-white md:hover:text-luxe-bg"
          >
            <span className="absolute inset-0 bg-white/[0.04]" />
            <span className="absolute inset-0 bg-gradient-to-r from-luxe-gold/25 via-transparent to-luxe-gold/10 opacity-100 transition-opacity duration-700 md:opacity-0 md:group-hover:opacity-100" />
            <span className="relative z-10">Modeling &amp; Beauty</span>
            <span className="absolute inset-0 origin-left scale-x-100 bg-luxe-gold transition-transform duration-[850ms] ease-luxe md:scale-x-0 md:group-hover:scale-x-100" />
          </Link>
          <Link
            href="#technology"
            className="inline-flex min-h-11 items-center justify-center rounded-sm border border-luxe-gold/40 bg-black/35 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-luxe-white transition-colors duration-500 hover:border-luxe-gold hover:bg-luxe-gold/15 sm:px-4 md:px-7 md:py-4 md:text-[11px]"
          >
            Technology
          </Link>
        </m.div>
      </div>

      <div
        className="hero-scroll-hint pointer-events-none absolute bottom-5 left-1/2 z-[11] flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-8"
        aria-hidden="true"
      >
        <span className="font-sans text-[9px] uppercase tracking-[0.42em] text-luxe-muted">
          Scroll
        </span>
        <div className="h-8 w-px bg-gradient-to-b from-luxe-gold/65 to-transparent motion-safe:animate-scroll-hint md:h-12" />
      </div>
    </section>
  );
}
