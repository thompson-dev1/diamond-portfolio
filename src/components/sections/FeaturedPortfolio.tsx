"use client";

import { m, useInView, useReducedMotion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  galleryItems,
  type GalleryCategory,
  type GalleryItem,
} from "@/lib/gallery";
import { Lightbox } from "@/components/gallery/Lightbox";

const categories: (GalleryCategory | "All")[] = [
  "All",
  "Editorial",
  "Campaigns",
  "Beauty",
  "Runway",
];

/* Cinematic card reveal */
const cardReveal = {
  hidden: { opacity: 0, y: 60, scale: 0.97, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* Section heading reveal */
const headingReveal = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function MasonryItem({
  item,
  index,
  coverOffset,
  autoplay,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  coverOffset: number;
  autoplay: boolean;
  onOpen: (id: string, index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const visible = useInView(cardRef, { amount: 0.25 });
  const [photoOffset, setPhotoOffset] = useState(0);
  const imageCount = item.images.length;
  const currentIndex = (coverOffset + photoOffset) % imageCount;

  const handleNext = useCallback(() => {
    setPhotoOffset((offset) => (offset + 1) % imageCount);
  }, [imageCount]);

  const handlePrev = useCallback(() => {
    setPhotoOffset((offset) => (offset - 1 + imageCount) % imageCount);
  }, [imageCount]);

  useEffect(() => {
    if (!autoplay || !visible || imageCount <= 1) return;

    const timer = window.setTimeout(handleNext, 2400 + (index % 3) * 200);
    return () => window.clearTimeout(timer);
  }, [autoplay, visible, imageCount, index, handleNext, currentIndex]);

  /* Per-card parallax on scroll */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const smoothImgY = useSpring(imgY, { stiffness: 80, damping: 24 });

  /* Attach raw DOM touch listeners so we can use {passive:false} on touchmove.
     This is the ONLY way to call preventDefault() on mobile Safari to stop
     the browser from scrolling when the user swipes horizontally. */
  useEffect(() => {
    const el = cardRef.current;
    if (!el || !item.images || item.images.length <= 1) return;

    let startX = 0;
    let startY = 0;
    let didSwipe = false;

    const onStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      didSwipe = false;
    };

    const onMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
        e.preventDefault(); // Stop browser scroll
        didSwipe = true;
      }
    };

    const onEnd = (e: TouchEvent) => {
      if (!didSwipe) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (dx < -30) handleNext();
      else if (dx > 30) handlePrev();
    };

    const blockClick = (e: MouseEvent) => {
      if (didSwipe) {
        e.preventDefault();
        e.stopPropagation();
        didSwipe = false;
      }
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd, { passive: true });
    el.addEventListener("click", blockClick, { capture: true });

    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("click", blockClick, { capture: true });
    };
  }, [item, handleNext, handlePrev]);

  return (
    <m.div
      ref={ref}
      className="group relative"
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ delay: (index % 3) * 0.15 }}
    >
      <div
        ref={cardRef}
        className="relative block w-full overflow-hidden rounded-[2px] border border-luxe-edge/[0.07] bg-luxe-surface text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] shadow-glow outline-none ring-offset-2 ring-offset-luxe-bg transition-shadow duration-700 md:shadow-none md:hover:shadow-glow focus-visible:ring-1 focus-visible:ring-luxe-gold"
      >
        {/* Gold border reveal on hover */}
        <span className="pointer-events-none absolute inset-0 z-10 opacity-100 transition-opacity duration-700 md:opacity-0 md:group-hover:opacity-100">
          <span className="absolute inset-[10px] rounded-[1px] border border-luxe-gold/25" />
        </span>
        
        {/* Pagination Dots */}
        {item.images && item.images.length > 1 && (
          <div className="pointer-events-none absolute top-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
            {item.images.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                  i === currentIndex ? "bg-luxe-gold scale-125" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
        <div className="relative w-full overflow-hidden aspect-[4/5] bg-luxe-bg">
          {/* Parallax image movement */}
          <m.div className="absolute inset-x-0 -inset-y-[6%]" style={{ y: smoothImgY }}>
            {item.images.map((src, i) => (
              <m.div
                key={src}
                aria-hidden={i !== currentIndex}
                initial={false}
                animate={{ opacity: i === currentIndex ? 1 : 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 h-full w-full"
              >
                <Image
                  src={src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1536px) 455px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-[center_20%] scale-[1.03] transition-transform duration-[1.65s] ease-luxe md:scale-100 md:group-hover:scale-[1.06]"
                  loading="lazy"
                />
              </m.div>
            ))}
          </m.div>
        </div>
        <button
          type="button"
          aria-label={`Open ${item.alt} photos`}
          onClick={() => onOpen(item.id, currentIndex)}
          className="absolute inset-0 z-20 cursor-zoom-in rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-luxe-gold"
        />
      </div>

      {/* Text underneath the picture */}
      <div className="mt-5 flex flex-col gap-2.5 px-1">
        <div className="flex items-center justify-between gap-x-3 gap-y-1 flex-wrap">
          <span className="font-sans text-[10px] uppercase tracking-[0.45em] text-luxe-gold">
            {item.category}
          </span>
          <span className="font-display text-lg text-luxe-white tracking-wide">
            {item.alt}
          </span>
        </div>
        {item.caption && (
          <p className="mt-2 border-l-2 border-luxe-gold/30 py-1 pl-4 font-serif text-base italic leading-relaxed text-luxe-white/75">
            &quot;{item.caption}&quot;
          </p>
        )}
      </div>
    </m.div>
  );
}

export function FeaturedPortfolio() {
  const [filter, setFilter] = useState<GalleryCategory | "All">("All");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [coverOffset, setCoverOffset] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reduceMotion = useReducedMotion();
  const coverInitialized = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-15%" });

  useEffect(() => {
    if (coverInitialized.current) return;
    coverInitialized.current = true;

    const key = "salamatu.gallery.cover-offset";
    try {
      const previous = Number(window.localStorage.getItem(key) ?? "-1");
      const next = Number.isSafeInteger(previous + 1) && previous >= 0 ? previous + 1 : 0;
      window.localStorage.setItem(key, String(next));
      setCoverOffset(next);
    } catch {
      setCoverOffset(Math.floor(Math.random() * 24));
    }
  }, []);

  const openItem = useCallback((id: string, index: number) => {
    setActiveIndex(index);
    setActiveId(id);
  }, []);

  const closeItem = useCallback(() => setActiveId(null), []);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? galleryItems
        : galleryItems.filter((g) => g.category === filter),
    [filter],
  );

  const activeItem = useMemo(
    () => galleryItems.find((g) => g.id === activeId) ?? null,
    [activeId],
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden bg-luxe-bg px-5 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-12 lg:py-36"
    >
      {/* Ghost watermark text */}
      <m.p
        className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 select-none font-display text-[clamp(5rem,18vw,14rem)] font-medium uppercase leading-none tracking-tight text-luxe-edge/[0.03] md:top-32"
        aria-hidden
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Work
      </m.p>

      <div className="relative mx-auto max-w-[1440px]">
        {/* Heading area */}
        <div
          ref={headingRef}
          className="mb-10 flex flex-col gap-6 sm:mb-14 lg:mb-20 lg:flex-row lg:items-end lg:justify-between"
        >
          <m.div
            className="max-w-2xl"
            variants={headingReveal}
            initial="hidden"
            animate={headingInView ? "visible" : "hidden"}
          >
            <m.h2
              className="font-display text-[clamp(2.75rem,6.5vw,5rem)] font-normal leading-[1.02] tracking-tight text-luxe-white"
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              animate={
                headingInView
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : {}
              }
              transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Modeling &amp; Beauty
            </m.h2>
            <m.p
              className="mt-6 max-w-md font-sans text-sm leading-relaxed text-luxe-muted md:text-[15px]"
              initial={{ opacity: 0, y: 20 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3 }}
            >
              Selected fashion editorials, beauty portraits, and lifestyle looks.
            </m.p>
            <m.div
              className="editorial-rule mt-10 max-w-xs"
              initial={{ scaleX: 0 }}
              animate={headingInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
            />
          </m.div>

          {/* Category filter buttons */}
          <m.div
            className="flex flex-wrap gap-2 lg:justify-end lg:gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.45 }}
          >
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={`min-h-11 rounded-sm border px-3 py-2 font-sans text-[10px] uppercase tracking-[0.15em] sm:px-4 lg:tracking-[0.25em] transition-all duration-500 ${
                  filter === c
                    ? "border-luxe-gold/55 bg-luxe-edge/[0.03] text-luxe-white shadow-glow"
                    : "border-luxe-edge/[0.1] text-luxe-white md:text-luxe-muted md:hover:border-luxe-edge/25 md:hover:text-luxe-white"
                }`}
              >
                {c}
              </button>
            ))}
            {!reduceMotion && (
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                className="min-h-11 rounded-sm border border-luxe-gold/30 px-3 py-2 text-xs text-luxe-gold transition-colors hover:border-luxe-gold focus-visible:outline focus-visible:outline-luxe-gold sm:px-4"
              >
                {playing ? "Pause photos" : "Play photos"}
              </button>
            )}
          </m.div>
        </div>

        {/* Uniform Grid */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <MasonryItem
              key={item.id}
              item={item}
              index={i}
              coverOffset={coverOffset}
              autoplay={playing && !reduceMotion && !activeId}
              onOpen={openItem}
            />
          ))}
        </div>
      </div>

      <Lightbox
        item={activeItem}
        currentIndex={activeIndex}
        setCurrentIndex={setActiveIndex}
        onClose={closeItem}
      />
    </section>
  );
}
