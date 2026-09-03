import Header from "../../components/member/Header.jsx";
import BottomNav from "../../components/member/BottomNav.jsx";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Dashboard() {

    const [memberData, setMemberData] = useState([]);
    const [events, setEvents] = useState([]);
    const [upcomingEvent, setUpcomingEvent] = useState([]);

    useEffect(() => {
        api
        .get("/user")
        .then((res) => {
            setMemberData(res.data);
        })
        .catch((err) => {
            console.error(err);
        });

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
                <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-lg space-y-xl">
                    {/* Welcome Header Card */}
                    <section className="bg-white border border-blue-border p-md md:p-lg rounded-xl shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-sm flex-wrap">
                                <h1 className="font-display-lg text-headline-lg md:text-display-lg text-text font-bold">
                                    Welcome, {memberData.membership_application?.full_name || memberData.name}
                                </h1>
                            </div>
                            <p className="font-body-md text-body-md text-subtext mt-1">
                                Student ID: {memberData.membership_application?.student_id || "loading.."} • {" "}
                                            {memberData.membership_application?.course || "..."}
                                            {memberData.membership_application?.year_level || "..."}
                            </p>
                        </div>
                        {/* Quick Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                            <button className="bg-blue text-white h-11 px-5 rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-blue transition-colors shadow-sm font-semibold">
                                <span className="material-symbols-outlined text-[18px]">
                                    calendar_month
                                </span>{" "}
                                Attendance Record
                            </button>
                            <button className="bg-surface-container-low text-text border border-blue-border h-11 px-5 rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors shadow-sm font-semibold">
                                <span className="material-symbols-outlined text-[18px]">
                                    visibility
                                </span>{" "}
                                View Events
                            </button>
                        </div>
                    </section>
                    {/* Widgets Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
                        {/* Widget 1: Attendance Compliance */}
                        <div className="bg-white border border-blue-border rounded-xl p-md shadow-sm hover:border-blue transition-all flex flex-col justify-between">
                            <div>
                                <h2 className="font-label-md text-label-md text-subtext flex items-center gap-2 mb-md font-bold uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-blue text-[20px]">
                                        verified
                                    </span>{" "}
                                    Attendance Compliance
                                </h2>
                            </div>
                            <div className="flex items-center gap-md">
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
                                    <div className="absolute inset-0 flex items-center justify-center font-headline-md text-headline-md font-bold text-text">
                                        85%
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="font-label-md text-label-md text-green font-bold flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px] filled-icon">
                                            check_circle
                                        </span>{" "}
                                        Safe Standing
                                    </p>
                                    <p className="font-body-sm text-body-sm text-subtext">
                                        Based on attendance on last 5 events
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Widget 2: Training Progress */}
                        <div className="bg-white border border-blue-border rounded-xl p-md shadow-sm hover:border-blue transition-all flex flex-col justify-between">
                            <div>
                                <h2 className="font-label-md text-label-md text-subtext flex items-center gap-2 mb-md font-bold uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-blue text-[20px]">
                                        school
                                    </span>{" "}
                                    Training Progress
                                </h2>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <span className="font-label-md text-label-md font-bold text-text">
                                        6/7 Modules Completed
                                    </span>
                                    <span className="font-label-md text-label-md text-blue font-bold">
                                        67%
                                    </span>
                                </div>
                                <div className="w-full bg-progress-ring-track rounded-full h-2.5 overflow-hidden">
                                    <div
                                        className="bg-blue h-2.5 rounded-full"
                                        style={{ width: "67%" }}
                                    />
                                </div>
                                <a href="#" className="inline-flex items-center justify-center gap-1 font-label-md text-label-md text-blue font-bold hover:underline pt-1">
                                    Resume Module 6
                                    <span className="material-symbols-outlined text-[12px] leading-none">
                                        arrow_forward
                                    </span>
                                </a>
                            </div>
                        </div>
                        {/* Widget 3: Next Mandatory Event */}
                        <div className="bg-white border border-blue-border rounded-xl p-md shadow-sm hover:border-yellow transition-all flex flex-col justify-between md:col-span-2 lg:col-span-1">
                            <div>
                                <div className="flex justify-between items-start mb-xs">
                                    <h2 className="font-label-md text-label-md text-subtext flex items-center gap-2 font-bold uppercase tracking-wider">
                                        <span className="material-symbols-outlined text-yellow text-[20px]">
                                            event_upcoming
                                        </span>{" "}
                                        Upcoming Event
                                    </h2>
                                    <span className="bg-yellow-bg text-yellow border border-yellow-border text-label-sm font-label-sm px-2 py-0.5 rounded uppercase font-bold">
                                        Required
                                    </span>
                                </div>
                                <h3 className="font-headline-md text-headline-md-mobile font-bold text-text mt-2">
                                    {upcomingEvent?.title || "Loading..."}
                                </h3>
                                <p className="font-body-md text-body-md text-subtext flex items-center gap-1.5 mt-1">
                                    <span className="material-symbols-outlined text-[18px]">
                                        schedule
                                    </span>{" "}
                                    {upcomingEvent?.date_time || "..."}
                                </p>
                            </div>
                            <button className="w-full mt-4 bg-surface-container-low border border-blue-border text-text h-10 rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors font-semibold">
                                <span className="material-symbols-outlined text-[18px]">
                                    calendar_add_on
                                </span>{" "}
                                Add to Calendar
                            </button>
                        </div>
                    </div>
                    {/* Recent Activity Section */}
                    <section className="space-y-sm">
                        <div className="flex justify-between items-center mb-xs">
                            <h2 className="font-headline-md text-headline-md-mobile font-bold text-text">
                                Recent Activity
                            </h2>
                            <a href="#" className="font-label-md text-label-md text-blue font-bold hover:underline flex items-center gap-1">
                                View All{" "}
                                <span className="material-symbols-outlined text-[16px]">
                                    arrow_forward
                                </span>
                            </a>
                        </div>
                        <div className="bg-white border border-blue-border rounded-xl shadow-sm divide-y divide-blue-border overflow-hidden">
                            {/* Activity Item 1 */}
                            <div className="p-md flex items-start gap-md hover:bg-surface-container-low/50 transition-colors">
                                <div className="bg-blue/10 text-blue p-2 rounded-full border border-blue/20 shrink-0">
                                    <span className="material-symbols-outlined text-[20px]">
                                        fact_check
                                    </span>
                                </div>
                                <div className="grow">
                                    <p className="font-body-md text-body-md text-text font-semibold">
                                        Completed Module 5: Emergency Protocols
                                    </p>
                                    <p className="font-body-sm text-body-sm text-subtext mt-0.5">
                                        2 days ago • Score: 98%
                                    </p>
                                </div>
                            </div>
                            {/* Activity Item 2 */}
                            <div className="p-md flex items-start gap-md hover:bg-surface-container-low/50 transition-colors">
                                <div className="bg-green-bg text-green p-2 rounded-full border border-green-border shrink-0">
                                    <span className="material-symbols-outlined text-[20px]">
                                        how_to_reg
                                    </span>
                                </div>
                                <div className="grow">
                                    <p className="font-body-md text-body-md text-text font-semibold">
                                        Checked in to Weekly General Assembly
                                    </p>
                                    <p className="font-body-sm text-body-sm text-subtext mt-0.5">
                                        Oct 12, 2026 • Verified via QR Scan
                                    </p>
                                </div>
                            </div>
                            {/* Activity Item 3 */}
                            <div className="p-md flex items-start gap-md hover:bg-surface-container-low/50 transition-colors">
                                <div className="bg-surface-container-high text-subtext p-2 rounded-full border border-blue-border shrink-0">
                                    <span className="material-symbols-outlined text-[20px]">
                                        badge
                                    </span>
                                </div>
                                <div className="grow">
                                    <p className="font-body-md text-body-md text-text font-semibold">
                                        Digital ID Renewed for 2026-2027 Academic Year
                                    </p>
                                    <p className="font-body-sm text-body-sm text-subtext mt-0.5">
                                        Sep 1, 2026 • Command Staff Authorization
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