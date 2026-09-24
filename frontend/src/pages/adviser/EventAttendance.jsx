import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/axios";
import { formatDate, getInitials } from "../../utils/format";

export default function EventAttendance() {

  const { id } = useParams();
  const eventId = Number(id);

  const [event, setEvent] = useState(null);
  const [members, setMembers] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  function openDrawer(member) {
    setSelectedMember(member);
    setSelectedAttendance(attendances.find((a) => a.user_id === member.id));
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  // a pending attendance is not set yet, it still needs an officer to approve it
  const getStatus = (memberId) => {
    const attendance = attendances.find((a) => a.user_id === memberId);
    if (attendance?.pending_approval) return undefined;
    return attendance?.status;
  };

  const getTimein = (memberId) => {
    const attendance = attendances.find((a) => a.user_id === memberId);
    if (!attendance?.timein_hour) return null;
    if (attendance.status !== "present" && attendance.status !== "late") return null;
    return `${attendance.timein_hour}:${attendance.timein_minute} ${attendance.timein_ampm}`;
  };

  useEffect(() => {

    api
      .get("/events")
      .then((res) => {
        setEvent(res.data.find((e) => e.id === eventId));
      })
      .catch((err) => {
        console.error(err);
      });

    api
      .get("/attendances", { params: { all: 1 } })
      .then((res) => {
        setAttendances(res.data.filter((a) => a.event_id === eventId));
      })
      .catch((err) => {
        console.error(err);
      });

    api
      .get("/members")
      .then((res) => {
        setMembers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

  }, [eventId]);

  const countByStatus = (status) =>
    members.filter((m) => getStatus(m.id) === status).length;

  return (
    <>
      <title>Attendance - DRRT Adviser Portal</title>

      <Header />

      <div className="grow w-full">
        <main className="max-w-5xl mx-auto w-full px-4 md:px-8 py-6 mb-40 space-y-6">
          {/* Back Link */}
          <Link to="/adviser/events" className="inline-flex items-center gap-2 text-blue font-geist font-semibold hover:underline">
            <span className="material-symbols-outlined text-[18px]!">arrow_back</span>
            <span>Back to Events</span>
          </Link>

          {/* Event Header Card */}
          {event && (
            <section className="bg-white border border-blue-border p-4 rounded-xl shadow-sm space-y-2">
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

                <div className="flex flex-col flex-wrap p-3 gap-x-4 gap-y-2 justify-between items-center text-sm">
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
            </section>
          )}

          <AttendanceList
            members={members}
            getStatus={getStatus}
            getTimein={getTimein}
            openDrawer={openDrawer}
          />
        </main>
      </div>

      {/* Attendance Details Drawer */}
      <aside className={`glass-bg fixed inset-y-0 right-0 z-70 w-full md:w-100 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-blue-border flex flex-col ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-border">
          <h3 className="font-geist text-lg font-bold text-text m-0">
            Attendance Details
          </h3>
          <button
            aria-label="Close"
            className="cursor-pointer hover:bg-surface-container-high p-2 transition-colors text-subtext"
            onClick={closeDrawer}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        {/* Drawer Content */}
        <div className="grow overflow-y-auto p-6 space-y-6">
          {selectedMember && (
            <>
              <div className="flex flex-col items-center text-center gap-1">
                <div className="w-20 h-20 text-3xl rounded-full bg-surface-container-high flex items-center justify-center font-bold text-blue shrink-0">
                  {getInitials(selectedMember.name)}
                </div>
                <h3 className="font-geist text-xl font-bold text-text m-0">
                  {selectedMember.name}
                </h3>

                {selectedAttendance?.status === 'present'
                  ? <span className="bg-green-bg text-green border border-green-border inline-flex items-center gap-1.5 font-geist font-semibold px-2.5 py-0.5 rounded-full">PRESENT</span>
                  : selectedAttendance?.status === 'late'
                    ? <span className="bg-yellow-bg text-yellow border border-yellow-border inline-flex items-center gap-1.5 font-geist font-semibold px-2.5 py-0.5 rounded-full">LATE</span>
                    : selectedAttendance?.status === 'absent'
                      ? <span className="bg-red-bg text-red border border-red-border inline-flex items-center gap-1.5 font-geist font-semibold px-2.5 py-0.5 rounded-full">ABSENT</span>
                      : <span className="bg-surface-container-high text-subtext border border-blue-border inline-flex items-center gap-1.5 font-geist font-semibold px-2.5 py-0.5 rounded-full">NO RECORD</span>
                }
              </div>

              <div className="border-t border-blue-border pt-4">
                <p className="font-geist text-xs text-blue uppercase tracking-wider font-bold mb-3">
                  Attendance Record
                </p>

                {selectedAttendance?.pending_approval ? (
                  <p className="text-xs text-subtext font-medium my-2">
                    <span className="text-text font-semibold">
                      {selectedMember.name}
                    </span>{" "}
                    wants to set their attendance
                  </p>
                ) : ""}

                {selectedAttendance?.recorder && !selectedAttendance?.pending_approval && (
                  <p className="text-xs text-subtext font-medium my-2">
                    This was recorded by:{" "}
                    <span className="text-text font-semibold">
                      {selectedAttendance.recorder.name}
                    </span>{" "}
                    <span className="capitalize">
                      ({selectedAttendance.recorder.role})
                    </span>
                  </p>
                )}


                {(selectedAttendance?.status === "present" || selectedAttendance?.status === "late") && (
                  <div className="flex flex-col gap-3">
                    <div className="bg-surface-container-low border border-blue-border rounded-lg p-3 text-center">
                      <p className="font-geist text-3xl text-blue font-bold m-0">
                        {selectedAttendance.timein_hour
                          ? `${selectedAttendance.timein_hour}:${selectedAttendance.timein_minute} ${selectedAttendance.timein_ampm}`
                          : "N/A"}
                      </p>
                      <p className="font-geist text-xs text-subtext mt-1">
                        Time In
                      </p>
                    </div>
                    {selectedAttendance.proof_of_attendance && (
                      <div className="bg-surface-container-low border border-blue-border rounded-lg p-3 text-center">
                        <p className="font-geist text-lg text-blue font-bold m-0 wrap-break-word">
                          {selectedAttendance.proof_of_attendance}
                        </p>
                        <p className="font-geist text-xs text-subtext mt-1">
                          Proof of Attendance
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {selectedAttendance?.status === "absent" && (
                  <div className="flex flex-col gap-3">
                    {selectedAttendance.absent_reason && (
                      <div className="bg-surface-container-low border border-blue-border rounded-lg p-3 text-center">
                        <p className="font-geist text-lg text-blue font-bold m-0 wrap-break-word">
                          {selectedAttendance.absent_reason}
                        </p>
                        <p className="font-geist text-xs text-subtext mt-1">
                          Reason
                        </p>
                      </div>
                    )}
                    {selectedAttendance.absent_supporting_image && (
                      <div className="bg-surface-container-low border border-blue-border rounded-lg p-3 text-center">
                        <p className="font-geist text-lg text-blue font-bold m-0 wrap-break-word">
                          {selectedAttendance.absent_supporting_image}
                        </p>
                        <p className="font-geist text-xs text-subtext mt-1">
                          Supporting Image
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* no record yet */}
                {!selectedAttendance?.status && (
                  <div className="bg-surface-container-low border border-blue-border rounded-lg p-3 text-center">
                    <p className="font-geist text-xs text-subtext">
                      No attendance record for this member yet.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </aside>
      {/* Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-text/20 z-65 transition-opacity"
          onClick={closeDrawer}
        />
      )}

      <BottomNav />
    </>
  );
}

function AttendanceList({ members, getStatus, getTimein, openDrawer }) {

  const noRecordCount = members.filter(
    (member) => !getStatus(member.id)
  ).length;

  const [searchQuery, setSearchQuery] = useState("");
  const [memberFilter, setMemberFilter] = useState("all");

  const yearLabels = ["", "1st Year", "2nd Year", "3rd Year", "4th Year"];

  // every searchable detail of a member in one string, so any word can match
  const matchesSearch = (member) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    const application = member.membership_application;
    const memberDetails = [
      member.name,
      member.email,
      application?.student_id,
      application?.course,
      application?.year_level,
      yearLabels[application?.year_level],
    ].join(" ").toLowerCase();

    return query.split(/\s+/).every((word) => memberDetails.includes(word));
  };

  const matchesFilter = (member) => {
    if (searchQuery.trim()) return true;
    if (memberFilter === "no_record") return !getStatus(member.id);
    if (memberFilter === "all") return true;
    return Number(member.membership_application?.year_level) === memberFilter;
  };

  const pillClassName = (filter) =>
    memberFilter === filter && !searchQuery.trim()
      ? "whitespace-nowrap px-4 py-1.5 rounded-full bg-blue text-white font-geist shrink-0 hover:bg-blue/80 cursor-pointer"
      : "whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-blue-border text-text font-geist hover:bg-blue/80 hover:text-white transition-colors shrink-0 cursor-pointer";

  const filteredMembers = members.filter((member) => matchesSearch(member) && matchesFilter(member));

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
            placeholder="Search by name, ID, or course..."
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              // back to a plain list once the search is cleared
              if (!e.target.value.trim()) setMemberFilter("all");
            }}
          />
        </div>

        {/* Rapid Level Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 text-xs font-semibold">
          <button onClick={() => setMemberFilter("all")} className={pillClassName("all")}>
            All Members ({members.length})
          </button>
          <button onClick={() => setMemberFilter("no_record")} className={pillClassName("no_record")}>
            No Record ({noRecordCount})
          </button>
          {[1, 2, 3, 4].map((year) => (
            <button key={year} onClick={() => setMemberFilter(year)} className={pillClassName(year)}>
              {yearLabels[year]}
            </button>
          ))}
        </div>
      </div>

      <section className="flex gap-2">
        <div className="flex-1 space-y-2">
          {filteredMembers.map((member) => {
            return (
              <div key={member.id}
                onClick={() => openDrawer(member)}
                className="flex flex-col md:flex-row gap-2 bg-white border border-blue-border rounded-lg p-2.5 justify-between shadow-sm hover:border-blue transition-colors cursor-pointer">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-full bg-blue-bg flex items-center justify-center font-bold text-blue shrink-0 font-geist">
                    {getInitials(member.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-geist text-md text-text truncate">
                      {member.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-subtext truncate">
                        {member.membership_application?.course} - {member.membership_application?.year_level}
                      </p>
                      {getTimein(member.id) && (
                        <p className="text-xs text-subtext flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]!">
                            schedule
                          </span>
                          Time In: {getTimein(member.id)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {filteredMembers.length === 0 && (
            <p className="font-geist text-sm text-subtext text-center py-4">
              No members found.
            </p>
          )}
        </div>
      </section>
    </div>
  )

}
