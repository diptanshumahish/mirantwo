import raw from "./catalog.json";

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: string;
  sub: string | null;
  image: string;
  gallery: string[];
};

export const products = raw as Product[];

/* ------------------------------------------------------------------ */
/* Categories                                                          */
/* ------------------------------------------------------------------ */

export type SubCategory = { slug: string; name: string };
export type Category = {
  slug: string;
  name: string;
  /** Editorial one-liner shown on the collection index. */
  blurb: string;
  subs: SubCategory[];
};

export const categories: Category[] = [
  {
    slug: "seating",
    name: "Seating",
    blurb:
      "Sofas, lounge chairs, dining chairs and task seating — the pieces a room is organised around, built for the way a space is actually lived in.",
    subs: [
      { slug: "sofa", name: "Sofas" },
      { slug: "lounge-chair", name: "Lounge Chairs" },
      { slug: "dining-chair", name: "Dining Chairs" },
      { slug: "office-chair", name: "Office Chairs" },
      { slug: "armchair", name: "Armchairs" },
      { slug: "chair", name: "Chairs" },
      { slug: "barstool", name: "Barstools" },
      { slug: "bench", name: "Benches" },
      { slug: "pouf", name: "Poufs" },
    ],
  },
  {
    slug: "table",
    name: "Tables",
    blurb:
      "Coffee, side, dining and executive tables in solid timber, stone and steel — surfaces that hold a room together without asking for attention.",
    subs: [
      { slug: "coffee-table", name: "Coffee Tables" },
      { slug: "dining-table", name: "Dining Tables" },
      { slug: "side-table", name: "Side Tables" },
      { slug: "office-desk", name: "Office Desks" },
      { slug: "bar-table", name: "Bar Tables" },
      { slug: "cafe-table", name: "Cafe Tables" },
    ],
  },
  {
    slug: "beds-and-beddings",
    name: "Beds & Beddings",
    blurb:
      "Beds, mattresses and pillows engineered for rest — the one category where comfort is measured rather than described.",
    subs: [
      { slug: "bed", name: "Beds" },
      { slug: "mattresses", name: "Mattresses" },
      { slug: "pillow", name: "Pillows" },
    ],
  },
  {
    slug: "console-and-crockery-unit",
    name: "Console & Crockery",
    blurb:
      "Storage that behaves like architecture — consoles, sideboards and crockery units that resolve a wall rather than fill it.",
    subs: [],
  },
  {
    slug: "window-fashion",
    name: "Window Fashion",
    blurb:
      "Light, controlled. Motorised shades, sheers and blinds from Hunter Douglas, specified to the opening and the orientation.",
    subs: [],
  },
  {
    slug: "accessories",
    name: "Accessories",
    blurb:
      "Lighting, rugs and accent objects — the last ten per cent that makes an interior read as finished.",
    subs: [],
  },
];

/**
 * Editorial cover per collection. Keyed by slug rather than indexed, because
 * the stills are not in catalogue order and a positional array silently
 * mislabels every card the moment a collection is added or emptied.
 */
export const categoryCovers: Record<string, string> = {
  seating: "/img/site/category-2.jpg",
  table: "/img/site/category-4.jpg",
  "beds-and-beddings": "/img/site/category-1.jpg",
  "console-and-crockery-unit": "/img/site/category-3.jpg",
  "window-fashion": "/img/site/hd-feature.jpg",
  accessories: "/img/site/category-5.jpg",
};

export function categoryCover(slug: string) {
  return categoryCovers[slug] ?? "/img/site/home-mockup2.jpg";
}

/* ------------------------------------------------------------------ */
/* Brands                                                              */
/* ------------------------------------------------------------------ */

export type Brand = {
  slug: string;
  name: string;
  origin: string;
  blurb: string;
  logo: string;
  cover: string;
};

export const brands: Brand[] = [
  {
    slug: "stanley",
    name: "Stanley",
    origin: "India",
    blurb:
      "India's foremost luxury leather furniture house. Full-grain hides, recliner engineering and a catalogue deep enough to furnish an entire home in one language.",
    logo: "/img/f/stanley.jpg",
    cover: "/img/site/prodotti-macro7.jpg",
  },
  {
    slug: "bolia",
    name: "Bolia",
    origin: "Denmark",
    blurb:
      "New Scandinavian design. Bolia works with independent designers across the Nordics to produce soft, considered furniture made to order in Europe.",
    logo: "/img/f/bolia.jpg",
    cover: "/img/site/bolia-feature.jpg",
  },
  {
    slug: "wendelbo",
    name: "Wendelbo",
    origin: "Denmark",
    blurb:
      "A family-run Danish upholstery house since 1965, known for generous seating silhouettes and a restrained, tactile material palette.",
    logo: "/img/f/wendelbo.jpg",
    cover: "/img/site/wendelbo-feature.jpg",
  },
  {
    slug: "viccarbe",
    name: "Viccarbe",
    origin: "Spain",
    blurb:
      "Valencian contemporary design, produced with Mediterranean craft and a roster of international architects. Sculptural lounge and table systems.",
    logo: "/img/f/viccarbe.jpg",
    cover: "/img/site/viccarbe-feature.jpg",
  },
  {
    slug: "steelcase",
    name: "Steelcase",
    origin: "United States",
    blurb:
      "Workplace research turned into furniture. Ergonomic task seating and desking backed by more than a century of study into how people actually work.",
    logo: "/img/f/steelcase.jpg",
    cover: "/img/site/steelcase-feature.jpg",
  },
  {
    slug: "hunter-douglas",
    name: "Hunter Douglas",
    origin: "Netherlands",
    blurb:
      "The global standard in window covering. Duette, Silhouette, Pirouette and Luminette systems with PowerView motorisation.",
    logo: "/img/f/hunter-douglas.jpg",
    cover: "/img/site/prodotti-macro8.jpg",
  },
  {
    slug: "grado",
    name: "Grado",
    origin: "Italy",
    blurb:
      "Italian upholstery with a graphic, contemporary edge — sofas and seating built around bold volumes and confident colour.",
    logo: "/img/f/grado.jpg",
    cover: "/img/site/grado-feature.jpg",
  },
  {
    slug: "m-a-d",
    name: "M.A.D",
    origin: "Canada",
    blurb:
      "Modern accent design. Sculptural tables, barstools and seating that treat everyday furniture as an opportunity for form.",
    logo: "/img/f/m-a-d.jpg",
    cover: "/img/site/mad-feature.jpg",
  },
  {
    slug: "michael-strads",
    name: "Michael Strads",
    origin: "United Kingdom",
    blurb:
      "Tailored lounge and dining seating, cut and finished with a couturier's attention to seam, stitch and stance.",
    logo: "/img/f/michael-strads.jpg",
    cover: "/img/site/ms-feature.jpg",
  },
];

/* ------------------------------------------------------------------ */
/* Lookups                                                             */
/* ------------------------------------------------------------------ */

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));
export const brandBySlug = new Map(brands.map((b) => [b.slug, b]));
export const productBySlug = new Map(products.map((p) => [p.slug, p]));

export function productsInCategory(slug: string) {
  return products.filter((p) => p.category === slug);
}

export function productsByBrand(slug: string) {
  return products.filter((p) => p.brand === slug);
}

export function countIn(category: string, sub?: string) {
  return products.filter(
    (p) => p.category === category && (sub ? p.sub === sub : true),
  ).length;
}

/** Subcategories that actually have stock, with live counts. */
export function activeSubs(category: Category) {
  return category.subs
    .map((s) => ({ ...s, count: countIn(category.slug, s.slug) }))
    .filter((s) => s.count > 0);
}

/** Categories that actually have stock. */
export const activeCategories = categories.filter(
  (c) => productsInCategory(c.slug).length > 0,
);

export function categoryLabel(slug: string) {
  return categoryBySlug.get(slug)?.name ?? slug;
}

export function subLabel(category: string, sub: string | null) {
  if (!sub) return null;
  const c = categoryBySlug.get(category);
  return c?.subs.find((s) => s.slug === sub)?.name ?? null;
}

export function brandName(slug: string) {
  return brandBySlug.get(slug)?.name ?? slug;
}

/** Deterministic pick used for editorial imagery so builds stay stable. */
export function pickCover(categorySlug: string, offset = 0) {
  const list = productsInCategory(categorySlug);
  if (!list.length) return "/img/site/home-mockup2.jpg";
  return list[offset % list.length].image;
}

export function relatedProducts(p: Product, limit = 6) {
  const sameSub = products.filter(
    (x) => x.slug !== p.slug && x.category === p.category && x.sub === p.sub,
  );
  const sameBrand = products.filter(
    (x) => x.slug !== p.slug && x.brand === p.brand && !sameSub.includes(x),
  );
  return [...sameSub, ...sameBrand].slice(0, limit);
}
