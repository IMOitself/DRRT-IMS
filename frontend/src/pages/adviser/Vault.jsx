import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import WIP from "../../components/WIP";

export default function Vault() {
  return (
    <>
      <title>Vault - DRRT Adviser Portal</title>

      <Header />
      <WIP />

      <div className="grow w-full">
        {/* Main Canvas */}
        <main className="max-w-5xl mx-auto w-full px-4 md:px-8 py-6 pb-28 md:pb-12 space-y-6">
          {/* Restricted Access Warning Banner */}
          <div className="bg-red-950/90 text-red-100 border border-red-500/40 px-4 py-3 rounded-xl flex items-center justify-center gap-3 shadow-sm backdrop-blur-sm">
            <span className="material-symbols-outlined text-[22px]! text-red-400 shrink-0 filled-icon">
              lock
            </span>
            <span className="font-geist text-sm tracking-wider uppercase font-bold text-center">
              RESTRICTED ACCESS: DATA PRIVACY ACT OF 2012 (R.A. 10173) AUDIT VAULT
            </span>
          </div>

          {/* Page Header */}
          <header className="border-b border-blue-border/60 pb-4">
            <h2 className="font-geist text-2xl md:text-3xl font-bold text-text">
              Confidential Incident Vault
            </h2>
            <p className="text-sm md:text-base text-subtext mt-1">
              Secure repository for auditing and reviewing high-severity privacy
              incidents. Access is strictly monitored and logged.
            </p>
          </header>

          {/* Filters Panel */}
          <section className="bg-white border border-blue-border/80 rounded-2xl p-4 md:p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              {/* Search Input */}
              <div className="md:col-span-4">
                <label
                  className="block font-geist text-xs font-semibold text-subtext mb-1.5"
                  htmlFor="vault-search"
                >
                  Search ID / Keyword
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-3 text-subtext text-[20px]!">
                    search
                  </span>
                  <input
                    id="vault-search"
                    className="w-full bg-surface border border-blue-border rounded-xl pl-10 pr-4 py-2.5 text-base text-text focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/30 transition-colors"
                    placeholder="e.g. INC-2024-092"
                    type="text"
                  />
                </div>
              </div>

              {/* Date Range Select */}
              <div className="md:col-span-3">
                <label
                  className="block font-geist text-xs font-semibold text-subtext mb-1.5"
                  htmlFor="date-range"
                >
                  Date Range
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-3 text-subtext text-[20px]!">
                    calendar_today
                  </span>
                  <select
                    id="date-range"
                    className="w-full bg-surface border border-blue-border rounded-xl pl-10 pr-10 py-2.5 text-base text-text focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/30 transition-colors appearance-none cursor-pointer"
                  >
                    <option>Last 30 Days</option>
                    <option>Last Quarter</option>
                    <option>Year to Date</option>
                    <option>Custom Range</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-3 text-subtext pointer-events-none text-[20px]!">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Severity Select */}
              <div className="md:col-span-3">
                <label
                  className="block font-geist text-xs font-semibold text-subtext mb-1.5"
                  htmlFor="severity"
                >
                  Severity
                </label>
                <div className="relative">
                  <select
                    id="severity"
                    className="w-full bg-surface border border-blue-border rounded-xl px-4 py-2.5 text-base text-text focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/30 transition-colors appearance-none cursor-pointer pr-10"
                  >
                    <option>All Severities</option>
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-3 text-subtext pointer-events-none text-[20px]!">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Filter Action */}
              <div className="md:col-span-2">
                <button className="w-full py-2.5 px-4 rounded-xl border-2 border-blue text-text hover:bg-blue/10 font-geist text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <span className="material-symbols-outlined text-[20px]!">
                    filter_list
                  </span>
                  <span>Filter</span>
                </button>
              </div>
            </div>
          </section>

          {/* Incident Cards List */}
          <div className="space-y-4">
            {/* Card 1: Critical Severity */}
            <article className="bg-white border border-blue-border/80 rounded-2xl p-4 md:p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red" />
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-geist text-sm font-mono font-bold text-text">
                      INC-2024-092
                    </span>
                    <span className="inline-flex items-center gap-1 bg-red-bg text-red border border-red-border px-2.5 py-0.5 rounded-full font-geist text-xs font-bold">
                      <span className="material-symbols-outlined text-[14px]!">
                        warning
                      </span>{" "}
                      Critical
                    </span>
                  </div>
                  <h3 className="font-geist text-lg md:text-xl font-bold text-text">
                    Unauthorized Data Access - Customer DB
                  </h3>
                  <div className="flex items-center gap-4 text-subtext text-xs md:text-sm flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]! text-subtext">
                        calendar_today
                      </span>{" "}
                      Oct 24, 2024 14:30 EST
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]! text-subtext">
                        person
                      </span>{" "}
                      Reported by: SysAdmin-04
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start md:items-end gap-2.5 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-blue-border/40">
                  <span className="font-geist text-xs text-subtext font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]!">
                      pending_actions
                    </span>{" "}
                    Pending Review
                  </span>
                  <button className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-blue text-white hover:bg-blue/90 font-geist text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95 cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]!">
                      lock
                    </span>
                    <span>Review Confidential File</span>
                  </button>
                </div>
              </div>
            </article>

            {/* Card 2: High Severity */}
            <article className="bg-white border border-blue-border/80 rounded-2xl p-4 md:p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-yellow" />
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-geist text-sm font-mono font-bold text-text">
                      INC-2024-091
                    </span>
                    <span className="inline-flex items-center gap-1 bg-yellow-bg text-yellow border border-yellow-border px-2.5 py-0.5 rounded-full font-geist text-xs font-bold">
                      <span className="material-symbols-outlined text-[14px]!">
                        priority_high
                      </span>{" "}
                      High
                    </span>
                  </div>
                  <h3 className="font-geist text-lg md:text-xl font-bold text-text">
                    Potential API Key Leak
                  </h3>
                  <div className="flex items-center gap-4 text-subtext text-xs md:text-sm flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]! text-subtext">
                        calendar_today
                      </span>{" "}
                      Oct 22, 2024 09:15 EST
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]! text-subtext">
                        person
                      </span>{" "}
                      Reported by: Automated Scanner
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start md:items-end gap-2.5 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-blue-border/40">
                  <span className="font-geist text-xs text-blue font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]!">
                      gavel
                    </span>{" "}
                    Audited
                  </span>
                  <button className="w-full md:w-auto px-5 py-2.5 rounded-xl border-2 border-blue text-text hover:bg-blue/10 font-geist text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]!">
                      lock_open
                    </span>
                    <span>View Audit Record</span>
                  </button>
                </div>
              </div>
            </article>

            {/* Card 3: Low Severity / Resolved */}
            <article className="bg-white border border-blue-border/80 rounded-2xl p-4 md:p-6 shadow-sm relative overflow-hidden opacity-85">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-green" />
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-geist text-sm font-mono font-bold text-text">
                      INC-2024-088
                    </span>
                    <span className="inline-flex items-center gap-1 bg-green-bg text-green border border-green-border px-2.5 py-0.5 rounded-full font-geist text-xs font-bold">
                      <span className="material-symbols-outlined text-[14px]!">
                        info
                      </span>{" "}
                      Low
                    </span>
                  </div>
                  <h3 className="font-geist text-lg md:text-xl font-bold text-text">
                    Phishing Attempt Reported - Internal
                  </h3>
                  <div className="flex items-center gap-4 text-subtext text-xs md:text-sm flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]! text-subtext">
                        calendar_today
                      </span>{" "}
                      Oct 20, 2024 11:05 EST
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]! text-subtext">
                        person
                      </span>{" "}
                      Reported by: HR Dept
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-start md:items-end gap-2.5 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-blue-border/40">
                  <span className="font-geist text-xs text-green font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]!">
                      check_circle
                    </span>{" "}
                    Resolved
                  </span>
                  <button className="w-full md:w-auto px-5 py-2.5 rounded-xl border border-blue-border text-subtext hover:bg-surface-container-low font-geist text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]!">
                      lock_clock
                    </span>
                    <span>Archive File</span>
                  </button>
                </div>
              </div>
            </article>
          </div>
        </main>
      </div>

      <BottomNav />
    </>
  );
}
