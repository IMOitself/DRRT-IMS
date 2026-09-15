import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import WIP from "../../components/WIP";

export default function Approvals() {
  return (
    <>
      <title>Approvals - DRRT Adviser Portal</title>

      <Header />
      <WIP />

      {/* Main Content Canvas */}
      <main className="grow max-w-7xl w-full mx-auto px-4 md:px-8 py-6 pb-28 md:pb-12 space-y-6">
        {/* Page Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-geist text-2xl md:text-3xl text-text font-bold">
              Approvals &amp; Activity
            </h2>
            <p className="text-sm md:text-base text-subtext mt-1">
              2 items require executive authorization &amp; formal review.
            </p>
          </div>
          {/* Controls Bar */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-low border border-executive-gold/30 text-subtext hover:bg-executive-gold/10 font-geist text-sm transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px]!">
                filter_list
              </span>
              <span>Filter</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-low border border-executive-gold/30 text-subtext hover:bg-executive-gold/10 font-geist text-sm transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px]!">sort</span>
              <span>Sort</span>
            </button>
          </div>
        </div>

        {/* Inbox Approval Cards Stack */}
        <div className="space-y-4 max-w-4xl">
          {/* Card 1: Training Authorization */}
          <article className="bg-white border border-blue-border/80 rounded-2xl p-4 md:p-6 shadow-sm space-y-4">
            {/* Header Row */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-subtext font-geist text-xs uppercase tracking-wider font-semibold">
                <span className="material-symbols-outlined text-[18px]! text-executive-gold">
                  verified_user
                </span>
                <span>Training Authorization</span>
              </div>
              <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant font-geist text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]!">
                  schedule
                </span>
                <span>Pending Authorization</span>
              </span>
            </div>

            {/* Main Content Details */}
            <div className="space-y-1">
              <h3 className="font-geist text-lg md:text-xl font-bold text-text">
                Fire &amp; Earthquake Drill Execution
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4 text-xs md:text-sm text-subtext pt-1">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]! text-subtext">
                    person
                  </span>
                  <span>
                    Submitting Officer: <strong>Capt. J. Reynolds</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]! text-subtext">
                    calendar_today
                  </span>
                  <span>
                    Proposed Schedule: <strong>Oct 24, 2026 • 0900 HRS</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Actions Divider & Buttons */}
            <div className="pt-2 border-t border-blue-border/40 flex flex-wrap items-center justify-end gap-2">
              <button className="font-geist text-sm px-4 py-2.5 rounded-xl border border-executive-gold text-text hover:bg-executive-gold/10 font-semibold transition-all active:scale-95 cursor-pointer">
                Request Revision
              </button>
              <button className="font-geist text-sm px-5 py-2.5 rounded-xl bg-executive-gold text-slate-950 hover:bg-executive-gold-dark font-semibold transition-all shadow-sm active:scale-95 cursor-pointer">
                Approve Authorization
              </button>
            </div>
          </article>

          {/* Card 2: Attendance Excuse Appeal */}
          <article className="bg-white border border-blue-border/80 rounded-2xl p-4 md:p-6 shadow-sm space-y-4">
            {/* Header Row */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-subtext font-geist text-xs uppercase tracking-wider font-semibold">
                <span className="material-symbols-outlined text-[18px]! text-executive-gold">
                  gavel
                </span>
                <span>Attendance Appeal</span>
              </div>
              <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant font-geist text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]!">
                  schedule
                </span>
                <span>Pending Authorization</span>
              </span>
            </div>

            {/* Main Content Details */}
            <div className="space-y-1">
              <h3 className="font-geist text-lg md:text-xl font-bold text-text">
                Absence Review: Mandatory Briefing
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4 text-xs md:text-sm text-subtext pt-1">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]! text-subtext">
                    badge
                  </span>
                  <span>
                    Member: <strong>Specialist A. Chen</strong> (ID: 8492)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-text font-semibold">
                  <span className="material-symbols-outlined text-[16px]! text-executive-gold">
                    attachment
                  </span>
                  <a href="#" className="underline hover:text-executive-gold">
                    Medical_Cert_Chen.pdf
                  </a>
                </div>
              </div>
            </div>

            {/* Actions Divider & Buttons */}
            <div className="pt-2 border-t border-blue-border/40 flex flex-wrap items-center justify-end gap-2">
              <button className="font-geist text-sm px-4 py-2.5 rounded-xl border border-blue-border text-subtext hover:bg-surface-container-high font-semibold transition-all active:scale-95 cursor-pointer">
                Deny Appeal
              </button>
              <button className="font-geist text-sm px-5 py-2.5 rounded-xl bg-executive-gold text-slate-950 hover:bg-executive-gold-dark font-semibold transition-all shadow-sm flex items-center gap-1.5 active:scale-95 cursor-pointer">
                <span className="material-symbols-outlined text-[18px]! filled-icon">
                  check
                </span>
                <span>Grant Excuse</span>
              </button>
            </div>
          </article>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
