import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { formatDate } from "../../utils/format";

export default function Events() {

  const [events, setEvents] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [venueFilter, setVenueFilter] = useState("all");
  const [expandedIds, setExpandedIds] = useState([]);
  const [overflowIds, setOverflowIds] = useState([]);

  // the pending event waiting on the confirm reject dialog
  const [rejectTarget, setRejectTarget] = useState(null);

  const approveEvent = (event) => {
    api
      .put(`/events/${event.id}/approve`)
      .then(() =>
        setEvents(events.map((e) => (e.id === event.id ? { ...e, pending_approval: false } : e)))
      )
      .catch((err) => {
        console.error(err);
        alert("Failed to approve event. Please try again.");
      });
  };

  // rejecting a pending event deletes it
  const rejectEvent = () => {
    api
      .delete(`/events/${rejectTarget.id}`)
      .then(() => setEvents(events.filter((e) => e.id !== rejectTarget.id)))
      .catch((err) => {
        console.error(err);
        alert("Failed to reject event. Please try again.");
      });
    setRejectTarget(null);
  };

  // searching looks through all events, whatever the pill says
  const matchesVenue = (event) => {
    if (searchQuery.trim()) return true;
    if (venueFilter === "online") return Boolean(event.venue_online);
    if (venueFilter === "facetoface") return Boolean(event.venue_facetoface);
    return true;
  };

  const pillClassName = (filter) =>
    venueFilter === filter && !searchQuery.trim()
      ? "shrink-0 bg-blue text-white font-geist text-sm px-4 py-2 rounded-full font-semibold shadow-sm cursor-pointer"
      : "shrink-0 bg-surface text-subtext border border-blue-border/80 font-geist text-sm px-4 py-2 rounded-full hover:bg-surface-container-highest transition-colors font-semibold cursor-pointer";

  const matchesSearch = (event) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    const eventDetails = [
      event.title,
      event.description,
      event.type,
      event.participants,
      event.venue_online,
      event.venue_facetoface,
      event.venue_online ? "Online" : "Face to Face Facetoface",
      event.date,
      formatDate(event.date),
      `${event.time_hour}:${event.time_minute} ${event.time_ampm}`,
    ].join(" ").toLowerCase();

    return query.split(/\s+/).every((word) => eventDetails.includes(word));
  };

  useEffect(() => {

    api
      .get("/events", { params: { all: 1 } })
      .then((res) => {
        setEvents(res.data.reverse());
      })
      .catch((err) => {
        console.error(err);
      });

    api
      .get("/attendances", { params: { all: 1 } })
      .then((res) => {
        setAttendances(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

  }, []);

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

  // a pending event has no attendance yet either
  const canSeeAttendance = (event) => hasEventStarted(event) && !event.pending_approval;

  const filteredEvents = events.filter((event) => matchesSearch(event) && matchesVenue(event));

  return (
    <>
      <title>Events - DRRT Adviser Portal</title>

      <Header />


      <div className="grow w-full">
        {/* Main Container */}
        <main className="max-w-5xl mx-auto w-full px-4 md:px-8 py-6 mb-40 space-y-6 md:space-y-8">
          {/* Page Header & Search Card */}
          <section className="bg-white border border-blue-border/80 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="font-geist text-2xl md:text-3xl font-bold text-text mt-1">
                  Events & Attendances
                </h1>
                <p className="text-sm text-subtext mt-1.5">
                  Track and manage attendance for all members across all events.
                </p>
              </div>
            </div>
            <div className="w-full mt-6">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-subtext text-[20px]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search e.g Title, Jan 1, 2026, Gmeet, Face to Face, BSIS 1..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    // back to a plain list once the search is cleared
                    if (!e.target.value.trim()) setVenueFilter("all");
                  }}
                  className="w-full bg-surface border border-blue-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-text placeholder:text-subtext/70 focus:outline-none focus:ring-2 focus:ring-blue/30 transition-all shadow-sm"
                />
              </div>
            </div>
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar mt-6 border-t border-blue-border/40">
              <button onClick={() => setVenueFilter("all")} className={pillClassName("all")}>
                All Events
              </button>
              <button onClick={() => setVenueFilter("online")} className={pillClassName("online")}>
                Online
              </button>
              <button onClick={() => setVenueFilter("facetoface")} className={pillClassName("facetoface")}>
                Face-to-Face
              </button>
            </div>
          </section>
          {/* Event Cards Container */}
          <section className="space-y-6 md:space-y-8 mb-4">
            {filteredEvents.map((event) => {
              const countByStatus = (status) =>
                attendances.filter(
                  (a) => a.event_id === event.id && !a.pending_approval && a.status === status
                ).length;
              return (
                <Link
                  to={`/adviser/events/${event.id}`}
                  key={event.id}
                  draggable={false}
                  onClick={(e) => {
                    if (!canSeeAttendance(event) || !window.getSelection().isCollapsed) e.preventDefault();
                  }}
                  className={`group block select-text bg-white border border-blue-border p-4 rounded-xl shadow-sm space-y-2 transition-all duration-300${canSeeAttendance(event) ? " hover:border-blue" : ""}`}
                >
                  <div className="flex-1 flex flex-col gap-1">
                    {/* venue online */}
                    {event.venue_online && (
                      <div className="flex flex-row justify-between items-center gap-2">
                        <div className="flex items-center gap-1.5 text-blue">
                          <span className="material-symbols-outlined text-[16px]!">
                            videocam
                          </span>
                          <span className="font-geist text-xs font-bold uppercase tracking-wider">
                            {event.venue_online}
                          </span>
                        </div>
                        <span className="font-geist text-xs font-semibold text-subtext bg-surface-container-high px-2 py-0.5 rounded-full">
                          Online
                        </span>
                      </div>
                    )}

                    {/* venue face to face */}
                    {event.venue_facetoface && (
                      <div className="flex flex-row items-center justify-between gap-2 text-sm">
                        <div className="flex items-center gap-1.5 text-blue">
                          <span className="material-symbols-outlined text-[16px]!">
                            location_on
                          </span>
                          <span className="font-geist font-bold uppercase tracking-wider">
                            {event.venue_facetoface}
                          </span>
                        </div>
                        <span className="font-geist font-semibold text-subtext bg-surface-container-high px-2 py-0.5 rounded-full text-center">
                          Face to Face
                        </span>
                      </div>
                    )}

                    {!event.venue_online && !event.venue_facetoface && (
                      <p className="font-geist text-xs text-blue uppercase tracking-wider font-bold">
                        Event
                      </p>
                    )}

                    <h2 className="font-geist text-2xl font-semibold text-text mt-2 w-full truncate">
                      {event.title}
                    </h2>
                    <div>
                      <p
                        ref={(el) => {
                          if (!el || overflowIds.includes(event.id)) return;
                          const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
                        if (el.scrollHeight - el.clientHeight > lineHeight / 2)
                            setOverflowIds((ids) => [...ids, event.id]);
                        }}
                        className={`font-geist text-lg text-subtext ${expandedIds.includes(event.id) ? "" : "line-clamp-2"}`}>
                        {event.description}
                      </p>
                      {overflowIds.includes(event.id) && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setExpandedIds(
                              expandedIds.includes(event.id)
                                ? expandedIds.filter((id) => id !== event.id)
                                : [...expandedIds, event.id]
                            );
                          }}
                          className="font-geist text-sm text-blue font-semibold cursor-pointer"
                        >
                          {expandedIds.includes(event.id) ? "See Less" : "See More..."}
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
                      ) : (
                        <div className="w-fit px-3 h-9 rounded bg-surface-container-low border border-blue-border flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-blue text-[18px]!">
                            schedule
                          </span>
                          <span>Not Started Yet</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {canSeeAttendance(event) && (
                    <div className="w-full flex items-center justify-center md:justify-start gap-1 text-blue hover:text-blue/80 text-sm md:text-lg font-semibold group-hover:translate-x-1 transition-transform">
                      <span>See attendances</span>
                      <span className="hidden md:inline material-symbols-outlined text-[18px]!">
                        keyboard_arrow_right
                      </span>
                    </div>
                  )}
                  {Boolean(event.pending_approval) && (
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setRejectTarget(event);
                        }}
                        className="cursor-pointer flex-1 sm:flex-none bg-red text-white px-4 py-2 rounded-lg font-geist text-sm font-semibold hover:bg-red transition-colors flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[18px]!">close</span>
                        Reject
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          approveEvent(event);
                        }}
                        className="cursor-pointer flex-1 sm:flex-none bg-green text-white px-4 py-2 rounded-lg font-geist text-sm font-semibold hover:bg-green transition-colors shadow-sm flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[18px]!">check</span>
                        Approve
                      </button>
                    </div>
                  )}
                </Link>
              );
            })}
            {filteredEvents.length === 0 && (
              <p className="font-geist text-sm text-subtext text-center py-4">
                No events found.
              </p>
            )}
          </section>
        </main>
      </div>

      {rejectTarget && (
        <div className="fixed inset-0 z-80 flex items-center justify-center bg-text/20 p-4">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="glass-bg border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-4">
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 items-center">
                  <span className="material-symbols-outlined text-yellow mb-1 text-[30px]!">
                    warning
                  </span>
                  <p className="w-fit font-geist text-lg font-semibold text-text mb-1">
                    Reject Event?
                  </p>
                </div>
                <p className="font-geist text-text">
                  Rejecting "{rejectTarget.title}" will delete it. This can't be undone.
                </p>

                <div className="w-full flex items-center mt-4">
                  <div className="flex flex-col sm:flex-row flex-1 items-center justify-end gap-2">
                    <button onClick={() => setRejectTarget(null)} className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-highest transition-all cursor-pointer">
                      Cancel
                    </button>
                    <button onClick={rejectEvent} className="w-full sm:w-auto bg-red text-white hover:bg-red transition-all font-geist font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]!">close</span>
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </>
  );
}
