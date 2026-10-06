import type { Metadata } from "next";
import Link from "next/link";
import Shell from "@/components/Shell";
import Masthead from "@/components/Masthead";
import Frame from "@/components/Frame";
import Reveal from "@/components/Reveal";
import { entries } from "@/data/journal";

export const metadata: Metadata = {
  title: "The Grain",
  description:
    "A design column from the Mirania floor — materials, specification and twenty years of furnishing Eastern India.",
};

export default function JournalIndex() {
  const [lead, ...rest] = entries;

  return (
    <Shell>
      <Masthead
        eyebrow="A design column, unfiltered"
        title="The Grain"
        standfirst="Notes from the floor — what we specify, why, and what it does to a room ten years on."
        marquee="The Grain"
      />

      <section className="on-secondary pad">
        <Reveal>
          <Link href={`/journal/${lead.slug}`} className="feature card">
            <div className="feature__scrim" aria-hidden="true" />
            <Frame src={lead.image} alt="" fill sizes="100vw" zoom className="feature__bg" priority />
            <div className="feature__grid">
              <p className="t-body-30 up dim-70" style={{ gridRow: "span 2" }}>
                {lead.number}
              </p>
              <p className="t-body-30 dim-70" style={{ gridColumn: 2 }}>
                {lead.dateLabel}
              </p>
              <div
                className="stack"
                style={{ gridColumn: 2, gridRow: 2, justifyContent: "flex-end", gap: 8 }}
              >
                <h2 className="t-title-20">{lead.title}</h2>
                <p className="t-subtitle-20 dim-70">{lead.standfirst}</p>
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      <section className="section on-secondary">
        <div className="grid--2">
          {rest.map((e, i) => (
            <Reveal key={e.slug} delay={(i % 2) * 100}>
              <Link href={`/journal/${e.slug}`} className="card">
                <Frame
                  src={e.image}
                  alt=""
                  ratio={16 / 10}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  zoom
                />
                <div className="card__caption gap-2xs">
                  <div style={{ display: "flex", gap: 16 }}>
                    <p className="t-body-20 up dim">{e.number}</p>
                    <p className="t-body-20 up dim">{e.dateLabel}</p>
                  </div>
                  <h3 className="serif up t-title-10" style={{ letterSpacing: "-0.02em" }}>
                    {e.title}
                  </h3>
                  <p className="t-subtitle-20 dim-70" style={{ whiteSpace: "normal" }}>
                    {e.standfirst}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </Shell>
  );
}
