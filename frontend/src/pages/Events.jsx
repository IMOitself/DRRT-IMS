import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

export default function Events() {

    return (
        <>
            <title>DRRT Student Public Portal - Events</title>
            <Header />

            <div className="grow w-full">
                {/* Main Container */}
                <main className="max-w-5xl mx-auto w-full px-4 md:px-8 py-6 md:py-8 pb-28 md:pb-12 space-y-6 md:space-y-8">
                    {/* Page Header & Search Card */}
                    <section className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <span className="font-geist text-xs font-bold text-blue tracking-wider uppercase">
                                    DRRT Schedule
                                </span>
                                <h1 className="font-geist text-2xl md:text-3xl font-bold text-text mt-1">
                                    Community Events &amp; Drills
                                </h1>
                                <p className="text-sm text-subtext mt-1.5">
                                    Stay prepared by attending campus-wide simulations, webinars, and
                                    safety workshops.
                                </p>
                            </div>
                        </div>
                        <div className="w-full mt-6">
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-subtext text-[20px]">
                                    search
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search drills, webinars..."
                                    className="w-full bg-surface border border-blue-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-text placeholder:text-subtext/70 focus:outline-none focus:ring-2 focus:ring-blue/30 transition-all shadow-sm"
                                />
                            </div>
                        </div>
                        {/* Filter Pills */}
                        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar mt-6 border-t border-blue-border/40">
                            <button className="shrink-0 bg-blue text-white font-geist text-sm px-4 py-2 rounded-full font-semibold shadow-sm">
                                All Events
                            </button>
                            <button className="shrink-0 bg-surface text-subtext border border-blue-border/80 font-geist text-sm px-4 py-2 rounded-full hover:bg-surface-container-low transition-colors font-semibold">
                                Campus Drills
                            </button>
                            <button className="shrink-0 bg-surface text-subtext border border-blue-border/80 font-geist text-sm px-4 py-2 rounded-full hover:bg-surface-container-low transition-colors font-semibold">
                                Open Webinars
                            </button>
                            <button className="shrink-0 bg-surface text-subtext border border-blue-border/80 font-geist text-sm px-4 py-2 rounded-full hover:bg-surface-container-low transition-colors font-semibold">
                                Community Service
                            </button>
                        </div>
                    </section>
                    {/* Event Cards Container */}
                    <section className="space-y-6 md:space-y-8">
                        {/* Event Card 1 */}
                        <article className="bg-white border border-blue-border/80 rounded-2xl shadow-sm overflow-hidden card-hover transition-all duration-300 flex flex-col md:flex-row">
                            {/* Event Image */}
                            <div className="md:w-5/12 h-48 md:h-auto relative shrink-0">
                                <img
                                    className="w-full h-full object-cover"
                                    alt="Campus Earthquake Drill"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjebMw4hZSsLgSu_mvDQiLCZ3iroKxWAW_iL1foPbOWulxOv2nXYMm49Q5ISFxL-bbtBNtRUjeP0HR100IKfgO_INmjx36DeP7-BJhhg9mtv7dLi6KThOv8_5AD9KoJaehg9xPm_Ff6Mn-sB44caydRr0W6wtoZ3S641hns01Mrew6xQVjSwhRU8W_3sAnse96xLxeNDj_b1ns3vCHITx8cCFEl74tpoqa9LXt_NYhwO5axx-NmHpW7Q"
                                />
                                <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full border border-blue-border/60 shadow-sm flex items-center gap-1.5 text-yellow font-geist text-xs font-bold uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-[15px] filled-icon">
                                        warning
                                    </span>
                                    <span>Campus Drill</span>
                                </div>
                            </div>
                            {/* Event Details */}
                            <div className="p-6 md:p-8 md:w-7/12 flex flex-col justify-between space-y-5">
                                <div>
                                    <h3 className="font-geist text-xl md:text-2xl font-bold text-text leading-snug">
                                        Campus-Wide Earthquake Preparedness Simulation
                                    </h3>
                                    {/* Metadata List */}
                                    <div className="space-y-2 mt-4 text-subtext text-sm">
                                        <div className="flex items-center gap-2.5">
                                            <span className="material-symbols-outlined text-blue text-[18px]">
                                                calendar_today
                                            </span>
                                            <span>Oct 15, 2024 • 10:00 AM - 12:00 PM</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <span className="material-symbols-outlined text-blue text-[18px]">
                                                location_on
                                            </span>
                                            <span>Main Quad &amp; Surrounding Campus Buildings</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <span className="material-symbols-outlined text-blue text-[18px]">
                                                group
                                            </span>
                                            <span>All Students, Faculty, and Staff</span>
                                        </div>
                                    </div>
                                    {/* Expectations Note Box */}
                                    <div className="bg-surface-container-low p-4 rounded-xl border border-blue-border/50 mt-4">
                                        <h4 className="font-geist text-xs font-bold text-text uppercase tracking-wider mb-1">
                                            What to expect
                                        </h4>
                                        <p className="text-sm text-subtext leading-relaxed">
                                            Sirens will activate at 10:00 AM. Practice 'Drop, Cover, and
                                            Hold On'. Proceed directly to designated Assembly Areas upon
                                            instruction.
                                        </p>
                                    </div>
                                </div>
                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                    <button className="flex-1 bg-blue text-white font-geist text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue transition-colors shadow-sm active:scale-[0.98]">
                                        <span className="material-symbols-outlined text-[18px]">
                                            event
                                        </span>
                                        <span>Add to Calendar</span>
                                    </button>
                                    <button className="flex-1 bg-surface border border-blue-border text-blue hover:bg-surface-container-low font-geist text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-[0.98]">
                                        <span className="material-symbols-outlined text-[18px]">
                                            description
                                        </span>
                                        <span>View Guidelines</span>
                                    </button>
                                </div>
                            </div>
                        </article>
                        {/* Event Card 2 */}
                        <article className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-sm card-hover transition-all duration-300 space-y-5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div className="flex items-center gap-2 text-blue">
                                    <span className="material-symbols-outlined text-[18px] filled-icon">
                                        videocam
                                    </span>
                                    <span className="font-geist text-xs font-bold uppercase tracking-wider">
                                        Open Webinar
                                    </span>
                                </div>
                                <span className="font-geist text-xs font-semibold text-subtext bg-surface-container-high px-2.5 py-1 rounded-full w-fit">
                                    Virtual Event
                                </span>
                            </div>
                            <div>
                                <h3 className="font-geist text-xl md:text-2xl font-bold text-text">
                                    Severe Weather Readiness Briefing
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-subtext text-sm">
                                    <div className="flex items-center gap-2.5">
                                        <span className="material-symbols-outlined text-blue text-[18px]">
                                            calendar_today
                                        </span>
                                        <span>Nov 02, 2024 • 6:00 PM</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <span className="material-symbols-outlined text-blue text-[18px]">
                                            laptop_mac
                                        </span>
                                        <span>Online (Zoom Webinar)</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <span className="material-symbols-outlined text-blue text-[18px]">
                                            public
                                        </span>
                                        <span>Open to General Public</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-surface-container-low p-4 rounded-xl border border-blue-border/50">
                                <h4 className="font-geist text-xs font-bold text-text uppercase tracking-wider mb-1">
                                    Briefing Overview
                                </h4>
                                <p className="text-sm text-subtext leading-relaxed">
                                    A 45-minute presentation by the regional meteorological team on
                                    emergency preparedness and weather safety, followed by a 15-minute
                                    live Q&amp;A on personal kit assembly.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <button className="sm:w-auto px-8 bg-blue text-white font-geist text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue transition-colors shadow-sm active:scale-[0.98]">
                                    <span className="material-symbols-outlined text-[18px]">
                                        how_to_reg
                                    </span>
                                    <span>Register Now</span>
                                </button>
                            </div>
                        </article>
                    </section>
                </main>
            </div>


            <BottomNav />
        </>
    )
}