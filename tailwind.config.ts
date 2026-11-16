import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        luxe: {
          bg: "rgb(var(--luxe-bg) / <alpha-value>)",
          elevated: "rgb(var(--luxe-bg-elevated) / <alpha-value>)",
          surface: "rgb(var(--luxe-surface) / <alpha-value>)",
          footer: "rgb(var(--luxe-footer) / <alpha-value>)",
          white: "rgb(var(--luxe-white) / <alpha-value>)",
          muted: "rgb(var(--luxe-muted) / <alpha-value>)",
          gold: "rgb(var(--luxe-gold) / <alpha-value>)",
          edge: "rgb(var(--luxe-edge) / <alpha-value>)",
          "gold-hover": "rgb(var(--luxe-gold-hover) / <alpha-value>)",
          "on-gold": "rgb(var(--luxe-on-gold) / <alpha-value>)",
          error: "rgb(var(--luxe-error) / <alpha-value>)",
          ivory: "#F4F3EF",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        editorial: "0.55em",
        mega: "0.72em",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      boxShadow: {
        glow: "0 0 120px -30px rgb(var(--luxe-gold) / 0.35)",
        inset: "inset 0 1px 0 rgb(var(--luxe-edge) / 0.06)",
      },
      backgroundImage: {
        "gold-fade":
          "linear-gradient(135deg, rgba(198,161,91,0.14) 0%, transparent 42%, rgba(198,161,91,0.06) 100%)",
        "vignette":
          "radial-gradient(ellipse at center, transparent 0%, rgba(7,7,7,0.55) 58%, #070707 92%)",
      },
      animation: {
        "scroll-hint": "scrollHint 2.2s ease-in-out infinite",
      },
      keyframes: {
        scrollHint: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "50%": { transform: "translateY(10px)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
