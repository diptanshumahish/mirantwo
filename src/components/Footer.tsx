import Link from "next/link";
import { contact, credits, nav, site } from "@/data/site";
import Wordmark from "./Wordmark";

function Instagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect
        x="2.5"
        y="2.5"
        width="15"
        height="15"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="10" cy="10" r="3.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="14.6" cy="5.4" r="1" fill="currentColor" />
    </svg>
  );
}

export default function Footer() {
  const links = [...nav, { label: "Get in Touch", href: "/contact" }];
  const half = Math.ceil(links.length / 2);

  return (
    <footer className="foot">
      <div>
        <Wordmark />

        <div className="foot__cols">
          <div className="foot__links">
            <div>
              {links.slice(0, half).map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
            <div>
              {links.slice(half).map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="foot__reach">
            <div className="stack t-subtitle-20">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Instagram />
                <p>Instagram</p>
              </div>
              <a
                className="muted-link"
                href={contact.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                @miraniafurniture
              </a>
            </div>
            <div className="stack t-subtitle-20">
              <p>Enquiries</p>
              <a className="muted-link" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="foot__addresses">
        <div className="stack t-subtitle-20" style={{ gap: 2, alignItems: "flex-start" }}>
          <p className="prewrap">
            {contact.address.lines.slice(0, 2).join(",\n")}
          </p>
          <p className="prewrap dim">{contact.address.lines.slice(2).join(", ")}</p>
        </div>
        <div className="stack t-subtitle-20" style={{ gap: 2, alignItems: "flex-start" }}>
          <p>Showroom</p>
          {contact.phones.map((p) => (
            <a key={p} className="muted-link" href={`tel:${p.replace(/\s/g, "")}`}>
              {p}
            </a>
          ))}
        </div>
        <div className="stack t-subtitle-20" style={{ gap: 2, alignItems: "flex-start" }}>
          <p>Hours</p>
          {contact.hours.map((h) => (
            <p key={h.days} className="dim">
              {h.days} — {h.time}
            </p>
          ))}
        </div>
        <div className="stack t-subtitle-20" style={{ gap: 2, alignItems: "flex-start" }}>
          <p>Find us</p>
          <a
            className="muted-link"
            href={contact.map}
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.coords.lat.toFixed(4)}° N, {site.coords.lng.toFixed(4)}° E
          </a>
        </div>
      </div>

      <div className="foot__legal">
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <p className="t-caption-30 up">
            © {site.name} {credits.year}
          </p>
          <p className="t-caption-30 up dim">All rights reserved</p>
        </div>
        <a className="chip" href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
          WhatsApp the showroom
        </a>
      </div>
    </footer>
  );
}
