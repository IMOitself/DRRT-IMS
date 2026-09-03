import Header from "../../components/member/Header";
import BottomNav from "../../components/member/BottomNav";

export default function Attendance() {
    return (
        <>
            <title>My Attendance Records - Member Portal</title>
            
            <Header/>

            <main className="grow max-w-7xl w-full mx-auto px-margin-mobile md:px-margin-desktop py-lg pb-24 md:pb-12">
                {/* Page Title Header */}
                <div className="mb-lg">
                    <h2 className="font-display-lg text-headline-lg md:text-display-lg text-on-surface font-bold">
                        My Attendance Records
                    </h2>
                    <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant mt-1">
                        Track your compliance status, meeting history, and request record
                        updates.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
                    {/* Left Column / Top Stack: Compliance Gauge & Stats */}
                    <div className="lg:col-span-5 flex flex-col gap-md">
                        {/* Compliance Gauge Card */}
                        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md md:p-lg shadow-sm flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-md">
                                <div>
                                    <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                                        Bylaw Compliance
                                    </h3>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                                        Current Standing Period: 2026
                                    </p>
                                </div>
                                <div className="bg-compliance-green/10 border border-compliance-green/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-compliance-green" />
                                    <span className="font-label-sm text-label-sm font-bold uppercase text-compliance-green">
                                        Compliant
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <span className="font-label-md text-label-md font-semibold text-on-surface-variant">
                                        Attendance Rate
                                    </span>
                                    <span className="font-headline-lg text-headline-lg font-bold text-primary">
                                        85%
                                    </span>
                                </div>
                                <div className="h-3.5 w-full bg-progress-ring-track rounded-full overflow-hidden relative">
                                    {/* 80% Threshold Marker */}
                                    <div
                                        className="absolute h-full w-0.5 bg-compliance-red z-10 left-[80%]"
                                        title="80% Minimum Threshold"
                                    />
                                    {/* Progress Bar */}
                                    <div
                                        className="h-full bg-primary rounded-full transition-all duration-500"
                                        style={{ width: "85%" }}
                                    />
                                </div>
                                <div className="flex justify-between text-label-sm font-label-sm text-on-surface-variant pt-1">
                                    <span>0%</span>
                                    <span className="font-semibold text-compliance-red flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-compliance-red" />{" "}
                                        80% Requirement
                                    </span>
                                    <span>100%</span>
                                </div>
                            </div>
                        </div>
                        {/* Stats Bento Grid */}
                        <div className="grid grid-cols-2 gap-md">
                            {/* Total Events */}
                            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col items-center text-center shadow-sm hover:border-primary transition-all">
                                <span className="material-symbols-outlined text-primary mb-1 text-3xl">
                                    groups
                                </span>
                                <span className="font-display-lg text-display-lg font-bold text-on-surface leading-none">
                                    12
                                </span>
                                <span className="font-label-sm text-label-sm text-on-surface-variant mt-1.5 font-semibold uppercase tracking-wider">
                                    Total Events
                                </span>
                            </div>
                            {/* Attended */}
                            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col items-center text-center shadow-sm hover:border-compliance-green transition-all">
                                <span className="material-symbols-outlined text-compliance-green mb-1 text-3xl">
                                    check_circle
                                </span>
                                <span className="font-display-lg text-display-lg font-bold text-on-surface leading-none">
                                    10
                                </span>
                                <span className="font-label-sm text-label-sm text-on-surface-variant mt-1.5 font-semibold uppercase tracking-wider">
                                    Attended
                                </span>
                            </div>
                            {/* Excused */}
                            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col items-center text-center shadow-sm hover:border-compliance-yellow transition-all">
                                <span className="material-symbols-outlined text-compliance-yellow mb-1 text-3xl">
                                    info
                                </span>
                                <span className="font-display-lg text-display-lg font-bold text-on-surface leading-none">
                                    1
                                </span>
                                <span className="font-label-sm text-label-sm text-on-surface-variant mt-1.5 font-semibold uppercase tracking-wider">
                                    Excused
                                </span>
                            </div>
                            {/* Unexcused */}
                            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col items-center text-center shadow-sm hover:border-compliance-red transition-all">
                                <span className="material-symbols-outlined text-compliance-red mb-1 text-3xl">
                                    warning
                                </span>
                                <span className="font-display-lg text-display-lg font-bold text-on-surface leading-none">
                                    1
                                </span>
                                <span className="font-label-sm text-label-sm text-on-surface-variant mt-1.5 font-semibold uppercase tracking-wider">
                                    Unexcused
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Right Column / Bottom Stack: Attendance History List */}
                    <div className="lg:col-span-7 flex flex-col gap-md">
                        <div className="flex justify-between items-center">
                            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                                Recent History
                            </h3>
                            <button className="font-label-md text-label-md text-primary font-bold hover:underline flex items-center gap-1">
                                View All{" "}
                                <span className="material-symbols-outlined text-[18px]">
                                    arrow_forward
                                </span>
                            </button>
                        </div>
                        <div className="space-y-md">
                            {/* History Card 1: Present */}
                            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm card-hover-level">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-primary-container/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                                        <span className="material-symbols-outlined text-[24px]">
                                            event
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-headline-md text-headline-md text-on-surface font-semibold text-lg">
                                            General Assembly
                                        </h4>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
                                            <span className="material-symbols-outlined text-[16px]">
                                                calendar_today
                                            </span>{" "}
                                            Oct 15, 2026 • 09:00 AM
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
                                    <span className="bg-compliance-green/10 text-compliance-green border border-compliance-green/30 px-3 py-1 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-wider">
                                        Present
                                    </span>
                                </div>
                            </div>
                            {/* History Card 2: Absent */}
                            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm card-hover-level">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-compliance-red/10 border border-compliance-red/20 flex items-center justify-center text-compliance-red flex-shrink-0">
                                        <span className="material-symbols-outlined text-[24px]">
                                            health_and_safety
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-headline-md text-headline-md text-on-surface font-semibold text-lg">
                                            Emergency Drill
                                        </h4>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
                                            <span className="material-symbols-outlined text-[16px]">
                                                calendar_today
                                            </span>{" "}
                                            Sep 28, 2026 • 02:00 PM
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto justify-between sm:justify-start">
                                    <span className="bg-compliance-red/10 text-compliance-red border border-compliance-red/30 px-3 py-1 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-wider">
                                        Absent
                                    </span>
                                    <button className="font-label-sm text-label-sm text-primary font-bold hover:underline">
                                        Request Correction
                                    </button>
                                </div>
                            </div>
                            {/* History Card 3: Late */}
                            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm card-hover-level">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-compliance-yellow/10 border border-compliance-yellow/20 flex items-center justify-center text-compliance-yellow flex-shrink-0">
                                        <span className="material-symbols-outlined text-[24px]">
                                            medical_services
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-headline-md text-headline-md text-on-surface font-semibold text-lg">
                                            First Aid Refresher
                                        </h4>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
                                            <span className="material-symbols-outlined text-[16px]">
                                                calendar_today
                                            </span>{" "}
                                            Aug 12, 2026 • 10:30 AM
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto justify-between sm:justify-start">
                                    <span className="bg-compliance-yellow/10 text-compliance-yellow border border-compliance-yellow/30 px-3 py-1 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-wider">
                                        Late
                                    </span>
                                    <button className="font-label-sm text-label-sm text-primary font-bold hover:underline">
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