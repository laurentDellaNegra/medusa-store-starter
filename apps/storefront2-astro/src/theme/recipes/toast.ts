import { defineRecipe } from "@pandacss/dev";

export const toast = defineRecipe({
  className: "toast",
  base: {
    position: "fixed",
    top: "5.5rem",
    right: "2rem",
    zIndex: "2000",
    bg: "{colors.espresso}",
    color: "{colors.sand.light}",
    padding: "1rem 2rem",
    fontSize: "0.78rem",
    letterSpacing: "0.1em",
    boxShadow: "{shadows.notification}",
    transform: "translateX(120%)",
    transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
    fontFamily: "body",
  },
  variants: {
    visible: {
      true: {
        transform: "translateX(0)",
      },
    },
  },
  defaultVariants: {
    visible: false,
  },
});
