import MarqueeBand from "./MarqueeBand";
import Reveal from "./Reveal";

/**
 * The recurring headline block: a small uppercase eyebrow over a large serif
 * title, with a cropped band of oversized honey display type beneath it.
 */
export default function SectionHead({
  eyebrow,
  title,
  marquee,
  size = "40",
  surface = "secondary",
  className = "",
}: {
  eyebrow: string;
  title: string;
  marquee?: string;
  size?: "60" | "40" | "20";
  surface?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <div
      className={`section on-${surface} ${className}`}
      style={{ position: "relative", isolation: "isolate" }}
    >
      <div className="measure stack" style={{ gap: 24 }}>
        <Reveal as="p" className="t-body-30 up center">
          {eyebrow}
        </Reveal>
        <Reveal as="h2" delay={80} className={`t-title-${size} center balance`}>
          {title}
        </Reveal>
      </div>

      {marquee ? <MarqueeBand text={marquee} duration={56} /> : null}
    </div>
  );
}
