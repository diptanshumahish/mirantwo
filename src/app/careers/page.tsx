import type { Metadata } from "next";
import Shell from "@/components/Shell";
import Masthead from "@/components/Masthead";
import EnquiryForm from "@/components/EnquiryForm";
import Frame from "@/components/Frame";
import Reveal from "@/components/Reveal";
import { contact, credits, site } from "@/data/site";
import { brands, products } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Work on the Mirania floor — showroom sales, interior consulting, project installation and operations in Kolkata.",
};

const WHAT_IT_IS = [
  {
    title: "One floor, nine houses",
    body: `You would be working across ${brands.length} international houses and ${products.length} pieces, which means learning the difference between them properly rather than reading a spec sheet at the client.`,
  },
  {
    title: "Long relationships",
    body: "Most of our clients come back — for the second room, the office, the next house. The job is judged on what happens after delivery, not at the till.",
  },
  {
    title: "Specification, not selling",
    body: "The useful conversation is about orientation, use and maintenance. If you like solving that, the rest of the job follows.",
  },
];

export default function Careers() {
  return (
    <Shell theme="summer">
      <Masthead
        eyebrow="Careers"
        title={"Come and work\non the floor"}
        standfirst={`${credits.year - site.founded} years in, we still hire the same way — for curiosity about how a room works, and patience with the people who live in it.`}
        marquee="Careers"
      />

      <section className="on-secondary pad">
        <Reveal>
          <Frame
            src="/img/site/career-banner.jpg"
            alt="The Mirania team on the showroom floor"
            ratio={16 / 9}
            sizes="100vw"
            priority
          />
        </Reveal>
      </section>

      <section className="section on-secondary">
        <div className="grid grid--text">
          {WHAT_IT_IS.map((c, i) => (
            <Reveal key={c.title} delay={i * 100} className="stack gap-2xs">
              <p className="serif up t-title-10">{c.title}</p>
              <p className="t-subtitle-20 dim-70">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section on-primary">
        <div className="contact-grid">
          <Reveal>
            <EnquiryForm mode="careers" />
          </Reveal>
          <Reveal delay={140} className="stack gap-sm">
            <p className="t-body-30 up dim">Or simply write</p>
            <p className="t-title-20 serif up">{contact.email}</p>
            <p className="t-subtitle-20 dim-70">
              Attach a CV and, if the role is client-facing, one paragraph on a room
              you have furnished — yours or someone else&rsquo;s. Applications are read
              by the people you would be working beside.
            </p>
            <p className="t-subtitle-20 dim-70 prewrap">
              {contact.address.name}
              {"\n"}
              {contact.address.lines.join("\n")}
            </p>
          </Reveal>
        </div>
      </section>
    </Shell>
  );
}
