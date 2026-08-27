import Header from "../components/Header"
import BottomNav from '../components/BottomNav';
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <title>DRRT Student Public Portal - Home</title>
            <Header />

            <div className="flex-grow w-full">
                {/* Main Container */}
                <main className="max-w-5xl mx-auto w-full px-4 md:px-8 py-6 md:py-8 pb-28 md:pb-12 space-y-6 md:space-y-8">
                    {/* Hero Banner Card */}
                    <section className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-6 md:p-10 shadow-sm relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full pointer-events-none" />
                        <div className="max-w-2xl space-y-3">
                            <span className="font-label-sm text-label-sm font-bold text-primary tracking-wider uppercase bg-primary-fixed/60 px-3 py-1 rounded-full">
                                DRRT – LVCC Apalit Chapter
                            </span>
                            <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-on-surface tracking-tight mt-1">
                                Preparedness Starts Here
                            </h1>
                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed pt-1">
                                Promoting disaster awareness, emergency response readiness, and
                                proactive safety across our entire campus community.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center md:justify-start">
                                <Link to="/join" className="bg-primary text-on-primary hover:bg-primary-container transition-all font-label-md text-label-md font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98]">
                                    <span className="material-symbols-outlined text-[18px]">
                                        person_add
                                    </span>
                                    <span>Join DRRT Team</span>
                                </Link>
                                <button className="bg-surface border border-outline-variant hover:bg-surface-container-low text-primary font-label-md text-label-md font-bold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                                    <span className="material-symbols-outlined text-[18px]">map</span>
                                    <span>Explore Campus Safety</span>
                                </button>
                            </div>
                        </div>
                        <div className="hidden md:flex shrink-0 w-52 h-52 rounded-full bg-primary/10 border-2 border-primary/20 items-center justify-center text-primary shadow-inner">
                            <span className="material-symbols-outlined !text-[110px] filled-icon">
                                health_and_safety
                            </span>
                        </div>
                    </section>
                    {/* Operational Alert Status Banner */}
                    <section className="w-full">
                        <div className="bg-status-success/10 border border-status-success/40 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                            <div className="flex items-center gap-3.5">
                                <div className="w-10 h-10 rounded-xl bg-status-success/20 flex items-center justify-center text-status-success shrink-0">
                                    <span className="material-symbols-outlined text-[24px] filled-icon">
                                        check_circle
                                    </span>
                                </div>
                                <div>
                                    <h2 className="font-headline-md text-lg font-bold text-status-success">
                                        Code Green: Normal Campus Operations
                                    </h2>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                                        No active safety threats detected. Standard campus protocols in
                                        effect.
                                    </p>
                                </div>
                            </div>
                            <span className="font-label-sm text-xs font-semibold text-on-surface-variant bg-surface-container-lowest px-3 py-1.5 rounded-full border border-outline-variant/60 shrink-0 self-end sm:self-center">
                                Updated: Today, 08:00 AM
                            </span>
                        </div>
                    </section>
                    {/* Quick Access Grid */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1: Emergency Contacts */}
                        <article className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/80 shadow-sm flex flex-col justify-between space-y-4">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <span className="material-symbols-outlined text-[20px] filled-icon">
                                            call
                                        </span>
                                    </div>
                                    <h3 className="font-headline-md text-lg font-bold text-on-surface">
                                        Emergency Hotline
                                    </h3>
                                </div>
                                <div className="space-y-3 font-body-sm text-body-sm">
                                    <div className="flex items-center justify-between p-2.5 bg-surface rounded-xl border border-outline-variant/40">
                                        <span className="font-semibold text-on-surface">
                                            Campus Clinic
                                        </span>
                                        <a
                                            href="tel:123"
                                            className="font-label-md text-xs font-bold text-primary hover:underline bg-primary-fixed px-3 py-1 rounded-lg"
                                        >
                                            Call Clinic
                                        </a>
                                    </div>
                                    <div className="flex items-center justify-between p-2.5 bg-surface rounded-xl border border-outline-variant/40">
                                        <span className="font-semibold text-on-surface">
                                            Campus Security
                                        </span>
                                        <a
                                            href="tel:123"
                                            className="font-label-md text-xs font-bold text-primary hover:underline bg-primary-fixed px-3 py-1 rounded-lg"
                                        >
                                            Call Security
                                        </a>
                                    </div>
                                    <div className="flex items-center justify-between p-2.5 bg-surface rounded-xl border border-outline-variant/40">
                                        <span className="font-semibold text-on-surface">
                                            DRRT Command
                                        </span>
                                        <a
                                            href="tel:123"
                                            className="font-label-md text-xs font-bold text-primary hover:underline bg-primary-fixed px-3 py-1 rounded-lg"
                                        >
                                            Call Command
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </article>
                        {/* Card 2: Preparedness Bulletin */}
                        <article className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/80 shadow-sm card-hover transition-all flex flex-col justify-between space-y-4 relative overflow-hidden group">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-status-warning/15 flex items-center justify-center text-status-warning shrink-0">
                                        <span className="material-symbols-outlined text-[20px] filled-icon">
                                            description
                                        </span>
                                    </div>
                                    <h3 className="font-headline-md text-lg font-bold text-on-surface">
                                        Latest Bulletin
                                    </h3>
                                </div>
                                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                                    Review the updated Campus Evacuation Routes &amp; Assembly Area
                                    Map for the Main Building and Annexes.
                                </p>
                            </div>
                            <a
                                href="#"
                                className="font-label-md text-label-md font-bold text-primary hover:text-primary-container flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                            >
                                <span>Read Full Guide</span>
                                <span className="material-symbols-outlined text-[18px]">
                                    arrow_forward
                                </span>
                            </a>
                        </article>
                        {/* Card 3: Upcoming Drills */}
                        <article className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/80 shadow-sm flex flex-col justify-between space-y-4">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-map-assembly/15 flex items-center justify-center text-map-assembly shrink-0">
                                        <span className="material-symbols-outlined text-[20px] filled-icon">
                                            campaign
                                        </span>
                                    </div>
                                    <h3 className="font-headline-md text-lg font-bold text-on-surface">
                                        Upcoming Drills
                                    </h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-2 bg-surface rounded-xl border border-outline-variant/40">
                                        <div className="bg-primary-fixed text-on-primary-fixed rounded-lg px-2.5 py-1 text-center shrink-0">
                                            <span className="font-label-sm text-[10px] font-bold uppercase block">
                                                Nov
                                            </span>
                                            <span className="font-headline-md text-sm font-bold block leading-none">
                                                15
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="font-label-md text-xs font-bold text-on-surface">
                                                Earthquake Drill
                                            </h4>
                                            <p className="font-body-sm text-[12px] text-on-surface-variant">
                                                10:00 AM • Main Quad
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-2 bg-surface rounded-xl border border-outline-variant/40">
                                        <div className="bg-surface-container-high text-secondary rounded-lg px-2.5 py-1 text-center shrink-0">
                                            <span className="font-label-sm text-[10px] font-bold uppercase block">
                                                Dec
                                            </span>
                                            <span className="font-headline-md text-sm font-bold block leading-none">
                                                02
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="font-label-md text-xs font-bold text-on-surface">
                                                Fire Simulation
                                            </h4>
                                            <p className="font-body-sm text-[12px] text-on-surface-variant">
                                                02:00 PM • South Wing
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </section>
                    {/* Public Announcements */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
                            <h2 className="font-headline-md text-xl font-bold text-on-surface">
                                Public Announcements
                            </h2>
                            <a
                                href="#"
                                className="font-label-md text-xs font-bold text-primary hover:underline"
                            >
                                View All
                            </a>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Announcement 1 */}
                            <article className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/80 shadow-sm card-hover transition-all flex flex-col justify-between space-y-3">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="bg-error-container text-on-error-container font-label-sm text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                                            Safety Alert
                                        </span>
                                        <span className="font-label-sm text-[11px] text-on-surface-variant/70">
                                            2 Days Ago
                                        </span>
                                    </div>
                                    <h3 className="font-headline-md text-base font-bold text-on-surface leading-snug">
                                        Temporary Closure of East Gate
                                    </h3>
                                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                                        Due to ongoing safety upgrades, the East Gate will be closed for
                                        all pedestrian traffic. Please use the Main Gate.
                                    </p>
                                </div>
                            </article>
                            {/* Announcement 2 */}
                            <article className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/80 shadow-sm card-hover transition-all flex flex-col justify-between space-y-3">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="bg-secondary-container text-on-secondary-container font-label-sm text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                                            Activity
                                        </span>
                                        <span className="font-label-sm text-[11px] text-on-surface-variant/70">
                                            1 Week Ago
                                        </span>
                                    </div>
                                    <h3 className="font-headline-md text-base font-bold text-on-surface leading-snug">
                                        Basic First Aid Training Session
                                    </h3>
                                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                                        Hands-on basic first aid training hosted by the DRRT Medical
                                        Team. Open to all registered campus students.
                                    </p>
                                </div>
                            </article>
                            {/* Announcement 3 */}
                            <article className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/80 shadow-sm card-hover transition-all flex flex-col justify-between space-y-3">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="bg-surface-container-high text-on-surface font-label-sm text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                                            Webinar
                                        </span>
                                        <span className="font-label-sm text-[11px] text-on-surface-variant/70">
                                            2 Weeks Ago
                                        </span>
                                    </div>
                                    <h3 className="font-headline-md text-base font-bold text-on-surface leading-snug">
                                        Typhoon Preparedness Seminar
                                    </h3>
                                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                                        Virtual seminar discussing key preparation steps for typhoon
                                        season, including safety kits and emergency contacts.
                                    </p>
                                </div>
                            </article>
                        </div>
                    </section>
                    {/* Bottom Join DRRT Banner */}
                    <section className="bg-surface-container border border-outline-variant/80 rounded-2xl p-6 md:p-8 text-center space-y-3 shadow-sm">
                        <h2 className="font-headline-md text-xl md:text-2xl font-bold text-primary">
                            Become Part of DRRT
                        </h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xl mx-auto leading-relaxed">
                            Join our team of dedicated student responders and help build a
                            resilient and secure campus environment for everyone.
                        </p>
                        <div className="pt-2">
                            <Link to="/join" className="bg-primary text-on-primary hover:bg-primary-container transition-all font-label-md text-label-md font-bold px-8 py-3 rounded-xl shadow-md active:scale-[0.98]">
                                View Membership Guide
                            </Link>
                        </div>
                    </section>
                </main>
            </div>
            {/* Desktop Footer */}
            <footer className="hidden md:block w-full bg-surface-container-lowest border-t border-outline-variant/60 py-8 mt-12">
                <div className="max-w-5xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4 font-body-sm text-xs text-on-surface-variant">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[18px]">
                            shield
                        </span>
                        <span className="font-bold text-on-surface">
                            DRRT Student Public Portal
                        </span>
                    </div>
                    <div className="flex gap-6 font-semibold">
                        <a href="#" className="hover:text-primary transition-colors">
                            Contact Us
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            Mission &amp; Objectives
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            Safety Protocols
                        </a>
                    </div>
                    <p>© 2026 DRRT LVCC Apalit Chapter</p>
                </div>
            </footer>
            
            <BottomNav />
        </>

    )
}