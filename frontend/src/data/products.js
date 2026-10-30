// ── EDIT ME ─────────────────────────────────────────────────────────────
// All catalogue content lives here. Prices and specs are SAMPLE values, not
// verified company data. Image files live in /public/images.
// images: list of photos (first = main photo + selector thumbnail).
// spin:   OPTIONAL real turntable sequence (8–36 frames) → enables drag-to-rotate.
// ────────────────────────────────────────────────────────────────────────
export const HERO_IMAGE = ""; // e.g. "/images/hero.webp" (wide lifestyle photo). Empty = textured placeholder.

export const products = [
  { id: "PL-JB-001", name: "Standard Jute Shopping Bag", short: "Natural · red trim · 32.5 × 23.5 cm",
    dimensions: "32.5 cm W × 23.5 cm H × 15.5 cm gusset (from product photo — please verify)",
    material: "Sample: Natural woven jute, contrast cotton-web handles and trim", price: "₹ 85 / bag (sample)",
    images: ["/images/standard-red-trim.webp"] },
  { id: "PL-JB-002", name: "Jute Gift Bag with Window", short: "Clear window · gift packaging",
    dimensions: "30 × 22 × 10 cm (sample)", material: "Sample: Natural jute, clear PVC window, rope-style handles",
    price: "₹ 120 / bag (sample)", images: ["/images/gift-window-bag.webp"] },
  { id: "PL-JB-003", name: "Jute Bottle Bag", short: "Single bottle · cane handles",
    dimensions: "12 × 38 × 12 cm (sample)", material: "Sample: Natural jute, cane handles, printable front",
    price: "₹ 95 / bag (sample)", images: ["/images/gift-bottle-bags.jpeg"] },
  { id: "PL-JB-004", name: "Promotional Jute Bag", short: "Zip top · your logo",
    dimensions: "Made to order (sample)", material: "Sample: Natural jute, zip closure, screen-printed with your logo",
    price: "₹ 60 / bag (sample)", images: ["/images/promo-your-logo.webp"] },
  { id: "PL-JB-005", name: "Printed Jute Bag — Nautical", short: "Single-colour print · white edging",
    dimensions: "Made to order (sample)", material: "Sample: Natural jute with white edging, single-colour screen print",
    price: "₹ 75 / bag (sample)", images: ["/images/promo-sailing-print.webp"] },
  { id: "PL-JB-006", name: "Printed Jute Bag — Floral", short: "Multi-colour print · bordered",
    dimensions: "Made to order (sample)", material: "Sample: Natural jute, multi-colour floral and dot print",
    price: "₹ 90 / bag (sample)", images: ["/images/promo-floral-print.webp"] },
  { id: "PL-JB-007", name: "Premium Printed Jute Tote", short: "Geometric print · leather-look handles",
    dimensions: "Made to order (sample)", material: "Sample: Fine jute blend, geometric print, leather-look handles",
    price: "₹ 220 / bag (sample)", images: ["/images/premium-geometric.webp"] },
  { id: "PL-JB-008", name: "Green Jute Tote", short: "Dyed jute · wooden handles",
    dimensions: "Made to order (sample)", material: "Sample: Dyed jute, wooden-look handles, tassel charm",
    price: "₹ 180 / bag (sample)", images: ["/images/premium-green-tote.webp"] },
  { id: "PL-JB-009", name: "Jute Folder Bag — Folk Print", short: "Folk-art print · green piping",
    dimensions: "Made to order (sample)", material: "Sample: Jute with folk-art print panel, piped edges, cut-out handles",
    price: "₹ 160 / bag (sample)", images: ["/images/premium-warli-folder.webp"] },
];
