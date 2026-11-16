"use client";

import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import { useEffect, useCallback, useRef, type Dispatch, type SetStateAction } from "react";
import type { GalleryItem } from "@/lib/gallery";

interface LightboxProps {
  item: GalleryItem | null;
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
  onClose: () => void;
}

const backdropVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const imageVariant = {
  hidden: { scale: 0.92, opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    scale: 0.95,
    opacity: 0,
    y: -20,
    filter: "blur(4px)",
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const buttonVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.3, duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function Lightbox({ item, currentIndex, setCurrentIndex, onClose }: LightboxProps) {
  const closeButton = useRef<HTMLButtonElement>(null);

  const handleNext = useCallback(() => {
    if (!item?.images) return;
    setCurrentIndex((prev) => (prev + 1) % item.images.length);
  }, [item, setCurrentIndex]);

  const handlePrev = useCallback(() => {
    if (!item?.images) return;
    setCurrentIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
  }, [item, setCurrentIndex]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    const opener = document.activeElement;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus({ preventScroll: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      if (opener instanceof HTMLElement) opener.focus({ preventScroll: true });
    };
  }, [item, onClose, handleNext, handlePrev]);

  return (
    <AnimatePresence>
      {item && (
        <m.div
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          className="theme-photo-overlay fixed inset-0 z-[400] flex items-center justify-center bg-black/95 px-3 pb-3 pt-12 backdrop-blur-md sm:p-4"
          variants={backdropVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.4 }}
          onClick={onClose}
        >
          {/* Close button */}
          <m.button
            ref={closeButton}
            type="button"
            className="absolute right-3 top-1 z-20 min-h-11 rounded-sm px-3 text-[10px] uppercase tracking-[0.25em] text-luxe-white transition-colors hover:text-luxe-gold focus-visible:outline focus-visible:outline-luxe-gold sm:right-6 sm:top-3"
            variants={buttonVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            whileHover={{ scale: 1.05 }}
          >
            Close ✕
          </m.button>

          {/* Image container */}
          <m.figure
            className="relative flex max-h-[calc(100dvh-4rem)] w-full max-w-[1100px] flex-col"
            variants={imageVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            key={item.id}
            onClick={(e) => e.stopPropagation()}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                handleNext();
              } else if (swipe > swipeConfidenceThreshold) {
                handlePrev();
              } else if (offset.x < -60) {
                handleNext();
              } else if (offset.x > 60) {
                handlePrev();
              }
            }}
          >
            <div className="relative h-[min(70dvh,110vw)] min-h-0 w-full">
              <AnimatePresence initial={false}>
                <m.div
                  key={currentIndex}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Image
                    src={item.images ? item.images[currentIndex] : item.src}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    className="object-contain"
                    sizes="(min-width: 1150px) 1100px, 100vw"
                  />
                </m.div>
              </AnimatePresence>
              {item.images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous photo"
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/80 text-luxe-white hover:text-luxe-gold focus-visible:outline focus-visible:outline-luxe-gold sm:left-2"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    aria-label="Next photo"
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/80 text-luxe-white hover:text-luxe-gold focus-visible:outline focus-visible:outline-luxe-gold sm:right-2"
                  >
                    →
                  </button>
                </>
              )}
            </div>
            <m.figcaption
              className="mt-3 flex max-h-[37dvh] shrink-0 flex-col items-center gap-2 overflow-y-auto px-2 text-center md:mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-luxe-gold">
                {item.category}
              </span>
              {item.caption && (
                <p className="max-w-xl text-sm leading-relaxed text-luxe-white/85 md:text-base">
                  {item.caption}
                </p>
              )}
              {item.images && item.images.length > 1 && (
                <div className="mt-2 flex gap-2">
                  {item.images.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 w-6 rounded-full transition-colors duration-500 ${
                        i === currentIndex ? "bg-luxe-gold" : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              )}
            </m.figcaption>
          </m.figure>
        </m.div>
      )}
    </AnimatePresence>
  );
}
