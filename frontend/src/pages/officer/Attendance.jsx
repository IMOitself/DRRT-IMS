import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import WIP from "../../components/WIP";
import { useState, useEffect } from "react";
import api from "../../api/axios";
import { formatDate } from "../../utils/format";

export default function Attendance() {

  const [events, setEvents] = useState([]);
  const [openAttendanceId, setOpenAttendanceId] = useState(null);

  useEffect(() => {

    api
      .get("/events")
      .then((res) => {
        setEvents(res.data.reverse());
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
            {events.map((event) => (
              <article
                key={event.id}
                className="bg-white border border-blue-border/80 rounded-2xl shadow-sm overflow-hidden card-hover transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div
                  className="flex-5 p-6 md:p-8 flex flex-col justify-between space-y-2"
                  onClick={() =>
                    setOpenAttendanceId(
                      openAttendanceId === event.id ? null : event.id
                    )
                  }
                >
                  {/* venue online */}
                  {event.venue_online && (
                    <div className="flex flex-row items-center justify-between gap-2">
                      <div className="flex justify-center items-center gap-2 text-blue">
                        <span className="material-symbols-outlined text-[18px] filled-icon">
                          videocam
                        </span>
                        <span className="font-geist text-sm font-bold uppercase tracking-wider">
                          {event.venue_online}
                        </span>
                      </div>
                      <span className="font-geist text-md font-semibold text-subtext bg-surface-container-high px-2.5 py-1 rounded-full w-fit">
                        Online
                      </span>
                    </div>
                  )}

                  {/* venue face to face */}
                  {event.venue_facetoface && (
                    <div className="flex flex-row items-center justify-between gap-2">
                      <div className="flex justify-center items-center gap-2 text-blue">
                        <span className="material-symbols-outlined text-[18px] filled-icon">
                          location_on
                        </span>
                        <span className="font-geist text-sm font-bold uppercase tracking-wider">
                          {event.venue_facetoface}
                        </span>
                      </div>
                      <span className="font-geist text-md font-semibold text-subtext bg-surface-container-high px-2.5 py-1 rounded-full w-fit">
                        Face to Face
                      </span>
                    </div>
                  )}

                  <h3 className="font-geist text-xl md:text-2xl font-bold text-text">
                    {event.title}
                  </h3>
                  <div className="bg-surface-container-low p-4 rounded-xl border border-blue-border/50">
                    <h4 className="font-geist text-xs font-bold text-text uppercase tracking-wider mb-1">
                      Description
                    </h4>
                    <p className="text-sm text-subtext leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                  <div className="flex justify-between flex-wrap px-0 md:px-2 gap-4 mt-4 text-subtext text-sm md:text-md font-semibold">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-blue text-[18px]!">
                        event
                      </span>
                      <span className="capitalize">{event.type}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-blue text-[18px]!">
                        calendar_today
                      </span>
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-blue text-[18px]!">
                        people
                      </span>
                      <span>{event.participants}</span>
                    </div>
                  </div>
                </div>
                {openAttendanceId === event.id && (
                  <div className="px-6 pb-6 md:px-8 md:pb-8 border-t border-blue-border/40 pt-6">
                    <AttendanceList />
                  </div>
                )}
              </article>
            ))}
          </section>
        </main>
      </div>

      {/* Sticky Sync Action Bar */}
      <div className="fixed bottom-16 md:bottom-0 left-0 w-full bg-white border-t border-blue-border shadow-[0_-4px_12px_rgba(0,0,0,0.08)] z-40 p-3 md:p-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-text">
            <span className="material-symbols-outlined text-blue text-[20px]!">
              border_color
            </span>
            <span className="font-geist text-sm font-medium">
              Unsaved Changes: 4 Attendances Updated
            </span>
          </div>
          <div className="flex w-full sm:w-auto gap-3">
            <button className="flex-1 sm:flex-none px-6 py-2 rounded-lg bg-surface text-text border border-blue-border font-geist text-sm font-semibold hover:bg-surface-container-low transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]!">
                history
              </span>{" "}
              Reset
            </button>
            <button className="flex-1 sm:flex-none px-6 py-2 rounded-lg bg-blue text-white font-geist text-sm font-semibold hover:bg-blue/90 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]!">
                save
              </span>{" "}
              Save
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
        <div className="flex gap-2 overflow-x-auto pb-1 text-xs font-semibold">
          <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-blue text-white font-geist shrink-0 hover:bg-blue/80 cursor-pointer">
            All Members (142)
          </button>
          <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-blue-border text-text font-geist hover:bg-blue/80 hover:text-white transition-colors shrink-0 cursor-pointer">
            1st Year
          </button>
          <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-blue-border text-text font-geist hover:bg-blue/80 hover:text-white transition-colors shrink-0 cursor-pointer">
            2nd Year
          </button>
          <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-blue-border text-text font-geist hover:bg-blue/80 hover:text-white transition-colors shrink-0 cursor-pointer">
            3rd Year
          </button>
          <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-blue-border text-text font-geist hover:bg-blue/80 hover:text-white transition-colors shrink-0 cursor-pointer">
            4th Year
          </button>
          <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-blue-border text-text font-geist hover:bg-blue/80 hover:text-white transition-colors shrink-0 cursor-pointer">
            Unchecked Only (58)
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <button className="flex-1 bg-white border border-green-border text-green hover:bg-green-bg transition-colors py-2 px-4 rounded-lg font-geist text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer">
          <span className="material-symbols-outlined text-[18px]!">
            done_all
          </span>{" "}
          Mark All Present
        </button>
        <button className="flex-1 bg-white border border-red-border text-red hover:bg-red-bg transition-colors py-2 px-4 rounded-lg font-geist text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer">
          <span className="material-symbols-outlined text-[18px]!">rule</span>{" "}
          Mark All Absent
        </button>
      </div>

      <section className="flex gap-2">
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
