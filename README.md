# Mirania II

A second website for Mirania Furniture (Kolkata), built on the design language of
[houseofhoney.com](https://www.houseofhoney.com/) rather than the editorial grid used in
`../miran`. Same business, same photography, same catalogue — a completely different
visual system, and a completely separate project.

Next.js 15 App Router, React 19, TypeScript, no CSS framework and no runtime
dependencies beyond React. Every page is statically prerendered.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # 396 static pages
npm run typecheck
npm run build:check  # build into .next-check, so a dev server can stay up
```

---

## The design system

The reference site's tokens were read off its shipped stylesheet and reproduced
directly. Where a value is copied rather than invented it is because matching it is the
point of the exercise.

### Palette

Both the base ramp and the four-slot theming model come from the reference.

| Base           | Value     | | Base            | Value     |
| -------------- | --------- |-| --------------- | --------- |
| cream          | `#fff8ef` | | dark brown      | `#331917` |
| blush          | `#edccbe` | | dark green      | `#003933` |
| orange         | `#ffeacf` | | red             | `#d1410f` |
| light green    | `#d8ce7e` | | honey (accent)  | `#edbc00` |
| lime (accent)  | `#aff552` | | pink (accent)   | `#fc72c4` |

Nothing in the CSS reads a base colour by name. Surfaces read four theme slots —
`--bg-primary` / `--text-primary` (the dark surface), `--bg-secondary` /
`--text-secondary` (the light surface) — plus `--accent` and `--on-accent`. A
`data-theme` on the page wrapper reskins the whole page, nav and footer included:

| Theme     | Dark surface | Light surface | Accent | Used on                        |
| --------- | ------------ | ------------- | ------ | ------------------------------ |
| `neutral` | dark brown   | blush         | honey  | home, products, journal, 404   |
| `summer`  | dark brown   | orange        | honey  | collections, careers           |
| `fall`    | red          | orange        | honey  | brands, contact                |
| `spring`  | dark green   | cream         | lime   | studio                         |

`spring` departs from the reference: it pairs dark green with **cream** rather than
light green, because lime display type on a light-green ground is illegible at marquee
scale.

### Type

Three families, all self-hosted from `public/fonts`:

| Role                                    | Reference face             | Here                |
| --------------------------------------- | -------------------------- | ------------------- |
| Oversized display (marquee, wordmark)   | Canora                     | **Bodoni Moda**     |
| Headlines, always uppercase             | Noe Text                   | **Instrument Serif**|
| Nav, captions, body, controls           | Neue Haas Grotesk Display  | **Switzer**         |

The originals are commercial; the substitutes are open-licensed faces with the same
job — a high-contrast display serif, a wedge-serif text face that sets well in caps,
and a neutral grotesque.

The scale is the reference's, fluid between a 375px and a 1600px viewport:

```
--title-100   250 → 580px    the marquee, and only the marquee
--title-60     56 → 100px    page titles
--title-40     40 →  64px    section headlines
--title-20     24 →  48px    statements, card titles
--title-10     24 →  32px    hero lines, small headings
--subtitle-30  18 →  22px  · --subtitle-20  18 → 20px
--body-30      16 →  18px  · --body-20      14 → 16px  · --caption-30  12 → 16px
```

`--fluid` is a length (0px at 375, 1px at 1600), so each step is
`clamp(min, min + range × --fluid, max)` with no media queries.

### Spacing

One rhythm, defined once and used everywhere — pages carry no inline pixel margins:

```
--space-3xs  8px   --space-sm   24px   --space-xl   72px
--space-2xs  12px  --space-md   32px   --space-2xl  96px
--space-xs   16px  --space-lg   48px
--section-y  72 → 96 → 144px   (by breakpoint)
```

`.section`, `.section--tight-top`, `.mt-*`, `.mb-*` and `.gap-*` apply it. The page
gutter is a deliberate **8px**, so images run almost edge to edge and the navigation
bar's logo lines up with the first card below it.

---

## The motifs

Everything on the site is assembled from these.

**1. The navigation bar** (`Nav.tsx`, `Logo.tsx`). A solid bar on the page's own light
surface with a hairline under it: the Mirania mark and logotype at the left, links and a
contact pill at the right, all aligned to the same 8px gutter as every image below.

It is opaque rather than translucent on purpose — the bar spends most of its life over
full-bleed photography, and a blurred tint of the surface leaves dark text sitting on a
dark image. At the top of the home page it merges seamlessly into the hero plate, which
shares its surface.

The mark is the real logotype, redrawn as vector: two overlapping 321-radius arches on a
shared baseline, forming an arcade that reads as an M. Geometry sits on the centreline
so the drawn edges land exactly on the viewBox bounds and the mark optically aligns with
the type beside it.

**2. The marquee band** (`MarqueeBand.tsx`, `.marquee-band`). Oversized honey display
type scrolling under every headline, cropped so the letters are cut just above the
baseline.

The band is **in the flow**, not parked behind the block. Positioning it from the
block's bottom edge — which is what the reference does — drives 300px letterforms
straight through the copy as soon as a title wraps to two lines, and how many lines a
title takes is not knowable at the component. Its height is derived from the type
(`calc(var(--title-100) * 0.62)`, against a 0.7em cap height) rather than pinned in
pixels, so the crop holds at every viewport.

The one place the marquee sits *behind* text is `.statement` — the full-height blocks on
the home and studio pages — where the headline sits at the top and the closing line at
the bottom, so the band passes cleanly between them.

**3. Curtain link rows** (`LinkRow.tsx`, `.linkrow`). A full-width rule with a label and
an arrow. On hover a curtain wipes down from above and the two ends step towards each
other. `tone` picks which colour fills.

**4. Parallax frames** (`Frame.tsx` + `ParallaxInner.tsx`, `.frame`). Images overscan
their frame by 30px (80px from `lg`) and drift against the scroll. All layers share one
rAF ticker rather than each holding a scroll listener; reduced motion pins them flat.

**5. 4:5 cards on an 8px gutter** (`Card.tsx`). Three up, captioned in two lines —
title, then a muted meta line.

### The wordmark

`Wordmark.tsx` lays the letters out with `justify-content: space-between` and
`flex: none`, so the name spans its container exactly at any viewport and the font size
only has to get close. 21vw was measured (375 → 1920) as the largest size whose packed
width still fits, so the letters never compress into each other.

### Product photography

Catalogue shots are cut out on white. `.frame--contain` gives them a plate of the
current light surface and multiplies the image into it, so no white card is ever stamped
onto a coloured section. `isolation: isolate` keeps that blend against the plate rather
than against whatever section is underneath — without it the same shot reads correctly
on blush and turns to mud on dark brown.

---

## Page transitions

Navigations run through the browser's View Transitions API: the outgoing page fades and
lifts while the incoming one rises into place over 520ms, and the navigation bar is
pinned so it never flickers between routes.

It is driven from `components/ViewTransitions.tsx` rather than by Next's
`experimental.viewTransition` flag. That flag only enables React's `<ViewTransition>`
component, which the stable React 19.1 build this project pins does not export — with
the flag alone, `document.startViewTransition` is never called. Clicks are intercepted
at the document in the **capture** phase, which is the only place that works: `next/link`
handles clicks through React's delegated listener on the root container, so a
bubble-phase listener on `document` sees the event only after Link has already called
`preventDefault` and pushed the route.

Three things this has to get right, each of which otherwise ends in the browser aborting
the transition and logging an error:

- **Resolve the update callback the moment the route commits.** The browser suppresses
  rendering while the callback is outstanding, so `requestAnimationFrame` never fires
  inside it — waiting on a frame deadlocks the transition until it times out. The
  `pathname`/`searchParams` effect resolves directly instead.
- **Never orphan a transition.** A second click mid-flight would leave the first promise
  unresolved, so a new navigation settles the previous one first.
- **Swallow the expected rejections.** `ready` and `finished` reject when a transition is
  skipped or aborted; unhandled, those surface as uncaught console errors.

A 1200ms guard skips the animation if a route is slow to arrive — a cold compile in dev,
a stalled network — rather than holding the page frozen. Reduced motion and browsers
without the API navigate normally, with no animation.

`useSearchParams` in the component means it must sit inside a `<Suspense>` boundary in
the root layout; without it every route would opt out of static generation.

---

## Content

All business content is Mirania's own, carried over from `../miran`:

- `src/data/site.ts` — name, tagline, contact, hours, address, about/vision/mission
- `src/data/catalog.json` — 366 products
- `src/data/catalog.ts` — categories, subcategories, 9 brands, lookups
- `src/data/journal.ts` — **new.** "The Grain", a five-entry column. Three entries are
  Mirania's own published copy (history, philosophy, vision and mission) with editorial
  framing; two are written for the section.

`categoryCovers` in `catalog.ts` is keyed by slug, not indexed. The editorial stills are
not in catalogue order, and a positional array silently mislabels every card the moment
a collection is added or emptied.

### Pages

| Route                     | Theme     |                                                     |
| ------------------------- | --------- | --------------------------------------------------- |
| `/`                       | neutral   | hero, studio statement, collections, brand band, journal, CTA |
| `/collections`            | summer    | category grid + a flat index of every subcategory   |
| `/collections/[category]` | summer    | product grid, `?sub=` filter pills                  |
| `/products/[slug]`        | neutral   | 366 pages — photography, specs, related             |
| `/brands`, `/brands/[slug]` | fall    | 9 houses                                            |
| `/studio`                 | spring    | history, pull quote, vision, mission, philosophy    |
| `/journal`, `/journal/[slug]` | neutral | The Grain                                         |
| `/careers`                | summer    | with application form                               |
| `/contact`                | fall      | with enquiry form                                   |

### Forms

There is no backend. `EnquiryForm` composes a well-formed `mailto:` (and, for
enquiries, a pre-filled WhatsApp message) rather than pretending to submit, and says so
under the buttons.

---

## Assets

`public/img` holds 424 files copied from `../miran` (~36MB): 366 catalogue shots in
`img/f`, 57 editorial stills in `img/site`. `img/g` (secondary product views) is
referenced by the catalogue but was never archived, so `src/lib/asset.ts` resolves any
missing path to a placeholder at build time and product pages filter their galleries
through `assetExists` — a piece is shown with the views that actually exist rather than
a row of placeholders. `scripts/fetch-assets.mjs` re-pulls anything missing.

## Accessibility

Skip link; `prefers-reduced-motion` disables reveals, parallax and the hero carousel;
focus-visible rings on the accent; the marquee is `aria-hidden` decoration; images
carry alt text or are explicitly decorative.
