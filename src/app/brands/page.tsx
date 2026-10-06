import type { Metadata } from "next";
import Shell from "@/components/Shell";
import Masthead from "@/components/Masthead";
import Card from "@/components/Card";
import Marquee from "@/components/Marquee";
import { brands, productsByBrand } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Brands",
  description:
    "Nine houses from five countries — Stanley, Bolia, Wendelbo, Viccarbe, Steelcase, Hunter Douglas, Grado, M.A.D and Michael Strads.",
};

export default function BrandsIndex() {
  const withStock = brands.filter((b) => productsByBrand(b.slug).length > 0);

  return (
    <Shell theme="fall">
      <Masthead
        eyebrow="Brands"
        title={"Nine houses,\nfive countries"}
        standfirst="A multi-designer floor. Each house is carried in full rather than sampled, so a room can be resolved in one language or deliberately mixed."
        marquee="Houses"
      />

      <section className="section section--tight-top on-secondary">
        <div className="grid" style={{ position: "relative", zIndex: 1 }}>
          {withStock.map((b, i) => (
            <Card
              key={b.slug}
              href={`/brands/${b.slug}`}
              image={b.cover}
              title={b.name}
              meta={`${b.origin} · ${productsByBrand(b.slug).length} pieces`}
              delay={(i % 3) * 80}
              priority={i < 3}
            />
          ))}
        </div>
      </section>

      <section className="band">
        <Marquee
          text={brands.map((b) => `${b.name} · ${b.origin}`).join("  —  ")}
          className="marquee--band"
          repeat={1}
          duration={52}
          reverse
        />
      </section>

      <section className="section on-primary">
        <div className="measure stack gap-lg">
          {brands.map((b) => (
            <div key={b.slug} className="stack gap-2xs">
              <div className="row row--baseline gap-xs">
                <h2 className="t-title-20">{b.name}</h2>
                <p className="t-body-20 up dim">{b.origin}</p>
              </div>
              <p className="t-subtitle-20 dim-70">{b.blurb}</p>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
