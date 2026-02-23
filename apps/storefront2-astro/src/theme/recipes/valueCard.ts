import { defineSlotRecipe } from "@pandacss/dev";

export const valueCard = defineSlotRecipe({
  className: "value-card",
  slots: ["root", "icon", "title", "description"],
  base: {
    root: {
      padding: "3rem",
      border: "1px solid {colors.sand}",
      transition: "all 0.5s ease",
      position: "relative",
      overflow: "hidden",
      _before: {
        content: '""',
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "3px",
        bg: "{colors.gold}",
        transform: "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.5s ease",
      },
      _hover: {
        _before: {
          transform: "scaleX(1)",
        },
        borderColor: "{colors.gold.light}",
        boxShadow: "{shadows.cardHover}",
      },
    },
    icon: {
      width: "48px",
      height: "48px",
      marginBottom: "2rem",
      color: "{colors.gold}",
    },
    title: {
      fontFamily: "display",
      fontSize: "1.5rem",
      fontWeight: "400",
      marginBottom: "1rem",
    },
    description: {
      fontSize: "0.85rem",
      lineHeight: "1.8",
      color: "{colors.espresso.soft}",
    },
  },
});
