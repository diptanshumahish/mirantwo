import type { Metadata } from "next";
import Shell from "@/components/Shell";
import Masthead from "@/components/Masthead";
import Card from "@/components/Card";
import LinkRow from "@/components/LinkRow";
import {
  activeCategories,
  activeSubs,
  categoryCover,
  products,
  productsInCategory,
} from "@/data/catalog";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Seating, tables, beds, storage and window fashion — the full Mirania catalogue, arranged by room.",
};

export default function CollectionsIndex() {
  return (
    <Shell theme="summer">
      <Masthead
        eyebrow="Collections"
        title={"Everything,\narranged by room"}
        standfirst={`${products.length} pieces across ${activeCategories.length} collections, drawn from nine houses in five countries.`}
        marquee="Collections"
      />

      <section className="section section--tight-top on-secondary">
        <div className="grid" style={{ position: "relative", zIndex: 1 }}>
          {activeCategories.map((c, i) => (
            <Card
              key={c.slug}
              href={`/collections/${c.slug}`}
              image={categoryCover(c.slug)}
              title={c.name}
              meta={`${productsInCategory(c.slug).length} pieces`}
              delay={(i % 3) * 90}
              priority={i < 3}
            />
          ))}
        </div>
      </section>

      {/* A flat index of every subcategory, for people who know what they want. */}
      <section className="section on-primary">
        <div className="measure stack gap-3xs">
          <p className="t-body-30 up center mb-md">
            Straight to it
          </p>
          {activeCategories.flatMap((c) => {
            const subs = activeSubs(c);
            if (!subs.length) {
              return [
                <LinkRow key={c.slug} href={`/collections/${c.slug}`} tone="primary">
                  {c.name} ({productsInCategory(c.slug).length})
                </LinkRow>,
              ];
            }
            return subs.map((s) => (
              <LinkRow
                key={`${c.slug}-${s.slug}`}
                href={`/collections/${c.slug}?sub=${s.slug}`}
                tone="primary"
              >
                {c.name} — {s.name} ({s.count})
              </LinkRow>
            ));
          })}
        </div>
      </section>
    </Shell>
  );
}
