import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import WIP from "../../components/WIP";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { formatDate, getInitials } from "../../utils/format";

export default function Attendance() {

  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const [attendances, setAttendances] = useState([]);
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

    api
      .get("/attendances", { params: { all: 1 } })
      .then((res) => {
        setAttendances(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    api
      .get("/members")
      .then((res) => {
        setMembers(res.data);
        console.log(res.data);
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
              <Link to="/officer/create-event" className="flex font-geist text-xs md:text-sm bg-blue-bg text-blue border border-blue-border transition-all px-4 py-2 rounded-full font-bold shadow-sm active:scale-95 hover:bg-blue hover:text-white cursor-pointer items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]!">calendar_add_on</span>
                New Event
              </Link>
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
          <section className="space-y-6 md:space-y-8 mb-4">
            {events.map((event) => {
              const eventAttendances = attendances.filter((a) => a.event_id === event.id);
              const countByStatus = (status) => eventAttendances.filter((a) => a.status === status).length;
              return (
              <article
                key={event.id}
                className="bg-white border border-blue-border p-4 rounded-xl shadow-sm space-y-2 card-hover transition-all duration-300"
              >
                <div className="cursor-pointer"
                  onClick={() =>
                    setOpenAttendanceId(
                      openAttendanceId === event.id ? null : event.id
                    )
                  }
                >
                  <div className="flex-1">
                    {/* venue online */}
                    {event.venue_online && (
                      <div className="flex flex-row justify-between items-center gap-2">
                        <div className="flex items-center gap-1.5 text-blue">
                          <span className="material-symbols-outlined text-[16px]!">
                            videocam
                          </span>
                          <span className="font-geist text-xs font-bold uppercase tracking-wider">
                            {event.venue_online}
                          </span>
                        </div>
                        <span className="font-geist text-xs font-semibold text-subtext bg-surface-container-high px-2 py-0.5 rounded-full">
                          Online
                        </span>
                      </div>
                    )}

                    {/* venue face to face */}
                    {event.venue_facetoface && (
                      <div className="flex flex-row items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-blue">
                          <span className="material-symbols-outlined text-[16px]!">
                            location_on
                          </span>
                          <span className="font-geist text-xs font-bold uppercase tracking-wider">
                            {event.venue_facetoface}
                          </span>
                        </div>
                        <span className="font-geist text-xs font-semibold text-subtext bg-surface-container-high px-2 py-0.5 rounded-full">
                          Face to Face
                        </span>
                      </div>
                    )}

                    {!event.venue_online && !event.venue_facetoface && (
                      <p className="font-geist text-xs text-blue uppercase tracking-wider font-bold">
                        Event
                      </p>
                    )}

                    <h2 className="font-geist text-2xl font-semibold text-text mt-1">
                      {event.title}
                    </h2>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex flex-wrap px-0 md:px-2 gap-4 my-3 text-subtext text-sm md:text-md font-semibold">
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

                    <div className="flex flex-wrap p-3 gap-x-4 gap-y-2 justify-between items-center text-sm">
                      <div className="flex gap-4 text-xs font-geist">
                        <div className="font-bold flex items-center gap-1.5 text-green">
                          <span className="w-2 h-2 rounded-full bg-green"></span>{" "}
                          Present: {countByStatus("present")}
                        </div>
                        <div className="font-bold flex items-center gap-1.5 text-red">
                          <span className="w-2 h-2 rounded-full bg-red"></span>{" "}
                          Absent: {countByStatus("absent")}
                        </div>
                        <div className="font-bold flex items-center gap-1.5 text-yellow">
                          <span className="w-2 h-2 rounded-full bg-yellow"></span>{" "}
                          Late: {countByStatus("late")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {openAttendanceId === event.id && (
                  <div className="border-t border-blue-border/40 pt-4 mt-2">
                    <AttendanceList members={members} attendances={eventAttendances} />
                  </div>
                )}
              </article>
              );
            })}
          </section>
        </main>
      </div>

      {/* sticky action bar */}
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

function AttendanceList({ members, attendances }) {

  const noRecordCount = members.filter(
    (member) => !attendances.some((a) => a.user_id === member.id)
  ).length;

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
            All Members ({members.length})
          </button>
          <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-blue-border text-text font-geist hover:bg-blue/80 hover:text-white transition-colors shrink-0 cursor-pointer">
            No Record ({noRecordCount})
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
        </div>
      </div>

      <section className="flex gap-2">
        <div className="flex-1 space-y-2">
          {members.map((member) => {
            const status = attendances.find((a) => a.user_id === member.id)?.status;
            return (
              <div key={member.id} className="flex flex-col md:flex-row gap-2 bg-white border border-blue-border rounded-lg p-2.5 justify-between shadow-sm hover:border-blue transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-full bg-blue-bg flex items-center justify-center font-bold text-blue shrink-0 font-geist">
                    {getInitials(member.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-geist text-md text-text truncate">
                      {member.name}
                    </p>
                    <p className="text-xs text-subtext truncate">
                      {member.membership_application?.course} - {member.membership_application?.year_level} Year
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {status === "present" ? (
                    <button className="min-w-10 px-2 h-9 rounded bg-green-bg border border-green-border text-green text-xs font-bold flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-[14px]!">check</span>{" "}
                      <span>Present</span>
                    </button>
                  ) : (
                    <button className="w-9 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-high transition-colors text-xs font-bold cursor-pointer">
                      P
                    </button>
                  )}

                  {status === "absent" ? (
                    <button className="min-w-10 px-2 h-9 rounded bg-red-bg border border-red-border text-red text-xs font-bold flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-[14px]!">close</span>{" "}
                      <span>Absent</span>
                    </button>
                  ) : (
                    <button className="w-9 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-high transition-colors text-xs font-bold cursor-pointer">
                      A
                    </button>
                  )}

                  {status === "late" ? (
                    <button className="min-w-10 px-2 h-9 rounded bg-yellow-bg border border-yellow-border text-yellow text-xs font-bold flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-[14px]!">schedule</span>{" "}
                      <span>Late</span>
                    </button>
                  ) : (
                    <button className="w-9 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-high transition-colors text-xs font-bold cursor-pointer">
                      L
                    </button>
                  )}

                  {status === "excused" ? (
                    <button className="min-w-10 px-2 h-9 rounded bg-purple-bg border border-purple-border text-purple text-xs font-bold flex items-center justify-center gap-1">
                      <span>Excused</span>
                    </button>
                  ) : (
                    <button className="w-9 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-high transition-colors text-xs font-bold cursor-pointer">
                      E
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  )

}
