"use client";

import { m, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { site } from "@/lib/site";

const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
const subject = "New Enquiry from Portfolio Website";

export function BookingCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, margin: "-15%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Floating radial glow — moves subtly with scroll */
  const rawGlowY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const rawGlowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.1, 0.85]);
  const glowY = useSpring(rawGlowY, { stiffness: 40, damping: 18 });
  const glowScale = useSpring(rawGlowScale, { stiffness: 40, damping: 18 });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!accessKey) {
      const body = Array.from(formData, ([label, value]) => `${label}: ${value}`).join("\r\n\r\n");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("submitting");
    formData.append("access_key", accessKey);
    formData.append("subject", subject);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden border-t border-white/[0.07] px-5 py-16 sm:px-6 sm:py-24 md:py-32"
    >
      {/* Animated radial glow */}
      <m.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(198,161,91,0.14)_0%,_transparent_58%)]"
        style={{ y: glowY, scale: glowScale }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-luxe-bg via-transparent to-luxe-bg" />

      <div ref={contentRef} className="relative mx-auto max-w-[880px] text-center">
        <m.h2
          className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-normal leading-[1.15] tracking-tight text-luxe-white"
          initial={{ opacity: 0, y: 40, filter: "blur(5px)" }}
          animate={
            contentInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : {}
          }
          transition={{
            delay: 0.1,
            duration: 1.3,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          Bookings &amp; Enquiries
        </m.h2>

        <m.p
          className="mx-auto mt-10 max-w-lg font-sans text-sm leading-relaxed text-luxe-muted md:text-[15px]"
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.9 }}
        >
          Get in touch for modeling bookings, beauty collaborations, web development
          projects, or IT operations opportunities.
        </m.p>

        <m.form
          className="mx-auto mt-9 max-w-[700px] sm:mt-14 text-left"
          initial={{ opacity: 0, y: 25 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit}
        >
          <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            <div className="flex flex-col gap-3">
              <label
                htmlFor="name"
                className="font-sans text-[10px] uppercase tracking-[0.2em] text-luxe-muted"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="Name"
                autoComplete="name"
                required
                placeholder="Full name"
                className="w-full min-w-0 rounded-[2px] border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 font-sans text-base text-luxe-white placeholder-white/30 transition-colors focus:border-luxe-gold/50 focus:outline-none focus:ring-1 focus:ring-luxe-gold/50"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="agency"
                className="font-sans text-[10px] uppercase tracking-[0.2em] text-luxe-muted"
              >
                Organisation (optional)
              </label>
              <input
                type="text"
                id="agency"
                name="Organisation"
                autoComplete="organization"
                placeholder="Company, brand, or agency"
                className="w-full min-w-0 rounded-[2px] border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 font-sans text-base text-luxe-white placeholder-white/30 transition-colors focus:border-luxe-gold/50 focus:outline-none focus:ring-1 focus:ring-luxe-gold/50"
              />
            </div>
          </div>

          <div className="mt-5 flex min-w-0 flex-col gap-3 sm:mt-6">
            <label
              htmlFor="email"
              className="font-sans text-[10px] uppercase tracking-[0.2em] text-luxe-muted"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="Email"
              autoComplete="email"
              required
              placeholder="your@email.com"
              className="w-full min-w-0 rounded-[2px] border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 font-sans text-base text-luxe-white placeholder-white/30 transition-colors focus:border-luxe-gold/50 focus:outline-none focus:ring-1 focus:ring-luxe-gold/50"
            />
          </div>

          <div className="mt-5 flex min-w-0 flex-col gap-3 sm:mt-6">
            <label
              htmlFor="type"
              className="font-sans text-[10px] uppercase tracking-[0.2em] text-luxe-muted"
            >
              Enquiry Type
            </label>
            <div className="relative">
              <select
                id="type"
                name="Project Type"
                defaultValue=""
                required
                className="w-full min-w-0 appearance-none rounded-[2px] border border-white/[0.08] bg-white/[0.02] py-3.5 pl-4 pr-10 font-sans text-base text-luxe-white transition-colors focus:border-luxe-gold/50 focus:outline-none focus:ring-1 focus:ring-luxe-gold/50"
              >
                <option value="" disabled>Select an enquiry type</option>
                <option value="Beauty Campaign">Beauty Campaign</option>
                <option value="Fashion Editorial">Fashion Editorial</option>
                <option value="Commercial / Lifestyle">Commercial / Lifestyle</option>
                <option value="Runway">Runway</option>
                <option value="Web Development">Web Development</option>
                <option value="IT Operations">IT Operations</option>
                <option value="Other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-luxe-muted">
                <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 0L9.33013 4.5H0.669873L5 0Z" fill="currentColor"/>
                  <path d="M5 14L0.669873 9.5L9.33013 9.5L5 14Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-5 flex min-w-0 flex-col gap-3 sm:mt-6">
            <label
              htmlFor="message"
              className="font-sans text-[10px] uppercase tracking-[0.2em] text-luxe-muted"
            >
              Message
            </label>
            <textarea
              id="message"
              name="Message"
              required
              placeholder="Tell me about the project or opportunity and your timeline."
              rows={5}
              className="w-full min-w-0 resize-none rounded-[2px] border border-white/[0.08] bg-white/[0.02] px-4 py-3.5 font-sans text-base text-luxe-white placeholder-white/30 transition-colors focus:border-luxe-gold/50 focus:outline-none focus:ring-1 focus:ring-luxe-gold/50"
            />
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className="w-full rounded-[2px] bg-[#c6a15b] px-10 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-[#0a0a0a] transition-colors hover:bg-[#d4b06a] disabled:opacity-50 disabled:cursor-not-allowed md:w-auto"
            >
              {status === "submitting"
                ? "Sending..."
                : status === "success"
                  ? "Sent Successfully"
                  : accessKey
                    ? "Send Enquiry"
                    : "Open Email Draft"}
            </button>
            {status === "error" && (
              <p className="font-sans text-xs text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </m.form>
      </div>
    </section>
  );
}
