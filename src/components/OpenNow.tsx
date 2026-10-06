"use client";

import { useEffect, useState } from "react";
import { contact, site } from "@/data/site";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Local time at the showroom, regardless of where the reader is. */
function showroomNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timezone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = DAYS.indexOf(get("weekday"));
  const hour = Number(get("hour"));
  const minute = Number(get("minute"));
  return { day, hour, minute, decimal: hour + minute / 60, label: `${get("hour")}:${get("minute")}` };
}

function status() {
  const { day, decimal, label } = showroomNow();
  const { open, close, closedDays } = contact.openHours;
  const closedToday = closedDays.includes(day);
  const isOpen = !closedToday && decimal >= open && decimal < close;

  if (isOpen) {
    const closes = `${String(Math.floor(close)).padStart(2, "0")}:${String(
      Math.round((close % 1) * 60),
    ).padStart(2, "0")}`;
    return { isOpen, line: `Open now — until ${closes}`, time: label };
  }

  // Walk forward to the next day the showroom actually opens.
  let ahead = closedToday || decimal >= close ? 1 : 0;
  while (closedDays.includes((day + ahead) % 7)) ahead++;
  const when =
    ahead === 0
      ? `today at ${String(open).padStart(2, "0")}:00`
      : ahead === 1
        ? `tomorrow at ${String(open).padStart(2, "0")}:00`
        : `${DAYS[(day + ahead) % 7]} at ${String(open).padStart(2, "0")}:00`;
  return { isOpen, line: `Closed — opens ${when}`, time: label };
}

/**
 * Live open/closed indicator for the showroom, in its own timezone.
 *
 * Rendered as a neutral placeholder on the server: the answer depends on the
 * reader's clock, and prerendering one would either mismatch on hydration or
 * bake a stale answer into the static HTML.
 */
export default function OpenNow() {
  const [state, setState] = useState<ReturnType<typeof status> | null>(null);

  useEffect(() => {
    const tick = () => setState(status());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!state) {
    return (
      <p className="opennow" aria-hidden="true">
        <span className="opennow__dot" />
        <span className="opennow__line">Kolkata</span>
      </p>
    );
  }

  return (
    <p className="opennow">
      <span
        className="opennow__dot"
        data-open={state.isOpen}
        aria-hidden="true"
      />
      <span className="opennow__line">{state.line}</span>
      <span className="opennow__time">{state.time} IST</span>
    </p>
  );
}
