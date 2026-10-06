import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import Masthead from "@/components/Masthead";
import Card from "@/components/Card";
import LinkRow from "@/components/LinkRow";
import {
  activeSubs,
  brandName,
  categories,
  categoryBySlug,
  productsInCategory,
  subLabel,
} from "@/data/catalog";

type Params = { category: string };
type Search = { sub?: string };

export function generateStaticParams(): Params[] {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  const c = categoryBySlug.get(category);
  if (!c) return {};
  return { title: c.name, description: c.blurb };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const { category } = await params;
  const { sub } = await searchParams;

  const c = categoryBySlug.get(category);
  if (!c) notFound();

  const all = productsInCategory(c.slug);
  const subs = activeSubs(c);
  const active = sub && subs.some((s) => s.slug === sub) ? sub : null;
  const shown = active ? all.filter((p) => p.sub === active) : all;

  return (
    <Shell theme="summer">
      <Masthead
        eyebrow="Collections"
        title={c.name}
        standfirst={c.blurb}
        marquee={c.name}
        back={{ label: "All collections", href: "/collections" }}
        aside={
          subs.length ? (
            <div className="pills" style={{ justifyContent: "center" }}>
              <Link
                href={`/collections/${c.slug}`}
                className="pill"
                data-active={!active}
                scroll={false}
              >
                Everything <sup>{all.length}</sup>
              </Link>
              {subs.map((s) => (
                <Link
                  key={s.slug}
                  href={`/collections/${c.slug}?sub=${s.slug}`}
                  className="pill"
                  data-active={active === s.slug}
                  scroll={false}
                >
                  {s.name} <sup>{s.count}</sup>
                </Link>
              ))}
            </div>
          ) : null
        }
      />

      <section className="section section--tight-top on-secondary">
        <div className="grid" style={{ position: "relative", zIndex: 1 }}>
          {shown.map((p, i) => (
            <Card
              key={p.slug}
              href={`/products/${p.slug}`}
              image={p.image}
              title={p.name}
              meta={[brandName(p.brand), subLabel(p.category, p.sub)]
                .filter(Boolean)
                .join(" · ")}
              contain
              delay={(i % 3) * 80}
              priority={i < 3}
            />
          ))}
        </div>

        {shown.length === 0 ? (
          <p className="t-subtitle-30 mt-xl">
            Nothing in this cut yet.
          </p>
        ) : null}
      </section>

      <section className="section on-primary">
        <div className="measure stack gap-3xs">
          <p className="t-body-30 up center mb-md">
            Elsewhere in the catalogue
          </p>
          {categories
            .filter((x) => x.slug !== c.slug && productsInCategory(x.slug).length > 0)
            .map((x) => (
              <LinkRow key={x.slug} href={`/collections/${x.slug}`} tone="primary">
                {x.name} ({productsInCategory(x.slug).length})
              </LinkRow>
            ))}
        </div>
      </section>
    </Shell>
  );
}
