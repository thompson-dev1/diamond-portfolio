import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { site } from "@/lib/site";

export function CurriculumVitae() {
  return (
    <section
      id="cv"
      aria-labelledby="cv-heading"
      className="scroll-mt-24 border-t border-luxe-edge/10 bg-luxe-bg px-5 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-12"
    >
      <ScrollReveal className="mx-auto max-w-[1440px]">
        <div className="flex flex-col items-start gap-7 rounded-sm border border-luxe-edge/10 bg-gradient-to-br from-luxe-surface via-luxe-bg-elevated to-luxe-bg p-7 sm:p-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="cv-heading" className="font-display text-[clamp(2.35rem,5.5vw,4rem)] leading-tight tracking-tight text-luxe-white">
              Curriculum Vitae
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-luxe-muted">
              My education, technical skills, and background in fashion and beauty modeling.
            </p>
          </div>
          <a
            href={site.cv}
            download
            className="inline-flex min-h-12 shrink-0 items-center gap-3 rounded-sm bg-luxe-gold px-5 text-sm font-semibold text-luxe-on-gold transition-colors hover:bg-luxe-gold-hover focus-visible:outline focus-visible:outline-luxe-gold"
          >
            Download CV (PDF) <span aria-hidden="true">↓</span>
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
