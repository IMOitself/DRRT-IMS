import { Link } from "react-router-dom";

import Header from "../components/Header"
import BottomNav from '../components/BottomNav';

export default function JoinDRRT() {
    return (
        <>
            <title>Join DRRT - Student Portal</title>
            <Header />

            <div className="flex-grow w-full">
                {/* Main Container */}
                <main className="max-w-5xl mx-auto w-full px-4 md:px-8 py-6 md:py-8 pb-28 md:pb-12 space-y-6 md:space-y-8">
                    {/* Hero Header Banner Card */}
                    <section className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue/5 rounded-bl-full pointer-events-none" />
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div>
                                <span className="font-geist text-xs font-bold text-blue tracking-wider uppercase">
                                    Student Volunteer Recruitment
                                </span>
                                <h1 className="font-geist text-3xl md:text-4xl font-bold text-text mt-1">
                                    Join the DRRT Team
                                </h1>
                            </div>
                            <div className="bg-green-bg border border-green-border text-green font-geist text-sm px-4 py-2 rounded-full flex items-center gap-2 w-fit shrink-0">
                                <span className="material-symbols-outlined text-[18px] filled-icon">
                                    check_circle
                                </span>
                                <span className="font-bold">Recruitment Status: OPEN</span>
                            </div>
                        </div>
                        <p className="text-base text-subtext max-w-2xl leading-relaxed">
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
                            <article className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center text-blue shrink-0">
                                        <span className="material-symbols-outlined text-[22px] filled-icon">
                                            checklist
                                        </span>
                                    </div>
                                    <h2 className="font-geist text-xl font-bold text-text">
                                        Eligibility Requirements
                                    </h2>
                                </div>
                                <ul className="space-y-5">
                                    <li className="flex items-start gap-3.5">
                                        <div className="w-6 h-6 rounded-full bg-green-bg flex items-center justify-center text-green shrink-0 mt-0.5">
                                            <span className="material-symbols-outlined text-[16px] font-bold">
                                                check
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-geist text-sm font-bold text-text">
                                                Enrolled Student
                                            </h3>
                                            <p className="text-sm text-subtext mt-0.5">
                                                Must be currently enrolled at LVCC with at least two
                                                semesters remaining in your program.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3.5">
                                        <div className="w-6 h-6 rounded-full bg-green-bg flex items-center justify-center text-green shrink-0 mt-0.5">
                                            <span className="material-symbols-outlined text-[16px] font-bold">
                                                check
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-geist text-sm font-bold text-text">
                                                Good Moral Character
                                            </h3>
                                            <p className="text-sm text-subtext mt-0.5">
                                                Clean disciplinary record verified and endorsed by the
                                                Office of Student Affairs.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3.5">
                                        <div className="w-6 h-6 rounded-full bg-green-bg flex items-center justify-center text-green shrink-0 mt-0.5">
                                            <span className="material-symbols-outlined text-[16px] font-bold">
                                                check
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-geist text-sm font-bold text-text">
                                                Commitment to Drills
                                            </h3>
                                            <p className="text-sm text-subtext mt-0.5">
                                                Ability to attend mandatory safety training sessions and
                                                weekend drills (min. 10 hours/month).
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </article>
                            {/* Application Roadmap Card */}
                            <article className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-blue-bg/10 flex items-center justify-center text-subtext shrink-0">
                                        <span className="material-symbols-outlined text-[22px] filled-icon">
                                            route
                                        </span>
                                    </div>
                                    <h2 className="font-geist text-xl font-bold text-text">
                                        Application Roadmap
                                    </h2>
                                </div>
                                {/* Timeline Steps */}
                                <div className="relative pl-8 border-l-2 border-blue-border/60 ml-3 space-y-8">
                                    {/* Step 1 (Current / Active) */}
                                    <div className="relative">
                                        <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-blue text-white flex items-center justify-center font-bold text-xs ring-4 ring-background shadow-md">
                                            1
                                        </div>
                                        <span className="font-geist text-xs font-bold text-blue uppercase tracking-wider">
                                            Step 1
                                        </span>
                                        <h3 className="font-geist text-lg font-bold text-text mt-0.5">
                                            Registration
                                        </h3>
                                        <p className="text-sm text-subtext mt-1 leading-relaxed">
                                            Submit the online application form along with your parent
                                            consent form and official class schedule.
                                        </p>
                                    </div>
                                    {/* Step 2 */}
                                    <div className="relative">
                                        <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-surface-container-high text-subtext border border-blue-border flex items-center justify-center font-bold text-xs">
                                            2
                                        </div>
                                        <span className="font-geist text-xs font-semibold text-subtext uppercase tracking-wider">
                                            Step 2
                                        </span>
                                        <h3 className="font-geist text-lg font-bold text-text mt-0.5">
                                            Orientation
                                        </h3>
                                        <p className="text-sm text-subtext mt-1 leading-relaxed">
                                            Attend the mandatory 2-hour orientation session covering
                                            campus DRRT protocols, code of conduct, and expectations.
                                        </p>
                                    </div>
                                    {/* Step 3 */}
                                    <div className="relative">
                                        <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-surface-container-high text-subtext border border-blue-border flex items-center justify-center font-bold text-xs">
                                            3
                                        </div>
                                        <span className="font-geist text-xs font-semibold text-subtext uppercase tracking-wider">
                                            Step 3
                                        </span>
                                        <h3 className="font-geist text-lg font-bold text-text mt-0.5">
                                            Assessment
                                        </h3>
                                        <p className="text-sm text-subtext mt-1 leading-relaxed">
                                            Pass a basic physical fitness evaluation and complete a
                                            written exam on general campus emergency response procedures.
                                        </p>
                                    </div>
                                    {/* Step 4 */}
                                    <div className="relative">
                                        <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-surface-container-high text-subtext border border-blue-border flex items-center justify-center font-bold text-xs">
                                            4
                                        </div>
                                        <span className="font-geist text-xs font-semibold text-subtext uppercase tracking-wider">
                                            Step 4
                                        </span>
                                        <h3 className="font-geist text-lg font-bold text-text mt-0.5">
                                            Roster Activation
                                        </h3>
                                        <p className="text-sm text-subtext mt-1 leading-relaxed">
                                            Receive your official DRRT responder uniform, ID badge, and
                                            get assigned to your initial duty squad and sector.
                                        </p>
                                    </div>
                                </div>
                                {/* Action Button */}
                                <div className="mt-8 pt-6 border-t border-blue-border/40">
                                    <Link to="/join-form">
                                        <button className="w-full sm:w-auto bg-blue text-white hover:bg-blue transition-all font-geist text-sm font-bold px-8 py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98]">
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
                            <article className="bg-surface-container border border-blue-border/80 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-9 h-9 rounded-xl bg-blue/10 flex items-center justify-center text-blue shrink-0">
                                        <span className="material-symbols-outlined text-[20px] filled-icon">
                                            folder
                                        </span>
                                    </div>
                                    <h2 className="font-geist text-lg font-bold text-text">
                                        Required Resources
                                    </h2>
                                </div>
                                <div className="space-y-3">
                                    <a href="#" className="flex items-center justify-between p-4 bg-white rounded-xl border border-blue-border/80 card-hover transition-all group">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-red text-[24px] filled-icon">
                                                picture_as_pdf
                                            </span>
                                            <div>
                                                <h3 className="font-geist text-sm font-bold text-text group-hover:text-blue transition-colors">
                                                    Parent Consent Form
                                                </h3>
                                                <p className="text-[12px] text-subtext">
                                                    PDF Document • 450 KB
                                                </p>
                                            </div>
                                        </div>
                                        <span className="material-symbols-outlined text-subtext group-hover:text-blue transition-colors">
                                            download
                                        </span>
                                    </a>
                                </div>
                            </article>
                            {/* FAQ Accordion Card */}
                            <article className="bg-white border border-blue-border/80 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-9 h-9 rounded-xl bg-blue/10 flex items-center justify-center text-blue shrink-0">
                                        <span className="material-symbols-outlined text-[20px] filled-icon">
                                            help
                                        </span>
                                    </div>
                                    <h2 className="font-geist text-lg font-bold text-text">
                                        Frequently Asked Questions
                                    </h2>
                                </div>
                                <div className="space-y-3">
                                    {/* FAQ Item 1 */}
                                    <details className="group bg-surface border border-blue-border/80 rounded-xl overflow-hidden transition-all duration-200 [&_summary::-webkit-details-marker]:hidden">
                                        <summary className="flex items-center justify-between p-4 cursor-pointer font-geist text-sm font-bold text-text hover:bg-surface-container-low transition-colors select-none">
                                            <span>Do I need prior medical experience?</span>
                                            <span className="material-symbols-outlined text-subtext transition-transform duration-300 group-open:-rotate-180">
                                                expand_more
                                            </span>
                                        </summary>
                                        <div className="px-4 pb-4 pt-1 text-sm text-subtext leading-relaxed border-t border-blue-border/30">
                                            No prior medical experience is required. All necessary first
                                            aid, CPR, and basic emergency response training will be fully
                                            provided during the orientation and training phases.
                                        </div>
                                    </details>
                                    {/* FAQ Item 2 */}
                                    <details className="group bg-surface border border-blue-border/80 rounded-xl overflow-hidden transition-all duration-200 [&_summary::-webkit-details-marker]:hidden">
                                        <summary className="flex items-center justify-between p-4 cursor-pointer font-geist text-sm font-bold text-text hover:bg-surface-container-low transition-colors select-none">
                                            <span>Will DRRT duty conflict with academics?</span>
                                            <span className="material-symbols-outlined text-subtext transition-transform duration-300 group-open:-rotate-180">
                                                expand_more
                                            </span>
                                        </summary>
                                        <div className="px-4 pb-4 pt-1 text-sm text-subtext leading-relaxed border-t border-blue-border/30">
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

            <BottomNav />
        </>
    )
}