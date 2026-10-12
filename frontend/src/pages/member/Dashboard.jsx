import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import EventCard from "../../components/EventCard";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/format";
import { Link } from "react-router-dom";

export default function Dashboard() {

    const [events, setEvents] = useState([]);
    const [attendances, setAttendances] = useState([]);
    const [upcomingEvent, setUpcomingEvent] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        api
            .get("/events")
            .then((res) => {
                const today = new Date().setHours(0, 0, 0, 0);
                setUpcomingEvent(
                    res.data
                        .filter((event) => new Date(event.date).setHours(0, 0, 0, 0) >= today)
                        .sort((a, b) => new Date(a.date) - new Date(b.date))[0]
                );
                setEvents(res.data.reverse());
            })
            .catch((err) => {
                console.error(err);
            });

        api
            .get("/attendances")
            .then((res) => {
                setAttendances(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
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
    const hasEventStarted = (event) => eventStartDate(event) <= new Date();
    const startedEvents = events.filter(hasEventStarted);

    const eventsWithPresentAttendance = attendances.filter((attendance) => attendance.status === "present");
    const attendanceRatePercentage = startedEvents.length
        ? ((eventsWithPresentAttendance.length / startedEvents.length) * 100).toFixed(2)
        : "0.00";
    const isCompliant = attendanceRatePercentage >= 80;

    const attendanceCorrectionRequestedCount = attendances.filter((attendance) => attendance.correction_requested).length;

    function googleCalendarUrl(event) {
        if (!event?.date) return "#";
        // convert 12-hour parts into a floating local time Google Calendar understands
        let hour = parseInt(event.time_hour || "0", 10) % 12;
        if ((event.time_ampm || "").toUpperCase() === "PM") hour += 12;
        const start = `${event.date.replaceAll("-", "")}T${String(hour).padStart(2, "0")}${String(event.time_minute || "00").padStart(2, "0")}00`;
        const end = `${event.date.replaceAll("-", "")}T${String((hour + 1) % 24).padStart(2, "0")}${String(event.time_minute || "00").padStart(2, "0")}00`;
        const params = new URLSearchParams({
            action: "TEMPLATE",
            text: event.title || "",
            dates: `${start}/${end}`,
            details: event.description || "",
            location: event.venue_facetoface || event.venue_online || "",
        });
        return `https://calendar.google.com/calendar/render?${params.toString()}`;
    }

    return (
        <>
            <title>Dashboard - DRRT Member Portal</title>

            <Header />

            <main className="grow pb-24 md:pb-12">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-8">
                    {/* Welcome Header Card */}
                    <section className="bg-white border border-blue-border p-4 md:p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <h1 className="font-geist text-3xl md:text-5xl text-text font-bold">
                                    Welcome back, {user?.membership_application?.first_name}
                                </h1>
                            </div>
                            <p className="text-subtext mt-1">
                                <span className="font-bold">{user?.role.toUpperCase() || "loading.."}</span> • {" "}
                                {user?.membership_application?.course || "..."}
                                {user?.membership_application?.year_level || "..."}
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                            <Link to="/member/attendance" className="bg-blue text-white p-3 rounded-lg font-geist text-sm flex items-center justify-center gap-2 hover:bg-blue transition-colors shadow-sm font-semibold active:scale-95 hover:bg-blue/70 cursor-pointer">
                                <span className="material-symbols-outlined text-[18px]!">
                                    calendar_month
                                </span>{" "}
                                Attendance
                            </Link>
                            <Link to="/member/incidents" className="bg-surface-container-low border border-blue-border text-text text-center p-4 rounded-lg font-geist text-sm flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-colors shadow-sm font-semibold active:scale-95 cursor-pointer">
                                <span className="material-symbols-outlined text-[18px]!">
                                    medication
                                </span>{" "}
                                Create Incident Report
                            </Link>
                        </div>
                    </section>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white border border-blue-border rounded-xl p-4 shadow-sm hover:border-blue transition-all flex flex-col">
                            <div>
                                <h2 className="font-geist text-sm text-subtext flex items-center gap-2 mb-4 font-bold uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-blue text-[20px]!">
                                        verified
                                    </span>{" "}
                                    Attendance Compliance
                                </h2>
                                <p className="text-sm text-subtext -mt-3 mb-4">
                                    Current Standing Period: 2026
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="relative w-20 h-20 shrink-0">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                        <path
                                            className="text-progress-ring-track"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3.5"
                                        />
                                        <path
                                            className={isCompliant ? "text-green" : "text-yellow"}
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeDasharray={`${attendanceRatePercentage}, 100`}
                                            strokeWidth="3.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center font-geist text-xl font-bold text-text">
                                        {Math.round(attendanceRatePercentage)}%
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className={`font-geist text-sm font-bold flex items-center gap-1 ${isCompliant ? "text-green" : "text-yellow"}`}>
                                        <span className="material-symbols-outlined text-[16px]! filled-icon">
                                            {isCompliant ? "check_circle" : "warning"}
                                        </span>{" "}
                                        {isCompliant ? "Safe Standing" : "At Risk"}
                                    </p>
                                    <p className="text-sm text-subtext">
                                        Present on {eventsWithPresentAttendance.length} of {startedEvents.length} events
                                    </p>
                                    <p className="text-xs font-geist text-subtext font-semibold flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green" />{" "}
                                        80% Requirement
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-blue-border rounded-xl p-4 shadow-sm hover:border-blue transition-all flex flex-col gap-2">
                            <h2 className="font-geist text-sm text-subtext flex items-center gap-2 font-bold uppercase tracking-wider">
                                <span className="material-symbols-outlined text-blue text-[20px]!">
                                    edit_note
                                </span>{" "}
                                Requested Corrections
                            </h2>
                            <p className="font-geist text-4xl font-bold text-text">
                                {attendanceCorrectionRequestedCount}
                            </p>
                            <p className="text-sm text-subtext mt-1">
                                attendance correction requests you submitted
                            </p>
                        </div>

                        <div className="bg-white border border-blue-border rounded-xl p-4 shadow-sm hover:border-yellow transition-all flex flex-col justify-between md:col-span-2 lg:col-span-1">
                            <div>
                                <div className="flex justify-between items-start mb-1">
                                    <h2 className="font-geist text-sm text-subtext flex items-center gap-2 font-bold uppercase tracking-wider">
                                        <span className="material-symbols-outlined text-yellow text-[20px]!">
                                            event_upcoming
                                        </span>{" "}
                                        Upcoming Event
                                    </h2>
                                </div>
                                <h3 className="font-geist text-2xl-mobile font-bold text-text mt-2">
                                    {upcomingEvent?.title || "Loading..."}
                                </h3>
                                <p className="text-base text-subtext flex items-center gap-1.5 mt-1">
                                    <span className="material-symbols-outlined text-[18px]!">
                                        schedule
                                    </span>{" "}
                                    {upcomingEvent ? `${formatDate(upcomingEvent.date)} ${upcomingEvent.time_hour}:${upcomingEvent.time_minute} ${upcomingEvent.time_ampm}` : "..."}
                                </p>
                            </div>
                            <a
                                href={upcomingEvent ? googleCalendarUrl(upcomingEvent) : "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full mt-4 bg-surface-container-low border border-blue-border text-text h-10 rounded-lg font-geist text-sm flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-colors font-semibold"
                            >
                                <span className="material-symbols-outlined text-[18px]!">
                                    calendar_add_on
                                </span>{" "}
                                Add to Google Calendar
                            </a>
                        </div>
                    </div>

                    <section className="space-y-2">
                        <div className="flex justify-between items-center mb-1">
                            <h2 className="font-geist text-2xl-mobile font-bold text-text">
                                Events
                            </h2>
                        </div>

                        <div className="space-y-6 md:space-y-8">
                            {events.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                            {events.length === 0 && (
                                <p className="font-geist text-sm text-subtext text-center py-4">
                                    No events found.
                                </p>
                            )}
                        </div>
                    </section>
                </div>
            </main>

            <BottomNav />
        </>

    );
}