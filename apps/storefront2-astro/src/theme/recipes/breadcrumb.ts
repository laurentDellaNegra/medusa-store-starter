import { defineSlotRecipe } from "@pandacss/dev";

export const breadcrumb = defineSlotRecipe({
  className: "breadcrumb",
  slots: ["root", "link", "separator", "current"],
  base: {
    root: {
      padding: "8rem 4rem 2rem",
      maxWidth: "1400px",
      marginLeft: "auto",
      marginRight: "auto",
      display: "flex",
      alignItems: "center",
      "@media (max-width: 1024px)": {
        padding: "7rem 2rem 1.5rem",
      },
      "@media (max-width: 640px)": {
        padding: "6rem 1.5rem 1rem",
      },
    },
    link: {
      fontSize: "0.7rem",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: "{colors.gold}",
      textDecoration: "none",
      transition: "color 0.3s ease",
      _hover: {
        color: "{colors.espresso}",
      },
    },
    separator: {
      marginLeft: "0.8rem",
      marginRight: "0.8rem",
      color: "{colors.sand}",
      fontSize: "0.7rem",
    },
    current: {
      fontSize: "0.7rem",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: "{colors.espresso.soft}",
    },
  },
});
