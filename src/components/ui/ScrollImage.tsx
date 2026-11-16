"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function ScrollImage({
  children,
  onEntry = false,
}: {
  children: ReactNode;
  onEntry?: boolean;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: frame,
    offset: onEntry ? ["start end", "start start"] : ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], onEntry ? [1.18, 1] : [1.02, 1.16]);
  const y = useTransform(scrollYProgress, [0, 1], onEntry ? ["-4%", "0%"] : ["0%", "4%"]);

  return (
    <div ref={frame} className="absolute inset-0">
      <m.div
        className="absolute inset-0 origin-[center_30%]"
        style={reduceMotion ? undefined : { scale, y }}
      >
        {children}
      </m.div>
    </div>
  );
}
