import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import Masthead from "@/components/Masthead";
import Frame from "@/components/Frame";
import MarqueeBand from "@/components/MarqueeBand";
import LinkRow from "@/components/LinkRow";
import Reveal from "@/components/Reveal";
import { entries, entryBySlug } from "@/data/journal";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return entries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = entryBySlug.get(slug);
  if (!e) return {};
  return { title: e.title, description: e.standfirst };
}

export default async function JournalEntry({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const e = entryBySlug.get(slug);
  if (!e) notFound();

  const others = entries.filter((x) => x.slug !== e.slug);

  return (
    <Shell>
      <Masthead
        eyebrow="The Grain"
        title={e.title}
        standfirst={e.standfirst}
        back={{ label: "The Grain", href: "/journal" }}
        aside={
          <dl className="deflist">
            <div>
              <dt>Issue</dt>
              <dd>{e.number}</dd>
            </div>
            <div>
              <dt>Published</dt>
              <dd>
                <time dateTime={e.date}>{e.dateLabel}</time>
              </dd>
            </div>
          </dl>
        }
      />

      <section className="on-secondary pad">
        <Reveal>
          <Frame src={e.image} alt="" ratio={16 / 9} sizes="100vw" priority />
        </Reveal>
      </section>

      <section className="section on-secondary">
        <div className="measure prose">
          {e.body.map((p, i) => (
            <Reveal key={i} as="p" delay={i * 70}>
              {p}
            </Reveal>
          ))}
        </div>
      </section>

      {e.pullQuote ? (
        <section className="statement">
          <div className="statement__inner measure">
            <Reveal as="h2" className="t-title-20 center balance">
              {e.pullQuote}
            </Reveal>
          </div>
          <div className="marquee-bed marquee-bed--center">
          <MarqueeBand text={e.number} duration={70} />
        </div>
        </section>
      ) : null}

      <section className="section on-primary">
        <div className="measure stack gap-3xs">
          <p className="t-body-30 up center mb-md">
            More from the column
          </p>
          {others.map((o) => (
            <LinkRow key={o.slug} href={`/journal/${o.slug}`} tone="primary">
              {o.number} — {o.title}
            </LinkRow>
          ))}
        </div>
      </section>
    </Shell>
  );
}
