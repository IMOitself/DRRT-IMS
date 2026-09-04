import Header from "../../components/Header.jsx";
import BottomNav from "../../components/BottomNav";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {

    const [events, setEvents] = useState([]);
    const [upcomingEvent, setUpcomingEvent] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        api
        .get("/events")
        .then((res) => {
            setEvents(res.data);
            setUpcomingEvent(res.data[0]); // TODO: actually fetch the upcoming event based on date
        })
        .catch((err) => {
            console.error(err);
        });
    }, [])

    return (
        <>
            <title>Member Dashboard - DRRT Member Portal</title>
            
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
                            <button className="bg-blue text-white h-11 px-5 rounded-lg font-geist text-sm flex items-center justify-center gap-2 hover:bg-blue transition-colors shadow-sm font-semibold">
                                <span className="material-symbols-outlined text-[18px]">
                                    calendar_month
                                </span>{" "}
                                Attendance Record
                            </button>
                            <button className="bg-surface-container-low text-text border border-blue-border h-11 px-5 rounded-lg font-geist text-sm flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors shadow-sm font-semibold">
                                <span className="material-symbols-outlined text-[18px]">
                                    visibility
                                </span>{" "}
                                View Events
                            </button>
                        </div>
                    </section>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white border border-blue-border rounded-xl p-4 shadow-sm hover:border-blue transition-all flex flex-col justify-between">
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
                            <div>
                                <h2 className="font-geist text-sm text-subtext flex items-center gap-2 mb-4 font-bold uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-blue text-[20px]">
                                        school
                                    </span>{" "}
                                    Training Progress
                                </h2>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <span className="font-geist text-sm font-bold text-text">
                                        6/7 Modules Completed
                                    </span>
                                    <span className="font-geist text-sm text-blue font-bold">
                                        67%
                                    </span>
                                </div>
                                <div className="w-full bg-progress-ring-track rounded-full h-2.5 overflow-hidden">
                                    <div
                                        className="bg-blue h-2.5 rounded-full"
                                        style={{ width: "67%" }}
                                    />
                                </div>
                                <a href="#" className="inline-flex items-center justify-center gap-1 font-geist text-sm text-blue font-bold hover:underline pt-1">
                                    Resume Module 6
                                    <span className="material-symbols-outlined text-[12px] leading-none">
                                        arrow_forward
                                    </span>
                                </a>
                            </div>
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
                                    <span className="bg-yellow-bg text-yellow border border-yellow-border text-xs font-geist px-2 py-0.5 rounded uppercase font-bold">
                                        Required
                                    </span>
                                </div>
                                <h3 className="font-geist text-2xl-mobile font-bold text-text mt-2">
                                    {upcomingEvent?.title || "Loading..."}
                                </h3>
                                <p className="text-base text-subtext flex items-center gap-1.5 mt-1">
                                    <span className="material-symbols-outlined text-[18px]">
                                        schedule
                                    </span>{" "}
                                    {upcomingEvent?.date_time || "..."}
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
                    {/* Recent Activity Section */}
                    <section className="space-y-2">
                        <div className="flex justify-between items-center mb-1">
                            <h2 className="font-geist text-2xl-mobile font-bold text-text">
                                Recent Activity
                            </h2>
                            <a href="#" className="font-geist text-sm text-blue font-bold hover:underline flex items-center gap-1">
                                View All{" "}
                                <span className="material-symbols-outlined text-[16px]">
                                    arrow_forward
                                </span>
                            </a>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm divide-y divide-blue-divide overflow-hidden">
                            <div className="p-4 flex items-start gap-4 hover:bg-surface-container-low/50 transition-colors">
                                <div className="bg-green-bg text-green p-2 rounded-full border border-green-border shrink-0">
                                    <span className="material-symbols-outlined text-[20px]">
                                        how_to_reg
                                    </span>
                                </div>
                                <div className="grow">
                                    <p className="text-base text-text font-semibold">
                                        Present in event name here idk
                                    </p>
                                    <p className="text-sm text-subtext mt-0.5">
                                        Oct 12, 2026 • 8:00 AM
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <BottomNav />
        </>

    );
}