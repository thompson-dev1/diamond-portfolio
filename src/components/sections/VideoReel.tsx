"use client";

import {
  m,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { photos } from "@/lib/photos";

const REEL_FRAMES = [
  { src: photos.blackDressSeated, position: "center 18%" },
  { src: photos.whiteSuitSeated, position: "center 25%" },
  { src: photos.redDressStudio, position: "center top" },
  { src: photos.ivoryOneShoulder, position: "center 8%" },
  { src: photos.yellowGownHallway, position: "center 30%" },
  { src: photos.goldenHourDriveway, position: "center 34%" },
  { src: photos.warmInteriorPortrait, position: "center 23%" },
];

export function VideoReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const frame = REEL_FRAMES[playing ? currentIndex : 0];
  const reelInView = useInView(sectionRef);
  const contentInView = useInView(contentRef, { once: true, margin: "-15%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Parallax background */
  const rawY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.06, 1.12]);
  const y = useSpring(rawY, { stiffness: 40, damping: 18 });
  const bgScale = useSpring(rawScale, { stiffness: 40, damping: 18 });

  /* Overlay intensifies as you approach */
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.95, 0.7, 0.7, 0.95]);

  useEffect(() => {
    if (!playing || !reelInView) return;

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REEL_FRAMES.length);
    }, 1400);
    return () => window.clearInterval(interval);
  }, [playing, reelInView]);

  const toggle = () => {
    if (playing) setCurrentIndex(0);
    setPlaying(!playing);
  };

  return (
    <section
      ref={sectionRef}
      id="reel"
      className="relative flex min-h-[max(23rem,85svh)] items-center justify-center overflow-hidden border-t border-white/[0.06] bg-[#030303]"
    >
      {/* Parallax background */}
      <m.div
        className="absolute inset-[-10%]"
        style={{ y, scale: bgScale }}
      >
        {/* Dynamic Image Slideshow */}
        <AnimatePresence mode="popLayout">
          <m.div
            key={playing ? currentIndex : "poster"}
            initial={{ opacity: 0.5, scale: 1.05 }}
            animate={{ opacity: 0.88, scale: 1 }}
            exit={{ opacity: 0.5, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full"
          >
            <Image
              src={frame.src}
              alt="Editorial frame"
              fill
              loading="lazy"
              className="object-cover"
              style={{ objectPosition: frame.position }}
              sizes="100vw"
            />
          </m.div>
        </AnimatePresence>

        <m.div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-luxe-bg pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-vignette opacity-[0.88] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-luxe-gold/10 pointer-events-none" />
      </m.div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex max-w-[720px] flex-col items-center px-5 py-12 text-center sm:px-6"
      >
        <m.h2
          className="font-display text-[clamp(2.35rem,5.5vw,4rem)] font-normal tracking-tight text-luxe-white"
          initial={{ opacity: 0, y: 35, filter: "blur(4px)" }}
          animate={
            contentInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : {}
          }
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Fashion &amp; Beauty Reel
        </m.h2>
        <m.p
          className="mt-6 font-sans text-sm leading-relaxed text-luxe-muted md:text-[15px]"
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.25 }}
        >
          A slideshow of studio portraits and on-location looks.
        </m.p>

        {/* Play button with pulse ring */}
        <m.button
          type="button"
          onClick={toggle}
          className="group relative mt-8 flex size-20 sm:mt-12 sm:size-[6.25rem] items-center justify-center rounded-full border border-luxe-gold/45 bg-luxe-gold/10 shadow-[0_0_80px_-20px_rgba(198,161,91,0.45)] backdrop-blur-md transition-all duration-700 md:border-white/[0.14] md:bg-black/35 md:hover:border-luxe-gold/45 md:hover:bg-luxe-gold/10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={contentInView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label={playing ? "Pause reel sequence" : "Play reel sequence"}
        >
          {/* Pulsing ring */}
          {!playing && (
            <m.span
              className="absolute inset-0 rounded-full border border-luxe-gold/30"
              animate={{ scale: [1, 1.3, 1.3], opacity: [0.5, 0, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          )}
          <span className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full border border-luxe-gold bg-luxe-gold text-luxe-bg shadow-inner transition-colors duration-700 md:border-luxe-gold/45 md:bg-transparent md:text-luxe-gold md:group-hover:border-luxe-gold md:group-hover:bg-luxe-gold md:group-hover:text-luxe-bg">
            {playing ? (
              <span className="flex gap-1">
                <span className="h-5 w-1 rounded-[1px] bg-current" />
                <span className="h-5 w-1 rounded-[1px] bg-current" />
              </span>
            ) : (
              <span className="ml-1 text-lg">▶</span>
            )}
          </span>
        </m.button>
      </div>
    </section>
  );
}
