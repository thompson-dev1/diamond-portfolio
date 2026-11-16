"use client";

import { m, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 28, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 280, damping: 28, mass: 0.35 });

  useEffect(() => {
    const coarse =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;

    const interactive = "a, button, [data-cursor-hover]";

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setHovering(!!el?.closest(interactive));
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  return (
    <>
      <m.div
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden mix-blend-difference md:block"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 1.35 : 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="h-3 w-3 rounded-full border border-luxe-gold/90 bg-luxe-gold/20" />
      </m.div>
      <m.div
        className="pointer-events-none fixed left-0 top-0 z-[199] hidden md:block"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0 }}
      >
        <div className="h-10 w-10 rounded-full border border-white/15" />
      </m.div>
    </>
  );
}
