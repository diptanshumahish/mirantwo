import Link from "next/link";
import type { ReactNode } from "react";
import MarqueeBand from "./MarqueeBand";
import Reveal from "./Reveal";
import { Arrow } from "./LinkRow";

/**
 * The top of every interior page, built like the home page's headline
 * sections: a small centred label over a large centred serif title, with a
 * band of display type running behind it.
 *
 * The standfirst and `aside` (filter pills, a specification list) sit in their
 * own band below rather than beside the title. Small copy set over 300px
 * letterforms is unreadable — only the title is large enough to survive them.
 */
export default function Masthead({
  eyebrow,
  title,
  standfirst,
  aside,
  marquee,
  back,
}: {
  eyebrow: string;
  title: string;
  standfirst?: string;
  aside?: ReactNode;
  marquee?: string;
  back?: { label: string; href: string };
}) {
  return (
    <>
      <header className="masthead">
        <div className="measure stack" style={{ gap: 24, position: "relative", zIndex: 1 }}>
          {back ? (
            <Reveal className="center">
              <Link href={back.href} className="t-body-20 up backlink">
                <span className="backlink__arrow" aria-hidden="true">
                  <Arrow />
                </span>
                {back.label}
              </Link>
            </Reveal>
          ) : (
            <Reveal as="p" className="t-body-20 up center dim">
              {eyebrow}
            </Reveal>
          )}

          <Reveal as="h1" delay={80} className="t-title-60 center balance prewrap">
            {title}
          </Reveal>
        </div>

        {marquee ? <MarqueeBand text={marquee} /> : null}
      </header>

      {standfirst || aside ? (
        <div className="masthead__aside stack">
          {standfirst ? (
            <Reveal as="p" className="t-subtitle-30 center balance measure">
              {standfirst}
            </Reveal>
          ) : null}
          {aside}
        </div>
      ) : null}
    </>
  );
}
