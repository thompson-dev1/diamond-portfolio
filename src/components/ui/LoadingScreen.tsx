"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setDone(true), 220);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <m.div
          className="pointer-events-none fixed inset-0 z-[300] flex flex-col items-center justify-center gap-10 bg-[#070707] motion-reduce:hidden"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <m.p
            className="font-display text-[clamp(1.75rem,6vw,2.75rem)] tracking-[0.35em] text-luxe-white"
            initial={{ opacity: 0, letterSpacing: "0.9em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {site.firstName}
          </m.p>
          <div className="relative h-px w-40 overflow-hidden bg-white/[0.08]">
            <m.span
              className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-luxe-gold to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "220%" }}
              transition={{
                duration: 1.35,
                ease: [0.22, 1, 0.36, 1],
                repeat: Infinity,
                repeatDelay: 0.25,
              }}
            />
          </div>
          <p className="font-sans text-[9px] uppercase tracking-[0.55em] text-luxe-muted">
            Loading portfolio
          </p>
        </m.div>
      )}
    </AnimatePresence>
  );
}
