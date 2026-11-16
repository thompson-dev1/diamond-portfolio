"use client";

import {
  m,
  useScroll,
  useMotionTemplate,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ThemeControl } from "@/components/layout/ThemeControl";
import { site } from "@/lib/site";

const links = [
  { href: "#about", label: "About" },
  { href: "#technology", label: "Technology" },
  { href: "#projects", label: "Projects" },
  { href: "#work", label: "Modeling & Beauty" },
  { href: "#campaigns", label: "Campaigns" },
  { href: "#reel", label: "Reel" },
  { href: "#cv", label: "CV" },
];
const contactLink = { href: "#contact", label: "Contact" };

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group relative py-1 font-sans text-[10px] uppercase tracking-[0.19em] xl:tracking-[0.27em] text-luxe-muted transition-colors duration-500 hover:text-luxe-white"
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
  const background = useMotionTemplate`rgb(var(--luxe-bg) / ${backdrop})`;
  const borderColor = useMotionTemplate`rgb(var(--luxe-gold) / ${border})`;
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
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-1.5 sm:gap-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Logo */}
          <Link
            href="/"
            aria-label={`${site.brand} home`}
            className="inline-flex min-h-11 shrink-0 items-center rounded-sm focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-luxe-gold"
          >
            <Image
              src="/diamond-logo.webp"
              alt=""
              width={336}
              height={224}
              unoptimized
              loading="eager"
              className="h-auto w-16 sm:w-[4.5rem] lg:w-20"
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-4 lg:flex xl:gap-7">
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

          <div className="flex shrink-0 items-center gap-1 sm:gap-2 lg:gap-3">
            <ThemeControl />
            <Link
              href={contactLink.href}
              className="group relative hidden min-h-11 items-center overflow-hidden rounded-sm border border-luxe-edge/[0.12] px-4 font-sans text-[9px] uppercase tracking-[0.25em] text-luxe-white transition-colors duration-500 hover:border-luxe-gold/35 lg:inline-flex xl:px-5"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-luxe-gold transition-transform duration-700 ease-luxe group-hover:scale-x-100" />
              <span className="relative z-10 transition-colors duration-500 group-hover:text-luxe-on-gold">
                {contactLink.label}
              </span>
            </Link>
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
          </div>
        </nav>
      </m.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-menu"
            className="fixed inset-0 z-40 overflow-y-auto overscroll-y-contain bg-luxe-bg/98 backdrop-blur-lg lg:hidden"
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
