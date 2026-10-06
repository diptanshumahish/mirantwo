import type { Metadata } from "next";
import Shell from "@/components/Shell";
import Masthead from "@/components/Masthead";
import EnquiryForm from "@/components/EnquiryForm";
import LinkRow from "@/components/LinkRow";
import Frame from "@/components/Frame";
import Reveal from "@/components/Reveal";
import OpenNow from "@/components/OpenNow";
import { contact, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Get in Touch",
  description: `Visit the ${contact.address.name} showroom on East Topsia Road, Kolkata, or send an enquiry.`,
};

const coords = `${site.coords.lat.toFixed(4)}° N, ${site.coords.lng.toFixed(4)}° E`;

export default function Contact() {
  return (
    <Shell theme="fall">
      <Masthead
        eyebrow="Get in Touch"
        title={"It would be a privilege\nto furnish your rooms"}
        standfirst="Bring a plan, a photograph or nothing at all. Most specifications are settled faster in the showroom than over email."
        marquee="Hello"
      />

      {/* The form is the page's job, so it leads — lifted onto the dark surface
          so it reads as somewhere to type rather than as more page. */}
      <section className="section section--tight-top on-secondary">
        <div className="contact-lead">
          <Reveal className="panel">
            <div className="stack gap-sm mb-lg">
              <p className="t-body-30 up dim-70">Send an enquiry</p>
              <h2 className="t-title-20 serif up">Tell us about the room</h2>
            </div>
            <EnquiryForm />
          </Reveal>

          <Reveal delay={140} className="stack gap-lg">
            <div className="stack gap-2xs">
              <p className="t-body-30 up dim">Prefer to talk</p>
              <p className="t-subtitle-30 balance">
                The showroom answers during opening hours, and WhatsApp is usually
                the quickest way to send a photograph of the room.
              </p>
            </div>

            <div className="stack gap-3xs">
              <LinkRow href={contact.primaryPhoneHref} tone="secondary" external>
                {contact.primaryPhone}
              </LinkRow>
              <LinkRow href={contact.whatsapp} tone="secondary" external>
                WhatsApp the showroom
              </LinkRow>
              <LinkRow href={`mailto:${contact.email}`} tone="secondary" external>
                {contact.email}
              </LinkRow>
              <LinkRow href={contact.map} tone="secondary" external>
                Get directions
              </LinkRow>
            </div>

            <div className="stack gap-2xs">
              <p className="t-body-30 up dim">What happens next</p>
              <p className="t-subtitle-20 dim-70">
                One of us reads it — not a queue. Expect a reply within a working
                day, and a question or two before any specification: orientation,
                use, and how the room is actually lived in.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Standing facts, three across. */}
      <section className="section on-secondary section--tight-top">
        <Reveal className="three-up">
          <div>
            <p className="t-body-30 up dim">Visit</p>
            <p className="t-subtitle-20 prewrap">
              {contact.address.name}
              {"\n"}
              {contact.address.lines.join("\n")}
            </p>
            <p className="t-body-20 dim mt-sm">{coords}</p>
          </div>

          <div>
            <p className="t-body-30 up dim">Hours</p>
            <OpenNow />
            <dl className="deflist mt-sm">
              {contact.hours.map((h) => (
                <div key={h.days}>
                  <dt>{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <p className="t-body-30 up dim">Elsewhere</p>
            <p className="t-subtitle-20 dim-70">
              New arrivals and finished rooms are posted first on Instagram.
            </p>
            <div className="stack gap-3xs mt-sm">
              <LinkRow href={contact.social.instagram} tone="secondary" external>
                Instagram
              </LinkRow>
              <LinkRow href={contact.social.facebook} tone="secondary" external>
                Facebook
              </LinkRow>
            </div>
            <p className="t-body-20 dim mt-sm">
              Switchboard {contact.phones[0]}
            </p>
          </div>
        </Reveal>
      </section>

      <section className="on-secondary pad pb-gutter">
        <Reveal>
          <Frame
            src="/img/site/home-mockup2.jpg"
            alt={`The ${contact.address.name} showroom on East Topsia Road`}
            ratio={21 / 9}
            sizes="100vw"
          />
        </Reveal>
      </section>
    </Shell>
  );
}
