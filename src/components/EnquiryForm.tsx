"use client";

import { useState } from "react";
import { contact } from "@/data/site";
import { Arrow } from "./LinkRow";

type Mode = "enquiry" | "careers";

const ROLES = [
  "Showroom sales",
  "Interior consultant",
  "Project & installation",
  "Visual merchandising",
  "Operations & logistics",
  "Open application",
];

/** The business lines the showroom actually quotes for. */
const INTERESTS = [
  "A home",
  "An office",
  "Hospitality",
  "Window fashion",
  "Not sure yet",
];

/**
 * There is no backend behind this site, so the form composes a well-formed
 * mailto (and, for enquiries, a pre-filled WhatsApp message) rather than
 * pretending to submit.
 */
export default function EnquiryForm({ mode = "enquiry" }: { mode?: Mode }) {
  const [f, setF] = useState({
    name: "",
    email: "",
    phone: "",
    role: ROLES[0],
    interest: INTERESTS[0],
    message: "",
  });

  const set =
    (k: keyof typeof f) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setF((prev) => ({ ...prev, [k]: e.target.value }));

  const missing = [
    f.name.trim() === "" ? "your name" : null,
    f.email.trim() === "" ? "an email address" : null,
  ].filter(Boolean) as string[];
  const ready = missing.length === 0;

  const mailto = () => {
    const subject =
      mode === "careers"
        ? `Application — ${f.role}${f.name ? ` — ${f.name}` : ""}`
        : `Enquiry — ${f.interest}${f.name ? ` — ${f.name}` : ""}`;
    const body = [
      f.name ? `Name: ${f.name}` : null,
      f.email ? `Email: ${f.email}` : null,
      f.phone ? `Phone: ${f.phone}` : null,
      mode === "careers" ? `Role: ${f.role}` : `Furnishing: ${f.interest}`,
      f.message ? `\n${f.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    return `mailto:${contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const whatsapp = () => {
    const text = [
      f.name ? `Hello Mirania, this is ${f.name}.` : "Hello Mirania.",
      mode === "enquiry" && f.interest ? `I am furnishing: ${f.interest}.` : null,
      f.message,
    ]
      .filter(Boolean)
      .join(" ");
    return `${contact.whatsapp}&text=${encodeURIComponent(text)}`;
  };

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <div className="form__row">
        <div className="field">
          <label htmlFor="f-name">
            Name <span className="field__req">required</span>
          </label>
          <input
            id="f-name"
            value={f.name}
            onChange={set("name")}
            placeholder="Full name"
            autoComplete="name"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="f-email">
            Email <span className="field__req">required</span>
          </label>
          <input
            id="f-email"
            type="email"
            value={f.email}
            onChange={set("email")}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor="f-phone">Phone</label>
          <input
            id="f-phone"
            value={f.phone}
            onChange={set("phone")}
            placeholder="+91"
            autoComplete="tel"
          />
        </div>
        {mode === "careers" ? (
          <div className="field">
            <label htmlFor="f-role">Role</label>
            <select id="f-role" value={f.role} onChange={set("role")}>
              {ROLES.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
        ) : (
          <div className="field">
            <label htmlFor="f-interest">What are you furnishing?</label>
            <select id="f-interest" value={f.interest} onChange={set("interest")}>
              {INTERESTS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="field">
        <label htmlFor="f-message">
          {mode === "careers" ? "Tell us what you have worked on" : "Anything else"}
        </label>
        <textarea
          id="f-message"
          value={f.message}
          onChange={set("message")}
          rows={5}
          placeholder={
            mode === "careers"
              ? "A line on your experience, and a link to a portfolio if you have one."
              : "The room, the rough timing, a budget if you have one in mind."
          }
        />
      </div>

      <div className="form__foot">
        <div className="form__actions">
          <a
            href={ready ? mailto() : undefined}
            className="btn btn--solid"
            aria-disabled={!ready}
            tabIndex={ready ? undefined : -1}
          >
            {mode === "careers" ? "Send application" : "Send enquiry"}
            <span className="btn__icon" aria-hidden="true">
              <Arrow />
            </span>
          </a>
          {mode === "enquiry" ? (
            <a
              className="btn"
              href={whatsapp()}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp instead
              <span className="btn__icon" aria-hidden="true">
                <Arrow />
              </span>
            </a>
          ) : null}
        </div>

        <p className="form__note" aria-live="polite">
          {ready
            ? "Opens your own mail app with the message already written — nothing is sent from this page."
            : `Add ${missing.join(" and ")} to send.`}
        </p>
      </div>
    </form>
  );
}
