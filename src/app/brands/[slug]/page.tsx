import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import Masthead from "@/components/Masthead";
import Card from "@/components/Card";
import Frame from "@/components/Frame";
import LinkRow from "@/components/LinkRow";
import Reveal from "@/components/Reveal";
import { assetExists } from "@/lib/asset";
import {
  brandBySlug,
  brands,
  categoryLabel,
  productsByBrand,
  subLabel,
} from "@/data/catalog";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const b = brandBySlug.get(slug);
  if (!b) return {};
  return { title: b.name, description: b.blurb };
}

export default async function BrandPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const b = brandBySlug.get(slug);
  if (!b) notFound();

  const stock = productsByBrand(b.slug);
  const collage = `/img/site/${b.slug.replace("hunter-douglas", "hd").replace("m-a-d", "mad").replace("michael-strads", "ms")}-collage.jpg`;
  const hasCollage = assetExists(collage);

  // Which collections this house actually reaches into.
  const spread = [...new Set(stock.map((p) => p.category))];

  return (
    <Shell theme="fall">
      <Masthead
        eyebrow="Brands"
        title={b.name}
        standfirst={b.blurb}
        back={{ label: "All brands", href: "/brands" }}
        marquee={b.name}
        aside={
          <dl className="deflist">
            <div>
              <dt>Origin</dt>
              <dd>{b.origin}</dd>
            </div>
            <div>
              <dt>Pieces carried</dt>
              <dd>{stock.length}</dd>
            </div>
            <div>
              <dt>Collections</dt>
              <dd>{spread.map(categoryLabel).join(", ")}</dd>
            </div>
          </dl>
        }
      />

      {hasCollage ? (
        <section className="on-secondary pad">
          <Reveal>
            <Frame
              src={collage}
              alt={`${b.name} interiors`}
              ratio={16 / 9}
              sizes="100vw"
              priority
            />
          </Reveal>
        </section>
      ) : null}

      <section className="section on-secondary">
        <div className="grid" style={{ position: "relative", zIndex: 1 }}>
          {stock.map((p, i) => (
            <Card
              key={p.slug}
              href={`/products/${p.slug}`}
              image={p.image}
              title={p.name}
              meta={[categoryLabel(p.category), subLabel(p.category, p.sub)]
                .filter(Boolean)
                .join(" · ")}
              contain
              delay={(i % 3) * 70}
            />
          ))}
        </div>
      </section>

      <section className="section on-primary">
        <div className="measure stack gap-3xs">
          <p className="t-body-30 up center mb-md">
            The other houses
          </p>
          {brands
            .filter((x) => x.slug !== b.slug)
            .map((x) => (
              <LinkRow key={x.slug} href={`/brands/${x.slug}`} tone="primary">
                {x.name} — {x.origin}
              </LinkRow>
            ))}
        </div>
      </section>
    </Shell>
  );
}
