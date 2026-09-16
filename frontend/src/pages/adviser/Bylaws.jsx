import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import WIP from "../../components/WIP";

export default function Bylaws() {
  return (
    <>
      <title>Bylaws - DRRT Adviser Portal</title>

      <Header />
      <WIP />

      {/* Main Content Canvas */}
      <main className="grow max-w-7xl w-full mx-auto px-4 md:px-8 py-6 pb-28 md:pb-12 space-y-6">
        {/* Page Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-geist text-2xl md:text-3xl text-text font-bold">
              Bylaw Governance &amp; Roster Oversight
            </h2>
            <p className="text-sm md:text-base text-subtext mt-1">
              Manage member compliance, review flagged candidates, and issue
              authoritative decisions.
            </p>
          </div>
          {/* Controls Bar */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-low border border-blue-border text-subtext hover:bg-blue/10 font-geist text-sm transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px]!">
                filter_list
              </span>
              <span>Filter</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-low border border-blue-border text-subtext hover:bg-blue/10 font-geist text-sm transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px]!">sort</span>
              <span>Sort</span>
            </button>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <section
          className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4"
          aria-label="Governance Overview Metrics"
        >
          {/* Active Members */}
          <div className="bg-white border border-blue-border/80 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <span className="font-geist text-sm text-subtext">
                Active Members
              </span>
              <span className="material-symbols-outlined text-blue text-[20px]!">
                groups
              </span>
            </div>
            <div className="font-geist text-2xl md:text-3xl text-text font-bold">
              142
            </div>
          </div>

          {/* At-Risk */}
          <div className="bg-white border border-blue-border/80 rounded-2xl p-4 flex flex-col justify-between border-t-4 border-t-blue shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <span className="font-geist text-sm text-subtext">
                At-Risk
              </span>
              <span className="material-symbols-outlined text-blue text-[20px]!">
                warning
              </span>
            </div>
            <div className="font-geist text-2xl md:text-3xl text-text font-bold">
              12
            </div>
          </div>

          {/* Non-Compliant */}
          <div className="bg-white border border-blue-border/80 rounded-2xl p-4 flex flex-col justify-between border-t-4 border-t-red shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <span className="font-geist text-sm text-subtext">
                Non-Compliant
              </span>
              <span className="material-symbols-outlined text-red text-[20px]!">
                gavel
              </span>
            </div>
            <div className="font-geist text-2xl md:text-3xl text-text font-bold">
              5
            </div>
          </div>

          {/* Graduated */}
          <div className="bg-white border border-blue-border/80 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <span className="font-geist text-sm text-subtext">
                Graduated
              </span>
              <span className="material-symbols-outlined text-subtext text-[20px]!">
                school
              </span>
            </div>
            <div className="font-geist text-2xl md:text-3xl text-text font-bold">
              48
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="border-b border-blue-border/60 overflow-x-auto no-scrollbar">
          <nav
            className="flex gap-6 min-w-max pb-1"
            role="tablist"
            aria-label="Roster Category Tabs"
          >
            <button
              role="tab"
              aria-selected="false"
              className="font-geist text-sm text-subtext hover:text-blue pb-2 px-1 transition-colors cursor-pointer"
            >
              All
            </button>
            <button
              role="tab"
              aria-selected="true"
              className="font-geist text-sm text-text font-bold border-b-2 border-blue pb-2 px-1 transition-colors relative flex items-center gap-2 cursor-pointer"
            >
              <span>Flagged for Review</span>
              <span className="bg-red text-white font-geist text-[11px]! px-1.5 py-0.5 rounded-full font-bold">
                5
              </span>
            </button>
            <button
              role="tab"
              aria-selected="false"
              className="font-geist text-sm text-subtext hover:text-blue pb-2 px-1 transition-colors cursor-pointer"
            >
              Inactive Candidates
            </button>
            <button
              role="tab"
              aria-selected="false"
              className="font-geist text-sm text-subtext hover:text-blue pb-2 px-1 transition-colors cursor-pointer"
            >
              Graduation List
            </button>
          </nav>
        </div>

        {/* Governance Roster Cards Stack */}
        <div className="space-y-4 max-w-5xl">
          {/* Card 1: Non-Compliant Case */}
          <article className="bg-white border border-blue-border/80 rounded-2xl p-4 md:p-6 shadow-sm space-y-4 relative overflow-hidden">
            {/* Highlight Accent Bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red" />
            {/* Content Header & Data */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pl-2">
              {/* Identity */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-high border border-blue-border flex items-center justify-center font-geist text-sm font-bold text-text">
                  JD
                </div>
                <div>
                  <h3 className="font-geist text-lg md:text-xl font-bold text-text">
                    James Doe
                  </h3>
                  <p className="text-xs md:text-sm text-subtext">
                    ID: 8849-DRRT
                  </p>
                </div>
              </div>
              {/* Metrics & Recommendation */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                <div>
                  <span className="block font-geist text-xs text-subtext">
                    Attendance
                  </span>
                  <span className="text-base text-text font-bold flex items-center gap-1">
                    64%
                    <span className="material-symbols-outlined text-[16px]! text-red">
                      trending_down
                    </span>
                  </span>
                </div>
                <div>
                  <span className="block font-geist text-xs text-subtext">
                    Bylaw Recommendation
                  </span>
                  <span className="inline-flex items-center gap-1 bg-red-bg text-red font-geist text-xs font-bold px-2.5 py-1 rounded-full mt-0.5 border border-red-border">
                    <span className="material-symbols-outlined text-[14px]!">
                      gavel
                    </span>
                    <span>Issue Warning</span>
                  </span>
                </div>
              </div>
            </div>
            {/* Actions Divider & Footer Controls */}
            <div className="pt-2 border-t border-blue-border/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pl-2">
              <div className="flex items-center gap-1 text-subtext font-geist text-xs">
                <span className="material-symbols-outlined text-[14px]!">
                  schedule
                </span>
                <span>Audit: 10:42 AM, Oct 24</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button className="font-geist text-sm px-3 py-2 rounded-xl border border-red text-red hover:bg-red hover:text-white font-semibold transition-all active:scale-95 cursor-pointer">
                  Approve Inactive Status
                </button>
                <button className="font-geist text-sm px-3 py-2 rounded-xl border border-blue text-text hover:bg-blue/10 font-semibold transition-all active:scale-95 cursor-pointer">
                  Issue Waiver
                </button>
                <button className="font-geist text-sm px-4 py-2 rounded-xl bg-blue text-white hover:bg-blue/90 font-semibold transition-all shadow-sm active:scale-95 cursor-pointer">
                  Override / Retain
                </button>
              </div>
            </div>
          </article>

          {/* Card 2: Probationary Case */}
          <article className="bg-white border border-blue-border/80 rounded-2xl p-4 md:p-6 shadow-sm space-y-4 relative overflow-hidden">
            {/* Highlight Accent Bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue" />
            {/* Content Header & Data */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pl-2">
              {/* Identity */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-high border border-blue-border flex items-center justify-center font-geist text-sm font-bold text-text">
                  AS
                </div>
                <div>
                  <h3 className="font-geist text-lg md:text-xl font-bold text-text">
                    Alicia Smith
                  </h3>
                  <p className="text-xs md:text-sm text-subtext">
                    ID: 7122-DRRT
                  </p>
                </div>
              </div>
              {/* Metrics & Recommendation */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                <div>
                  <span className="block font-geist text-xs text-subtext">
                    Attendance
                  </span>
                  <span className="text-base text-text font-bold flex items-center gap-1">
                    78%
                    <span className="material-symbols-outlined text-[16px]! text-blue">
                      warning
                    </span>
                  </span>
                </div>
                <div>
                  <span className="block font-geist text-xs text-subtext">
                    Bylaw Recommendation
                  </span>
                  <span className="inline-flex items-center gap-1 border border-blue text-blue font-geist text-xs font-bold px-2.5 py-1 rounded-full mt-0.5 bg-blue-bg/40">
                    <span className="material-symbols-outlined text-[14px]!">
                      flag
                    </span>
                    <span>Probationary Monitoring</span>
                  </span>
                </div>
              </div>
            </div>
            {/* Actions Divider & Footer Controls */}
            <div className="pt-2 border-t border-blue-border/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pl-2">
              <div className="flex items-center gap-1 text-subtext font-geist text-xs">
                <span className="material-symbols-outlined text-[14px]!">
                  schedule
                </span>
                <span>Audit: 09:15 AM, Oct 24</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button className="font-geist text-sm px-3 py-2 rounded-xl border border-red text-red hover:bg-red hover:text-white font-semibold transition-all active:scale-95 cursor-pointer">
                  Approve Inactive Status
                </button>
                <button className="font-geist text-sm px-3 py-2 rounded-xl border border-blue text-text hover:bg-blue/10 font-semibold transition-all active:scale-95 cursor-pointer">
                  Issue Waiver
                </button>
                <button className="font-geist text-sm px-4 py-2 rounded-xl bg-blue text-white hover:bg-blue/90 font-semibold transition-all shadow-sm active:scale-95 cursor-pointer">
                  Override / Retain
                </button>
              </div>
            </div>
          </article>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
