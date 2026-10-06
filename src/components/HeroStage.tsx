"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Full-height image stage. Each slide wipes in over the one below it, left
 * edge travelling from the right-hand side of the frame to the left. Slides
 * are rendered on the server and handed in as children so the first frame is
 * in the HTML.
 */
export default function HeroStage({
  slides,
  interval = 5600,
}: {
  slides: ReactNode[];
  interval?: number;
}) {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(-1);

  useEffect(() => {
    if (slides.length < 2) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setActive((i) => {
        setPrev(i);
        return (i + 1) % slides.length;
      });
    }, interval);
    return () => clearInterval(id);
  }, [slides.length, interval]);

  return (
    <div className="hero__stage">
      {slides.map((slide, i) => {
        const shown = i === active || i === prev;
        return (
          <div
            key={i}
            className="hero__slide"
            style={{
              clipPath: shown ? "inset(0 0 0 0%)" : "inset(0 0 0 100%)",
              opacity: shown ? 1 : 0,
              zIndex: i === active ? 2 : i === prev ? 1 : 0,
            }}
          >
            {slide}
          </div>
        );
      })}
      <div className="hero__seam" aria-hidden="true" />
    </div>
  );
}
