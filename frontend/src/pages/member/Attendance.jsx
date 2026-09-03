import Header from "../../components/Header";
import BottomNav from "../../components/member/BottomNav";

export default function Attendance() {
    return (
        <>
            <title>My Attendance Records - Member Portal</title>
            
            <Header/>

            <main className="grow max-w-7xl w-full mx-auto px-4 md:px-8 py-6 pb-24 md:pb-12">
                {/* Page Title Header */}
                <div className="mb-6">
                    <h2 className="font-geist text-3xl md:text-5xl text-text font-bold">
                        My Attendance Records
                    </h2>
                    <p className="text-base md:text-lg text-subtext mt-1">
                        Track your compliance status, meeting history, and request record
                        updates.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column / Top Stack: Compliance Gauge & Stats */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        {/* Compliance Gauge Card */}
                        <div className="bg-white border border-blue-border rounded-xl p-4 md:p-6 shadow-sm flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-geist text-2xl font-bold text-text">
                                        Bylaw Compliance
                                    </h3>
                                    <p className="text-sm text-subtext mt-0.5">
                                        Current Standing Period: 2026
                                    </p>
                                </div>
                                <div className="bg-green-bg border border-green-border px-3 py-1 rounded-full flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-green" />
                                    <span className="font-geist text-xs font-bold uppercase text-green">
                                        Compliant
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <span className="font-geist text-sm font-semibold text-subtext">
                                        Attendance Rate
                                    </span>
                                    <span className="font-geist text-3xl font-bold text-blue">
                                        85%
                                    </span>
                                </div>
                                <div className="h-3.5 w-full bg-progress-ring-track rounded-full overflow-hidden relative">
                                    {/* 80% Threshold Marker */}
                                    <div
                                        className="absolute h-full w-0.5 bg-red z-10 left-[80%]"
                                        title="80% Minimum Threshold"
                                    />
                                    {/* Progress Bar */}
                                    <div
                                        className="h-full bg-blue rounded-full transition-all duration-500"
                                        style={{ width: "85%" }}
                                    />
                                </div>
                                <div className="flex justify-between text-xs font-geist text-subtext pt-1">
                                    <span>0%</span>
                                    <span className="font-semibold text-red flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red" />{" "}
                                        80% Requirement
                                    </span>
                                    <span>100%</span>
                                </div>
                            </div>
                        </div>
                        {/* Stats Bento Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Total Events */}
                            <div className="bg-white border border-blue-border rounded-xl p-4 flex flex-col items-center text-center shadow-sm hover:border-blue transition-all">
                                <span className="material-symbols-outlined text-blue mb-1 text-3xl">
                                    groups
                                </span>
                                <span className="font-geist text-5xl font-bold text-text leading-none">
                                    12
                                </span>
                                <span className="font-geist text-xs text-subtext mt-1.5 font-semibold uppercase tracking-wider">
                                    Total Events
                                </span>
                            </div>
                            {/* Attended */}
                            <div className="bg-white border border-blue-border rounded-xl p-4 flex flex-col items-center text-center shadow-sm hover:border-green transition-all">
                                <span className="material-symbols-outlined text-green mb-1 text-3xl">
                                    check_circle
                                </span>
                                <span className="font-geist text-5xl font-bold text-text leading-none">
                                    10
                                </span>
                                <span className="font-geist text-xs text-subtext mt-1.5 font-semibold uppercase tracking-wider">
                                    Attended
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Right Column / Bottom Stack: Attendance History List */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-geist text-2xl font-bold text-text">
                                Recent Events
                            </h3>
                            <button className="font-geist text-sm text-blue font-bold hover:underline flex items-center gap-1">
                                View All{" "}
                                <span className="material-symbols-outlined text-[18px]">
                                    arrow_forward
                                </span>
                            </button>
                        </div>
                        <div className="space-y-4">
                            {/* History Card 2: Absent */}
                            <div className="bg-white border border-blue-border rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm card-hover-level">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-red-bg border border-red-border flex items-center justify-center text-red shrink-0">
                                        <span className="material-symbols-outlined text-[24px]">
                                            health_and_safety
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-geist text-lg text-text font-semibold">
                                            Emergency Drill
                                        </h4>
                                        <p className="text-sm text-subtext flex items-center gap-1 mt-0.5">
                                            <span className="material-symbols-outlined text-[16px]">
                                                calendar_today
                                            </span>{" "}
                                            Sep 28, 2026 • 02:00 PM
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto justify-between sm:justify-start">
                                    <span className="bg-green-bg text-green border border-green-border px-3 py-1 rounded-full font-geist text-xs font-bold uppercase tracking-wider">
                                        Present
                                    </span>
                                    <button className="font-geist text-xs text-blue font-bold hover:underline cursor-pointer">
                                        Request Correction
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
            <BottomNav/>
        </>

    );
}