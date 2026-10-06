import Link from "next/link";
import Shell from "@/components/Shell";
import Frame from "@/components/Frame";
import HeroStage from "@/components/HeroStage";
import Wordmark from "@/components/Wordmark";
import Marquee from "@/components/Marquee";
import MarqueeBand from "@/components/MarqueeBand";
import SectionHead from "@/components/SectionHead";
import Card from "@/components/Card";
import LinkRow from "@/components/LinkRow";
import Reveal from "@/components/Reveal";
import { site, credits } from "@/data/site";
import { activeCategories, brands, categoryCover, productsInCategory } from "@/data/catalog";
import { featured } from "@/data/journal";

const HERO = [
  "/img/site/slider03.jpg",
  "/img/site/slider01.jpg",
  "/img/site/prodotti-macro7.jpg",
  "/img/site/about-banner-new.jpg",
  "/img/site/slider04.jpg",
];

export default function Home() {
  return (
    <Shell>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="hero__plate">
        <Wordmark />
        <div className="hero__lines">
          <p>{"Interiors, Objects\n& Atmospheres"}</p>
          <p style={{ textAlign: "right" }}>{"Made to be\nlived with"}</p>
        </div>
      </section>

      <HeroStage
        slides={HERO.map((src, i) => (
          <Frame
            key={src}
            src={src}
            alt=""
            fill
            parallax={i === 0}
            priority={i === 0}
            sizes="100vw"
          />
        ))}
      />

      {/* -------------------------------------------------------------- Studio */}
      <section className="statement" id="studio">
        <div className="statement__inner measure">
          <Reveal as="p" className="t-body-30 up center">
            Studio
          </Reveal>
          <Reveal as="h2" delay={80} className="t-title-20 center balance">
            {site.tagline}
          </Reveal>
          <Reveal delay={160} className="statement__tail">
            <p className="serif up t-subtitle-30 center balance">
              A multi-designer house in {site.city}, {credits.year - site.founded} years
              in the room
            </p>
          </Reveal>
        </div>
        <div className="marquee-bed marquee-bed--center">
          <MarqueeBand text={site.name} duration={60} />
        </div>
      </section>

      {/* --------------------------------------------------------- Collections */}
      <SectionHead
        eyebrow="Collections"
        title={"Rooms with\na memory"}
        marquee="Seating"
        surface="secondary"
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
              priority={i === 0}
            />
          ))}
        </div>
        <div className="mt-2xl">
          <LinkRow href="/collections" tone="secondary">
            See the full catalogue
          </LinkRow>
        </div>
      </section>

      {/* ------------------------------------------------------------- Brands */}
      <section className="band">
        <div className="pad mb-sm">
          <p className="t-body-30 up center">Represented</p>
        </div>
        <Marquee
          text={brands.map((b) => b.name).join("  ·  ")}
          className="marquee--band"
          repeat={1}
          duration={40}
        />
        <div className="pad mt-md">
          <div className="measure">
            <LinkRow href="/brands" tone="primary">
              All nine houses
            </LinkRow>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Journal */}
      <SectionHead
        eyebrow="A design column, unfiltered"
        title="The Grain"
        marquee="The Grain"
        surface="primary"
      />

      <section className="section section--tight-top on-primary">
        <Link href={`/journal/${featured.slug}`} className="feature card">
          <div className="feature__scrim" aria-hidden="true" />
          <Frame src={featured.image} alt="" fill sizes="100vw" zoom className="feature__bg" />
          <div className="feature__grid">
            <p className="t-body-30 up dim-70" style={{ gridRow: "span 2" }}>
              {featured.number}
            </p>
            <p className="t-body-30 dim-70" style={{ gridColumn: 2 }}>
              {featured.dateLabel}
            </p>
            <div
              className="stack"
              style={{ gridColumn: 2, gridRow: 2, justifyContent: "flex-end", gap: 8 }}
            >
              <h3 className="t-title-20">{featured.title}</h3>
              <p className="t-subtitle-20 dim-70">Read more</p>
            </div>
          </div>
        </Link>

        <div className="mt-2xl">
          <LinkRow href="/journal" tone="primary">
            Read the column
          </LinkRow>
        </div>
      </section>

      {/* ---------------------------------------------------------------- CTA */}
      <section className="banner on-secondary">
        <Frame src="/img/site/about-banner-new.jpg" alt="" fill sizes="100vw" />
        <div className="banner__grid pad">
          <div className="banner__plate">
            <div className="row row--start gap-sm">
              <p className="t-body-30 up" style={{ flex: 1 }}>
                {site.city} · Est. {site.founded}
              </p>
              <p className="t-body-30 up dim">
                {site.coords.lat.toFixed(4)}° N, {site.coords.lng.toFixed(4)}° E
              </p>
            </div>
            <div className="stack gap-sm mt-lg">
              <Reveal as="h2" className="t-title-20 prewrap">
                {"It would be a privilege\nto furnish your rooms"}
              </Reveal>
              <LinkRow href="/contact" tone="secondary">
                Get in Touch
              </LinkRow>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
