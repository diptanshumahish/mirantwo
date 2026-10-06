import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  /**
   * A production build and `next dev` cannot share an output directory — they
   * overwrite each other's manifests. `NEXT_DIST_DIR` lets a build run
   * elsewhere while a dev server is up.
   *
   * Page transitions are not configured here: Next's `experimental.viewTransition`
   * only enables React's `<ViewTransition>` component, which the stable React
   * build this project pins does not export. They are driven from
   * `components/ViewTransitions.tsx` against the browser API instead.
   */
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
