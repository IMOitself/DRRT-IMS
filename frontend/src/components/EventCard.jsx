import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/format";

// an event that has not started yet has no attendance to see
const hasEventStarted = (event) => {
  const start = new Date(event.date);
  if (event.time_hour) {
    start.setHours(
      (Number(event.time_hour) % 12) + (event.time_ampm === "PM" ? 12 : 0),
      Number(event.time_minute) || 0, 0, 0
    );
  } else {
    start.setHours(0, 0, 0, 0);
  }
  return start <= new Date();
};

// to: the attendance page of the event, leave empty for a card that is not clickable
// attendances: leave empty to hide the present/absent/late counts
// menu: shown at the top right of the card
// children: shown at the bottom of the card
export default function EventCard({ event, to, attendances, menu, children }) {
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);

  // a pending event has no attendance yet either
  const canSeeAttendance = Boolean(to) && hasEventStarted(event) && !event.pending_approval;

  const countByStatus = (status) =>
    attendances.filter(
      (a) => a.event_id === event.id && a.status === status
    ).length;

  const Card = to ? Link : "div";

  return (
    <Card
      to={to}
      draggable={false}
      onClick={(e) => {
        if (!canSeeAttendance || !window.getSelection().isCollapsed) e.preventDefault();
      }}
      className={`relative group block select-text bg-white border border-blue-border p-4 rounded-xl shadow-sm space-y-2 transition-all duration-300${canSeeAttendance ? " hover:border-blue" : ""}`}>
      <div className={`flex-1 flex flex-col gap-1${menu ? " pr-8" : ""}`}>
        {/* venue online */}
        {event.venue_online && (
          <div className="flex flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-2 text-blue">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]!">
                  videocam
                </span>
                <span className="font-geist text-xs font-bold uppercase tracking-wider">
                  {event.venue_online}
                </span>
              </div>
              {Boolean(event.removal_requested) && (
                <span className="bg-red-bg text-red inline-flex items-center gap-1.5 font-geist font-semibold px-2.5 py-0.5 rounded-full text-xs w-fit">
                  <span className="bg-red w-2 h-2 rounded-full" />
                  Removal Requested
                </span>
              )}
            </div>
            <span className="font-geist text-xs font-semibold text-subtext bg-surface-container-high px-2 py-0.5 rounded-full">
              Online
            </span>
          </div>
        )}

        {/* venue face to face */}
        {event.venue_facetoface && (
          <div className="flex flex-row items-center justify-between gap-2 text-sm">
            <div className="flex items-center gap-2 text-blue">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]!">
                  location_on
                </span>
                <span className="font-geist font-bold uppercase tracking-wider">
                  {event.venue_facetoface}
                </span>
              </div>
              {Boolean(event.removal_requested) && (
                <span className="bg-red-bg text-red inline-flex items-center gap-1.5 font-geist font-semibold px-2.5 py-0.5 rounded-full text-xs w-fit">
                  <span className="bg-red w-2 h-2 rounded-full" />
                  Removal Requested
                </span>
              )}
            </div>
            <span className="font-geist font-semibold text-subtext bg-surface-container-high px-2 py-0.5 rounded-full text-center">
              Face to Face
            </span>
          </div>
        )}

        {!event.venue_online && !event.venue_facetoface && (
          <div className="flex items-center gap-2">
            <p className="font-geist text-xs text-blue uppercase tracking-wider font-bold">
              Event
            </p>
            {Boolean(event.removal_requested) && (
              <span className="bg-red-bg text-red inline-flex items-center gap-1.5 font-geist font-semibold px-2.5 py-0.5 rounded-full text-xs w-fit">
                <span className="bg-red w-2 h-2 rounded-full" />
                Removal Requested
              </span>
            )}
          </div>
        )}

        <h2 className="font-geist text-2xl font-semibold text-text mt-2 w-full truncate">
          {event.title}
        </h2>
        <div>
          <p
            ref={(el) => {
              if (!el || overflows) return;
              const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
              if (el.scrollHeight - el.clientHeight > lineHeight / 2) setOverflows(true);
            }}
            className={`font-geist text-lg text-subtext ${expanded ? "" : "line-clamp-2"}`}>
            {event.description}
          </p>
          {overflows && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setExpanded(!expanded);
              }}
              className="font-geist text-sm text-blue font-semibold cursor-pointer"
            >
              {expanded ? "See Less" : "See More..."}
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-between flex-col md:flex-row">
        <div className="flex flex-wrap gap-4 my-3 text-subtext text-sm md:text-md font-semibold">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-blue text-[18px]!">
              event
            </span>
            <span className="capitalize">{event.type}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-blue text-[18px]!">
              calendar_today
            </span>
            <span>{formatDate(event.date)}</span>
          </div>
          {event.time_hour && (
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-blue text-[18px]!">
                schedule
              </span>
              <span>{event.time_hour}:{String(event.time_minute || 0).padStart(2, "0")} {event.time_ampm}</span>
            </div>
          )}
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-blue text-[18px]!">
              people
            </span>
            <span>{event.participants}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 my-3 text-subtext text-sm md:text-md font-semibold">
          {event.pending_approval ? (
            <div className="flex items-center gap-2.5 text-yellow">
              <span className="material-symbols-outlined text-[18px]!">
                hourglass_top
              </span>
              <span>Pending Approval</span>
            </div>
          ) : hasEventStarted(event) ? (
            attendances && (
              <div className="w-full md:w-auto flex items-center justify-center md:justify-start gap-2.5">
                <div className="flex gap-4 font-geist">
                  <div className="flex items-center gap-1.5 whitespace-nowrap text-green">
                    <span className="w-2 h-2 rounded-full bg-green"></span>{" "}
                    Present: {countByStatus("present")}
                  </div>
                  <div className="flex items-center gap-1.5 whitespace-nowrap text-red">
                    <span className="w-2 h-2 rounded-full bg-red"></span>{" "}
                    Absent: {countByStatus("absent")}
                  </div>
                  <div className="flex items-center gap-1.5 whitespace-nowrap text-yellow">
                    <span className="w-2 h-2 rounded-full bg-yellow"></span>{" "}
                    Late: {countByStatus("late")}
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="w-fit px-3 h-9 rounded bg-surface-container-low border border-blue-border flex items-center gap-2.5 transition-all group-active:scale-105 group-active:bg-red/10 group-active:border-yellow group-active:text-yellow">
              <span className="material-symbols-outlined text-blue text-[18px]! group-active:text-yellow">
                schedule
              </span>
              <span>Not Started Yet</span>
            </div>
          )}
        </div>
      </div>
      {canSeeAttendance && (
        <div className="w-full flex items-center justify-center md:justify-start gap-1 text-blue hover:text-blue/80 text-sm md:text-lg font-semibold group-hover:translate-x-1 transition-transform">
          <span>See attendances</span>
          <span className="hidden md:inline material-symbols-outlined text-[18px]!">
            keyboard_arrow_right
          </span>
        </div>
      )}

      {children}

      {menu && (
        <div className="absolute top-3 right-2" onMouseDown={(e) => e.preventDefault()}>
          {menu}
        </div>
      )}
    </Card>
  );
}
