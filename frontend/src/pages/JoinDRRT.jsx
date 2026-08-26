import './JoinDRRT.css'
import { Link } from "react-router-dom";

export default function JoinDRRT() {
    return (
        <>
            <title>Join DRRT - Student Portal</title>
            {/* Fonts & Icons */}
            <link href="https://fonts.googleapis.com" rel="preconnect" />
            <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
            <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
            {/* Top Navigation Header */}
            <header className="glass-header sticky top-0 w-full z-50 border-b border-outline-variant/60 shadow-sm">
                <div className="max-w-screen-xl mx-auto px-4 md:px-8 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-[24px]">shield</span>
                        </div>
                        <div>
                            <h1 className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2">
                                DRRT Portal
                                <span className="font-label-sm text-label-sm text-primary font-semibold bg-primary-fixed px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    LVCC
                                </span>
                            </h1>
                        </div>
                    </div>
                    {/* Desktop Navigation Links */}
                    <nav
                        className="hidden md:flex items-center gap-8 font-label-md text-on-surface-variant"
                        aria-label="Main Navigation"
                    >
                        <a href="#" className="hover:text-primary transition-colors py-1">
                            Home
                        </a>
                        <a href="#" className="hover:text-primary transition-colors py-1">
                            Map
                        </a>
                        <a href="#" className="hover:text-primary transition-colors py-1">
                            Events
                        </a>
                        <a
                            href="#"
                            className="text-primary font-bold border-b-2 border-primary py-1"
                            aria-current="page"
                        >
                            Join
                        </a>
                    </nav>
                    <div className="flex items-center gap-3">
                        <button className="font-label-md text-label-md bg-primary text-on-primary hover:bg-primary-container transition-all px-5 py-2 rounded-full font-semibold shadow-sm active:scale-95">
                            Login
                        </button>
                    </div>
                </div>
            </header>
            <div className="flex-grow w-full">
                {/* Main Container */}
                <main className="max-w-5xl mx-auto w-full px-4 md:px-8 py-6 md:py-8 pb-28 md:pb-12 space-y-6 md:space-y-8">
                    {/* Hero Header Banner Card */}
                    <section className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-bl-full pointer-events-none" />
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div>
                                <span className="font-label-sm text-label-sm font-bold text-primary tracking-wider uppercase">
                                    Student Volunteer Recruitment
                                </span>
                                <h1 className="font-display-lg text-3xl md:text-4xl font-bold text-on-surface mt-1">
                                    Join the DRRT Team
                                </h1>
                            </div>
                            <div className="bg-status-success/10 border border-status-success/30 text-status-success font-label-md text-label-md px-4 py-2 rounded-full flex items-center gap-2 w-fit shrink-0">
                                <span className="material-symbols-outlined text-[18px] filled-icon">
                                    check_circle
                                </span>
                                <span className="font-bold">Recruitment Status: OPEN</span>
                            </div>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
                            Become a crucial part of campus safety. The Disaster Response and
                            Readiness Team is looking for dedicated individuals to join our ranks.
                            Review the eligibility rules and application steps below to get
                            started.
                        </p>
                    </section>
                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                        {/* Left Column: Requirements & Application Roadmap */}
                        <div className="lg:col-span-7 space-y-6 md:space-y-8">
                            {/* Eligibility Requirements Card */}
                            <article className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-6 md:p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <span className="material-symbols-outlined text-[22px] filled-icon">
                                            checklist
                                        </span>
                                    </div>
                                    <h2 className="font-headline-md text-xl font-bold text-on-surface">
                                        Eligibility Requirements
                                    </h2>
                                </div>
                                <ul className="space-y-5">
                                    <li className="flex items-start gap-3.5">
                                        <div className="w-6 h-6 rounded-full bg-status-success/15 flex items-center justify-center text-status-success shrink-0 mt-0.5">
                                            <span className="material-symbols-outlined text-[16px] font-bold">
                                                check
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-label-md text-label-md font-bold text-on-surface">
                                                Enrolled Student
                                            </h3>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                                                Must be currently enrolled at LVCC with at least two
                                                semesters remaining in your program.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3.5">
                                        <div className="w-6 h-6 rounded-full bg-status-success/15 flex items-center justify-center text-status-success shrink-0 mt-0.5">
                                            <span className="material-symbols-outlined text-[16px] font-bold">
                                                check
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-label-md text-label-md font-bold text-on-surface">
                                                Good Moral Character
                                            </h3>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                                                Clean disciplinary record verified and endorsed by the
                                                Office of Student Affairs.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3.5">
                                        <div className="w-6 h-6 rounded-full bg-status-success/15 flex items-center justify-center text-status-success shrink-0 mt-0.5">
                                            <span className="material-symbols-outlined text-[16px] font-bold">
                                                check
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-label-md text-label-md font-bold text-on-surface">
                                                Commitment to Drills
                                            </h3>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                                                Ability to attend mandatory safety training sessions and
                                                weekend drills (min. 10 hours/month).
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </article>
                            {/* Application Roadmap Card */}
                            <article className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-6 md:p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                                        <span className="material-symbols-outlined text-[22px] filled-icon">
                                            route
                                        </span>
                                    </div>
                                    <h2 className="font-headline-md text-xl font-bold text-on-surface">
                                        Application Roadmap
                                    </h2>
                                </div>
                                {/* Timeline Steps */}
                                <div className="relative pl-8 border-l-2 border-outline-variant/60 ml-3 space-y-8">
                                    {/* Step 1 (Current / Active) */}
                                    <div className="relative">
                                        <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs ring-4 ring-background shadow-md">
                                            1
                                        </div>
                                        <span className="font-label-sm text-label-sm font-bold text-primary uppercase tracking-wider">
                                            Step 1
                                        </span>
                                        <h3 className="font-headline-md text-lg font-bold text-on-surface mt-0.5">
                                            Registration
                                        </h3>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                                            Submit the online application form along with your parent
                                            consent form and official class schedule.
                                        </p>
                                    </div>
                                    {/* Step 2 */}
                                    <div className="relative">
                                        <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-surface-container-high text-secondary border border-outline-variant flex items-center justify-center font-bold text-xs">
                                            2
                                        </div>
                                        <span className="font-label-sm text-label-sm font-semibold text-secondary uppercase tracking-wider">
                                            Step 2
                                        </span>
                                        <h3 className="font-headline-md text-lg font-bold text-on-surface mt-0.5">
                                            Orientation
                                        </h3>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                                            Attend the mandatory 2-hour orientation session covering
                                            campus DRRT protocols, code of conduct, and expectations.
                                        </p>
                                    </div>
                                    {/* Step 3 */}
                                    <div className="relative">
                                        <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-surface-container-high text-secondary border border-outline-variant flex items-center justify-center font-bold text-xs">
                                            3
                                        </div>
                                        <span className="font-label-sm text-label-sm font-semibold text-secondary uppercase tracking-wider">
                                            Step 3
                                        </span>
                                        <h3 className="font-headline-md text-lg font-bold text-on-surface mt-0.5">
                                            Assessment
                                        </h3>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                                            Pass a basic physical fitness evaluation and complete a
                                            written exam on general campus emergency response procedures.
                                        </p>
                                    </div>
                                    {/* Step 4 */}
                                    <div className="relative">
                                        <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-surface-container-high text-secondary border border-outline-variant flex items-center justify-center font-bold text-xs">
                                            4
                                        </div>
                                        <span className="font-label-sm text-label-sm font-semibold text-secondary uppercase tracking-wider">
                                            Step 4
                                        </span>
                                        <h3 className="font-headline-md text-lg font-bold text-on-surface mt-0.5">
                                            Roster Activation
                                        </h3>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                                            Receive your official DRRT responder uniform, ID badge, and
                                            get assigned to your initial duty squad and sector.
                                        </p>
                                    </div>
                                </div>
                                {/* Action Button */}
                                <div className="mt-8 pt-6 border-t border-outline-variant/40">
                                    <Link to="/join-form">
                                        <button className="w-full sm:w-auto bg-primary text-on-primary hover:bg-primary-container transition-all font-label-md text-label-md font-bold px-8 py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98]">
                                            <span>Start Application Form</span>
                                            <span className="material-symbols-outlined text-[18px]">
                                                arrow_forward
                                            </span>
                                        </button>
                                    </Link>
                                </div>
                            </article>
                        </div>
                        {/* Right Column: Resources & FAQ */}
                        <div className="lg:col-span-5 space-y-6 md:space-y-8">
                            {/* Required Downloads Card */}
                            <article className="bg-surface-container border border-outline-variant/80 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <span className="material-symbols-outlined text-[20px] filled-icon">
                                            folder
                                        </span>
                                    </div>
                                    <h2 className="font-headline-md text-lg font-bold text-on-surface">
                                        Required Resources
                                    </h2>
                                </div>
                                <div className="space-y-3">
                                    {/* Resource Item 1 */}
                                    <a
                                        href="#"
                                        className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/80 card-hover transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-error text-[24px] filled-icon">
                                                picture_as_pdf
                                            </span>
                                            <div>
                                                <h3 className="font-label-md text-label-md font-bold text-on-surface group-hover:text-primary transition-colors">
                                                    Student Primer
                                                </h3>
                                                <p className="font-body-sm text-[12px] text-on-surface-variant">
                                                    PDF Document • 1.8 MB
                                                </p>
                                            </div>
                                        </div>
                                        <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors">
                                            download
                                        </span>
                                    </a>
                                    {/* Resource Item 2 */}
                                    <a
                                        href="#"
                                        className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/80 card-hover transition-all group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-error text-[24px] filled-icon">
                                                picture_as_pdf
                                            </span>
                                            <div>
                                                <h3 className="font-label-md text-label-md font-bold text-on-surface group-hover:text-primary transition-colors">
                                                    Parent Consent Form
                                                </h3>
                                                <p className="font-body-sm text-[12px] text-on-surface-variant">
                                                    PDF Document • 450 KB
                                                </p>
                                            </div>
                                        </div>
                                        <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors">
                                            download
                                        </span>
                                    </a>
                                </div>
                            </article>
                            {/* FAQ Accordion Card */}
                            <article className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <span className="material-symbols-outlined text-[20px] filled-icon">
                                            help
                                        </span>
                                    </div>
                                    <h2 className="font-headline-md text-lg font-bold text-on-surface">
                                        Frequently Asked Questions
                                    </h2>
                                </div>
                                <div className="space-y-3">
                                    {/* FAQ Item 1 */}
                                    <details className="group bg-surface border border-outline-variant/80 rounded-xl overflow-hidden transition-all duration-200 [&_summary::-webkit-details-marker]:hidden">
                                        <summary className="flex items-center justify-between p-4 cursor-pointer font-label-md text-label-md font-bold text-on-surface hover:bg-surface-container-low transition-colors select-none">
                                            <span>Do I need prior medical experience?</span>
                                            <span className="material-symbols-outlined text-secondary transition-transform duration-300 group-open:-rotate-180">
                                                expand_more
                                            </span>
                                        </summary>
                                        <div className="px-4 pb-4 pt-1 font-body-sm text-body-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/30">
                                            No prior medical experience is required. All necessary first
                                            aid, CPR, and basic emergency response training will be fully
                                            provided during the orientation and training phases.
                                        </div>
                                    </details>
                                    {/* FAQ Item 2 */}
                                    <details className="group bg-surface border border-outline-variant/80 rounded-xl overflow-hidden transition-all duration-200 [&_summary::-webkit-details-marker]:hidden">
                                        <summary className="flex items-center justify-between p-4 cursor-pointer font-label-md text-label-md font-bold text-on-surface hover:bg-surface-container-low transition-colors select-none">
                                            <span>Will DRRT duty conflict with academics?</span>
                                            <span className="material-symbols-outlined text-secondary transition-transform duration-300 group-open:-rotate-180">
                                                expand_more
                                            </span>
                                        </summary>
                                        <div className="px-4 pb-4 pt-1 font-body-sm text-body-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/30">
                                            Academics always come first. DRRT schedules mandatory drills
                                            during weekends and coordinates directly with faculty to
                                            ensure duties do not conflict with major exam periods.
                                        </div>
                                    </details>
                                </div>
                            </article>
                        </div>
                    </div>
                </main>
            </div>
            {/* Bottom Navigation Bar (Mobile Only) */}
            <nav
                className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2.5 bg-surface border-t border-outline-variant shadow-lg"
                aria-label="Mobile Navigation"
            >
                <button className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary px-3 py-1 rounded-xl transition-colors">
                    <span className="material-symbols-outlined">home</span>
                    <span className="font-label-sm text-label-sm mt-0.5">Home</span>
                </button>
                <button className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary px-3 py-1 rounded-xl transition-colors">
                    <span className="material-symbols-outlined">map</span>
                    <span className="font-label-sm text-label-sm mt-0.5">Map</span>
                </button>
                <button className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary px-3 py-1 rounded-xl transition-colors">
                    <span className="material-symbols-outlined">event</span>
                    <span className="font-label-sm text-label-sm mt-0.5">Events</span>
                </button>
                {/* Active Tab for Join */}
                <button
                    className="flex flex-col items-center justify-center bg-primary text-on-primary rounded-xl px-4 py-1.5 font-bold shadow-md scale-95 transition-all relative"
                    aria-current="page"
                >
                    <span className="material-symbols-outlined filled-icon">person_add</span>
                    <span className="font-label-sm text-label-sm mt-0.5">Join</span>
                </button>
            </nav>
        </>
    )
}