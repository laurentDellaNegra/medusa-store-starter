import { defineTextStyles } from "@pandacss/dev";

export const textStyles = defineTextStyles({
  tag: {
    description: "Section tag / label",
    value: {
      fontFamily: "body",
      fontSize: "sm",
      fontWeight: "regular",
      letterSpacing: "ultra",
      textTransform: "uppercase",
      lineHeight: "none",
    },
  },
  navLink: {
    description: "Navigation link",
    value: {
      fontFamily: "body",
      fontSize: "0.75rem",
      fontWeight: "regular",
      letterSpacing: "wider",
      textTransform: "uppercase",
      lineHeight: "none",
    },
  },
  button: {
    description: "Button text",
    value: {
      fontFamily: "body",
      fontSize: "caption",
      fontWeight: "regular",
      letterSpacing: "widest",
      textTransform: "uppercase",
      lineHeight: "none",
    },
  },
  filterButton: {
    description: "Filter button text",
    value: {
      fontFamily: "body",
      fontSize: "caption",
      fontWeight: "regular",
      letterSpacing: "wide",
      textTransform: "uppercase",
      lineHeight: "none",
    },
  },
  breadcrumb: {
    description: "Breadcrumb text",
    value: {
      fontFamily: "body",
      fontSize: "caption",
      fontWeight: "regular",
      letterSpacing: "relaxed",
      textTransform: "uppercase",
      lineHeight: "none",
    },
  },
  productName: {
    description: "Product card name",
    value: {
      fontFamily: "display",
      fontSize: "heading.sm",
      fontWeight: "regular",
      lineHeight: "snug",
    },
  },
  productType: {
    description: "Product type label",
    value: {
      fontFamily: "body",
      fontSize: "caption",
      fontWeight: "regular",
      letterSpacing: "wide",
      textTransform: "uppercase",
      lineHeight: "none",
    },
  },
  productPrice: {
    description: "Product price",
    value: {
      fontFamily: "display",
      fontSize: "body.lg",
      fontWeight: "regular",
      lineHeight: "none",
    },
  },
  sectionTitle: {
    description: "Section heading",
    value: {
      fontFamily: "display",
      fontSize: "heading.xl",
      fontWeight: "light",
      lineHeight: "snug",
    },
  },
  heroTitle: {
    description: "Hero heading",
    value: {
      fontFamily: "display",
      fontSize: "heading.hero",
      fontWeight: "light",
      lineHeight: "tight",
    },
  },
  bodyText: {
    description: "Body paragraph text",
    value: {
      fontFamily: "body",
      fontSize: "body",
      fontWeight: "light",
      lineHeight: "loose",
    },
  },
  footerHeading: {
    description: "Footer column heading",
    value: {
      fontFamily: "body",
      fontSize: "sm",
      fontWeight: "regular",
      letterSpacing: "editorial",
      textTransform: "uppercase",
      lineHeight: "none",
    },
  },
  footerLink: {
    description: "Footer link text",
    value: {
      fontFamily: "body",
      fontSize: "body.sm",
      fontWeight: "light",
      lineHeight: "normal",
    },
  },
  logo: {
    description: "Logo text",
    value: {
      fontFamily: "display",
      fontSize: "heading.lg",
      fontWeight: "regular",
      letterSpacing: "display",
      textTransform: "uppercase",
      lineHeight: "none",
    },
  },
  quote: {
    description: "Testimonial quote text",
    value: {
      fontFamily: "display",
      fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
      fontWeight: "light",
      fontStyle: "italic",
      lineHeight: "normal",
    },
  },
  statNumber: {
    description: "Stat number display",
    value: {
      fontFamily: "display",
      fontSize: "5",
      fontWeight: "light",
      lineHeight: "none",
    },
  },
  statLabel: {
    description: "Stat label text",
    value: {
      fontFamily: "body",
      fontSize: "sm",
      fontWeight: "regular",
      letterSpacing: "wide",
      textTransform: "uppercase",
      lineHeight: "none",
    },
  },
  pdpName: {
    description: "PDP product name",
    value: {
      fontFamily: "display",
      fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)",
      fontWeight: "light",
      lineHeight: "snug",
    },
  },
});
