import Link from "next/link";
import Frame from "./Frame";
import Reveal from "./Reveal";

/**
 * The catalogue unit: a 4:5 photograph over a two-line caption. Product shots
 * are cut out on white, so they get `contain` and sit on the warm surface;
 * editorial photography fills the frame.
 */
export default function Card({
  href,
  image,
  title,
  meta,
  contain = false,
  ratio = 4 / 5,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  delay = 0,
  priority = false,
}: {
  href: string;
  image: string;
  title: string;
  meta?: string;
  contain?: boolean;
  ratio?: number;
  sizes?: string;
  delay?: number;
  priority?: boolean;
}) {
  return (
    <Reveal delay={delay}>
      <Link href={href} className="card">
        <Frame
          src={image}
          alt={title}
          ratio={ratio}
          sizes={sizes}
          contain={contain}
          parallax={!contain}
          zoom
          priority={priority}
        />
        <div className="card__caption">
          <h3 className="card__title">{title}</h3>
          {meta ? <p className="card__meta">{meta}</p> : null}
        </div>
      </Link>
    </Reveal>
  );
}
