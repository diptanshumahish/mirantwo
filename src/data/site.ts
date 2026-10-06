/**
 * Canonical business content. Every string here is carried over from mirania.in.
 */

export const site = {
  name: "Mirania",
  legalName: "Mirania Furniture",
  url: "https://mirania.in",
  tagline: "At Mirania, we are driven to transform spaces into spectacular, comfortable havens.",
  shortDescription:
    "Mirania is a multi-designer furniture boutique in Eastern India, curating premium home, office and hospitality interiors through opulent furniture and accent pieces.",
  founded: 2003,
  city: "Kolkata",
  timezone: "Asia/Kolkata",
  coords: { lat: 22.5411351, lng: 88.3887001 },
} as const;

export const contact = {
  email: "info@mirania.in",
  phones: ["+91 33 40048900", "+91 98319 13000", "+91 99039 78887"],
  primaryPhone: "+91 9831 913000",
  primaryPhoneHref: "tel:+919831913000",
  whatsapp: "https://api.whatsapp.com/send?phone=919831913000",
  whatsappNumber: "919831913000",
  address: {
    name: "K3N Lifestyles",
    lines: ["#3 Mirania Gardens", "11F East Topsia Road", "Kolkata — 700 046", "West Bengal, India"],
  },
  hours: [
    { days: "Monday — Friday", time: "10:00 — 19:30" },
    { days: "Saturday", time: "10:00 — 19:30" },
    { days: "Sunday", time: "Closed" },
  ],
  /** 24h local opening window used by the live "open now" indicator. */
  openHours: { open: 10, close: 19.5, closedDays: [0] as readonly number[] },
  map: "https://www.google.com/maps/dir//Mirania+Furniture,+3,+E+Topsia+Rd,+Mirania+Gardens,+11F,+Topsia,+Kolkata,+West+Bengal+700046,+India",
  social: {
    instagram: "https://www.instagram.com/miraniafurniture/",
    facebook: "https://www.facebook.com/MiraniaFurniture",
  },
} as const;

export const nav = [
  { label: "Collections", href: "/collections" },
  { label: "Brands", href: "/brands" },
  { label: "Studio", href: "/studio" },
  { label: "Journal", href: "/journal" },
  { label: "Careers", href: "/careers" },
] as const;

export const about = {
  history: [
    "Over 20 years ago, Mirania Furniture was launched with the aim to take the phenomenon of obtaining furniture solutions to a level that reflects finesse and convenience with every purchase. Since our inception, we have actively revolutionized residential and commercial spaces, while conveying pure aesthetic brilliance through opulent furniture and accent pieces.",
    "With 20 plus years of industry experience, we have curated an abode for premium home & office solutions ensuring that each piece is seamlessly delivered while keeping the client's needs in mind. Our store is one that resonates with the homemakers and office goers alike, as we build long-term symbiotic relationships with our clients whom we consider part of our family.",
  ],
  vision:
    "Envisioning a world where everyone has access to stunning, timeless furniture that is a true embodiment of one's unique style and elevates their home's and office's décor. We are committed to providing the finest quality of luxury furniture that is timeless, lavish, and exudes comfort in every aspect for every client.",
  mission:
    "Our mission at Mirania Furniture is to provide the utmost in luxurious home and office furnishings, exceptional customer service, and outstanding quality that will last for generations. We strive to curate timeless pieces that will bring beauty, comfort, and style to residential, commercial, and hospitality spaces, while upholding the highest standards of craftsmanship and commitment to excellence.",
  philosophyTitle: "Destination for premium, world-class furniture.",
  philosophy: [
    "Over 20 years ago, we launched our establishment as a part of the Mirania group as the furniture vertical, with the aim to take the phenomenon of obtaining furniture solutions to a level that reflects finesse and convenience with every purchase. Our inception marked a path for us to revolutionize residential and commercial spaces, while conveying pure aesthetic brilliance through opulent furniture and accent pieces.",
    "As a multi-designer store, we have housed globally renowned brands, including Stanley, La-z-Boy, Hunter Douglas, Stressless and Steelcase, cementing our position as a marvelous furniture boutique in Eastern India. Till date, each piece is seamlessly delivered while keeping the client's needs in mind. From residential clientele to suppliers and vast offices, we have housed splendid furniture solutions that are in sync with market trends.",
  ],
  pullQuote:
    "Our opportunity, as designers, is to learn how to handle the complexity, rather than shy away from it, and to realize that the big art of design is to make complicated things simple.",
} as const;

export const credits = {
  year: 2026,
  line: "© Mirania. All rights reserved.",
} as const;
