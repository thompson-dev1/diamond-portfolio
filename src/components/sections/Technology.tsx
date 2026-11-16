"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ScrollImage } from "@/components/ui/ScrollImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

const areas = [
  {
    title: "Web Development",
    description:
      "I’m interested in how a design becomes a working website, from organising content to building interactive pages.",
    topics: [
      "Responsive page layouts and reusable interface components",
      "Accessible navigation, forms, and image galleries",
      "Browser testing and performance checks",
    ],
  },
  {
    title: "IT Operations",
    description:
      "I’m interested in the day-to-day work that keeps systems reliable and helps users resolve problems.",
    topics: [
      "Technical support, issue triage, and troubleshooting",
      "System monitoring and routine maintenance",
      "Documenting incidents, fixes, and support procedures",
    ],
  },
];

const portraits = [
  {
    src: photos.graduationPortrait,
    title: "Graduation gown",
    alt: "Salamatu in a graduation gown and an Information Technology Management stole",
  },
  {
    src: photos.whiteSuitStanding,
    title: "Standing portrait",
    alt: "Salamatu standing in a white suit and graduation cap",
  },
  {
    src: photos.whiteSuitSeated,
    title: "Seated portrait",
    alt: "Salamatu seated in a white suit and graduation cap",
  },
];

const professionalSkills = [
  {
    name: "Communication Skills",
    use: "Explaining technical issues and sharing clear next steps.",
  },
  {
    name: "Critical Thinking",
    use: "Using evidence to evaluate options and make decisions.",
  },
  {
    name: "Problem Solving",
    use: "Finding root causes, testing fixes, and documenting what worked.",
  },
];

const stacks = [
  {
    title: "Frontend",
    tools: [
      "HTML, CSS & JavaScript",
      "React & TypeScript",
      "Framer Motion & GSAP",
    ],
  },
  {
    title: "Frameworks",
    tools: [
      "Next.js",
      "Tailwind CSS & Bootstrap",
    ],
  },
  {
    title: "Backend",
    tools: [
      "Python & Flask",
    ],
  },
  {
    title: "Databases",
    tools: [
      "SQL & SQLite",
      "Supabase",
      "MongoDB",
      "Firebase",
    ],
  },
  {
    title: "Productivity",
    tools: [
      "Microsoft Excel",
      "Office 365",
    ],
  },
];

function GraduationGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const inView = useInView(galleryRef, { amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!inView || reduceMotion || !playing || hovering) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % portraits.length);
    }, 2500);

    return () => window.clearInterval(timer);
  }, [inView, reduceMotion, playing, hovering]);

  return (
    <div
      ref={galleryRef}
      role="group"
      aria-label="Graduation photo gallery"
      className="max-w-[42rem]"
    >
      <div
        className="grid grid-cols-[minmax(0,3fr)_minmax(0,1fr)] gap-2.5 sm:gap-4"
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHovering(true);
        }}
        onPointerLeave={() => setHovering(false)}
      >
        <div
          id="graduation-current-portrait"
          className="relative aspect-[4/5] overflow-hidden rounded-sm border border-luxe-edge/[0.08] bg-luxe-surface"
        >
          <ScrollImage onEntry>
            {portraits.map((photo, index) => (
              <m.div
                key={photo.src}
                aria-hidden={index !== activeIndex}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: index === activeIndex ? 1 : 0,
                  scale: index === activeIndex || reduceMotion ? 1 : 1.04,
                }}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeInOut" }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(min-width: 1440px) 500px, (min-width: 1024px) 36vw, 75vw"
                />
              </m.div>
            ))}
          </ScrollImage>
        </div>

        <div className="grid min-h-0 grid-rows-3 gap-2.5 sm:gap-4">
          {portraits.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              aria-label={`Show ${photo.title.toLowerCase()}`}
              aria-pressed={index === activeIndex}
              aria-controls="graduation-current-portrait"
              className="relative min-h-0 overflow-hidden rounded-sm border border-luxe-edge/15 opacity-65 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-luxe-gold aria-pressed:border-luxe-gold aria-pressed:opacity-100"
              onFocus={() => setPlaying(false)}
              onClick={() => {
                setPlaying(false);
                setActiveIndex(index);
              }}
            >
              <Image
                src={photo.src}
                alt=""
                fill
                loading="lazy"
                className="object-cover"
                sizes="(min-width: 1440px) 170px, (min-width: 1024px) 12vw, 25vw"
              />
            </button>
          ))}
        </div>
      </div>

      {!reduceMotion && (
        <button
          type="button"
          aria-controls="graduation-current-portrait"
          className="mt-3 min-h-11 rounded-sm border border-luxe-edge/15 px-3 text-xs text-luxe-white/85 transition-colors hover:border-luxe-gold hover:text-luxe-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-luxe-gold"
          onClick={() => setPlaying(!playing)}
        >
          {playing ? "Pause slideshow" : "Play slideshow"}
        </button>
      )}
    </div>
  );
}

export function Technology() {
  return (
    <section
      id="technology"
      aria-labelledby="technology-heading"
      className="scroll-mt-24 border-t border-luxe-edge/[0.07] bg-luxe-bg px-5 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <ScrollReveal>
              <h2
                id="technology-heading"
                className="font-display text-[clamp(2.75rem,6.5vw,5rem)] font-normal leading-tight tracking-tight text-luxe-white"
              >
                Education &amp; Technology
              </h2>
            </ScrollReveal>
            <ScrollReveal className="mt-4" delay={0.08}>
              <p className="text-sm leading-relaxed text-luxe-gold md:text-base">{site.degree}</p>
            </ScrollReveal>
            <ScrollReveal className="mt-5" delay={0.13}>
              <p className="max-w-md text-sm leading-relaxed text-luxe-muted md:text-base">
                Studying Information Technology Management gave me a foundation in how
                organisations use information systems to support their work. My interests
                span the websites people interact with and the systems they rely on.
              </p>
              <div className="editorial-rule mt-8 max-w-xs" />
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <GraduationGallery />
          </ScrollReveal>
        </div>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-8">
          {areas.map((area, index) => (
            <ScrollReveal key={area.title} delay={index * 0.08}>
              <article className="h-full border border-luxe-edge/[0.08] bg-gradient-to-b from-luxe-edge/[0.04] to-transparent p-5 sm:p-7 lg:p-10">
                <h3 className="font-display text-3xl text-luxe-white">{area.title}</h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-luxe-muted md:text-base">
                  {area.description}
                </p>
                <ul className="mt-6 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-luxe-white/85 marker:text-luxe-gold">
                  {area.topics.map((topic) => <li key={topic}>{topic}</li>)}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-14 grid items-center gap-8 border-t border-luxe-edge/[0.08] pt-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <ScrollReveal>
              <h3 className="font-display text-3xl text-luxe-white md:text-4xl">Professional Skills</h3>
            </ScrollReveal>
            <dl className="mt-6 grid gap-5">
              {professionalSkills.map((skill, index) => (
                <ScrollReveal key={skill.name} delay={index * 0.06}>
                  <dt className="text-sm font-semibold text-luxe-gold">{skill.name}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-luxe-muted">{skill.use}</dd>
                </ScrollReveal>
              ))}
            </dl>
          </div>
          <ScrollReveal>
            <div className="relative aspect-[3/2] overflow-hidden rounded-sm border border-luxe-edge/[0.08] bg-luxe-surface">
              <ScrollImage onEntry>
                <Image
                  src={photos.technologyWorkspace}
                  alt="A laptop displaying code and a spreadsheet next to an open notebook on a wooden desk"
                  fill
                  loading="lazy"
                  sizes="(min-width: 1440px) 672px, (min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </ScrollImage>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-14 border-t border-luxe-edge/[0.08] pt-10 md:mt-20">
          <ScrollReveal>
            <h3 className="font-display text-3xl text-luxe-white md:text-4xl">Tech Stack</h3>
          </ScrollReveal>
          <div className="mt-7 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {stacks.map((stack, index) => (
              <ScrollReveal key={stack.title} delay={Math.min(index, 2) * 0.06}>
                <h4 className="text-base font-semibold text-luxe-white">{stack.title}</h4>
                <ul className="mt-4 space-y-2.5 border-l border-luxe-gold/30 pl-3">
                  {stack.tools.map((tool) => (
                    <li key={tool} className="text-sm text-luxe-muted">
                      {tool}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
