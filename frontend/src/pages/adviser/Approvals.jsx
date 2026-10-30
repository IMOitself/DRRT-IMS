import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import EventCard from "../../components/EventCard";
import api from "../../api/axios";
import { formatDate, getInitials } from "../../utils/format";

export default function Approvals() {
  const [events, setEvents] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all_pending"); // 'all_pending', 'events', 'removals'

  // Reject/Decline modal target
  const [rejectTarget, setRejectTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get("/events", { params: { all: 1 } }),
      api.get("/membership-applications"),
    ])
      .then(([eventsRes, appsRes]) => {
        setEvents(eventsRes.data || []);
        setApplications(appsRes.data.data || []);
      })
      .catch((err) => console.error("Error loading approvals:", err))
      .finally(() => setLoading(false));
  }, []);

  const pendingEvents = events.filter((e) => e.pending_approval);
  const eventRemovalRequests = events.filter((e) => e.removal_requested);
  const removalRequests = applications.filter((a) => a.removal_requested);

  const approveEvent = (event) => {
    setActionLoading(true);
    api
      .put(`/events/${event.id}/approve`)
      .then(() =>
        setEvents((prev) =>
          prev.map((e) => (e.id === event.id ? { ...e, pending_approval: false } : e))
        )
      )
      .catch((err) => {
        console.error(err);
        alert("Failed to approve event. Please try again.");
      })
      .finally(() => setActionLoading(false));
  };

  const deleteEvent = () => {
    if (!deleteTarget) return;
    setActionLoading(true);
    api
      .delete(`/events/${deleteTarget.id}`)
      .then(() => {
        setEvents((prev) => prev.filter((e) => e.id !== deleteTarget.id));
        setDeleteTarget(null);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to delete event. Please try again.");
      })
      .finally(() => setActionLoading(false));
  };

  const rejectEventRemoval = (event) => {
    setActionLoading(true);
    api
      .put(`/events/${event.id}`, { removal_requested: false })
      .then(() =>
        setEvents((prev) =>
          prev.map((e) => (e.id === event.id ? { ...e, removal_requested: false } : e))
        )
      )
      .catch((err) => console.error(err))
      .finally(() => setActionLoading(false));
  };

  const rejectEvent = () => {
    if (!rejectTarget) return;
    setActionLoading(true);
    api
      .delete(`/events/${rejectTarget.id}`)
      .then(() => {
        setEvents((prev) => prev.filter((e) => e.id !== rejectTarget.id));
        setRejectTarget(null);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to decline event. Please try again.");
      })
      .finally(() => setActionLoading(false));
  };

  const query = searchQuery.trim().toLowerCase();
  const matchesSearch = (...fields) =>
    !query || fields.some((f) => String(f || "").toLowerCase().includes(query));

  const filteredPendingEvents = pendingEvents.filter((e) =>
    matchesSearch(e.title, e.description, e.type, e.venue_online, e.venue_facetoface, formatDate(e.date))
  );
  const filteredEventRemovalRequests = eventRemovalRequests.filter((e) =>
    matchesSearch(e.title, e.description, e.type, e.venue_online, e.venue_facetoface, formatDate(e.date))
  );
  const filteredRemovalRequests = removalRequests.filter((a) =>
    matchesSearch(a.full_name, a.student_id, a.course, a.email)
  );

  const totalPending = pendingEvents.length + eventRemovalRequests.length + removalRequests.length;

  const tabs = [
    { id: "all_pending", label: "All Approvals", count: totalPending, badge: "bg-blue-bg text-blue font-bold" },
    { id: "events", label: "Created Events", count: pendingEvents.length, badge: "bg-blue-bg text-blue font-bold" },
    { id: "event_removals", label: "Event Removals", count: eventRemovalRequests.length, badge: "bg-blue-bg text-blue font-bold" },
    { id: "removals", label: "Member Removals", count: removalRequests.length, badge: "bg-blue-bg text-blue font-bold" },
  ];

  return (
    <>
      <title>Approvals &amp; Authorizations - DRRT Adviser Portal</title>
      <Header />

      <div className="grow w-full">
        <main className="max-w-5xl mx-auto w-full px-4 md:px-8 py-6 mb-40 space-y-6 md:space-y-8">
          {/* Header Card */}
          <section className="bg-white border border-blue-border/80 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue text-[28px]!">
                    fact_check
                  </span>
                  <h1 className="font-geist text-2xl md:text-3xl font-bold text-text">
                    Approval Requests
                  </h1>
                </div>
                <p className="text-sm text-subtext mt-1.5">
                  Review and authorize created events and member removal requests submitted by officers.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-geist text-xs font-bold ${
                    totalPending > 0
                      ? "bg-yellow/15 text-yellow border border-yellow/30"
                      : "bg-green/15 text-green border border-green/30"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${totalPending > 0 ? "bg-yellow" : "bg-green"}`} />
                  {totalPending > 0 ? `${totalPending} Pending Approval` : "All Caught Up"}
                </span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="w-full mt-6">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-subtext text-[20px]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search by event title, venue, course, member name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface border border-blue-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-text placeholder:text-subtext/70 focus:outline-none focus:ring-2 focus:ring-blue/30 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar mt-6 border-t border-blue-border/40 pt-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 font-geist text-xs md:text-sm px-4 py-2 rounded-full font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === tab.id
                      ? "bg-blue text-white shadow-sm"
                      : "bg-surface text-subtext border border-blue-border/80 hover:bg-surface-container-highest"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[11px] ${activeTab === tab.id ? "bg-white/20 text-white" : tab.badge}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-subtext gap-3">
              <span className="material-symbols-outlined text-[36px]! animate-spin text-blue">
                progress_activity
              </span>
              <p className="font-geist text-sm">Loading approvals...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Section 1: Pending Events */}
              {(activeTab === "all_pending" || activeTab === "events") && (
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-geist text-base md:text-lg font-bold text-text flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue text-[22px]!">
                        hourglass_top
                      </span>
                      Events Awaiting Your Approval ({filteredPendingEvents.length})
                    </h2>
                  </div>

                  {filteredPendingEvents.length === 0 ? (
                    <div className="bg-white border border-blue-border rounded-xl p-8 text-center flex flex-col items-center justify-center gap-2 text-subtext">
                      <span className="material-symbols-outlined text-green text-[40px]!">
                        check_circle
                      </span>
                      <p className="font-geist text-base font-bold text-text">
                        No Events Pending Approval
                      </p>
                      <p className="text-xs text-subtext max-w-md">
                        All officer-submitted drills, training sessions, and meetings have been reviewed.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredPendingEvents.map((event) => (
                        <EventCard
                          key={event.id}
                          event={event}
                        >
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
                        </EventCard>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Section 2: Event Removals */}
              {(activeTab === "all_pending" || activeTab === "event_removals") && (
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-geist text-base md:text-lg font-bold text-text flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue text-[22px]!">
                        event_busy
                      </span>
                      Event Removal Requests ({filteredEventRemovalRequests.length})
                    </h2>
                  </div>

                  {filteredEventRemovalRequests.length === 0 ? (
                    <div className="bg-white border border-blue-border rounded-xl p-8 text-center flex flex-col items-center justify-center gap-2 text-subtext">
                      <span className="material-symbols-outlined text-green text-[40px]!">
                        check_circle
                      </span>
                      <p className="font-geist text-base font-bold text-text">
                        No Event Removal Requests
                      </p>
                      <p className="text-xs text-subtext max-w-md">
                        No events have been flagged for removal by officers.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredEventRemovalRequests.map((event) => (
                        <EventCard
                          key={event.id}
                          event={event}
                        >
                          <div className="flex gap-3 pt-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                rejectEventRemoval(event);
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
                                setDeleteTarget(event);
                              }}
                              className="cursor-pointer flex-1 sm:flex-none bg-green text-white px-4 py-2 rounded-lg font-geist text-sm font-semibold hover:bg-green transition-colors shadow-sm flex items-center justify-center gap-2"
                            >
                              <span className="material-symbols-outlined text-[18px]!">check</span>
                              Approve
                            </button>
                          </div>
                        </EventCard>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Section 3: Member Removal Requests */}
              {(activeTab === "all_pending" || activeTab === "removals") && (
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-geist text-base md:text-lg font-bold text-text flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue text-[22px]!">
                        person_remove
                      </span>
                      Member Removal Requests ({filteredRemovalRequests.length})
                    </h2>
                  </div>

                  {filteredRemovalRequests.length === 0 ? (
                    <div className="bg-white border border-blue-border rounded-xl p-8 text-center flex flex-col items-center justify-center gap-2 text-subtext">
                      <span className="material-symbols-outlined text-green text-[40px]!">
                        check_circle
                      </span>
                      <p className="font-geist text-base font-bold text-text">
                        No Member Removal Requests
                      </p>
                      <p className="text-xs text-subtext max-w-md">
                        No active members have been flagged for removal by officers.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredRemovalRequests.map((application) => (
                        <Link
                          key={application.id}
                          to="/adviser/members"
                          state={{ openMemberUserId: application.user_id }}
                          className="member-card bg-white border border-blue-border rounded-lg p-3 flex items-center justify-between shadow-sm hover:border-blue transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-blue shrink-0">
                              {getInitials(application.full_name)}
                            </div>
                            <div className="min-w-0">
                              <p className="font-geist text-text truncate group-hover:text-blue transition-colors">
                                {application.full_name}
                              </p>
                              <p className="text-[11px] text-subtext truncate">
                                {application.course + " " + application.year_level}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="bg-red-bg text-red inline-flex items-center gap-1.5 font-geist font-semibold px-2.5 py-0.5 rounded-full w-fit">
                              <span className="bg-red w-2 h-2 rounded-full" />
                              REMOVAL REQUESTED
                            </span>
                            <span className="material-symbols-outlined text-subtext text-[18px]">
                              chevron_right
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </section>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Reject Confirmation Dialog Modal */}
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
                    <button
                      type="button"
                      onClick={() => setRejectTarget(null)}
                      disabled={actionLoading}
                      className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-highest transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={rejectEvent}
                      disabled={actionLoading}
                      className="w-full sm:w-auto bg-red text-white hover:bg-red/90 transition-all font-geist font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                    >
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

      {/* Delete Confirmation Dialog Modal */}
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
                  Deleting "{deleteTarget.title}" can't be undone.
                </p>

                <div className="w-full flex items-center mt-4">
                  <div className="flex flex-col sm:flex-row flex-1 items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(null)}
                      disabled={actionLoading}
                      className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-highest transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={deleteEvent}
                      disabled={actionLoading}
                      className="w-full sm:w-auto bg-red text-white hover:bg-red/90 transition-all font-geist font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                    >
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
