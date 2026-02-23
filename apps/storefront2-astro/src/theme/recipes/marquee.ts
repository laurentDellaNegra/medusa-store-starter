import { defineSlotRecipe } from "@pandacss/dev";

export const marquee = defineSlotRecipe({
  className: "marquee",
  slots: ["root", "track", "item"],
  base: {
    root: {
      padding: "2rem 0",
      bg: "{colors.espresso}",
      overflow: "hidden",
    },
    track: {
      display: "flex",
      gap: "4rem",
      animation: "marquee 30s linear infinite",
      width: "max-content",
    },
    item: {
      fontFamily: "display",
      fontSize: "1rem",
      letterSpacing: "0.4em",
      textTransform: "uppercase",
      color: "{colors.gold}",
      whiteSpace: "nowrap",
      display: "flex",
      alignItems: "center",
      gap: "4rem",
      _after: {
        content: '"◆"',
        fontSize: "0.4rem",
        color: "{colors.gold.light}",
      },
    },
  },
  variants: {
    paused: {
      true: {
        track: {
          animationPlayState: "paused",
        },
      },
    },
    reverse: {
      true: {
        track: {
          animationDirection: "reverse",
        },
      },
    },
  },
});
