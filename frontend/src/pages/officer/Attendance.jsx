import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import WIP from "../../components/WIP";
import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function Attendance() {

  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {

    api
      .get("/events")
      .then((res) => {
        const events = res.data;

        // date format: "Jan 1, 2027"
        const current_date = new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        if (events[0]) {
          if (events[0].date?.includes(current_date) || events[0].event_date == current_date) {
            events[0].is_happening_now = true;
          }
          setSelectedEvent(events[0]);
        }
      })
      .catch((err) => {
        console.error(err);
      });

  }, []);

  return (
    <>
      <title>Attendance - DRRT Officer Portal</title>

      <Header />


      <div className="grow w-full">
        {/* Main Container */}
        <main className="max-w-5xl mx-auto w-full px-4 md:px-8 py-6 mb-40 space-y-6 md:space-y-8">
          {/* Page Header & Search Card */}
          <section className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="font-geist text-2xl md:text-3xl font-bold text-text mt-1">
                  Attendance
                </h1>
                <p className="text-sm text-subtext mt-1.5">
                  Track and manage attendance for all members across all events.
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
                Online
              </button>
              <button className="shrink-0 bg-surface text-subtext border border-blue-border/80 font-geist text-sm px-4 py-2 rounded-full hover:bg-surface-container-low transition-colors font-semibold">
                Face-to-Face
              </button>
            </div>
          </section>
          {/* Event Cards Container */}
          <section className="space-y-6 md:space-y-8">
            <article className="bg-white border border-blue-border/80 rounded-2xl shadow-sm overflow-hidden card-hover transition-all duration-300 flex flex-col md:flex-row">
              {/* Event Details */}
              <div className="flex-5 p-6 md:p-8 flex flex-col justify-between space-y-5">
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
              </div>
            </article>
          </section>
        </main>
      </div>

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

function AttendanceList() {
  return (
    <div className="space-y-6">

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

      <div className="flex flex-col sm:flex-row gap-2">
        <button className="flex-1 bg-green-bg text-green border border-green-border hover:bg-green/20 transition-colors py-2 px-4 rounded-lg font-geist text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer">
          <span className="material-symbols-outlined text-[18px]!">
            done_all
          </span>{" "}
          Mark All Filtered Present
        </button>
        <button className="flex-1 bg-white border border-red-border text-red hover:bg-red-bg transition-colors py-2 px-4 rounded-lg font-geist text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer">
          <span className="material-symbols-outlined text-[18px]!">rule</span>{" "}
          Mark All Filtered Absent
        </button>
      </div>

      <section className="flex gap-2 pr-4 md:pr-8" id="manual-view">
        <div className="flex-1 space-y-2">
          <div className="bg-white border border-blue-border rounded-lg p-2.5 flex items-center justify-between shadow-sm hover:border-blue transition-colors">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-blue-bg flex items-center justify-center font-bold text-blue shrink-0 font-geist">
                SM
              </div>
              <div className="min-w-0">
                <p className="font-geist text-md text-text truncate">
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

          <div className="bg-white border border-blue-border rounded-lg p-2.5 flex items-center justify-between shadow-sm hover:border-blue transition-colors">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-blue-bg flex items-center justify-center font-bold text-blue shrink-0 font-geist">
                DL
              </div>
              <div className="min-w-0">
                <p className="font-geist text-md text-text truncate">
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

          <div className="bg-white border border-blue-border rounded-lg p-2.5 flex items-center justify-between shadow-sm hover:border-blue transition-colors">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-blue-bg flex items-center justify-center font-bold text-blue shrink-0 font-geist">
                MJ
              </div>
              <div className="min-w-0">
                <p className="font-geist text-md text-text truncate">
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

          <div className="bg-white border border-blue-border rounded-lg p-2.5 flex items-center justify-between shadow-sm hover:border-blue transition-colors">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-blue-bg flex items-center justify-center font-bold text-blue shrink-0 font-geist">
                AA
              </div>
              <div className="min-w-0">
                <p className="font-geist text-md text-text truncate">
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
      </section>
    </div>
  )

}
