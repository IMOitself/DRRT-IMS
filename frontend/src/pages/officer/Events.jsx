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
      .get("/events")
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

  const filteredEvents = events.filter(matchesSearch);

  return (
    <>
      <title>Events - DRRT Officer Portal</title>

      <Header />


      <div className="grow w-full">
        {/* Main Container */}
        <main className="max-w-5xl mx-auto w-full px-4 md:px-8 py-6 mb-40 space-y-6 md:space-y-8">
          {/* Page Header & Search Card */}
          <section className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="font-geist text-2xl md:text-3xl font-bold text-text mt-1">
                  Events & Attendances
                </h1>
                <p className="text-sm text-subtext mt-1.5">
                  Track and manage attendance for all members across all events.
                </p>
              </div>
              <Link to="/officer/create-event" className="flex font-geist text-xs md:text-sm bg-blue-bg text-blue border border-blue-border transition-all px-4 py-2 rounded-full font-bold shadow-sm active:scale-95 hover:bg-blue hover:text-white cursor-pointer items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]!">calendar_add_on</span>
                New Event
              </Link>
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface border border-blue-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-text placeholder:text-subtext/70 focus:outline-none focus:ring-2 focus:ring-blue/30 transition-all shadow-sm"
                />
              </div>
            </div>
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar mt-6 border-t border-blue-border/40">
              <button className="shrink-0 bg-blue text-white font-geist text-sm px-4 py-2 rounded-full font-semibold shadow-sm">
                All Events
              </button>
              <button className="shrink-0 bg-surface text-subtext border border-blue-border/80 font-geist text-sm px-4 py-2 rounded-full hover:bg-surface-container-low transition-colors font-semibold">
                Online
              </button>
              <button className="shrink-0 bg-surface text-subtext border border-blue-border/80 font-geist text-sm px-4 py-2 rounded-full hover:bg-surface-container-low transition-colors font-semibold">
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
                  to={`/officer/events/${event.id}`}
                  key={event.id}
                  className="block bg-white border border-blue-border p-4 rounded-xl shadow-sm space-y-2 transition-all duration-300 hover:border-blue"
                >
                  <div className="flex-1">
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
                      <div className="flex flex-row items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-blue">
                          <span className="material-symbols-outlined text-[16px]!">
                            location_on
                          </span>
                          <span className="font-geist text-xs font-bold uppercase tracking-wider">
                            {event.venue_facetoface}
                          </span>
                        </div>
                        <span className="font-geist text-xs font-semibold text-subtext bg-surface-container-high px-2 py-0.5 rounded-full">
                          Face to Face
                        </span>
                      </div>
                    )}

                    {!event.venue_online && !event.venue_facetoface && (
                      <p className="font-geist text-xs text-blue uppercase tracking-wider font-bold">
                        Event
                      </p>
                    )}

                    <h2 className="font-geist text-2xl font-semibold text-text mt-1">
                      {event.title}
                    </h2>
                  </div>

                  <div className="flex justify-between flex-col md:flex-row">
                    <div className="flex flex-wrap px-0 md:px-2 gap-4 my-3 text-subtext text-xs md:text-md font-semibold">
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
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-blue text-[18px]!">
                          people
                        </span>
                        <span>{event.participants}</span>
                      </div>
                    </div>

                    <div className="flex flex-col flex-wrap py-3 gap-y-2 text-sm">
                      <div className="flex gap-4 text-xs font-geist">
                        <div className="font-bold flex items-center gap-1.5 text-green">
                          <span className="w-2 h-2 rounded-full bg-green"></span>{" "}
                          Present: {countByStatus("present")}
                        </div>
                        <div className="font-bold flex items-center gap-1.5 text-red">
                          <span className="w-2 h-2 rounded-full bg-red"></span>{" "}
                          Absent: {countByStatus("absent")}
                        </div>
                        <div className="font-bold flex items-center gap-1.5 text-yellow">
                          <span className="w-2 h-2 rounded-full bg-yellow"></span>{" "}
                          Late: {countByStatus("late")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex items-center gap-1 text-blue hover:text-blue/80  text-sm md:text-md font-semibold">
                    <span>See attendances</span>
                    <span className="material-symbols-outlined text-[18px]!">
                      keyboard_arrow_right
                    </span>
                  </div>
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

      <BottomNav />
    </>
  );
}
