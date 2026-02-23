import { defineSlotRecipe } from "@pandacss/dev";

export const sectionHeader = defineSlotRecipe({
  className: "section-header",
  slots: ["root", "tag", "title", "titleAccent", "description"],
  base: {
    root: {
      marginBottom: "5rem",
    },
    tag: {
      fontSize: "0.65rem",
      letterSpacing: "0.4em",
      textTransform: "uppercase",
      color: "{colors.gold}",
      marginBottom: "1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      fontWeight: "400",
      _before: {
        content: '""',
        width: "30px",
        height: "1px",
        bg: "{colors.gold}",
        display: "block",
        flexShrink: "0",
      },
    },
    title: {
      fontFamily: "display",
      fontSize: "clamp(2.2rem, 3.5vw, 3.5rem)",
      fontWeight: "300",
      lineHeight: "1.15",
      marginBottom: "2rem",
    },
    titleAccent: {
      fontStyle: "italic",
      color: "{colors.gold}",
    },
    description: {
      fontSize: "0.95rem",
      lineHeight: "1.9",
      color: "{colors.espresso.soft}",
    },
  },
  variants: {
    centered: {
      true: {
        root: {
          textAlign: "center",
        },
        tag: {
          justifyContent: "center",
        },
        title: {
          textAlign: "center",
        },
      },
    },
  },
});
