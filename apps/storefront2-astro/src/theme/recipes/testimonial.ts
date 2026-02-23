import { defineSlotRecipe } from "@pandacss/dev";

export const testimonial = defineSlotRecipe({
  className: "testimonial",
  slots: ["root", "quoteMark", "text", "author", "dots", "dot"],
  base: {
    root: {
      padding: "8rem 4rem",
      bg: "{colors.espresso}",
      color: "{colors.sand.light}",
      position: "relative",
      overflow: "hidden",
      textAlign: "center",
      _before: {
        content: '""',
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        height: "600px",
        background:
          "radial-gradient(circle, rgba(184, 149, 106, 0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      },
    },
    quoteMark: {
      fontFamily: "display",
      fontSize: "8rem",
      color: "{colors.gold}",
      lineHeight: "0.5",
      marginBottom: "2rem",
      opacity: "0.5",
    },
    text: {
      fontFamily: "display",
      fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
      fontWeight: "300",
      fontStyle: "italic",
      lineHeight: "1.6",
      marginBottom: "2.5rem",
      color: "{colors.sand}",
      transition: "opacity 0.4s ease",
      maxWidth: "800px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    author: {
      fontSize: "0.7rem",
      letterSpacing: "0.3em",
      textTransform: "uppercase",
      color: "{colors.gold}",
      transition: "opacity 0.4s ease",
    },
    dots: {
      display: "flex",
      gap: "0.8rem",
      justifyContent: "center",
      marginTop: "3rem",
    },
    dot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      border: "1px solid {colors.gold}",
      cursor: "pointer",
      transition: "all 0.3s ease",
      bg: "transparent",
      padding: "0",
    },
  },
  variants: {
    dotActive: {
      true: {
        dot: {
          bg: "{colors.gold}",
        },
      },
    },
  },
});
