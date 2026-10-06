#!/usr/bin/env node
/**
 * Pulls the photography referenced by src/data/catalog.json (plus the editorial
 * stills) from mirania.in into public/img.
 *
 * Two sources, tried in that order:
 *   1. the live origin — fastest, but it rate-limits hard and will firewall an
 *      IP that pulls too quickly;
 *   2. the Wayback Machine — slower, but it holds byte-identical snapshots and
 *      stays reachable when the origin has shut us out.
 *
 * The script probes the origin once at startup and picks a source from that,
 * so a blocked origin does not cost a failed request per file. It is fully
 * resumable: anything already on disk is skipped, so re-running it only fetches
 * what is still missing.
 *
 *   node scripts/fetch-assets.mjs                # auto
 *   node scripts/fetch-assets.mjs --source=wayback
 *   node scripts/fetch-assets.mjs --source=origin
 */

import { mkdir, writeFile, readFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://mirania.in";
/**
 * `id_` asks the archive for the raw original byte stream rather than its
 * viewer page. The timestamp is only a hint — the archive redirects to the
 * nearest capture it holds — so one request settles whether a file exists at
 * all, and there is no point asking again for a different year.
 */
const WAYBACK = (url) => `https://web.archive.org/web/2024id_/${url}`;

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Referer: "https://mirania.in/",
  Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

/** Editorial stills used across the redesign. */
const SITE_IMAGES = [
  "about-banner-new.jpg", "about-large-1.jpg", "about-large-2.jpg", "about-large-3.jpg",
  "bolia-collage.jpg", "bolia-feature.jpg", "bolia-feature1.jpg", "bolia-feature2.jpg",
  "career-banner.jpg", "career-img-1.jpg",
  "category-1.jpg", "category-2.jpg", "category-3.jpg", "category-4.jpg", "category-5.jpg", "category-6.jpg",
  "Collage-img-stanli.jpg", "fabric-mockup.jpg",
  "grado-collage.jpg", "grado-feature.jpg", "grado-feature1.jpg",
  "hd-collage.jpg", "hd-feature.jpg", "home-mockup2.jpg",
  "mad-collage.jpg", "mad-feature.jpg", "mad-feature1.jpg",
  "ms-collage.jpg", "ms-feature.jpg", "ms-feature1.jpg",
  "prodotti-macro.jpg", "prodotti-macro1.jpg", "prodotti-macro3.jpg", "prodotti-macro4.jpg",
  "prodotti-macro5.jpg", "prodotti-macro6.jpg", "prodotti-macro7.jpg", "prodotti-macro70.jpg",
  "prodotti-macro8.jpg", "prodotti-macro80.jpg",
  "slider01.jpg", "slider02.jpg", "slider03.jpg", "slider04.jpg", "slider05.jpg",
  "stanley-collage.jpg", "stanley-feature-1.jpg", "stanley-feature-2.jpg",
  "stanley-feature-3.jpg", "stanley-feature.jpg",
  "steelcase-collage.jpg", "steelcase-feature.jpg", "steelcase-feature1.jpg",
  "viccarbe-feature.jpg", "viccarbe-feature1.jpg",
  "wendelbo-collage.jpg", "wendelbo-feature.jpg", "wendelbo-feature1.jpg",
];

const arg = (name, fallback) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=")[1] : fallback;
};
const SOURCE = arg("source", "auto");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function onDisk(path) {
  try {
    return (await stat(path)).size > 500;
  } catch {
    return false;
  }
}

async function get(url, timeoutMs) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(url, { headers: HEADERS, signal: ac.signal, redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 500) throw new Error(`too small (${buf.length}B)`);
    return buf;
  } finally {
    clearTimeout(t);
  }
}

async function originAlive() {
  try {
    await get(`${ORIGIN}/assets/images/logo-name.png`, 12_000);
    return true;
  } catch {
    return false;
  }
}

async function buildJobs() {
  const catalog = JSON.parse(await readFile(join(root, "src/data/catalog.json"), "utf8"));
  const jobs = new Map();

  for (const name of SITE_IMAGES) {
    jobs.set(join(root, "public/img/site", name), `${ORIGIN}/assets/images/${encodeURIComponent(name)}`);
  }
  for (const p of catalog) {
    for (const local of [p.image, ...p.gallery]) {
      if (!local) continue;
      const name = local.split("/").pop();
      const bucket = local.startsWith("/img/f/") ? "feature" : "galary";
      jobs.set(
        join(root, "public", local),
        `${ORIGIN}/Admin/includes/uploads/${bucket}/${encodeURIComponent(name)}`,
      );
    }
  }
  return [...jobs].map(([dest, url]) => ({ dest, url }));
}

/** Runs `worker` over `items` with a fixed number of concurrent slots. */
async function pool(items, size, worker) {
  let cursor = 0;
  const runners = Array.from({ length: size }, async () => {
    while (cursor < items.length) {
      const i = cursor++;
      await worker(items[i], i);
    }
  });
  await Promise.all(runners);
}

async function main() {
  const jobs = await buildJobs();
  for (const dir of ["site", "f", "g"]) {
    await mkdir(join(root, "public/img", dir), { recursive: true });
  }

  const pending = [];
  for (const job of jobs) if (!(await onDisk(job.dest))) pending.push(job);

  console.log(`${jobs.length} assets referenced · ${pending.length} missing`);
  if (!pending.length) return console.log("Nothing to do.");

  let source = SOURCE;
  if (source === "auto") {
    process.stdout.write("Probing origin… ");
    source = (await originAlive()) ? "origin" : "wayback";
    console.log(source === "origin" ? "reachable." : "unreachable — falling back to the Wayback Machine.");
  }

  const viaOrigin = source === "origin";
  const concurrency = viaOrigin ? 2 : 10;
  const pause = viaOrigin ? 250 : 0;
  const timeout = viaOrigin ? 30_000 : 45_000;

  let ok = 0;
  let done = 0;
  const failed = [];

  await pool(pending, concurrency, async (job) => {
    // One source, two attempts. A file the archive has not captured fails fast
    // instead of burning minutes on fallbacks that cannot succeed.
    const url = viaOrigin ? job.url : WAYBACK(job.url);

    let saved = false;
    let lastErr = "";
    for (let attempt = 0; attempt < 2 && !saved; attempt++) {
      try {
        await writeFile(job.dest, await get(url, timeout));
        saved = true;
        ok++;
      } catch (err) {
        lastErr = err.message;
        if (attempt === 0) await sleep(900);
      }
    }
    if (!saved) failed.push(`${job.url} — ${lastErr}`);
    if (pause) await sleep(pause);

    done++;
    if (done % 25 === 0 || done === pending.length) {
      process.stdout.write(`  ${done}/${pending.length} · saved ${ok} · failed ${failed.length}\n`);
    }
  });

  console.log(`\nDone. Saved ${ok}, failed ${failed.length}.`);
  if (failed.length) {
    await writeFile(join(root, "scripts/.fetch-failures.log"), failed.join("\n"));
    console.log("Failures listed in scripts/.fetch-failures.log — re-run to retry just those.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
