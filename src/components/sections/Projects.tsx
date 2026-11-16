import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const projects = [
  {
    title: "AADES",
    category: "Academic Platform",
    url: "https://huggingface.co/spaces/Jahaziel2121/AADES",
    description:
      "An academic document evaluation system for structure, formatting, grammar signals, and similarity, with student, supervisor, and admin workflows.",
    screenshot: "/images/projects/dashboard-sign-in.jpg",
    alt: "AADES sign-in screen with a navy backdrop and an ivory form",
    width: 1285,
    height: 1400,
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-24 border-t border-luxe-edge/10 bg-luxe-bg px-5 py-16 sm:px-6 sm:py-24 md:px-10 lg:px-12"
    >
      <div className="mx-auto max-w-[1440px]">
        <ScrollReveal>
          <h2 id="projects-heading" className="font-display text-[clamp(2.75rem,6.5vw,5rem)] leading-tight tracking-tight text-luxe-white">
            Web Projects
          </h2>
          <div className="editorial-rule mt-6" />
        </ScrollReveal>

        <div className="mt-9 grid gap-8 sm:mt-12">
          {projects.map((project) => (
            <ScrollReveal key={project.screenshot}>
              <article className="grid items-center gap-8 overflow-hidden rounded-sm border border-luxe-edge/10 bg-luxe-bg-elevated p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14 lg:p-12">
                <div className="order-2 lg:order-1">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-luxe-gold underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-luxe-gold"
                  >
                    {project.category} <span aria-hidden="true">↗</span>
                  </a>
                  <h3 className="font-display text-3xl leading-tight text-luxe-white sm:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-luxe-muted">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-luxe-gold/50 underline-offset-4 transition-colors hover:text-luxe-white focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-luxe-gold"
                    >
                      {project.description}
                    </a>
                  </p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex min-h-11 items-center gap-3 rounded-sm bg-luxe-gold px-4 text-sm font-semibold text-luxe-on-gold transition-colors hover:bg-luxe-gold-hover focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-luxe-gold"
                  >
                    Open {project.title} <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <div className="order-1 flex justify-center rounded-sm bg-luxe-surface p-3 sm:p-5 lg:order-2">
                  <Image
                    src={project.screenshot}
                    alt={project.alt}
                    width={project.width}
                    height={project.height}
                    sizes="(min-width: 1024px) 420px, (min-width: 640px) 70vw, 85vw"
                    loading="lazy"
                    className="h-auto w-full max-w-[420px] rounded-sm border border-luxe-edge/10"
                  />
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
