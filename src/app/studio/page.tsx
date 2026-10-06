import type { Metadata } from "next";
import Shell from "@/components/Shell";
import Masthead from "@/components/Masthead";
import Frame from "@/components/Frame";
import MarqueeBand from "@/components/MarqueeBand";
import LinkRow from "@/components/LinkRow";
import Reveal from "@/components/Reveal";
import { about, contact, credits, site } from "@/data/site";
import { brands, products } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Studio",
  description: about.philosophyTitle,
};

export default function Studio() {
  const years = credits.year - site.founded;

  return (
    <Shell theme="spring">
      <Masthead
        eyebrow="Studio"
        title={about.philosophyTitle}
        standfirst={site.shortDescription}
        marquee="Studio"
        aside={
          <dl className="deflist">
            <div>
              <dt>Founded</dt>
              <dd>{site.founded}</dd>
            </div>
            <div>
              <dt>Years in the room</dt>
              <dd>{years}</dd>
            </div>
            <div>
              <dt>Houses carried</dt>
              <dd>{brands.length}</dd>
            </div>
            <div>
              <dt>Pieces on the floor</dt>
              <dd>{products.length}</dd>
            </div>
          </dl>
        }
      />

      <section className="on-secondary pad">
        <Reveal>
          <Frame
            src="/img/site/about-banner-new.jpg"
            alt="The Mirania showroom"
            ratio={16 / 9}
            sizes="100vw"
            priority
          />
        </Reveal>
      </section>

      {/* History */}
      <section className="section on-secondary">
        <div className="measure stack gap-md">
          <Reveal as="p" className="t-body-30 up dim">
            History
          </Reveal>
          <div className="prose">
            {about.history.map((p, i) => (
              <Reveal key={i} as="p" delay={i * 90}>
                {p}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The pull quote, set as the full-bleed statement */}
      <section className="statement">
        <div className="statement__inner measure">
          <Reveal as="p" className="t-body-30 up center">
            On design
          </Reveal>
          <Reveal as="h2" delay={80} className="t-title-20 center balance">
            {about.pullQuote}
          </Reveal>
        </div>
        <div className="marquee-bed marquee-bed--center">
          <MarqueeBand text="Simple" duration={64} />
        </div>
      </section>

      {/* Vision & mission */}
      <section className="section on-secondary">
        <div className="grid--2 container">
          <Reveal className="stack gap-xs">
            <p className="t-body-30 up dim">Vision</p>
            <p className="t-subtitle-30">{about.vision}</p>
          </Reveal>
          <Reveal delay={120} className="stack gap-xs">
            <p className="t-body-30 up dim">Mission</p>
            <p className="t-subtitle-30">{about.mission}</p>
          </Reveal>
        </div>
      </section>

      {/* Philosophy over photography */}
      <section className="section section--tight-top on-secondary">
        <div className="grid--2">
          <Reveal>
            <Frame src="/img/site/about-large-2.jpg" alt="" ratio={4 / 5} sizes="50vw" />
          </Reveal>
          <Reveal delay={120}>
            <Frame src="/img/site/about-large-3.jpg" alt="" ratio={4 / 5} sizes="50vw" />
          </Reveal>
        </div>
      </section>

      <section className="section on-secondary">
        <div className="measure stack gap-md">
          <Reveal as="p" className="t-body-30 up dim">
            Philosophy
          </Reveal>
          <div className="prose">
            {about.philosophy.map((p, i) => (
              <Reveal key={i} as="p" delay={i * 90}>
                {p}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section on-primary">
        <div className="measure stack gap-3xs">
          <p className="t-body-30 up center mb-md">
            Come and sit in it
          </p>
          <LinkRow href="/collections" tone="primary">
            See the catalogue
          </LinkRow>
          <LinkRow href="/brands" tone="primary">
            The houses we carry
          </LinkRow>
          <LinkRow href={contact.map} tone="primary" external>
            {contact.address.lines.join(", ")}
          </LinkRow>
          <LinkRow href="/contact" tone="primary">
            Get in Touch
          </LinkRow>
        </div>
      </section>
    </Shell>
  );
}
