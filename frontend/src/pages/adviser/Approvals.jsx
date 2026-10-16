import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import api from "../../api/axios";
import { formatDate } from "../../utils/format";

export default function Approvals() {
  const [events, setEvents] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all_pending"); // 'all_pending', 'events', 'removals', 'approved'
  
  // Reject/Decline modal target
  const [rejectTarget, setRejectTarget] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  function fetchData() {
    setLoading(true);
    Promise.all([
      api.get("/events", { params: { all: 1 } }),
      api.get("/membership-applications"),
    ])
      .then(([eventsRes, appsRes]) => {
        setEvents(eventsRes.data || []);
        setApplications(appsRes.data.data || []);
      })
      .catch((err) => {
        console.error("Error loading approvals:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const pendingEvents = events.filter((e) => Boolean(e.pending_approval));
  const approvedEvents = events.filter((e) => !e.pending_approval);
  const removalRequests = applications.filter((a) => Boolean(a.removal_requested));

  const approveEvent = (event) => {
    setActionLoading(true);
    api
      .put(`/events/${event.id}/approve`)
      .then(() => {
        setEvents((prev) =>
          prev.map((e) => (e.id === event.id ? { ...e, pending_approval: false } : e))
        );
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to approve event. Please try again.");
      })
      .finally(() => {
        setActionLoading(false);
      });
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
      .finally(() => {
        setActionLoading(false);
      });
  };

  const dismissRemovalRequest = (application) => {
    api
      .put(`/membership-applications/${application.id}`, { removal_requested: false })
      .then(() => {
        setApplications((prev) =>
          prev.map((a) => (a.id === application.id ? { ...a, removal_requested: false } : a))
        );
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to dismiss removal request.");
      });
  };

  const matchesSearch = (text) => {
    if (!searchQuery.trim()) return true;
    return text.toLowerCase().includes(searchQuery.trim().toLowerCase());
  };

  const filteredPendingEvents = pendingEvents.filter(
    (e) =>
      matchesSearch(e.title || "") ||
      matchesSearch(e.description || "") ||
      matchesSearch(e.type || "") ||
      matchesSearch(e.venue_online || "") ||
      matchesSearch(e.venue_facetoface || "") ||
      matchesSearch(formatDate(e.date))
  );

  const filteredRemovalRequests = removalRequests.filter(
    (a) =>
      matchesSearch(a.full_name || "") ||
      matchesSearch(a.student_id || "") ||
      matchesSearch(a.course || "") ||
      matchesSearch(a.email || "")
  );

  const filteredApprovedEvents = approvedEvents.filter(
    (e) =>
      matchesSearch(e.title || "") ||
      matchesSearch(e.description || "") ||
      matchesSearch(e.type || "") ||
      matchesSearch(formatDate(e.date))
  );

  const totalPending = pendingEvents.length + removalRequests.length;

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
                    Event Approvals &amp; Governance
                  </h1>
                </div>
                <p className="text-sm text-subtext mt-1.5">
                  Review and authorize events created by officers before they are published to members.
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
              <button
                type="button"
                onClick={() => setActiveTab("all_pending")}
                className={`shrink-0 font-geist text-xs md:text-sm px-4 py-2 rounded-full font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "all_pending"
                    ? "bg-blue text-white shadow-sm"
                    : "bg-surface text-subtext border border-blue-border/80 hover:bg-surface-container-highest"
                }`}
              >
                <span>All Pending</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[11px] ${activeTab === "all_pending" ? "bg-white/20 text-white" : "bg-blue-bg text-blue font-bold"}`}>
                  {totalPending}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("events")}
                className={`shrink-0 font-geist text-xs md:text-sm px-4 py-2 rounded-full font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "events"
                    ? "bg-blue text-white shadow-sm"
                    : "bg-surface text-subtext border border-blue-border/80 hover:bg-surface-container-highest"
                }`}
              >
                <span>Pending Events</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[11px] ${activeTab === "events" ? "bg-white/20 text-white" : "bg-blue-bg text-blue font-bold"}`}>
                  {pendingEvents.length}
                </span>
              </button>

              {removalRequests.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveTab("removals")}
                  className={`shrink-0 font-geist text-xs md:text-sm px-4 py-2 rounded-full font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "removals"
                      ? "bg-blue text-white shadow-sm"
                      : "bg-surface text-subtext border border-blue-border/80 hover:bg-surface-container-highest"
                  }`}
                >
                  <span>Member Removals</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[11px] ${activeTab === "removals" ? "bg-white/20 text-white" : "bg-red-bg text-red font-bold"}`}>
                    {removalRequests.length}
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setActiveTab("approved")}
                className={`shrink-0 font-geist text-xs md:text-sm px-4 py-2 rounded-full font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "approved"
                    ? "bg-blue text-white shadow-sm"
                    : "bg-surface text-subtext border border-blue-border/80 hover:bg-surface-container-highest"
                }`}
              >
                <span>Approved Events History</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[11px] ${activeTab === "approved" ? "bg-white/20 text-white" : "bg-surface-container-high text-subtext font-bold"}`}>
                  {approvedEvents.length}
                </span>
              </button>
            </div>
          </section>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-subtext gap-3">
              <span className="material-symbols-outlined text-[36px]! animate-spin text-blue">
                progress_activity
              </span>
              <p className="font-geist text-sm">Loading event authorizations...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Section 1: Pending Events */}
              {(activeTab === "all_pending" || activeTab === "events") && (
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-geist text-base md:text-lg font-bold text-text flex items-center gap-2">
                      <span className="material-symbols-outlined text-yellow text-[22px]!">
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
                        <div
                          key={event.id}
                          className="bg-white border-2 border-yellow/40 hover:border-yellow rounded-2xl p-5 md:p-6 shadow-sm transition-all space-y-4"
                        >
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="space-y-2 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-geist text-xs font-bold uppercase tracking-wider bg-blue-bg text-blue px-2.5 py-0.5 rounded-full">
                                  {event.type || "Event"}
                                </span>
                                <span className="bg-yellow/15 text-yellow border border-yellow/30 font-geist text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-yellow" />
                                  Pending Authorization
                                </span>
                                {event.venue_online && (
                                  <span className="bg-surface-container-high text-subtext font-geist text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]!">videocam</span>
                                    Online: {event.venue_online}
                                  </span>
                                )}
                                {event.venue_facetoface && (
                                  <span className="bg-surface-container-high text-subtext font-geist text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]!">location_on</span>
                                    {event.venue_facetoface}
                                  </span>
                                )}
                              </div>

                              <h3 className="font-geist text-xl md:text-2xl font-bold text-text">
                                {event.title}
                              </h3>

                              <div className="flex flex-wrap gap-4 text-xs md:text-sm font-semibold text-subtext">
                                <div className="flex items-center gap-1.5">
                                  <span className="material-symbols-outlined text-blue text-[18px]!">
                                    calendar_today
                                  </span>
                                  <span>{formatDate(event.date)}</span>
                                </div>
                                {event.time_hour && (
                                  <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-blue text-[18px]!">
                                      schedule
                                    </span>
                                    <span>
                                      {event.time_hour}:{String(event.time_minute || 0).padStart(2, "0")}{" "}
                                      {event.time_ampm}
                                    </span>
                                  </div>
                                )}
                                {event.participants && (
                                  <div className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-blue text-[18px]!">
                                      groups
                                    </span>
                                    <span>{event.participants}</span>
                                  </div>
                                )}
                              </div>

                              {event.description && (
                                <p className="font-geist text-sm text-subtext/90 whitespace-pre-line bg-surface p-3 rounded-xl border border-blue-border/50">
                                  {event.description}
                                </p>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex sm:flex-row md:flex-col gap-2 shrink-0 pt-2 md:pt-0">
                              <button
                                type="button"
                                onClick={() => setRejectTarget(event)}
                                disabled={actionLoading}
                                className="cursor-pointer flex-1 md:flex-initial bg-red-bg text-red border border-red/30 hover:bg-red hover:text-white px-5 py-2.5 rounded-xl font-geist text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
                              >
                                <span className="material-symbols-outlined text-[18px]!">close</span>
                                Decline
                              </button>

                              <button
                                type="button"
                                onClick={() => approveEvent(event)}
                                disabled={actionLoading}
                                className="cursor-pointer flex-1 md:flex-initial bg-green text-white hover:bg-green/90 px-6 py-2.5 rounded-xl font-geist text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
                              >
                                <span className="material-symbols-outlined text-[18px]!">check_circle</span>
                                Approve Event
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Section 2: Member Removal Requests */}
              {(activeTab === "all_pending" || activeTab === "removals") && removalRequests.length > 0 && (
                <section className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-geist text-base md:text-lg font-bold text-text flex items-center gap-2">
                      <span className="material-symbols-outlined text-red text-[22px]!">
                        person_remove
                      </span>
                      Flagged Member Removal Requests ({filteredRemovalRequests.length})
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {filteredRemovalRequests.map((application) => (
                      <div
                        key={application.id}
                        className="bg-white border border-red-border rounded-xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-geist text-base font-bold text-text">
                              {application.full_name}
                            </span>
                            <span className="bg-red-bg text-red border border-red-border text-[11px] font-bold px-2 py-0.5 rounded-full">
                              Removal Requested
                            </span>
                          </div>
                          <p className="text-xs text-subtext">
                            ID: {application.student_id} • {application.course} Year {application.year_level} • {application.email}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => dismissRemovalRequest(application)}
                            className="bg-surface text-subtext border border-blue-border hover:bg-surface-container-highest px-3.5 py-2 rounded-lg font-geist text-xs font-semibold cursor-pointer"
                          >
                            Dismiss Request
                          </button>
                          <Link
                            to="/adviser/members"
                            className="bg-red text-white hover:bg-red/90 px-4 py-2 rounded-lg font-geist text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
                          >
                            <span className="material-symbols-outlined text-[16px]!">open_in_new</span>
                            Audit in Roster
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Section 3: Approved Events History */}
              {activeTab === "approved" && (
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-geist text-base md:text-lg font-bold text-text flex items-center gap-2">
                      <span className="material-symbols-outlined text-green text-[22px]!">
                        verified
                      </span>
                      Approved Events History ({filteredApprovedEvents.length})
                    </h2>
                  </div>

                  {filteredApprovedEvents.length === 0 ? (
                    <p className="text-sm text-subtext text-center py-6">No approved events found.</p>
                  ) : (
                    <div className="space-y-3">
                      {filteredApprovedEvents.map((event) => (
                        <Link
                          key={event.id}
                          to={`/adviser/events/${event.id}`}
                          className="block bg-white border border-blue-border hover:border-blue p-4 rounded-xl shadow-sm transition-all group"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-geist text-xs font-bold uppercase tracking-wider bg-green/10 text-green px-2 py-0.5 rounded-full">
                                  Approved
                                </span>
                                <span className="text-xs text-subtext">
                                  {formatDate(event.date)}
                                </span>
                              </div>
                              <h3 className="font-geist text-lg font-bold text-text mt-1 group-hover:text-blue transition-colors">
                                {event.title}
                              </h3>
                            </div>
                            <span className="material-symbols-outlined text-subtext group-hover:text-blue group-hover:translate-x-1 transition-all">
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

      {/* Decline / Reject Confirmation Dialog Modal */}
      {rejectTarget && (
        <div className="fixed inset-0 z-80 flex items-center justify-center bg-text/20 p-4">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="glass-bg border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-4">
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 items-center">
                  <span className="material-symbols-outlined text-red mb-1 text-[30px]!">
                    cancel
                  </span>
                  <p className="w-fit font-geist text-lg font-semibold text-text mb-1">
                    Decline Event Submission?
                  </p>
                </div>
                <p className="font-geist text-text">
                  Are you sure you want to decline <strong>"{rejectTarget.title}"</strong>? Declining will reject the proposal and remove it from the scheduling queue.
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
                      <span>Decline Event</span>
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
