import { defineSlotRecipe } from "@pandacss/dev";

export const newsletter = defineSlotRecipe({
  className: "newsletter",
  slots: ["root", "inner", "form", "input", "submitButton"],
  base: {
    root: {
      padding: "8rem 4rem",
      bg: "{colors.sand.pale}",
    },
    inner: {
      maxWidth: "700px",
      marginLeft: "auto",
      marginRight: "auto",
      textAlign: "center",
    },
    form: {
      display: "flex",
      gap: "0",
      marginTop: "2.5rem",
      maxWidth: "500px",
      marginLeft: "auto",
      marginRight: "auto",
      "@media (max-width: 640px)": {
        flexDirection: "column",
      },
    },
    input: {
      flex: "1",
      padding: "1rem 1.5rem",
      border: "1px solid {colors.sand}",
      borderRight: "none",
      bg: "white",
      fontFamily: "body",
      fontSize: "0.85rem",
      color: "{colors.espresso}",
      outline: "none",
      transition: "border-color 0.3s ease",
      _placeholder: {
        color: "{colors.gold.light}",
      },
      _focus: {
        borderColor: "{colors.gold}",
      },
      "@media (max-width: 640px)": {
        borderRight: "1px solid {colors.sand}",
        borderBottom: "none",
      },
    },
    submitButton: {
      padding: "1rem 2.5rem",
      bg: "{colors.espresso}",
      color: "{colors.sand.light}",
      fontFamily: "body",
      fontSize: "0.7rem",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      border: "1px solid {colors.espresso}",
      cursor: "pointer",
      transition: "all 0.3s ease",
      whiteSpace: "nowrap",
      _hover: {
        bg: "{colors.gold}",
        borderColor: "{colors.gold}",
      },
    },
  },
});
