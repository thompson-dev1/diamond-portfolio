import Image from "next/image";
import { ScrollImage } from "@/components/ui/ScrollImage";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

const modelDetails = [
  { label: "Location", value: site.location },
  { label: "Height", value: "1.6 m / 5′3″" },
  { label: "Bust · Waist · Hips", value: "33″ — 26/28″ — 36″" },
  { label: "Sizing", value: "UK 8 · US 4 · Shoe 38/39" },
  { label: "Representation", value: "Freelance · Independent" },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 border-t border-luxe-edge/[0.07] bg-gradient-to-b from-luxe-bg via-luxe-surface/30 to-luxe-bg"
    >
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
        <div className="relative min-h-[min(65svh,145vw)] overflow-hidden lg:min-h-[100svh]">
          <ScrollImage onEntry>
            <Image
              src={photos.goldAccentsPortrait}
              alt={`Portrait — ${site.name}`}
              fill
              loading="lazy"
              className="object-cover object-[center_30%]"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </ScrollImage>
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-luxe-bg lg:to-luxe-bg/95" />
          <div className="absolute inset-0 bg-gradient-to-t from-luxe-bg/80 via-transparent to-transparent lg:hidden" />
        </div>

        <div className="flex flex-col justify-center px-5 py-14 sm:px-6 sm:py-20 md:px-10 lg:py-28 lg:pl-20 lg:pr-16">
          <ScrollReveal>
            <h2
              id="about-heading"
              className="font-display text-[clamp(2.85rem,5.5vw,4.75rem)] font-normal leading-[1.06] tracking-tight text-luxe-white"
            >
              About
            </h2>
          </ScrollReveal>

          <ScrollReveal className="mt-10" delay={0.08}>
            <p className="max-w-xl text-[15px] leading-[1.9] text-luxe-muted md:text-base">
              I’m {site.name}, the fashion and beauty model behind {site.brand}, based in {site.location}.
              My work spans fashion editorials, commercial and lifestyle shoots,
              and studio beauty portraits. I enjoy collaborating with clothing,
              beauty, and lifestyle brands on images that bring their collections to life.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-5" delay={0.12}>
            <p className="max-w-xl text-[15px] leading-[1.9] text-luxe-muted md:text-base">
              I hold a {site.degree}. My focus in technology is web development
              and IT operations.
            </p>
          </ScrollReveal>

          <ScrollReveal className="mt-10 border-t border-luxe-edge/[0.1] pt-8" delay={0.16}>
            <h3 className="font-display text-3xl text-luxe-white">Model Details</h3>
            <dl className="mt-6 space-y-4">
              {modelDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="grid gap-1.5 sm:grid-cols-[9rem_1fr] sm:items-baseline sm:gap-4"
                >
                  <dt className="text-[10px] uppercase tracking-[0.22em] text-luxe-muted">
                    {detail.label}
                  </dt>
                  <dd className="text-sm text-luxe-white/90">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
