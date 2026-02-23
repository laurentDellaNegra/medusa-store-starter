import { defineSlotRecipe } from "@pandacss/dev";

export const navbar = defineSlotRecipe({
  className: "navbar",
  slots: [
    "root",
    "logo",
    "logoAccent",
    "links",
    "link",
    "right",
    "cta",
    "cartIcon",
    "cartCount",
    "menuToggle",
  ],
  base: {
    root: {
      position: "fixed",
      top: "0",
      width: "100%",
      zIndex: "1000",
      padding: "1.8rem 4rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "background 0.4s ease, padding 0.4s ease, backdrop-filter 0.4s ease",
    },
    logo: {
      fontFamily: "display",
      fontSize: "1.8rem",
      fontWeight: "400",
      letterSpacing: "0.35em",
      textTransform: "uppercase",
      color: "{colors.espresso}",
      textDecoration: "none",
    },
    logoAccent: {
      color: "{colors.gold}",
    },
    links: {
      display: "flex",
      gap: "3rem",
      listStyle: "none",
      margin: "0",
      padding: "0",
    },
    link: {
      fontSize: "0.75rem",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "{colors.espresso.soft}",
      textDecoration: "none",
      position: "relative",
      fontWeight: "400",
      transition: "color 0.3s ease",
      _after: {
        content: '""',
        position: "absolute",
        bottom: "-4px",
        left: "0",
        width: "0",
        height: "1px",
        bg: "{colors.gold}",
        transition: "width 0.3s ease",
      },
      _hover: {
        color: "{colors.gold}",
        _after: {
          width: "100%",
        },
      },
    },
    right: {
      display: "flex",
      alignItems: "center",
      gap: "2rem",
    },
    cta: {
      fontSize: "0.7rem",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      padding: "0.7rem 2rem",
      border: "1px solid {colors.gold}",
      color: "{colors.espresso}",
      textDecoration: "none",
      transition: "all 0.3s ease",
      _hover: {
        bg: "{colors.gold}",
        color: "white",
      },
    },
    cartIcon: {
      position: "relative",
      cursor: "pointer",
      textDecoration: "none",
      color: "{colors.espresso}",
      transition: "color 0.3s ease",
      _hover: {
        color: "{colors.gold}",
      },
      "& svg": {
        width: "22px",
        height: "22px",
      },
    },
    cartCount: {
      position: "absolute",
      top: "-8px",
      right: "-10px",
      width: "18px",
      height: "18px",
      borderRadius: "50%",
      bg: "{colors.gold}",
      color: "white",
      fontSize: "0.55rem",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "transform 0.3s ease",
    },
    menuToggle: {
      display: "none",
      flexDirection: "column",
      gap: "6px",
      cursor: "pointer",
      zIndex: "1001",
      background: "none",
      border: "none",
      padding: "0",
      "& span": {
        width: "28px",
        height: "1px",
        bg: "{colors.espresso}",
        transition: "all 0.3s ease",
        display: "block",
      },
    },
  },
  variants: {
    scrolled: {
      true: {
        root: {
          bg: "{colors.bg.nav}",
          backdropFilter: "blur(20px)",
          padding: "1rem 4rem",
          boxShadow: "{shadows.nav}",
        },
      },
    },
    variant: {
      light: {
        root: {
          bg: "{colors.bg.nav}",
          backdropFilter: "blur(20px)",
          padding: "1rem 4rem",
          boxShadow: "{shadows.nav}",
        },
      },
    },
    responsive: {
      true: {
        root: {
          "@media (max-width: 1024px)": {
            padding: "1.2rem 2rem",
          },
          "@media (max-width: 768px)": {
            padding: "1rem 1.5rem",
          },
        },
        links: {
          "@media (max-width: 768px)": {
            display: "none",
          },
        },
        cta: {
          "@media (max-width: 768px)": {
            display: "none",
          },
        },
        menuToggle: {
          "@media (max-width: 768px)": {
            display: "flex",
          },
        },
      },
    },
  },
});
