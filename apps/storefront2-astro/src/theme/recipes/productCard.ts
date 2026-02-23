import { defineSlotRecipe } from "@pandacss/dev";

export const productCard = defineSlotRecipe({
  className: "product-card",
  slots: [
    "root",
    "imageWrap",
    "imageBg",
    "imageShape",
    "badge",
    "addButton",
    "meta",
    "name",
    "type",
    "price",
  ],
  base: {
    root: {
      position: "relative",
      cursor: "pointer",
      textDecoration: "none",
      color: "{colors.espresso}",
      display: "block",
    },
    imageWrap: {
      aspectRatio: "3/4",
      position: "relative",
      overflow: "hidden",
      marginBottom: "1.5rem",
    },
    imageBg: {
      position: "absolute",
      inset: "0",
      transition: "transform 0.8s ease",
    },
    imageShape: {
      position: "absolute",
      inset: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "1",
      "& svg": {
        width: "55%",
        height: "auto",
        filter: "drop-shadow({shadows.productDrop})",
        transition: "transform 0.6s ease",
      },
      "& img": {
        width: "55%",
        height: "auto",
        filter: "drop-shadow({shadows.productDrop})",
        transition: "transform 0.6s ease",
        objectFit: "contain",
      },
    },
    badge: {
      position: "absolute",
      top: "1.2rem",
      left: "1.2rem",
      padding: "0.4rem 1rem",
      bg: "rgba(255, 252, 247, 0.9)",
      backdropFilter: "blur(10px)",
      fontSize: "0.6rem",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "{colors.gold}",
      zIndex: "2",
    },
    addButton: {
      position: "absolute",
      bottom: "1.5rem",
      left: "50%",
      transform: "translateX(-50%) translateY(20px)",
      padding: "0.75rem 2rem",
      bg: "{colors.espresso}",
      color: "{colors.sand.light}",
      fontFamily: "body",
      fontSize: "0.65rem",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      border: "none",
      cursor: "pointer",
      opacity: "0",
      transition: "all 0.4s ease",
      zIndex: "2",
      whiteSpace: "nowrap",
      _hover: {
        bg: "{colors.gold}",
      },
    },
    meta: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    name: {
      fontFamily: "display",
      fontSize: "1.4rem",
      fontWeight: "400",
      marginBottom: "0.3rem",
    },
    type: {
      fontSize: "0.7rem",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: "{colors.espresso.soft}",
    },
    price: {
      fontFamily: "display",
      fontSize: "1.2rem",
      color: "{colors.gold}",
    },
  },
  variants: {
    hovered: {
      true: {
        imageBg: {
          transform: "scale(1.05)",
        },
        imageShape: {
          "& svg": {
            transform: "translateY(-8px) rotate(-2deg)",
          },
          "& img": {
            transform: "translateY(-8px) rotate(-2deg)",
          },
        },
        addButton: {
          opacity: "1",
          transform: "translateX(-50%) translateY(0)",
        },
      },
    },
    staggerAnimation: {
      "0": { root: { animation: "cardIn 0.6s ease forwards", animationDelay: "0s" } },
      "1": { root: { animation: "cardIn 0.6s ease forwards", animationDelay: "0.1s" } },
      "2": { root: { animation: "cardIn 0.6s ease forwards", animationDelay: "0.2s" } },
      "3": { root: { animation: "cardIn 0.6s ease forwards", animationDelay: "0.3s" } },
    },
  },
});
