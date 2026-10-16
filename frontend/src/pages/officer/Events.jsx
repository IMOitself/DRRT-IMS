import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import EventCard from "../../components/EventCard";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { formatDate } from "../../utils/format";

export default function Events() {

  const [events, setEvents] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [venueFilter, setVenueFilter] = useState("all");
  const [menuId, setMenuId] = useState(null);  const navigate = useNavigate();

  // the event waiting on the confirm delete dialog
  const [deleteTarget, setDeleteTarget] = useState(null);

  const deleteEvent = () => {
    api
      .delete(`/events/${deleteTarget.id}`)
      .then(() => setEvents(events.filter((e) => e.id !== deleteTarget.id)))
      .catch((err) => {
        console.error(err);
        alert("Failed to delete event. Please try again.");
      });
    setDeleteTarget(null);
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

  const filteredEvents = events.filter((event) => matchesSearch(event) && matchesVenue(event));

  return (
    <>
      <title>Events - DRRT Officer Portal</title>

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
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                to={`/officer/events/${event.id}`}
                attendances={attendances}
                menu={
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setMenuId(menuId === event.id ? null : event.id);
                      }}
                      className="flex p-1 rounded-full text-subtext hover:bg-surface-container-highest cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]!">more_vert</span>
                    </button>
                    {menuId === event.id && (
                      <>
                      {/* invisible backdrop: clicking outside the menu closes it */}
                      <div
                        className="fixed inset-0 z-10 cursor-default"
                        onClick={(e) => {
                          e.preventDefault();
                          setMenuId(null);
                        }}
                      />
                      <div className="absolute right-0 mt-1 w-32 bg-white border border-blue-border rounded-xl shadow-md overflow-hidden z-20">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/officer/create-event", { state: { event } });
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 font-geist text-sm font-semibold text-text hover:bg-surface-container-highest cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]!">edit</span>
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setMenuId(null);
                            setDeleteTarget(event);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 font-geist text-sm font-semibold text-red hover:bg-surface-container-highest cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]!">delete</span>
                          Delete
                        </button>
                      </div>
                      </>
                    )}
                  </>
                }
              />
            ))}
            {filteredEvents.length === 0 && (
              <p className="font-geist text-sm text-subtext text-center py-4">
                No events found.
              </p>
            )}
          </section>
        </main>
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-80 flex items-center justify-center bg-text/20 p-4">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="glass-bg border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-4">
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 items-center">
                  <span className="material-symbols-outlined text-yellow mb-1 text-[30px]!">
                    warning
                  </span>
                  <p className="w-fit font-geist text-lg font-semibold text-text mb-1">
                    Delete Event?
                  </p>
                </div>
                <p className="font-geist text-text">
                  Deleting "{deleteTarget.title}" will also delete all of its attendances. This can't be undone.
                </p>

                <div className="w-full flex items-center mt-4">
                  <div className="flex flex-col sm:flex-row flex-1 items-center justify-end gap-2">
                    <button onClick={() => setDeleteTarget(null)} className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-highest transition-all cursor-pointer">
                      Cancel
                    </button>
                    <button onClick={deleteEvent} className="w-full sm:w-auto bg-red text-white hover:bg-red transition-all font-geist font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]!">delete</span>
                      <span>Delete</span>
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
