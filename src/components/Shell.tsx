import type { ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

export type Theme = "neutral" | "summer" | "fall" | "spring";

/**
 * Wraps every page. The `data-theme` sits here rather than on <html> so each
 * route can carry its own palette — including the fixed nav and the footer —
 * without a client-side flash.
 */
export default function Shell({
  children,
  theme = "neutral",
}: {
  children: ReactNode;
  theme?: Theme;
}) {
  return (
    <div className="shell" data-theme={theme}>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
