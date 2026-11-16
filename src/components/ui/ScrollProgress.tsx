"use client";

import { m, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <m.div
      className="pointer-events-none fixed left-0 top-0 z-[100] h-[2px] w-full origin-left"
      style={{ scaleX }}
      aria-hidden
    >
      <div className="h-full w-full bg-gradient-to-r from-luxe-gold via-[#e8d5b0] to-luxe-gold/70 shadow-[0_0_24px_rgba(198,161,91,0.35)]" />
    </m.div>
  );
}
