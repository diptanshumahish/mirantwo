import Shell from "@/components/Shell";
import Masthead from "@/components/Masthead";
import LinkRow from "@/components/LinkRow";
import { nav } from "@/data/site";

export default function NotFound() {
  return (
    <Shell>
      <Masthead
        eyebrow="404"
        title={"That room\nis not here"}
        standfirst="The page has moved or never existed. Everything else is one row away."
        marquee="404"
      />
      <section className="section on-primary">
        <div className="measure stack gap-3xs">
          <LinkRow href="/" tone="primary">
            Home
          </LinkRow>
          {nav.map((l) => (
            <LinkRow key={l.href} href={l.href} tone="primary">
              {l.label}
            </LinkRow>
          ))}
          <LinkRow href="/contact" tone="primary">
            Get in Touch
          </LinkRow>
        </div>
      </section>
    </Shell>
  );
}
