import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/format";
import { Link } from "react-router-dom";

export default function Dashboard() {

    const [events, setEvents] = useState([]);
    const [upcomingEvent, setUpcomingEvent] = useState([]);
    const [expandedIds, setExpandedIds] = useState([]);
    const [overflowIds, setOverflowIds] = useState([]);
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
    }, [])

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
                                    Welcome, {user?.membership_application?.full_name || user?.name}
                                </h1>
                            </div>
                            <p className="text-base text-subtext mt-1">
                                Student ID: {user?.membership_application?.student_id || "loading.."} • {" "}
                                {user?.membership_application?.course || "..."}
                                {user?.membership_application?.year_level || "..."}
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                            <Link to="/member/attendance" className="bg-blue text-white h-11 px-5 rounded-lg font-geist text-sm flex items-center justify-center gap-2 hover:bg-blue transition-colors shadow-sm font-semibold active:scale-95 hover:bg-blue/70 cursor-pointer">
                                <span className="material-symbols-outlined text-[18px]">
                                    calendar_month
                                </span>{" "}
                                Attendance Records
                            </Link>
                        </div>
                    </section>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white border border-blue-border rounded-xl p-4 shadow-sm hover:border-blue transition-all flex flex-col">
                            <div>
                                <h2 className="font-geist text-sm text-subtext flex items-center gap-2 mb-4 font-bold uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-blue text-[20px]">
                                        verified
                                    </span>{" "}
                                    Attendance Compliance
                                </h2>
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
                                            className="text-green"
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeDasharray="85, 100"
                                            strokeWidth="3.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center font-geist text-2xl font-bold text-text">
                                        85%
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-geist text-sm text-green font-bold flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px] filled-icon">
                                            check_circle
                                        </span>{" "}
                                        Safe Standing
                                    </p>
                                    <p className="text-sm text-subtext">
                                        Based on attendance on last 5 events
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-blue-border rounded-xl p-4 shadow-sm hover:border-blue transition-all flex flex-col justify-between">
                        </div>
                        <div className="bg-white border border-blue-border rounded-xl p-4 shadow-sm hover:border-yellow transition-all flex flex-col justify-between md:col-span-2 lg:col-span-1">
                            <div>
                                <div className="flex justify-between items-start mb-1">
                                    <h2 className="font-geist text-sm text-subtext flex items-center gap-2 font-bold uppercase tracking-wider">
                                        <span className="material-symbols-outlined text-yellow text-[20px]">
                                            event_upcoming
                                        </span>{" "}
                                        Upcoming Event
                                    </h2>
                                </div>
                                <h3 className="font-geist text-2xl-mobile font-bold text-text mt-2">
                                    {upcomingEvent?.title || "Loading..."}
                                </h3>
                                <p className="text-base text-subtext flex items-center gap-1.5 mt-1">
                                    <span className="material-symbols-outlined text-[18px]">
                                        schedule
                                    </span>{" "}
                                    {upcomingEvent ? `${formatDate(upcomingEvent.date)} ${upcomingEvent.time_hour}:${upcomingEvent.time_minute} ${upcomingEvent.time_ampm}` : "..."}
                                </p>
                            </div>
                            <button className="w-full mt-4 bg-surface-container-low border border-blue-border text-text h-10 rounded-lg font-geist text-sm flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors font-semibold">
                                <span className="material-symbols-outlined text-[18px]">
                                    calendar_add_on
                                </span>{" "}
                                Add to Calendar
                            </button>
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
                                <div
                                    key={event.id}
                                    className="block bg-white border border-blue-border p-4 rounded-xl shadow-sm space-y-2"
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
                                        <p
                                            ref={(el) => {
                                                if (!el || overflowIds.includes(event.id)) return;
                                                if (el.scrollHeight > el.clientHeight + 1)
                                                    setOverflowIds((ids) => [...ids, event.id]);
                                            }}
                                            className={`font-geist text-sm text-subtext ${expandedIds.includes(event.id) ? "" : "line-clamp-2"}`}
                                        >
                                            {event.description}
                                        </p>
                                        {overflowIds.includes(event.id) && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setExpandedIds(
                                                        expandedIds.includes(event.id)
                                                            ? expandedIds.filter((id) => id !== event.id)
                                                            : [...expandedIds, event.id]
                                                    )
                                                }
                                                className="font-geist text-sm text-blue font-semibold cursor-pointer"
                                            >
                                                {expandedIds.includes(event.id) ? "See Less" : "See More..."}
                                            </button>
                                        )}
                                    </div>

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
                                </div>
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