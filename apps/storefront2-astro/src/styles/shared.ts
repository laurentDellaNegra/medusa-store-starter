/**
 * Shared style patterns for storefront2-astro.
 *
 * ⚠️  PANDA CSS LIMITATION: Panda uses static AST extraction — it cannot
 * resolve cross-file imports spread into css() calls, nor evaluate function
 * calls at build time. These patterns are defined here as DOCUMENTATION
 * and must be **copied inline** into each component that uses them.
 *
 * See: Button.astro, ProductDetail.astro, CartSummary.astro (goldSlideIn)
 *      QuantitySelector.astro, CartItem.astro (qty styles)
 */

/**
 * Gold slide-in hover effect for buttons.
 * A `_before` pseudo-element slides in from left on hover.
 * Wrap button text in <span> so it stays above the gold overlay.
 *
 * Copy these properties into any css() call that needs the effect:
 *
 *   position: "relative",
 *   overflow: "hidden",
 *   _before: {
 *     content: '""',
 *     position: "absolute",
 *     top: "0",
 *     left: "-100%",
 *     width: "100%",
 *     height: "100%",
 *     bg: "gold",
 *     transition: "left 0.5s ease",
 *     zIndex: "0",
 *   },
 *   _hover: { _before: { left: "0" } },
 *   "& span": { position: "relative", zIndex: "1" },
 */

/**
 * Quantity selector styles (sm = cart, md = PDP).
 *
 * sm: width/height 34px, input 38px, fontSize 0.95rem / 0.8rem
 * md: width/height 44px, input 50px, fontSize 1.1rem / body.sm
 *
 * Shared base:
 *   control: { display: "flex", alignItems: "center", border: "1px solid token(colors.sand)" }
 *   btn:     { border: "none", bg: "transparent", color: "espresso", cursor: "pointer",
 *              fontFamily: "body", transition: "background 0.3s", _hover: { bg: "sand.pale" } }
 *   val:     { textAlign: "center", border: "none",
 *              borderLeft: "1px solid token(colors.sand)", borderRight: "1px solid token(colors.sand)",
 *              fontFamily: "body", bg: "transparent", color: "espresso", outline: "none" }
 */
