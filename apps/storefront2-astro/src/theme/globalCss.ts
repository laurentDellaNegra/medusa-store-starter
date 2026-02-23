import { defineGlobalStyles } from "@pandacss/dev";

export const globalCss = defineGlobalStyles({
  "*, *::before, *::after": {
    margin: "0",
    padding: "0",
    boxSizing: "border-box",
  },
  html: {
    scrollBehavior: "smooth",
    overflowX: "hidden",
  },
  body: {
    fontFamily: "body",
    fontWeight: "regular",
    color: "text.primary",
    bg: "bg.page",
    overflowX: "hidden",
  },
  /* Scroll reveal system */
  ".reveal": {
    opacity: "0",
    transform: "translateY(40px)",
    transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  ".reveal.visible": {
    opacity: "1",
    transform: "translateY(0)",
  },
  ".reveal-delay-1": { transitionDelay: "0.1s" },
  ".reveal-delay-2": { transitionDelay: "0.2s" },
  ".reveal-delay-3": { transitionDelay: "0.3s" },
  ".reveal-delay-4": { transitionDelay: "0.4s" },
});
