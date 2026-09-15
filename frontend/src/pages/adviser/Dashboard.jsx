import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import WIP from "../../components/WIP";

export default function Dashboard() {
  return (
    <>
      <title>Adviser Portal - Executive Dashboard</title>

      <Header />
      <WIP />

      {/* Main Content Canvas */}
      <main className="grow max-w-7xl w-full mx-auto px-4 md:px-8 py-6 pb-28 md:pb-12 space-y-6">
        {/* Page Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-blue-border/60 pb-4">
          <div>
            <h2 className="font-geist text-2xl md:text-3xl font-bold text-text">
              Executive Summary &amp; Governance Hub
            </h2>
            <p className="text-sm md:text-base text-subtext mt-1 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]! text-executive-gold">
                verified_user
              </span>
              <span>Chapter Adviser Oversight | LVCC Apalit Chapter</span>
            </p>
          </div>
          {/* Controls / Action Button */}
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-executive-gold text-slate-950 hover:bg-executive-gold-dark font-geist text-sm font-semibold transition-all shadow-sm active:scale-95 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]!">
                download
              </span>
              <span>Export Audit Report</span>
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
          aria-label="Executive Key Performance Indicators"
        >
          {/* Card 1: Active Roster */}
          <div className="bg-white border border-blue-border rounded-xl p-4 md:p-6 flex flex-col justify-between card-hover shadow-sm relative overflow-hidden">
            <div className="flex items-start justify-between mb-2">
              <span className="font-geist text-xs text-subtext uppercase tracking-wider font-semibold">
                Active Roster
              </span>
              <span className="material-symbols-outlined text-subtext text-[22px]!">
                groups
              </span>
            </div>
            <div>
              <div className="font-geist text-3xl font-bold text-text">
                142
              </div>
              <p className="text-xs text-subtext mt-1">
                Total Verified Members
              </p>
            </div>
          </div>

          {/* Card 2: Bylaws Compliance */}
          <div className="bg-white border border-blue-border rounded-xl p-4 md:p-6 flex flex-col justify-between card-hover shadow-sm relative overflow-hidden">
            <div className="flex items-start justify-between mb-2">
              <span className="font-geist text-xs text-subtext uppercase tracking-wider font-semibold">
                Bylaws Compliance
              </span>
              <span className="material-symbols-outlined text-executive-gold text-[22px]!">
                policy
              </span>
            </div>
            <div>
              <div className="font-geist text-3xl text-executive-gold font-bold">
                88.4%
              </div>
              <p className="text-xs text-subtext mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]! text-executive-gold">
                  trending_up
                </span>
                <span>Above baseline</span>
              </p>
            </div>
          </div>

          {/* Card 3: Critical Incidents */}
          <div className="bg-white border border-blue-border rounded-xl p-4 md:p-6 flex flex-col justify-between border-t-4 border-t-executive-gold card-hover shadow-sm relative overflow-hidden">
            <div className="flex items-start justify-between mb-2">
              <span className="font-geist text-xs text-subtext uppercase tracking-wider font-semibold flex items-center gap-1">
                Critical Incidents
                <span
                  className="material-symbols-outlined text-[14px]! text-executive-gold"
                  title="Security Clearance Required"
                >
                  lock
                </span>
              </span>
              <span className="material-symbols-outlined text-red text-[22px]!">
                warning
              </span>
            </div>
            <div>
              <div className="font-geist text-3xl font-bold text-text flex items-baseline gap-2">
                2{" "}
                <span className="text-subtext text-xs font-normal">
                  / 18 YTD
                </span>
              </div>
              <p className="text-xs text-subtext mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]! text-executive-gold">
                  check_circle
                </span>
                <span>All Resolved</span>
              </p>
            </div>
          </div>

          {/* Card 4: Pending Approvals */}
          <div className="bg-white border border-blue-border rounded-xl p-4 md:p-6 flex flex-col justify-between border-t-4 border-t-executive-gold card-hover shadow-sm relative overflow-hidden">
            <div className="flex items-start justify-between mb-2">
              <span className="font-geist text-xs text-subtext uppercase tracking-wider font-semibold flex items-center gap-1">
                Pending Approvals
                <span
                  className="material-symbols-outlined text-[14px]! text-executive-gold"
                  title="Security Clearance Required"
                >
                  lock
                </span>
              </span>
              <span className="material-symbols-outlined text-executive-gold text-[22px]!">
                pending_actions
              </span>
            </div>
            <div>
              <div className="font-geist text-3xl text-executive-gold font-bold">
                3
              </div>
              <p className="text-xs text-subtext mt-1">
                Awaiting Advisor Signature
              </p>
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Chart 1: Participation */}
          <div className="bg-white border border-blue-border rounded-xl p-4 md:p-6 card-hover shadow-sm flex flex-col">
            <h3 className="font-geist text-lg md:text-xl font-bold text-text mb-6">
              Member Participation vs. Bylaw Standard
            </h3>
            <div className="flex-1 relative min-h-55 flex items-end gap-4 justify-between border-b border-l border-blue-border pb-2 pl-2 mt-4">
              {/* Target Line */}
              <div className="absolute w-full h-px border-t-2 border-dashed border-red top-[20%] left-0 z-10">
                <span className="absolute -top-6 left-1 font-geist text-xs text-red font-bold">
                  80% Min Benchmark
                </span>
              </div>
              {/* Bars */}
              <div className="flex flex-col items-center w-full group relative z-20">
                <div className="w-8 md:w-12 h-[75%] bg-executive-gold/80 rounded-t-lg group-hover:bg-executive-gold transition-colors" />
                <span className="font-geist text-xs text-subtext mt-2">
                  Q1
                </span>
              </div>
              <div className="flex flex-col items-center w-full group relative z-20">
                <div className="w-8 md:w-12 h-[82%] bg-executive-gold/80 rounded-t-lg group-hover:bg-executive-gold transition-colors" />
                <span className="font-geist text-xs text-subtext mt-2">
                  Q2
                </span>
              </div>
              <div className="flex flex-col items-center w-full group relative z-20">
                <div className="w-8 md:w-12 h-[90%] bg-executive-gold rounded-t-lg group-hover:bg-executive-gold-dark transition-colors" />
                <span className="font-geist text-xs text-subtext mt-2">
                  Q3
                </span>
              </div>
              <div className="flex flex-col items-center w-full group relative z-20">
                <div className="w-8 md:w-12 h-[85%] bg-executive-gold/80 rounded-t-lg group-hover:bg-executive-gold transition-colors" />
                <span className="font-geist text-xs text-subtext mt-2">
                  Q4
                </span>
              </div>
            </div>
          </div>

          {/* Chart 2: Incident Breakdown */}
          <div className="bg-white border border-blue-border rounded-xl p-4 md:p-6 card-hover shadow-sm flex flex-col justify-between">
            <h3 className="font-geist text-lg md:text-xl font-bold text-text mb-6">
              Campus Incident Breakdown
            </h3>
            <div className="flex-1 flex flex-col justify-center gap-4">
              <div className="flex items-center gap-4">
                <span className="font-geist text-xs text-subtext w-16 text-right">
                  Minor
                </span>
                <div className="flex-1 h-5 bg-surface-container-high rounded-full overflow-hidden flex">
                  <div className="h-full bg-subtext w-[60%] rounded-full" />
                </div>
                <span className="font-geist text-xs font-bold w-8 text-text">
                  12
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-geist text-xs text-subtext w-16 text-right">
                  Moderate
                </span>
                <div className="flex-1 h-5 bg-surface-container-high rounded-full overflow-hidden flex">
                  <div className="h-full bg-executive-gold w-[20%] rounded-full" />
                </div>
                <span className="font-geist text-xs font-bold w-8 text-text">
                  4
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-geist text-xs text-subtext w-16 text-right">
                  Critical
                </span>
                <div className="flex-1 h-5 bg-surface-container-high rounded-full overflow-hidden flex">
                  <div className="h-full bg-red w-[10%] rounded-full" />
                </div>
                <span className="font-geist text-xs font-bold w-8 text-text">
                  2
                </span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-blue-border/40 flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-1.5 font-geist text-xs text-subtext">
                <span className="w-3 h-3 bg-subtext rounded-full" /> Minor Policy
              </div>
              <div className="flex items-center gap-1.5 font-geist text-xs text-subtext">
                <span className="w-3 h-3 bg-executive-gold rounded-full" />{" "}
                Escalated
              </div>
              <div className="flex items-center gap-1.5 font-geist text-xs text-subtext">
                <span className="w-3 h-3 bg-red rounded-full" /> Board Review
              </div>
            </div>
          </div>
        </section>

        {/* Governance Panels Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Panel 1: Sanctions */}
          <div className="bg-white border border-blue-border rounded-xl overflow-hidden card-hover shadow-sm flex flex-col">
            <div className="p-4 md:p-6 border-b border-blue-border/60 flex justify-between items-center bg-surface-container-low/50">
              <h3 className="font-geist text-lg md:text-xl font-bold text-text flex items-center gap-2">
                <span className="material-symbols-outlined text-executive-gold">
                  gavel
                </span>
                <span>Flagged Member Sanctions</span>
              </h3>
              <span className="bg-red-bg text-red font-geist text-xs px-2.5 py-1 rounded-full font-bold">
                2 Pending
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-blue-border/40 font-geist text-xs text-subtext uppercase tracking-wider bg-surface-container-low/30">
                    <th className="px-4 py-2.5 font-semibold">Member ID</th>
                    <th className="px-4 py-2.5 font-semibold">Violation Type</th>
                    <th className="px-4 py-2.5 font-semibold text-right">
                      Action Required
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-blue-border/30">
                  <tr className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-text">
                      LVCC-992
                    </td>
                    <td className="px-4 py-3 text-subtext">
                      Attendance Deficit
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="font-geist text-sm text-text hover:text-executive-gold font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer">
                        <span>Review</span>
                        <span className="material-symbols-outlined text-[16px]!">
                          arrow_forward
                        </span>
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-text">
                      LVCC-104
                    </td>
                    <td className="px-4 py-3 text-red font-semibold">
                      Code of Conduct
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="font-geist text-sm px-3 py-1.5 rounded-xl border border-executive-gold text-text hover:bg-executive-gold/10 font-semibold transition-all inline-flex items-center gap-1 cursor-pointer">
                        <span className="material-symbols-outlined text-[14px]!">
                          lock
                        </span>
                        <span>Authorize Sanction</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Panel 2: Incident Logs */}
          <div className="bg-white border border-blue-border rounded-xl overflow-hidden card-hover shadow-sm flex flex-col">
            <div className="p-4 md:p-6 border-b border-blue-border/60 flex justify-between items-center bg-surface-container-low/50">
              <h3 className="font-geist text-lg md:text-xl font-bold text-text flex items-center gap-2">
                <span className="material-symbols-outlined text-executive-gold">
                  history_edu
                </span>
                <span>Unsigned Incident Logs</span>
              </h3>
              <span className="bg-executive-gold-light text-text font-geist text-xs px-2.5 py-1 rounded-full font-bold">
                2 Action Required
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-blue-border/40 font-geist text-xs text-subtext uppercase tracking-wider bg-surface-container-low/30">
                    <th className="px-4 py-2.5 font-semibold">Log Ref</th>
                    <th className="px-4 py-2.5 font-semibold">Date</th>
                    <th className="px-4 py-2.5 font-semibold text-right">
                      Signature
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-blue-border/30">
                  <tr className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="px-4 py-3 font-mono text-subtext">
                      INC-2023-08A
                    </td>
                    <td className="px-4 py-3 text-text">Oct 12, 2023</td>
                    <td className="px-4 py-3 text-right">
                      <button className="font-geist text-sm px-4 py-1.5 rounded-xl bg-executive-gold text-slate-950 hover:bg-executive-gold-dark font-semibold transition-all shadow-sm cursor-pointer">
                        Sign Off
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="px-4 py-3 font-mono text-subtext">
                      INC-2023-09B
                    </td>
                    <td className="px-4 py-3 text-text">Oct 14, 2023</td>
                    <td className="px-4 py-3 text-right">
                      <button className="font-geist text-sm px-4 py-1.5 rounded-xl bg-executive-gold text-slate-950 hover:bg-executive-gold-dark font-semibold transition-all shadow-sm cursor-pointer">
                        Sign Off
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  );
}