import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import WIP from "../../components/WIP";

export default function Attendance() {
  return (
    <>
      <title>Attendance - DRRT Officer Portal</title>

      <Header />
      <WIP />

      {/* Main Content Canvas */}
      <main className="grow pb-52 md:pb-36">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 space-y-6">
          {/* Active Session Context Header */}
          <section className="bg-white border border-blue-border p-4 md:p-6 rounded-xl shadow-sm space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-geist text-xs text-blue uppercase tracking-wider font-bold">
                  Attendance Session Active
                </p>
                <h2 className="font-geist text-2xl md:text-3xl font-bold text-text mt-1">
                  Earthquake Drill 2026
                </h2>
                <p className="text-xs md:text-sm text-subtext mt-1">
                  October 24, 2026 • 8:00 AM
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 bg-blue/10 text-blue px-2.5 py-1 rounded font-geist text-xs uppercase font-semibold">
                <span className="w-2 h-2 rounded-full bg-blue animate-pulse" />{" "}
                Live
              </span>
            </div>
            <div className="flex items-center gap-2 text-subtext border-t border-blue-border pt-3 mt-3">
              <span className="material-symbols-outlined text-[18px]!">
                location_on
              </span>
              <p className="text-sm font-medium">
                LVCC Main Campus
              </p>
            </div>
          </section>

          {/* Live Attendance Summary */}
          <div className="bg-surface-container-low border border-blue-border rounded-lg p-3 flex flex-wrap gap-x-4 gap-y-2 justify-between items-center text-sm shadow-sm">
            <div className="font-geist text-sm text-text font-semibold">
              Checked In: <span className="text-blue font-bold">112 / 142</span>
            </div>
            <div className="flex gap-4 text-xs font-geist">
              <div className="flex items-center gap-1.5 text-green font-medium">
                <span className="w-2 h-2 rounded-full bg-green" /> Present: 102
              </div>
              <div className="flex items-center gap-1.5 text-yellow font-medium">
                <span className="w-2 h-2 rounded-full bg-yellow" /> Late: 10
              </div>
              <div className="flex items-center gap-1.5 text-red font-medium">
                <span className="w-2 h-2 rounded-full bg-red" /> Absent: 30
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="space-y-3">
            {/* Search Bar */}
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-subtext text-[20px]!">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 border border-blue-border rounded-lg bg-white focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue text-sm transition-colors"
                placeholder="Search by name, ID, or squad..."
                type="text"
              />
            </div>

            {/* Rapid Level Filters */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-text text-white font-geist text-xs shrink-0 cursor-pointer">
                All Members (142)
              </button>
              <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-blue-border text-text font-geist text-xs hover:bg-blue-bg transition-colors shrink-0 cursor-pointer">
                1st Year
              </button>
              <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-blue-border text-text font-geist text-xs hover:bg-blue-bg transition-colors shrink-0 cursor-pointer">
                2nd Year
              </button>
              <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-blue-border text-text font-geist text-xs hover:bg-blue-bg transition-colors shrink-0 cursor-pointer">
                3rd Year
              </button>
              <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-blue-border text-text font-geist text-xs hover:bg-blue-bg transition-colors shrink-0 cursor-pointer">
                4th Year
              </button>
              <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-blue-border text-text font-geist text-xs hover:bg-blue-bg transition-colors shrink-0 cursor-pointer">
                Unchecked Only (58)
              </button>
            </div>
          </div>

          {/* Bulk Action Trigger Bar */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="flex-1 bg-green-bg text-green border border-green-border hover:bg-green/20 transition-colors py-2 px-4 rounded-lg font-geist text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]!">
                done_all
              </span>{" "}
              Mark Filtered Present
            </button>
            <button className="flex-1 bg-white border border-red-border text-red hover:bg-red-bg transition-colors py-2 px-4 rounded-lg font-geist text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]!">rule</span>{" "}
              Mark Remaining Absent
            </button>
          </div>

          {/* Roster Grid with A-Z Jump Rail */}
          <section className="flex gap-2 pr-4 md:pr-8" id="manual-view">
            <div className="flex-1 space-y-2">
              {/* Member Item 1 (Present) */}
              <div className="bg-white border border-blue-border rounded-lg p-2.5 flex items-center justify-between shadow-sm hover:border-blue transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-full bg-blue-bg flex items-center justify-center font-bold text-blue shrink-0 font-geist">
                    SM
                  </div>
                  <div className="min-w-0">
                    <p className="font-geist text-sm font-bold text-text truncate">
                      Santos, Maria Clara
                    </p>
                    <p className="text-xs text-subtext truncate">
                      ID: 2024-0192 • BSIT - 3rd Year
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button className="min-w-10 px-2 h-9 rounded bg-green-bg border border-green-border text-green text-xs font-bold flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[14px]!">
                      check
                    </span>{" "}
                    <span className="hidden sm:inline">Present</span>
                  </button>
                  <button className="w-9 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-high transition-colors text-xs font-bold cursor-pointer">
                    L
                  </button>
                  <button className="w-9 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-high transition-colors text-xs font-bold cursor-pointer">
                    A
                  </button>
                </div>
              </div>

              {/* Member Item 2 (Late) */}
              <div className="bg-white border border-blue-border rounded-lg p-2.5 flex items-center justify-between shadow-sm hover:border-blue transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-full bg-blue-bg flex items-center justify-center font-bold text-blue shrink-0 font-geist">
                    DL
                  </div>
                  <div className="min-w-0">
                    <p className="font-geist text-sm font-bold text-text truncate">
                      De Leon, Juan
                    </p>
                    <p className="text-xs text-subtext truncate">
                      ID: 2025-0441 • BSCS - 2nd Year
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button className="w-9 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-high transition-colors text-xs font-bold cursor-pointer">
                    P
                  </button>
                  <button className="min-w-10 px-2 h-9 rounded bg-yellow-bg border border-yellow-border text-yellow text-xs font-bold flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[14px]!">
                      schedule
                    </span>{" "}
                    <span className="hidden sm:inline">Late</span>
                  </button>
                  <button className="w-9 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-high transition-colors text-xs font-bold cursor-pointer">
                    A
                  </button>
                </div>
              </div>

              {/* Member Item 3 (Absent) */}
              <div className="bg-white border border-blue-border rounded-lg p-2.5 flex items-center justify-between shadow-sm hover:border-blue transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-full bg-blue-bg flex items-center justify-center font-bold text-blue shrink-0 font-geist">
                    MJ
                  </div>
                  <div className="min-w-0">
                    <p className="font-geist text-sm font-bold text-text truncate">
                      Mendoza, Jose
                    </p>
                    <p className="text-xs text-subtext truncate">
                      ID: 2026-0082 • BSEMC - 1st Year
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button className="w-9 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-high transition-colors text-xs font-bold cursor-pointer">
                    P
                  </button>
                  <button className="w-9 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-high transition-colors text-xs font-bold cursor-pointer">
                    L
                  </button>
                  <button className="min-w-10 px-2 h-9 rounded bg-red-bg border border-red-border text-red text-xs font-bold flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-[14px]!">
                      close
                    </span>{" "}
                    <span className="hidden sm:inline">Absent</span>
                  </button>
                </div>
              </div>

              {/* Member Item 4 (Unchecked) */}
              <div className="bg-white border border-blue-border rounded-lg p-2.5 flex items-center justify-between shadow-sm hover:border-blue transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-full bg-blue-bg flex items-center justify-center font-bold text-blue shrink-0 font-geist">
                    AA
                  </div>
                  <div className="min-w-0">
                    <p className="font-geist text-sm font-bold text-text truncate">
                      Aquino, Andrea
                    </p>
                    <p className="text-xs text-subtext truncate">
                      ID: 2023-0115 • BSIT - 4th Year
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button className="w-9 h-9 rounded bg-surface-container-highest hover:bg-green-bg hover:text-green text-subtext transition-colors text-xs font-bold cursor-pointer">
                    P
                  </button>
                  <button className="w-9 h-9 rounded bg-surface-container-highest hover:bg-yellow-bg hover:text-yellow text-subtext transition-colors text-xs font-bold cursor-pointer">
                    L
                  </button>
                  <button className="w-9 h-9 rounded bg-surface-container-highest hover:bg-red-bg hover:text-red text-subtext transition-colors text-xs font-bold cursor-pointer">
                    A
                  </button>
                </div>
              </div>
            </div>

            {/* A-Z Jump Rail */}
            <div className="fixed right-1 md:right-4 top-[32%] flex flex-col gap-0.5 text-[10px] md:text-xs font-bold text-subtext py-2 px-1 bg-surface-container-highest rounded-full h-fit z-30 shadow-sm border border-blue-border">
              <span className="cursor-pointer hover:text-blue hover:scale-125 transition-transform text-center w-4 h-4 flex items-center justify-center rounded-full hover:bg-white">
                A
              </span>
              <span className="cursor-pointer hover:text-blue hover:scale-125 transition-transform text-center w-4 h-4 flex items-center justify-center rounded-full hover:bg-white">
                B
              </span>
              <span className="cursor-pointer hover:text-blue hover:scale-125 transition-transform text-center w-4 h-4 flex items-center justify-center rounded-full hover:bg-white">
                C
              </span>
              <span className="cursor-pointer hover:text-blue hover:scale-125 transition-transform text-center w-4 h-4 flex items-center justify-center rounded-full hover:bg-white">
                D
              </span>
              <span className="text-center text-subtext scale-75 opacity-50 w-4 h-4">
                •
              </span>
              <span className="cursor-pointer hover:text-blue hover:scale-125 transition-transform text-center w-4 h-4 flex items-center justify-center rounded-full hover:bg-white">
                M
              </span>
              <span className="cursor-pointer hover:text-blue hover:scale-125 transition-transform text-center w-4 h-4 flex items-center justify-center rounded-full bg-blue text-white shadow-sm">
                S
              </span>
              <span className="text-center text-subtext scale-75 opacity-50 w-4 h-4">
                •
              </span>
              <span className="cursor-pointer hover:text-blue hover:scale-125 transition-transform text-center w-4 h-4 flex items-center justify-center rounded-full hover:bg-white">
                X
              </span>
              <span className="cursor-pointer hover:text-blue hover:scale-125 transition-transform text-center w-4 h-4 flex items-center justify-center rounded-full hover:bg-white">
                Y
              </span>
              <span className="cursor-pointer hover:text-blue hover:scale-125 transition-transform text-center w-4 h-4 flex items-center justify-center rounded-full hover:bg-white">
                Z
              </span>
            </div>
          </section>
        </div>
      </main>

      {/* Sticky Sync Action Bar */}
      <div className="fixed bottom-16 md:bottom-0 left-0 w-full bg-white border-t border-blue-border shadow-[0_-4px_12px_rgba(0,0,0,0.08)] z-40 p-3 md:p-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-text">
            <span className="material-symbols-outlined text-blue text-[20px]!">
              sync_saved_locally
            </span>
            <span className="font-geist text-sm font-medium">
              Unsaved Changes: 4 Members Updated
            </span>
          </div>
          <div className="flex w-full sm:w-auto gap-3">
            <button className="flex-1 sm:flex-none px-5 py-2 rounded-lg bg-surface border border-blue-border text-text font-geist text-sm hover:bg-surface-container-low transition-colors cursor-pointer">
              Reset Filters
            </button>
            <button className="flex-1 sm:flex-none px-6 py-2 rounded-lg bg-blue text-white font-geist text-sm font-semibold hover:bg-blue/90 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]!">
                cloud_sync
              </span>{" "}
              Save &amp; Sync
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </>
  );
}
