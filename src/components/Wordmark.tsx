import { site } from "@/data/site";

/**
 * The full-bleed wordmark. Letters are laid out with `space-between` rather
 * than tracked by hand, so the name spans the container exactly at any
 * viewport — the font size only has to get close.
 */
export default function Wordmark({
  text = site.name,
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  const letters = text.toUpperCase().split("");
  return (
    <div className={`wordmark-xl ${className}`} role="img" aria-label={text}>
      {letters.map((ch, i) => (
        <span key={i} aria-hidden="true">
          {ch}
        </span>
      ))}
    </div>
  );
}
