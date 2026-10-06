import { about } from "./site";

/**
 * "The Grain" — a short editorial column. Every entry is built from Mirania's
 * own published copy (see `about` in ./site) rather than invented prose; the
 * headings and standfirsts are editorial framing around those paragraphs.
 */

export type Entry = {
  slug: string;
  /** Issue number, printed as N.001. */
  number: string;
  date: string;
  dateLabel: string;
  title: string;
  standfirst: string;
  image: string;
  body: string[];
  pullQuote?: string;
};

export const entries: Entry[] = [
  {
    slug: "twenty-years-in-the-room",
    number: "N.005",
    date: "2026-07-18",
    dateLabel: "18 · JUL · 26",
    title: "Twenty Years in the Room",
    standfirst:
      "Two decades of furnishing Eastern India, in the words we started with.",
    image: "/img/site/home-mockup2.jpg",
    body: [...about.history],
    pullQuote: about.pullQuote,
  },
  {
    slug: "a-multi-designer-house",
    number: "N.004",
    date: "2026-05-22",
    dateLabel: "22 · MAY · 26",
    title: "A Multi-Designer House",
    standfirst:
      "Nine houses, five countries, one floor. Why the store is arranged the way it is.",
    image: "/img/site/slider02.jpg",
    body: [...about.philosophy],
  },
  {
    slug: "what-we-are-for",
    number: "N.003",
    date: "2026-03-09",
    dateLabel: "09 · MAR · 26",
    title: "What We Are For",
    standfirst: "The vision and the mission, stated plainly and without hedging.",
    image: "/img/site/prodotti-macro.jpg",
    body: [about.vision, about.mission],
  },
  {
    slug: "the-trick-is-in-the-hand",
    number: "N.002",
    date: "2025-11-14",
    dateLabel: "14 · NOV · 25",
    title: "The Trick Is in the Hand",
    standfirst:
      "Leather, boucle, oak, powder-coated steel — the materials we specify most, and what they ask of a room.",
    image: "/img/site/fabric-mockup.jpg",
    body: [
      "A material is a decision about maintenance as much as it is a decision about looks. Full-grain leather takes a mark and keeps it, and a decade later that record of use is the reason the chair is worth having. A pale boucle does the opposite: it asks to be kept, and rewards a room that can afford to keep it.",
      "Timber behaves the same way. Solid oak and walnut move with the season, which is exactly what a veneered panel is engineered not to do. Neither is better. One is a surface that will look identical in fifteen years; the other is a surface that will look like it has been lived with.",
      "The specification conversation we have most often is not about style at all. It is about which of those two outcomes a client actually wants, and then working backwards to the piece.",
    ],
  },
  {
    slug: "light-controlled",
    number: "N.001",
    date: "2025-08-02",
    dateLabel: "02 · AUG · 25",
    title: "Light, Controlled",
    standfirst:
      "Window fashion is the one category specified to the opening rather than to the room.",
    image: "/img/site/prodotti-macro8.jpg",
    body: [
      "Shading is the last thing most interiors consider and the first thing that fails. An opening facing west in Kolkata takes a different system from the same opening facing north, and the difference is not decorative — it is heat, glare and the lifespan of everything the light lands on.",
      "Hunter Douglas builds for that distinction. Duette holds an insulating air pocket in the pleat. Silhouette suspends fabric vanes between two sheers so the light is diffused rather than blocked. Pirouette and Luminette solve the same problem again at different scales, and PowerView motorises any of them so the whole house can move on one schedule.",
      "We measure the opening, take the orientation, and specify from there. It is the least fashionable part of the showroom and the part that changes a room the most.",
    ],
  },
];

export const entryBySlug = new Map(entries.map((e) => [e.slug, e]));
export const featured = entries[0];
