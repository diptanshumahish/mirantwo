import { existsSync } from "node:fs";
import { join } from "node:path";

const PUBLIC_DIR = join(process.cwd(), "public");
const FALLBACK = "/img/placeholder.svg";

/** Cache lookups — the same handful of paths are resolved hundreds of times. */
const cache = new Map<string, string>();

/**
 * Photography is pulled from the legacy origin by `scripts/fetch-assets.mjs`.
 * Until a given file is on disk we serve a neutral placeholder rather than a
 * broken image, so the page is always renderable. Once the real asset lands the
 * next build picks it up with no code change.
 */
export function assetSrc(src: string): string {
  if (!src.startsWith("/")) return src;
  const hit = cache.get(src);
  if (hit) return hit;

  const resolved = existsSync(join(PUBLIC_DIR, src)) ? src : FALLBACK;
  cache.set(src, resolved);
  return resolved;
}

export function assetExists(src: string): boolean {
  return assetSrc(src) !== FALLBACK;
}
