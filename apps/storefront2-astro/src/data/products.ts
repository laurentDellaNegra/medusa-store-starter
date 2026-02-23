export interface Product {
  id: string;
  name: string;
  type: string;
  color: string;
  price: number;
  badge: string;
  description: string;
  details: string[];
  gradient: string;
  svg: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "le-marche-tote",
    name: "Le Marché Tote",
    type: "Tote Bag",
    color: "Natural",
    price: 189,
    badge: "New Arrival",
    description:
      "Our signature market tote, generously sized for everyday elegance. Hand-woven from sustainably harvested raphia palm fibres, this bag transitions effortlessly from morning market to afternoon soirée.",
    details: [
      "Hand-woven raphia palm fibre",
      "Interior cotton lining",
      "Leather-trimmed handles",
      "Dimensions: 42 × 30 × 15 cm",
      "Weight: 320g",
    ],
    gradient: "linear-gradient(145deg, #D4C5B2 0%, #BFA98E 40%, #C9B89C 100%)",
    svg: `<svg viewBox="0 0 200 260" fill="none"><ellipse cx="100" cy="55" rx="42" ry="45" stroke="#5C3D2E" stroke-width="2" opacity="0.6"/><path d="M40 105 C40 90, 50 80, 65 78 L135 78 C150 80, 160 90, 160 105 L166 225 C166 240, 155 248, 145 248 L55 248 C45 248, 34 240, 34 225 Z" fill="url(#pg1)" stroke="#5C3D2E" stroke-width="1"/><g opacity="0.2"><line x1="50" y1="120" x2="150" y2="120" stroke="#5C3D2E"/><line x1="48" y1="145" x2="152" y2="145" stroke="#5C3D2E"/><line x1="45" y1="170" x2="155" y2="170" stroke="#5C3D2E"/><line x1="43" y1="195" x2="157" y2="195" stroke="#5C3D2E"/><line x1="42" y1="220" x2="158" y2="220" stroke="#5C3D2E"/></g><defs><linearGradient id="pg1" x1="34" y1="78" x2="166" y2="248"><stop stop-color="#E8DBC8"/><stop offset="1" stop-color="#CFBA9E"/></linearGradient></defs></svg>`,
  },
  {
    id: "l-elegante-clutch",
    name: "L'Élégante Clutch",
    type: "Clutch",
    color: "Honey",
    price: 145,
    badge: "",
    description:
      "Refined simplicity in the palm of your hand. This structured clutch features an artisan-woven body with a polished brass clasp, perfect for evenings that demand understated sophistication.",
    details: [
      "Tightly woven raphia body",
      "Brass magnetic clasp",
      "Suede interior lining",
      "Dimensions: 28 × 16 × 5 cm",
      "Weight: 180g",
    ],
    gradient: "linear-gradient(145deg, #C2B5A0 0%, #A89580 40%, #BEB09A 100%)",
    svg: `<svg viewBox="0 0 200 220" fill="none"><path d="M55 20 C55 10, 65 5, 75 5 L125 5 C135 5, 145 10, 145 20 L145 35 L55 35 Z" fill="none" stroke="#5C3D2E" stroke-width="1.5" opacity="0.5"/><rect x="35" y="35" width="130" height="140" rx="8" fill="url(#pg2)" stroke="#5C3D2E" stroke-width="1"/><rect x="30" y="170" width="140" height="30" rx="4" fill="url(#pg2b)" stroke="#5C3D2E" stroke-width="1"/><g opacity="0.2"><line x1="50" y1="60" x2="150" y2="60" stroke="#5C3D2E"/><line x1="50" y1="85" x2="150" y2="85" stroke="#5C3D2E"/><line x1="50" y1="110" x2="150" y2="110" stroke="#5C3D2E"/><line x1="50" y1="135" x2="150" y2="135" stroke="#5C3D2E"/></g><circle cx="100" cy="45" r="8" fill="none" stroke="#B8956A" stroke-width="1.5"/><defs><linearGradient id="pg2" x1="35" y1="35" x2="165" y2="175"><stop stop-color="#D9CAAD"/><stop offset="1" stop-color="#C4A882"/></linearGradient><linearGradient id="pg2b" x1="30" y1="170" x2="170" y2="200"><stop stop-color="#CCBA9D"/><stop offset="1" stop-color="#BCA580"/></linearGradient></defs></svg>`,
  },
  {
    id: "la-voyageuse",
    name: "La Voyageuse",
    type: "Crossbody",
    color: "Sand",
    price: 215,
    badge: "Bestseller",
    description:
      "The perfect travel companion. La Voyageuse features a gracefully curved silhouette with an adjustable leather strap, designed for the woman who moves through life with effortless grace.",
    details: [
      "Hand-woven raphia with leather trim",
      "Adjustable leather crossbody strap",
      "Interior zip pocket",
      "Dimensions: 24 × 20 × 10 cm",
      "Weight: 260g",
    ],
    gradient: "linear-gradient(145deg, #DED0BD 0%, #CABC9F 40%, #D6C8B5 100%)",
    svg: `<svg viewBox="0 0 200 240" fill="none"><path d="M60 30 Q60 10, 80 10 L120 10 Q140 10, 140 30" fill="none" stroke="#5C3D2E" stroke-width="2" opacity="0.6"/><path d="M45 70 C45 50, 55 40, 70 38 L130 38 C145 40, 155 50, 155 70 L160 200 C160 218, 148 228, 135 228 L65 228 C52 228, 40 218, 40 200 Z" fill="url(#pg3)" stroke="#5C3D2E" stroke-width="1"/><path d="M55 100 L145 100 L148 105 L52 105 Z" fill="#B8956A" opacity="0.3"/><g opacity="0.2"><line x1="55" y1="130" x2="145" y2="130" stroke="#5C3D2E"/><line x1="52" y1="155" x2="148" y2="155" stroke="#5C3D2E"/><line x1="50" y1="180" x2="150" y2="180" stroke="#5C3D2E"/><line x1="48" y1="205" x2="152" y2="205" stroke="#5C3D2E"/></g><defs><linearGradient id="pg3" x1="40" y1="38" x2="160" y2="228"><stop stop-color="#E5D9C5"/><stop offset="1" stop-color="#D1BFA3"/></linearGradient></defs></svg>`,
  },
  {
    id: "la-plage",
    name: "La Plage",
    type: "Beach Bag",
    color: "Sun-bleached",
    price: 235,
    badge: "Limited Edition",
    description:
      "Oversized luxury for sun-soaked days. La Plage is our most generously proportioned bag, featuring an open-weave design that lets the sea breeze flow through while keeping your essentials close.",
    details: [
      "Open-weave raphia construction",
      "Reinforced leather base",
      "Cotton canvas interior",
      "Dimensions: 52 × 35 × 20 cm",
      "Weight: 420g",
    ],
    gradient: "linear-gradient(145deg, #E5D9C5 0%, #D4C4A8 40%, #DDD0BB 100%)",
    svg: `<svg viewBox="0 0 220 240" fill="none"><path d="M50 25 Q50 5, 75 5 L145 5 Q170 5, 170 25" fill="none" stroke="#5C3D2E" stroke-width="2.5" opacity="0.5"/><path d="M25 70 C25 50, 40 38, 60 35 L160 35 C180 38, 195 50, 195 70 L200 205 C200 225, 185 235, 170 235 L50 235 C35 235, 20 225, 20 205 Z" fill="url(#pg4)" stroke="#5C3D2E" stroke-width="1"/><g opacity="0.15"><line x1="38" y1="90" x2="182" y2="90" stroke="#5C3D2E"/><line x1="35" y1="115" x2="185" y2="115" stroke="#5C3D2E"/><line x1="32" y1="140" x2="188" y2="140" stroke="#5C3D2E"/><line x1="28" y1="165" x2="192" y2="165" stroke="#5C3D2E"/><line x1="26" y1="190" x2="194" y2="190" stroke="#5C3D2E"/><line x1="25" y1="215" x2="195" y2="215" stroke="#5C3D2E"/></g><defs><linearGradient id="pg4" x1="20" y1="35" x2="200" y2="235"><stop stop-color="#F0E6D4"/><stop offset="1" stop-color="#D9C9AC"/></linearGradient></defs></svg>`,
  },
  {
    id: "la-petite",
    name: "La Petite",
    type: "Mini Bag",
    color: "Caramel",
    price: 125,
    badge: "",
    description:
      "Small in stature, grand in character. La Petite is our most intimate creation — a miniature masterpiece that holds just the essentials: your keys, lipstick, and a touch of Malagasy magic.",
    details: [
      "Micro-woven raphia",
      "Gold-tone chain strap",
      "Snap closure",
      "Dimensions: 18 × 14 × 6 cm",
      "Weight: 120g",
    ],
    gradient: "linear-gradient(145deg, #D0BDA5 0%, #BEA888 40%, #C8B69C 100%)",
    svg: `<svg viewBox="0 0 160 180" fill="none"><path d="M50 15 Q50 5, 60 5 L100 5 Q110 5, 110 15 L110 28 L50 28 Z" fill="none" stroke="#5C3D2E" stroke-width="1.5" opacity="0.5"/><rect x="30" y="28" width="100" height="110" rx="10" fill="url(#pg5)" stroke="#5C3D2E" stroke-width="1"/><g opacity="0.2"><line x1="42" y1="50" x2="118" y2="50" stroke="#5C3D2E"/><line x1="42" y1="70" x2="118" y2="70" stroke="#5C3D2E"/><line x1="42" y1="90" x2="118" y2="90" stroke="#5C3D2E"/><line x1="42" y1="110" x2="118" y2="110" stroke="#5C3D2E"/></g><circle cx="80" cy="38" r="5" fill="none" stroke="#B8956A" stroke-width="1.2"/><path d="M35 138 Q80 155, 125 138" fill="none" stroke="#5C3D2E" stroke-width="0.8" opacity="0.3"/><defs><linearGradient id="pg5" x1="30" y1="28" x2="130" y2="138"><stop stop-color="#DCCDB7"/><stop offset="1" stop-color="#C5AE90"/></linearGradient></defs></svg>`,
  },
  {
    id: "la-boheme",
    name: "La Bohème",
    type: "Bucket Bag",
    color: "Terre",
    price: 198,
    badge: "New Arrival",
    description:
      "Free-spirited elegance, drawn from the earth. La Bohème features a relaxed bucket silhouette with a drawstring closure, embodying the carefree sophistication of island life.",
    details: [
      "Structured raphia bucket shape",
      "Leather drawstring closure",
      "Detachable shoulder strap",
      "Dimensions: 22 × 26 × 14 cm",
      "Weight: 290g",
    ],
    gradient: "linear-gradient(145deg, #CAB99E 0%, #B5A085 40%, #C2B198 100%)",
    svg: `<svg viewBox="0 0 200 260" fill="none"><path d="M65 18 C80 5, 120 5, 135 18" fill="none" stroke="#5C3D2E" stroke-width="1.5" opacity="0.5"/><path d="M55 50 L145 50 L155 220 C155 240, 140 250, 125 250 L75 250 C60 250, 45 240, 45 220 Z" fill="url(#pg6)" stroke="#5C3D2E" stroke-width="1"/><path d="M55 50 C70 65, 130 65, 145 50" fill="none" stroke="#5C3D2E" stroke-width="1" opacity="0.4"/><ellipse cx="100" cy="50" rx="45" ry="10" fill="none" stroke="#5C3D2E" stroke-width="1" opacity="0.3"/><g opacity="0.2"><line x1="58" y1="90" x2="142" y2="90" stroke="#5C3D2E"/><line x1="56" y1="120" x2="144" y2="120" stroke="#5C3D2E"/><line x1="52" y1="150" x2="148" y2="150" stroke="#5C3D2E"/><line x1="50" y1="180" x2="150" y2="180" stroke="#5C3D2E"/><line x1="48" y1="210" x2="152" y2="210" stroke="#5C3D2E"/></g><defs><linearGradient id="pg6" x1="45" y1="50" x2="155" y2="250"><stop stop-color="#DDD0B8"/><stop offset="1" stop-color="#C5B294"/></linearGradient></defs></svg>`,
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
