"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { m, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { campaigns } from "@/lib/gallery";

gsap.registerPlugin(ScrollTrigger);
// The full-height hero changes size when the phone's browser bars expand or retract.
ScrollTrigger.config({ ignoreMobileResize: false });

const finalLookHold = 0.16;

export function Campaigns() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-10%" });
  const approachingCampaigns = useInView(sectionRef, { once: true, margin: "450px 0px" });

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const rail = track.parentElement;
    if (!rail) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      section.dataset.pinned = "true";
      rail.scrollLeft = 0;
      const distance = () => Math.max(track.scrollWidth - rail.clientWidth, 0);

      const sequence = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance() * (1 + finalLookHold)}`,
          pin: true,
          anticipatePin: 1,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      sequence
        .to(track, { x: () => -distance(), duration: 1 })
        .to(track, { x: () => -distance(), duration: finalLookHold });

      return () => {
        delete section.dataset.pinned;
      };
    });

    return () => media.revert();
  }, []);

  return (
    <section
      id="campaigns"
      ref={sectionRef}
      className="group/campaigns scroll-mt-24 overflow-x-clip border-t border-luxe-edge/[0.06] bg-luxe-bg py-16 sm:py-24 data-[pinned=true]:flex data-[pinned=true]:min-h-[100dvh] data-[pinned=true]:items-center data-[pinned=true]:pb-10 data-[pinned=true]:pt-20 lg:data-[pinned=true]:py-24"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-6 md:px-12">
        {/* Heading with stagger */}
        <div ref={headingRef} className="campaign-heading mb-8 sm:mb-12 md:pl-1">
          <m.h2
            className="font-display text-[clamp(2.5rem,5.5vw,4rem)] font-normal tracking-tight text-luxe-white"
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            animate={
              headingInView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : {}
            }
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Campaign Looks
          </m.h2>
          <m.p
            className="mt-5 max-w-lg font-sans text-sm leading-relaxed text-luxe-muted md:text-[15px]"
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.25 }}
          >
            Fashion and beauty looks photographed in the studio and on location.
          </m.p>
          <m.div
            className="editorial-rule mt-10 max-w-xs"
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
          />
        </div>

        {/* Horizontal scroll track */}
        <div
          className="relative max-w-full snap-x snap-proximity overflow-x-auto overflow-y-hidden overscroll-x-contain focus-visible:outline focus-visible:outline-luxe-gold group-data-[pinned=true]/campaigns:overflow-hidden"
          role="region"
          aria-label="Campaign looks"
          tabIndex={0}
        >
          <div
            ref={trackRef}
            className="flex w-max gap-4 pb-3 sm:gap-6 group-data-[pinned=true]/campaigns:pb-0 lg:group-data-[pinned=true]/campaigns:gap-10"
          >
            {campaigns.map((c, i) => (
              <article
                key={c.id}
                className="campaign-card group/card relative w-[min(81vw,28rem)] shrink-0 snap-start overflow-hidden rounded-sm border border-luxe-edge/[0.08] bg-luxe-surface shadow-inset sm:w-[min(63vw,32rem)] lg:group-data-[pinned=true]/campaigns:w-[min(52vw,720px)]"
              >
                <div className="campaign-frame relative aspect-[16/10] w-full overflow-hidden md:aspect-[16/9]">
                  {/* Image with hover zoom */}
                  <div className="absolute inset-[-4%] scale-[1.02] transition-transform duration-[1.75s] ease-luxe md:scale-100 md:group-hover/card:scale-[1.04]">
                    <Image
                      key={approachingCampaigns ? "eager" : "lazy"}
                      src={c.image}
                      alt={c.alt}
                      fill
                      className="object-cover"
                      style={{ objectPosition: c.position }}
                      sizes="(min-width: 1440px) 720px, (min-width: 1024px) 52vw, (min-width: 640px) 63vw, 81vw"
                      loading={approachingCampaigns ? "eager" : "lazy"}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent opacity-100 transition-opacity duration-700 md:opacity-90 md:group-hover/card:opacity-100" />

                  {/* Brand info overlay */}
                  <div className="absolute bottom-0 left-0 p-5 sm:p-8 md:p-10">
                    <h3 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-medium leading-tight text-luxe-ivory">
                      {c.brand}
                    </h3>
                  </div>

                  {/* Number badge */}
                  <m.div
                    className="absolute right-6 top-6 font-display text-6xl font-light text-white/[0.06] md:right-10 md:top-8 md:text-8xl"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </m.div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <m.p
          className="campaign-hint mt-5 font-sans text-[10px] uppercase tracking-[0.25em] text-luxe-muted md:mt-8 md:pl-1"
          initial={{ opacity: 0 }}
          animate={headingInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <span className="hidden group-data-[pinned=true]/campaigns:inline">Scroll to explore</span>
          <span className="group-data-[pinned=true]/campaigns:hidden">Swipe or scroll across to explore</span>
        </m.p>
      </div>
    </section>
  );
}
