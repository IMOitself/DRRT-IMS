import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { formatDate, getInitials } from "../../utils/format";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendances, setAttendances] = useState([]);
  const [memberApplications, setMemberApplications] = useState([]);
  const [incidentReports, setIncidentReports] = useState([]);
  const [rejectTarget, setRejectTarget] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    api
      .get("/members")
      .then((res) => setMembers(res.data))
      .catch((err) => console.error(err));

    api
      .get("/events", { params: { all: 1 } })
      .then((res) => setEvents(res.data))
      .finally(() => setLoading(false))
      .catch((err) => console.error(err));

    api
      .get("/attendances", { params: { all: 1 } })
      .then((res) => setAttendances(res.data))
      .catch((err) => console.error(err));

    api
      .get("/membership-applications")
      .then((res) => setMemberApplications(res.data.data))
      .catch((err) => console.error(err));

    api
      .get("/incident-reports")
      .then((res) => setIncidentReports(res.data))
      .catch((err) => console.error(err));
  }, []);

  const eventStartDate = (event) => {
    const start = new Date(event.date);
    if (event.time_hour) {
      start.setHours(
        (Number(event.time_hour) % 12) + (event.time_ampm === "PM" ? 12 : 0),
        Number(event.time_minute) || 0,
        0,
        0
      );
    } else {
      start.setHours(0, 0, 0, 0);
    }
    return start;
  };

  const approveEvent = (event) => {
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
      });
  };

  const rejectEvent = () => {
    if (!rejectTarget) return;
    api
      .delete(`/events/${rejectTarget.id}`)
      .then(() => {
        setEvents((prev) => prev.filter((e) => e.id !== rejectTarget.id));
        setRejectTarget(null);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to reject event. Please try again.");
      });
  };

  // Started events that have already taken place and are approved
  const startedEvents = events.filter(
    (event) => !event.pending_approval && eventStartDate(event) <= new Date()
  );

  // Compliance calculation (PM requirement: "50 / 65"):
  // A member is compliant if their attendance rate in started events is >= 80%
  const compliantMembersCount = members.filter((member) => {
    if (startedEvents.length === 0) return true;
    const presentCount = attendances.filter(
      (a) => a.user_id === member.id && a.status === "present" && !a.pending_approval
    ).length;
    const rate = (presentCount / startedEvents.length) * 100;
    return rate >= 80;
  }).length;

  const compliancePercentage = members.length
    ? ((compliantMembersCount / members.length) * 100).toFixed(1)
    : "100.0";

  // Pending authorisations
  const pendingEvents = events.filter((e) => Boolean(e.pending_approval));
  const removalRequests = memberApplications.filter((ma) => Boolean(ma.removal_requested));
  const totalPendingActions = pendingEvents.length + removalRequests.length;
  const graduatedCount = memberApplications.filter((ma) => ma.status === "graduated").length;

  // Last 6 started events, oldest first for the bar graph
  const chartEvents = [...startedEvents]
    .sort((a, b) => eventStartDate(a) - eventStartDate(b))
    .slice(-6);

  const countForEvent = (event, status) =>
    attendances.filter(
      (attendance) =>
        attendance.event_id === event.id &&
        !attendance.pending_approval &&
        attendance.status === status
    ).length;

  const chartBars = [
    { status: "late", label: "Late", color: "bg-yellow" },
    { status: "present", label: "Present", color: "bg-green" },
    { status: "absent", label: "Absent", color: "bg-red" },
  ];

  let highestCount = 1;
  chartEvents.forEach((event) => {
    chartBars.forEach((bar) => {
      highestCount = Math.max(highestCount, countForEvent(event, bar.status));
    });
  });

  return (
    <>
      <title>Dashboard - DRRT Adviser Portal</title>

      <Header />

      {/* Main Content Canvas */}
      <main className="grow pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-8">
          {/* Welcome Header Card */}
          <section className="bg-white border border-blue-border p-4 md:p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h1 className="font-geist text-3xl md:text-5xl text-text font-bold">
                Welcome, {user?.name || "Adviser"}
              </h1>
              <p className="text-subtext mt-1 text-sm md:text-base flex items-center gap-2">
                <span className="font-bold text-blue tracking-wide uppercase">
                  ADVISER
                </span>
                <span>•</span>
                <span>LVCC Apalit Chapter</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Link
                to="/adviser/approvals"
                className="bg-blue text-white h-11 px-5 rounded-lg font-geist text-sm flex items-center justify-center gap-2 transition-colors shadow-sm font-semibold active:scale-95 hover:bg-blue/70 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]!">
                  fact_check
                </span>
                Approvals
              </Link>
              <Link
                to="/adviser/members"
                className="bg-surface text-text border border-blue-border h-11 px-5 rounded-lg font-geist text-sm flex items-center justify-center gap-2 transition-colors shadow-sm font-semibold active:scale-95 hover:bg-surface-container-high cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]!">
                  group
                </span>
                Members
              </Link>
            </div>
          </section>

          {/* KPI Summary Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {/* Card 1: Active Member Overview */}
            <Link
              to="/adviser/members"
              className="bg-white border border-blue-border rounded-xl p-4 shadow-sm hover:border-blue transition-all flex flex-col gap-2 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-geist text-xs text-subtext flex items-center gap-2 font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-blue text-[20px]!">
                    groups
                  </span>
                  Active Member
                </h2>
                <span className="material-symbols-outlined text-subtext text-[18px]! opacity-0 group-hover:opacity-100 transition-opacity">
                  arrow_forward
                </span>
              </div>
              <p className="font-geist text-4xl font-bold text-text">
                {members.length}
              </p>
              <p className="text-xs text-subtext mt-auto">
                Registered members •{" "}
                <span className="font-semibold text-text">{graduatedCount}</span> graduated
              </p>
            </Link>

            {/* Card 3: Total Incidents Overview */}
            <Link
              to="/adviser/incidents"
              className="bg-white border border-blue-border rounded-xl p-4 shadow-sm hover:border-blue transition-all flex flex-col gap-2 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-geist text-xs text-subtext flex items-center gap-2 font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-red text-[20px]!">
                    shield_lock
                  </span>
                  Total Incidents
                </h2>
                <span className="material-symbols-outlined text-subtext text-[18px]! opacity-0 group-hover:opacity-100 transition-opacity">
                  arrow_forward
                </span>
              </div>
              <p className="font-geist text-4xl font-bold text-text">
                {incidentReports.length}
              </p>
              <p className="text-xs text-subtext mt-auto">
                Confidential medical &amp; first-aid reports
              </p>
            </Link>

            {/* Card 4: Pending Authorizations */}
            <div className="bg-white border border-blue-border rounded-xl p-4 shadow-sm hover:border-blue transition-all flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h2 className="font-geist text-xs text-subtext flex items-center gap-2 font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-blue text-[20px]!">
                    pending_actions
                  </span>
                  Pending Authorizations
                </h2>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-bold font-geist ${
                    totalPendingActions > 0
                      ? "bg-yellow/10 text-yellow"
                      : "bg-green/10 text-green"
                  }`}
                >
                </span>
              </div>
              <p className="font-geist text-4xl font-bold text-text">
                {totalPendingActions}
              </p>
              <p className="text-xs text-subtext mt-auto">
                <span className="font-semibold text-text">{pendingEvents.length}</span> events •{" "}
                <span className="font-semibold text-text">{removalRequests.length}</span> member removals
              </p>
            </div>
          </div>

          {/* Governance & Approvals Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Panel 1: Pending Event Authorizations */}
            <section className="bg-white border border-blue-border rounded-xl shadow-sm p-4 md:p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-blue-border/40 pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue text-[22px]!">
                    event_upcoming
                  </span>
                  <h3 className="font-geist text-lg md:text-xl font-bold text-text">
                    Event Authorizations
                  </h3>
                </div>
                <Link
                  to="/adviser/approvals"
                  className="font-geist text-xs font-semibold text-blue hover:underline inline-flex items-center gap-1"
                >
                  View All
                  <span className="material-symbols-outlined text-[14px]!">
                    arrow_forward
                  </span>
                </Link>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 text-subtext gap-3">
                  <span className="material-symbols-outlined text-[36px]! animate-spin text-blue">
                    progress_activity
                  </span>
                  <p className="font-geist text-sm">Loading event authorizations...</p>
                </div>
              ) : pendingEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center gap-2 text-subtext">
                  <span className="material-symbols-outlined text-green text-[36px]!">
                    check_circle
                  </span>
                  <p className="font-geist text-sm font-semibold text-text">
                    No pending event submissions
                  </p>
                  <p className="text-xs text-subtext max-w-sm">
                    All drills, meetings, and deployments submitted by officers have been approved.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingEvents.slice(0, 3).map((event) => (
                    <div
                      key={event.id}
                      className="border border-blue-border/70 rounded-xl p-3.5 bg-surface flex flex-col gap-2 hover:border-blue transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-geist text-xs font-bold uppercase tracking-wider bg-blue-bg text-blue px-2 py-0.5 rounded-full">
                              {event.type || "Event"}
                            </span>
                            <span className="text-xs text-subtext">
                              {formatDate(event.date)}
                            </span>
                          </div>
                          <h4 className="font-geist text-base font-bold text-text mt-1">
                            {event.title}
                          </h4>
                          {event.description && (
                            <p className="text-xs text-subtext line-clamp-2 mt-0.5">
                              {event.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-blue-border/30 mt-1">
                        <span className="text-xs text-subtext flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]!">
                            {event.venue_online ? "videocam" : "location_on"}
                          </span>
                          {event.venue_online || event.venue_facetoface || "Venue TBD"}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setRejectTarget(event)}
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-border text-red hover:bg-red/10 transition-colors cursor-pointer"
                          >
                            Reject
                          </button>
                          <button
                            type="button"
                            onClick={() => approveEvent(event)}
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-green text-white hover:bg-green/90 transition-colors shadow-sm cursor-pointer flex items-center gap-1"
                          >
                            <span className="material-symbols-outlined text-[14px]!">
                              check
                            </span>
                            Approve
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {pendingEvents.length > 3 && (
                    <p className="text-xs text-center text-subtext pt-1">
                      + {pendingEvents.length - 3} more event(s) waiting for approval
                    </p>
                  )}
                </div>
              )}
            </section>

            {/* Panel 2: Member Removal Flags & Incident Log Overview */}
            <div className="flex flex-col gap-6">
              {/* Member Removal Requests */}
              <section className="bg-white border border-blue-border rounded-xl shadow-sm p-4 md:p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-blue-border/40 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-red text-[22px]!">
                      person_remove
                    </span>
                    <h3 className="font-geist text-lg md:text-xl font-bold text-text">
                      Flagged Member Removals
                    </h3>
                  </div>
                  <span className="font-geist text-xs font-bold text-subtext">
                    {removalRequests.length} requested
                  </span>
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-8 text-subtext gap-3">
                    <span className="material-symbols-outlined text-[36px]! animate-spin text-blue">
                      progress_activity
                    </span>
                    <p className="font-geist text-sm">Loading removal requests...</p>
                  </div>
                ) : removalRequests.length === 0 ? (
                  <p className="text-xs text-subtext py-3">
                    No active members have been flagged for removal by officers.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {removalRequests.slice(0, 2).map((app) => (
                      <div
                        key={app.id}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-red-bg/40 border border-red-border/60"
                      >
                        <div className="min-w-0">
                          <p className="font-geist text-sm font-bold text-text truncate">
                            {app.full_name || `${app.first_name} ${app.last_name}`}
                          </p>
                          <p className="text-xs text-subtext truncate">
                            {app.student_id} • {app.course} {app.year_level}
                          </p>
                        </div>
                        <Link
                          to="/adviser/members"
                          state={{ openMemberUserId: app.user_id }}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-red text-white hover:bg-red/90 transition-colors shadow-sm shrink-0 cursor-pointer"
                        >
                          Review in Roster
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Recent Incident Log Stream */}
              <section className="bg-white border border-blue-border rounded-xl shadow-sm p-4 md:p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-blue-border/40 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-red text-[22px]!">
                      medical_services
                    </span>
                    <h3 className="font-geist text-lg md:text-xl font-bold text-text">
                      Recent Incident Reports
                    </h3>
                  </div>
                  <Link
                    to="/adviser/incidents"
                    className="font-geist text-xs font-semibold text-blue hover:underline inline-flex items-center gap-1"
                  >
                    Open Vault
                    <span className="material-symbols-outlined text-[14px]!">
                      arrow_forward
                    </span>
                  </Link>
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-8 text-subtext gap-3">
                    <span className="material-symbols-outlined text-[36px]! animate-spin text-blue">
                      progress_activity
                    </span>
                    <p className="font-geist text-sm">Loading incident reports...</p>
                  </div>
                ) : incidentReports.length === 0 ? (
                  <p className="text-xs text-subtext py-3">
                    No incident or first-aid reports logged yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {incidentReports.slice(0, 3).map((incident) => (
                      <Link
                        key={incident.id}
                        to="/adviser/incidents"
                        state={{ openIncidentId: incident.id }}
                        className="flex items-center justify-between p-2.5 rounded-lg border border-blue-border/60 bg-surface hover:border-blue transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-blue-bg flex items-center justify-center font-bold text-blue text-xs shrink-0">
                            {getInitials(incident.name || "UN")}
                          </div>
                          <div className="min-w-0">
                            <p className="font-geist text-sm font-bold text-text truncate group-hover:text-blue transition-colors">
                              {incident.name || "Unnamed patient"}
                            </p>
                            <p className="text-[11px] text-subtext truncate">
                              {incident.chief_complaint || "Emergency Response"} •{" "}
                              {formatDate((incident.date || incident.created_at || "").slice(0, 10))}
                            </p>
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-subtext text-[18px]! shrink-0 group-hover:text-blue transition-colors">
                          chevron_right
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>

          {/* Attendance Per Events Chart (Officer-Dashboard Parity) */}
          <section className="bg-white border border-blue-border rounded-xl shadow-sm p-4 md:p-6 flex flex-col min-h-100">
            <div className="flex justify-between md:items-center mb-6 flex-col md:flex-row gap-2">
              <div>
                <h3 className="font-geist text-xl font-bold text-text">
                  Attendance Per Events
                </h3>
                <p className="text-xs md:text-sm text-subtext">
                  Present, late, and absent members across the last {chartEvents.length} events
                </p>
              </div>
              <div className="flex gap-3 text-xs font-geist text-subtext font-semibold">
                {chartBars.map((bar) => (
                  <span key={bar.status} className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${bar.color}`} /> {bar.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full flex items-end gap-4 overflow-x-auto pt-8">
              {loading ? (
                <div className="w-full flex flex-col items-center justify-center py-16 text-subtext gap-3">
                  <span className="material-symbols-outlined text-[36px]! animate-spin text-blue">
                    progress_activity
                  </span>
                  <p className="font-geist text-sm">Loading events...</p>
                </div>
              ) : chartEvents.length === 0 ? (
                <p className="w-full self-center text-sm text-subtext text-center py-10">
                  No completed events recorded yet.
                </p>
              ) : (
                chartEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex-1 min-w-20 flex flex-col items-center gap-2"
                  >
                    <div className="h-56 w-full flex items-end justify-center gap-1">
                      {chartBars.map((bar) => {
                        const count = countForEvent(event, bar.status);
                        const height = (count / highestCount) * 224;
                        return (
                          <div
                            key={bar.status}
                            className={`group relative w-4 rounded-t ${bar.color}`}
                            style={{ height: `${height}px` }}
                          >
                            <span className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap bg-text text-white text-xs font-geist font-semibold px-2 py-1 rounded shadow-md z-10">
                              {bar.label}: {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-xs text-subtext text-center line-clamp-1 w-full" title={event.title}>
                      {event.title}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Reject Event Modal */}
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
                  Rejecting "{rejectTarget.title}" will delete it from the roster. This action cannot be undone.
                </p>

                <div className="w-full flex items-center mt-4">
                  <div className="flex flex-col sm:flex-row flex-1 items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setRejectTarget(null)}
                      className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-highest transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={rejectEvent}
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

      <BottomNav />
    </>
  );
}