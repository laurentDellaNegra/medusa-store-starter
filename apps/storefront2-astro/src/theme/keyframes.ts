import type { CssKeyframes } from "@pandacss/dev";

export const keyframes: CssKeyframes = {
  preloaderPulse: {
    "0%, 100%": { opacity: "0.3" },
    "50%": { opacity: "1" },
  },
  fadeUp: {
    to: { opacity: "1", transform: "translateY(0)" },
  },
  fadeIn: {
    to: { opacity: "1" },
  },
  cardIn: {
    to: { opacity: "1", transform: "translateY(0)" },
  },
  fadeInItem: {
    to: { opacity: "1" },
  },
  scrollPulse: {
    "0%, 100%": { transform: "scaleX(1)", opacity: "1" },
    "50%": { transform: "scaleX(0.5)", opacity: "0.5" },
  },
  marquee: {
    "0%": { transform: "translateX(0)" },
    "100%": { transform: "translateX(-50%)" },
  },
  floatBag: {
    "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
    "50%": { transform: "translateY(-12px) rotate(-1.5deg)" },
  },
  cartBump: {
    "0%, 100%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.4)" },
  },
};
