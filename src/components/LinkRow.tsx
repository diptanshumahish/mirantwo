import Link from "next/link";
import type { ReactNode } from "react";

export function Arrow({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ flex: "none" }}
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
    </svg>
  );
}

/**
 * A full-width rule with a label on the left and an arrow on the right. On
 * hover a curtain wipes down from above and the two ends step towards each
 * other. `tone` picks which colour the curtain fills with.
 */
export default function LinkRow({
  href,
  children,
  tone = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "primary" | "secondary" | "accent";
  external?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      <span className="linkrow__curtain" aria-hidden="true" />
      <span className="linkrow__label">{children}</span>
      <span className="linkrow__icon" aria-hidden="true">
        <Arrow />
      </span>
    </>
  );

  const cls = `linkrow linkrow--on-${tone === "accent" ? "primary" : tone} ${
    tone === "accent" ? "linkrow--accent" : ""
  } ${className}`;

  if (external) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      {inner}
    </Link>
  );
}
