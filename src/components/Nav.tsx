"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";
import { Lockup } from "./Logo";
import { Arrow } from "./LinkRow";

/**
 * A solid bar pinned to the top of every page, on the page's own light
 * surface with a hairline under it.
 *
 * It is opaque rather than translucent on purpose: the bar spends most of its
 * life over full-bleed photography, and a blurred tint of the surface leaves
 * dark text sitting on a dark image. At the top of the home page it merges
 * seamlessly into the hero plate, which shares the same surface.
 */
export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="nav">
      <div className="nav__bar">
        <Link href="/" className="nav__brand" aria-label={`${site.name} — home`}>
          <Lockup />
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav__link"
              data-active={isActive(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="nav__cta"
          data-active={isActive("/contact")}
        >
          <span>Get in Touch</span>
          <span className="nav__cta-icon" aria-hidden="true">
            <Arrow />
          </span>
        </Link>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-panel"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div className="nav__panel" id="nav-panel" hidden={!open}>
        <nav aria-label="Primary, mobile">
          {[...nav, { label: "Get in Touch", href: "/contact" }].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              data-active={isActive(item.href)}
              style={{ ["--i" as string]: i }}
            >
              {item.label}
              <Arrow size={18} />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
