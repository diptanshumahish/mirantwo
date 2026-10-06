"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Drifts an overscanned image against the page scroll.
 *
 * The wrapper is taller than its frame by `2 × overscan` and starts pushed up
 * by one overscan, so translating between −overscan and +overscan never
 * exposes an edge. All registered layers share one rAF ticker rather than each
 * holding its own scroll listener.
 */

type Layer = { el: HTMLElement; overscan: number };

const layers = new Set<Layer>();
let ticking = false;
let bound = false;

function paint() {
  ticking = false;
  const vh = window.innerHeight;
  for (const layer of layers) {
    const frame = layer.el.parentElement;
    if (!frame) continue;
    const r = frame.getBoundingClientRect();
    if (r.bottom < -200 || r.top > vh + 200) continue;
    // 0 as the frame enters from below, 1 as it leaves past the top.
    const p = (vh - r.top) / (vh + r.height);
    const t = (Math.min(Math.max(p, 0), 1) - 0.5) * 2 * layer.overscan;
    layer.el.style.transform = `translate3d(0, ${t.toFixed(2)}px, 0)`;
  }
}

function request() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(paint);
}

function bind() {
  if (bound) return;
  bound = true;
  addEventListener("scroll", request, { passive: true });
  addEventListener("resize", request, { passive: true });
}

export default function ParallaxInner({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transform = "translate3d(0, 0, 0)";
      return;
    }
    const overscan =
      parseFloat(getComputedStyle(el).getPropertyValue("--overscan")) || 30;
    const layer: Layer = { el, overscan };
    layers.add(layer);
    bind();
    request();
    return () => {
      layers.delete(layer);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`frame__inner ${className}`}
      style={{
        transform: "translate3d(0, calc(-1 * var(--overscan, 30px)), 0)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
