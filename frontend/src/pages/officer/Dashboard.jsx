import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/format";
import { Link } from "react-router-dom";

export default function Dashboard() {

  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [memberApplications, setMemberApplications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    api
      .get("/members")
      .then((res) => setMembers(res.data))
      .catch((err) => console.error(err));

    api
      .get("/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));

    api
      .get("/attendances", { params: { all: 1 } })
      .then((res) => setAttendances(res.data))
      .catch((err) => console.error(err));

    api
      .get("/membership-applications")
      .then((res) => setMemberApplications(res.data.data))
      .catch((err) => console.error(err));
  }, [])

  const eventStartDate = (event) => {
    const start = new Date(event.date);
    if (event.time_hour) {
      start.setHours(
        (Number(event.time_hour) % 12) + (event.time_ampm === "PM" ? 12 : 0),
        Number(event.time_minute) || 0, 0, 0
      );
    } else {
      start.setHours(0, 0, 0, 0);
    }
    return start;
  };

  // most recent event that has already started
  const lastEvent = events
    .filter((event) => eventStartDate(event) <= new Date())
    .sort((a, b) => eventStartDate(b) - eventStartDate(a))[0];
  const lastEventAttendances = attendances.filter((attendance) => attendance.event_id === lastEvent?.id);
  const countByStatus = (status) => lastEventAttendances.filter((attendance) => attendance.status === status).length;

  // last 6 events that already started, oldest first for the bar graph
  const chartEvents = events
    .filter((event) => eventStartDate(event) <= new Date())
    .sort((a, b) => eventStartDate(a) - eventStartDate(b))
    .slice(-6);
  const countForEvent = (event, status) =>
    attendances.filter((attendance) => attendance.event_id === event.id && attendance.status === status).length;
  const chartBars = [
    { status: "late", label: "Late", color: "bg-yellow" },
    { status: "present", label: "Present", color: "bg-green" },
    { status: "absent", label: "Absent", color: "bg-red" },
  ];
  // biggest bar in the graph, at least 1 so we never divide by 0
  let highestCount = 1;
  chartEvents.forEach((event) => {
    chartBars.forEach((bar) => {
      highestCount = Math.max(highestCount, countForEvent(event, bar.status));
    });
  });

  // reviewer_id only gets set when an officer approves an application
  const myReviewedApplicationCount = memberApplications.filter((application) => application.reviewer_id === user?.id).length;

  return (
    <>
      <title>Dashboard - DRRT Officer Portal</title>

      <Header />

      {/* Main Content Canvas */}
      <main className="grow pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-8">
          {/* Welcome Header Card */}
          <section className="bg-white border border-blue-border p-4 md:p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h1 className="font-geist text-3xl md:text-5xl text-text font-bold">
                Welcome back, {user?.membership_application?.first_name}
              </h1>
              <p className="text-subtext mt-1">
                <span className="font-bold">{user?.role.toUpperCase() || "loading.."}</span> • {" "}
                {user?.membership_application?.course || "..."}
                {user?.membership_application?.year_level || "..."}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Link to="/officer/events" className="bg-blue text-white h-11 px-5 rounded-lg font-geist text-sm flex items-center justify-center gap-2 transition-colors shadow-sm font-semibold active:scale-95 hover:bg-blue/70 cursor-pointer">
                <span className="material-symbols-outlined text-[18px]!">
                  calendar_month
                </span>{" "}
                Manage Events
              </Link>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white border border-blue-border rounded-xl p-4 shadow-sm hover:border-blue transition-all flex flex-col gap-2">
              <h2 className="font-geist text-sm text-subtext flex items-center gap-2 font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-blue text-[20px]!">
                  how_to_reg
                </span>{" "}
                Last Event Attendance
              </h2>
              <p className="font-geist text-base font-semibold text-text line-clamp-1">
                {lastEvent?.title || "No events yet"}
              </p>
              <p className="text-sm text-subtext -mt-1">
                {lastEvent ? formatDate(lastEvent.date) : "..."}
              </p>
              <div className="flex flex-col divide-y divide-blue-border mt-1">
                <div className="flex items-center justify-between py-1.5">
                  <p className="text-sm font-geist text-subtext font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green" /> Present
                  </p>
                  <p className="font-geist text-xl font-bold text-green">{countByStatus("present")}</p>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <p className="text-sm font-geist text-subtext font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red" /> Absent
                  </p>
                  <p className="font-geist text-xl font-bold text-red">{countByStatus("absent")}</p>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <p className="text-sm font-geist text-subtext font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow" /> Late
                  </p>
                  <p className="font-geist text-xl font-bold text-yellow">{countByStatus("late")}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-blue-border rounded-xl p-4 shadow-sm hover:border-blue transition-all flex flex-col gap-2">
              <h2 className="font-geist text-sm text-subtext flex items-center gap-2 font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-blue text-[20px]!">
                  groups
                </span>{" "}
                Total Members
              </h2>
              <p className="font-geist text-4xl font-bold text-text">
                {members.length}
              </p>
              <p className="text-sm text-subtext mt-1">
                registered members in the organization
              </p>
            </div>

            <div className="bg-white border border-blue-border rounded-xl p-4 shadow-sm hover:border-blue transition-all flex flex-col gap-2">
              <h2 className="font-geist text-sm text-subtext flex items-center gap-2 font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-blue text-[20px]!">
                  fact_check
                </span>{" "}
                Applications Reviewed
              </h2>
              <p className="font-geist text-4xl font-bold text-text">
                {myReviewedApplicationCount}
              </p>
              <p className="text-sm text-subtext mt-1">
                membership applications you approved
              </p>
            </div>
          </div>

          <section className="bg-white border border-blue-border rounded-xl shadow-sm p-4 md:p-6 flex flex-col min-h-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-geist text-xl font-bold text-text">
                  Attendance Per Events
                </h3>
                <p className="text-xs md:text-sm text-subtext">
                  Present, late and absent members of the last {chartEvents.length} events
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
              {chartEvents.length === 0 && (
                <p className="w-full self-center text-sm text-subtext text-center">No events yet.</p>
              )}
              {chartEvents.map((event) => (
                <div key={event.id} className="flex-1 min-w-20 flex flex-col items-center gap-2">
                  <div className="h-56 w-full flex items-end justify-center gap-1">
                    {chartBars.map((bar) => {
                      const count = countForEvent(event, bar.status);
                      // the highest count gets the full 224px (h-56), the rest are scaled from it
                      const height = (count / highestCount) * 224;
                      return (
                        <div key={bar.status}
                          className={`group relative w-4 rounded-t ${bar.color}`}
                          style={{ height: `${height}px` }}>
                          {/* label shown right away on hover, above the bar */}
                          <span className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap bg-text text-white text-xs font-geist font-semibold px-2 py-1 rounded">
                            {bar.label}: {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-xs text-subtext text-center line-clamp-1">{event.title}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
