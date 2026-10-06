"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

/**
 * Runs App Router navigations through the browser's View Transitions API, so
 * the outgoing page settles out while the incoming one rises in (see the
 * `::view-transition-*` rules in globals.css).
 *
 * Next's `experimental.viewTransition` flag only enables React's
 * `<ViewTransition>` component, which is not in the stable React build this
 * project pins — so the transition is driven from here instead.
 *
 * Clicks are intercepted at the document in the capture phase, which keeps
 * every existing `next/link` working untouched. Browsers without the API
 * navigate normally.
 */
export default function ViewTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  /** Resolves the in-flight transition once the new route has committed. */
  const settle = useRef<(() => void) | null>(null);

  const finish = () => {
    const done = settle.current;
    settle.current = null;
    done?.();
  };

  // The route has rendered, so the DOM the API is about to snapshot is the new
  // one. Resolve straight away: the browser suppresses rendering while the
  // update callback is outstanding, so requestAnimationFrame never fires here
  // and waiting on a frame deadlocks the transition until it times out.
  useEffect(() => {
    finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  // Never leave a transition outstanding when this unmounts.
  useEffect(() => finish, []);

  useEffect(() => {
    const startViewTransition = document.startViewTransition?.bind(document);
    if (!startViewTransition) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onClick = (event: MouseEvent) => {
      // Leave anything the browser or another handler treats specially alone:
      // new tabs, downloads, modified clicks, cross-origin, same-page hashes.
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }

      // Capture phase, so this runs before `next/link`'s delegated React
      // handler sees the click at all — otherwise Link has already called
      // preventDefault and pushed the route by the time we get here.
      event.preventDefault();
      event.stopPropagation();

      // A second click mid-transition would orphan the first promise, and an
      // unresolved update callback is what makes the browser abort.
      finish();

      const transition = startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            settle.current = resolve;
            router.push(url.pathname + url.search);
          }),
      );

      // Skipping (and the browser's own abort) rejects these promises. They
      // are expected outcomes, not failures, so they are swallowed here —
      // otherwise they surface as uncaught "Transition was skipped/aborted"
      // errors in the console.
      transition.ready.catch(() => {});
      transition.updateCallbackDone.catch(() => {});

      // If the route is slow to arrive — a cold compile in dev, a stalled
      // network — drop the animation rather than holding the page frozen
      // until the browser's own abort fires.
      const bail = window.setTimeout(() => {
        if (settle.current) {
          finish();
          transition.skipTransition();
        }
      }, 1200);
      transition.finished.catch(() => {}).finally(() => window.clearTimeout(bail));
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
