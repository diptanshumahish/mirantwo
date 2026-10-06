/**
 * An infinitely scrolling line of text. Two identical tracks sit side by side
 * and both translate a full track width, so the seam is never visible.
 */
export default function Marquee({
  text,
  repeat = 4,
  duration = 44,
  reverse = false,
  className = "",
}: {
  text: string;
  /** Copies per track — enough that one track is always wider than the screen. */
  repeat?: number;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  const track = (
    <div
      className="marquee__track"
      style={{ ["--marquee-dur" as string]: `${duration}s` }}
      aria-hidden="true"
    >
      {Array.from({ length: repeat }, (_, i) => (
        <span key={i}>{text}</span>
      ))}
    </div>
  );

  return (
    <div className={`marquee ${reverse ? "marquee--reverse" : ""} ${className}`}>
      {track}
      {track}
    </div>
  );
}
