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
  const [incidentReports, setIncidentReports] = useState([]);
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
      .get("/incident-reports")
      .then((res) => setIncidentReports(res.data))
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

  const myIncidentReportCount = incidentReports.filter((report) => report.reporter_id === user?.id).length;
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
                Welcome, {user?.name}
              </h1>
              <p className="text-base text-subtext mt-1">
                Officer • {user?.email || "loading.."}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Link to="/officer/events" className="bg-blue text-white h-11 px-5 rounded-lg font-geist text-sm flex items-center justify-center gap-2 transition-colors shadow-sm font-semibold active:scale-95 hover:bg-blue/70 cursor-pointer">
                <span className="material-symbols-outlined text-[18px]!">
                  calendar_month
                </span>{" "}
                Manage Events & Attendance
              </Link>
              <Link to="/officer/create-incident" className="bg-surface-container-low border border-blue-border text-text h-11 px-5 rounded-lg font-geist text-sm flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors shadow-sm font-semibold active:scale-95 cursor-pointer">
                <span className="material-symbols-outlined text-[18px]!">
                  emergency
                </span>{" "}
                Create Incident Report
              </Link>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

            <div className="bg-white border border-blue-border rounded-xl p-4 shadow-sm hover:border-blue transition-all flex flex-col gap-2">
              <h2 className="font-geist text-sm text-subtext flex items-center gap-2 font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-blue text-[20px]!">
                  emergency
                </span>{" "}
                Incidents Reported
              </h2>
              <p className="font-geist text-4xl font-bold text-text">
                {myIncidentReportCount}
              </p>
              <p className="text-sm text-subtext mt-1">
                incident reports you have filed
              </p>
            </div>
          </div>

          {/* Analytics Chart */}
          <section className="lg:col-span-2 bg-white border border-blue-border rounded-xl shadow-sm p-4 md:p-6 flex flex-col min-h-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-geist text-xl font-bold text-text">
                  Monthly Activity Attendance
                </h3>
                <p className="text-xs md:text-sm text-subtext">
                  Trends breakdown by year level (Jan - May)
                </p>
              </div>
              <button className="text-subtext hover:text-blue p-2 rounded-full hover:bg-surface-container-low transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[20px]!">more_vert</span>
              </button>
            </div>
            <div className="flex-1 relative w-full h-70">
              <canvas id="attendanceChart" />
            </div>
          </section>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
