import { defineRecipe } from "@pandacss/dev";

export const button = defineRecipe({
  className: "btn",
  base: {
    display: "inline-block",
    fontFamily: "body",
    fontSize: "0.7rem",
    fontWeight: "regular",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.5s ease",
    border: "none",
    position: "relative",
    overflow: "hidden",
  },
  variants: {
    visual: {
      primary: {
        padding: "1rem 3rem",
        bg: "{colors.espresso}",
        color: "{colors.sand.light}",
        _before: {
          content: '""',
          position: "absolute",
          top: "0",
          left: "-100%",
          width: "100%",
          height: "100%",
          bg: "{colors.gold}",
          transition: "left 0.5s ease",
          zIndex: "0",
        },
        _hover: {
          _before: { left: "0" },
        },
        "& span": {
          position: "relative",
          zIndex: "1",
        },
      },
      outline: {
        padding: "1rem 3rem",
        bg: "transparent",
        color: "{colors.espresso}",
        border: "1px solid {colors.gold}",
        _hover: {
          bg: "{colors.gold}",
          color: "white",
        },
      },
      ghost: {
        padding: "0",
        bg: "transparent",
        color: "{colors.gold}",
        fontSize: "0.7rem",
        letterSpacing: "0.2em",
        display: "flex",
        alignItems: "center",
        gap: "0.8rem",
        transition: "gap 0.3s ease",
        _hover: {
          gap: "1.2rem",
        },
      },
      filter: {
        padding: "0.55rem 1.5rem",
        border: "1px solid {colors.sand}",
        bg: "transparent",
        fontSize: "0.7rem",
        letterSpacing: "0.15em",
        color: "{colors.espresso.soft}",
        transition: "all 0.3s ease",
        _hover: {
          borderColor: "{colors.gold}",
          color: "{colors.espresso}",
        },
      },
    },
    size: {
      sm: { padding: "0.55rem 1.5rem" },
      md: {},
      lg: { padding: "1.1rem 3rem" },
    },
    active: {
      true: {},
    },
  },
  compoundVariants: [
    {
      visual: "filter",
      active: true,
      css: {
        bg: "{colors.espresso}",
        color: "{colors.sand.light}",
        borderColor: "{colors.espresso}",
      },
    },
  ],
  defaultVariants: {
    visual: "primary",
    size: "md",
  },
});
