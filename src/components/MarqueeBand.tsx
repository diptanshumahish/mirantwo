import Marquee from "./Marquee";

/**
 * A cropped band of oversized display type, sitting in the flow directly below
 * a headline.
 *
 * It is deliberately in-flow rather than absolutely parked behind the block:
 * positioning it from the block's bottom edge means a title that wraps to two
 * lines drives the letterforms straight through the copy, and how many lines a
 * title takes is not knowable here.
 */
export default function MarqueeBand({
  text,
  duration = 64,
  reverse = false,
}: {
  text: string;
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div className="marquee-band" aria-hidden="true">
      <Marquee
        text={text}
        className="marquee--display"
        duration={duration}
        reverse={reverse}
      />
    </div>
  );
}
