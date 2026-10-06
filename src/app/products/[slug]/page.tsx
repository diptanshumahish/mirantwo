import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import Masthead from "@/components/Masthead";
import Frame from "@/components/Frame";
import Card from "@/components/Card";
import LinkRow from "@/components/LinkRow";
import Reveal from "@/components/Reveal";
import { assetExists } from "@/lib/asset";
import { contact } from "@/data/site";
import {
  brandBySlug,
  brandName,
  categoryLabel,
  productBySlug,
  products,
  relatedProducts,
  subLabel,
} from "@/data/catalog";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug.get(slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${brandName(p.brand)}`,
    description: `${p.name} by ${brandName(p.brand)}. ${categoryLabel(p.category)} at Mirania, Kolkata.`,
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = productBySlug.get(slug);
  if (!p) notFound();

  const brand = brandBySlug.get(p.brand);
  const sub = subLabel(p.category, p.sub);
  const related = relatedProducts(p, 6);
  // The catalogue lists secondary shots that were never archived; only show
  // the ones that actually landed on disk.
  const gallery = p.gallery.filter((g) => g !== p.image && assetExists(g));

  return (
    <Shell>
      <Masthead
        eyebrow={categoryLabel(p.category)}
        title={p.name}
        standfirst={brand?.blurb}
        back={{ label: categoryLabel(p.category), href: `/collections/${p.category}` }}
        aside={
          <dl className="deflist">
            <div>
              <dt>House</dt>
              <dd>{brandName(p.brand)}</dd>
            </div>
            {brand ? (
              <div>
                <dt>Origin</dt>
                <dd>{brand.origin}</dd>
              </div>
            ) : null}
            <div>
              <dt>Collection</dt>
              <dd>{categoryLabel(p.category)}</dd>
            </div>
            {sub ? (
              <div>
                <dt>Type</dt>
                <dd>{sub}</dd>
              </div>
            ) : null}
          </dl>
        }
      />

      <section className="section section--tight-top on-secondary">
        <div className="split">
          <Reveal>
            <Frame
              src={p.image}
              alt={p.name}
              ratio={4 / 5}
              sizes="(min-width: 1024px) 60vw, 100vw"
              contain
              parallax={false}
              priority
            />
          </Reveal>

          <div className="split__side stack gap-sm">
            <Reveal delay={100} className="stack gap-xs">
              <p className="serif up t-title-20">{p.name}</p>
              <p className="t-subtitle-20 dim-70">
                Held in the {contact.address.name} showroom on East Topsia Road.
                Fabric, leather and finish are specified per order — bring the room,
                and we will work backwards to the piece.
              </p>
            </Reveal>

            <Reveal delay={180} className="stack gap-3xs">
              <LinkRow href="/contact" tone="secondary">
                Enquire about {p.name}
              </LinkRow>
              <LinkRow href={contact.whatsapp} tone="secondary" external>
                WhatsApp the showroom
              </LinkRow>
              {brand ? (
                <LinkRow href={`/brands/${brand.slug}`} tone="secondary">
                  More from {brand.name}
                </LinkRow>
              ) : null}
            </Reveal>
          </div>
        </div>

        {gallery.length ? (
          <div className="grid--2 mt-2xl">
            {gallery.map((g, i) => (
              <Reveal key={g} delay={i * 90}>
                <Frame
                  src={g}
                  alt={`${p.name} — view ${i + 2}`}
                  ratio={4 / 5}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  contain
                  parallax={false}
                />
              </Reveal>
            ))}
          </div>
        ) : null}
      </section>

      {related.length ? (
        <section className="section on-primary">
          <p className="t-body-30 up center mb-lg">
            Sits well with
          </p>
          <div className="grid">
            {related.map((r, i) => (
              <Card
                key={r.slug}
                href={`/products/${r.slug}`}
                image={r.image}
                title={r.name}
                meta={brandName(r.brand)}
                contain
                delay={(i % 3) * 80}
              />
            ))}
          </div>
        </section>
      ) : null}
    </Shell>
  );
}
