"use client";

import {
  m,
  useScroll,
  useMotionTemplate,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "#about", label: "About" },
  { href: "#technology", label: "Technology" },
  { href: "#work", label: "Modeling & Beauty" },
  { href: "#campaigns", label: "Campaigns" },
  { href: "#reel", label: "Reel" },
];
const contactLink = { href: "#contact", label: "Contact" };

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative py-1 font-sans text-[10px] uppercase tracking-[0.38em] text-luxe-muted transition-colors duration-500 hover:text-luxe-white"
    >
      <span>{label}</span>
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-luxe-gold to-luxe-gold/40 transition-transform duration-500 ease-luxe group-hover:scale-x-100" />
    </Link>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    if (!menuOpen) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    if (desktop.matches) {
      setMenuOpen(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("mobile-menu-toggle")?.focus();
      }
    };
    desktop.addEventListener("change", closeOnDesktop);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const backdrop = useTransform(scrollY, [0, 140], [0, 0.94]);
  const blurPx = useTransform(scrollY, [0, 120], [0, 14]);
  const border = useTransform(scrollY, [0, 90], [0, 0.18]);
  const background = useMotionTemplate`rgba(7,7,7,${backdrop})`;
  const borderColor = useMotionTemplate`rgba(198,161,91,${border})`;
  const backdropBlur = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <>
      <m.header
        className="fixed inset-x-0 top-0 z-50 border-b border-transparent"
        style={{
          backgroundColor: background,
          borderColor,
          backdropFilter: backdropBlur,
          WebkitBackdropFilter: backdropBlur,
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-2 sm:px-6 lg:px-10 lg:py-5 xl:px-12">
          {/* Logo */}
          <Link
            href="/"
            className="group relative font-display text-[1.35rem] tracking-[0.14em] text-luxe-gold md:text-[1.5rem]"
          >
            <span className="relative z-10">{site.firstName}</span>
            <span className="text-luxe-muted transition-colors duration-500 group-hover:text-luxe-gold/80">
              .
            </span>
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-luxe-gold/80 to-transparent transition-all duration-700 group-hover:w-full" />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-6 lg:flex xl:gap-10">
            {links.map((l, i) => (
              <m.li
                key={l.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5 + i * 0.08,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <NavLink href={l.href} label={l.label} />
              </m.li>
            ))}
          </ul>

          {/* CTA button */}
          <m.div
            className="hidden lg:block"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <Link
              href={contactLink.href}
              className="group relative inline-flex min-h-11 items-center overflow-hidden rounded-sm border border-white/[0.12] px-5 font-sans text-[9px] uppercase tracking-[0.32em] text-luxe-white transition-colors duration-500 hover:border-luxe-gold/35"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-luxe-gold transition-transform duration-700 ease-luxe group-hover:scale-x-100" />
              <span className="relative z-10 transition-colors duration-500 group-hover:text-[#0a0a0a]">
                {contactLink.label}
              </span>
            </Link>
          </m.div>

          {/* Mobile menu button */}
          <button
            type="button"
            id="mobile-menu-toggle"
            className="flex size-11 flex-col items-center justify-center gap-[5px] rounded-sm focus-visible:outline focus-visible:outline-luxe-gold lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls={menuOpen ? "mobile-menu" : undefined}
          >
            <m.span
              className="block h-px w-6 bg-luxe-white"
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <m.span
              className="block h-px w-6 bg-luxe-white"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <m.span
              className="block h-px w-6 bg-luxe-white"
              animate={
                menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3 }}
            />
          </button>
        </nav>
      </m.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-menu"
            className="fixed inset-0 z-40 overflow-y-auto overscroll-y-contain bg-[#070707]/98 backdrop-blur-lg lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <nav aria-label="Mobile menu" className="mx-auto flex min-h-full max-w-lg flex-col items-center justify-center gap-2 px-5 pb-6 pt-20 sm:gap-3">
              {[...links, contactLink].map((l, i) => (
                <m.div
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={l.href}
                    className="inline-flex min-h-11 items-center rounded-sm px-3 text-center font-display text-xl tracking-[0.12em] text-luxe-white transition-colors duration-500 hover:text-luxe-gold focus-visible:outline focus-visible:outline-luxe-gold sm:text-2xl"
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label}
                  </Link>
                </m.div>
              ))}
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
