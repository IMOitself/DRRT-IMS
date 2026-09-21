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
  const [unsavedChanges, setUnsavedChanges] = useState({});
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
  const getSavedStatus = (memberId) => {
    const attendance = attendances.find((a) => a.user_id === memberId);
    if (attendance?.pending_approval) return undefined;
    return attendance?.status;
  };

  const wantsCorrection = (memberId) =>
    !!attendances.find((a) => a.user_id === memberId)?.correction_requested;

  const pendingApproval = (memberId) =>
    !!attendances.find((a) => a.user_id === memberId)?.pending_approval;

  const getStatus = (memberId) => {
    const unsaved = unsavedChanges[memberId];
    if (unsaved) return unsaved.status;
    return getSavedStatus(memberId);
  };

  const changeStatus = (memberId, status) => {
    setUnsavedChanges({
      ...unsavedChanges,
      [memberId]: { event_id: eventId, user_id: memberId, status },
    });
  };

  const unsavedCount = Object.keys(unsavedChanges).length;
  const [isConfirmSaveDialogOpen, setIsConfirmSaveDialogOpen] = useState(false);
  const [isConfirmUnsetDialogOpen, setIsConfirmUnsetDialogOpen] = useState(false);
  const [unsetTarget, setUnsetTarget] = useState(null);

  const openUnsetDialog = (memberId) => {
    setUnsetTarget(memberId);
    setIsConfirmUnsetDialogOpen(true);
  };

  const closeUnsetDialog = () => setIsConfirmUnsetDialogOpen(false);

  const [isCorrectionDialogOpen, setIsCorrectionDialogOpen] = useState(false);

  const openCorrectionDialog = (memberId) => {
    setUnsetTarget(memberId);
    setIsCorrectionDialogOpen(true);
  };

  const closeCorrectionDialog = () => setIsCorrectionDialogOpen(false);

  const unsetAttendance = async () => {
    const attendance = attendances.find((a) => a.user_id === unsetTarget);

    try {
      if (attendance) await api.delete(`/attendances/${attendance.id}`);
      setAttendances(attendances.filter((a) => a.id !== attendance?.id));
    } catch (err) {
      console.error(err);
    }

    // drop the pending change too, there is nothing left to save
    const { [unsetTarget]: _, ...rest } = unsavedChanges;
    setUnsavedChanges(rest);

    closeUnsetDialog();
    closeCorrectionDialog();
  };

  const [isConfirmRejectDialogOpen, setIsConfirmRejectDialogOpen] = useState(false);
  const [rejectTarget, setRejectTarget] = useState(null);

  const openRejectDialog = (memberId) => {
    setRejectTarget(memberId);
    setIsConfirmRejectDialogOpen(true);
  };

  const closeRejectDialog = () => setIsConfirmRejectDialogOpen(false);

  const rejectAttendance = attendances.find((a) => a.user_id === rejectTarget);

  const rejectPendingAttendance = async () => {
    const attendance = attendances.find((a) => a.user_id === rejectTarget);

    try {
      if (attendance) await api.delete(`/attendances/${attendance.id}`);
      setAttendances(attendances.filter((a) => a.id !== attendance?.id));
    } catch (err) {
      console.error(err);
    }

    closeRejectDialog();
    closeDrawer();
  };

  const handleConfirmSaveDialogSubmit = async () => {
    try {
      for (const change of Object.values(unsavedChanges)) {
        await api.post("/attendances", change);
      }
      const res = await api.get("/attendances", { params: { all: 1 } });
      setAttendances(res.data.filter((a) => a.event_id === eventId));
      setUnsavedChanges({});
    } catch (err) {
      console.error(err);
    }

    setIsConfirmSaveDialogOpen(false);
  };

  const getMemberName = (memberId) =>
    members.find((m) => m.id === memberId)?.name;

  const changes = Object.values(unsavedChanges);

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
      <title>Attendance - DRRT Officer Portal</title>

      <Header />

      <div className="grow w-full">
        <main className="max-w-5xl mx-auto w-full px-4 md:px-8 py-6 mb-40 space-y-6">
          {/* Back Link */}
          <Link to="/officer/events" className="inline-flex items-center gap-2 text-blue font-geist font-semibold hover:underline">
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
            wantsCorrection={wantsCorrection}
            pendingApproval={pendingApproval}
            openRejectDialog={openRejectDialog}
            changeStatus={changeStatus}
            openUnsetDialog={openUnsetDialog}
            openCorrectionDialog={openCorrectionDialog}
            openDrawer={openDrawer}
          />
        </main>
      </div>

      {/* sticky action bar */}
      {unsavedCount > 0 && (
        <div className="fixed bottom-16 md:bottom-0 left-0 w-full bg-white border-t border-blue-border shadow-[0_-4px_12px_rgba(0,0,0,0.08)] z-40 p-3 md:p-4">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-text">
              <span className="material-symbols-outlined text-blue text-[20px]!">
                border_color
              </span>
              <span className="font-geist text-sm font-medium">
                Unsaved Changes: {unsavedCount} Attendances Updated
              </span>
            </div>
            <div className="flex w-full sm:w-auto gap-3">
              <button
                onClick={() => setUnsavedChanges({})}
                className="flex-1 sm:flex-none px-6 py-2 rounded-lg bg-surface text-text border border-blue-border font-geist text-sm font-semibold hover:bg-surface-container-low transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer">
                <span className="material-symbols-outlined text-[18px]!">
                  history
                </span>{" "}
                Reset
              </button>
              <button
                onClick={() => setIsConfirmSaveDialogOpen(true)}
                className="flex-1 sm:flex-none px-6 py-2 rounded-lg bg-blue text-white font-geist text-sm font-semibold hover:bg-blue/90 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer">
                <span className="material-symbols-outlined text-[18px]!">
                  save
                </span>{" "}
                Save
              </button>
            </div>
          </div>
        </div>
      )}


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

                {selectedAttendance?.pending_approval && (
                  <p className="text-xs text-subtext font-medium my-2">
                    <span className="text-text font-semibold">
                      {selectedMember.name}
                    </span>{" "}
                    wants to set their attendance
                  </p>
                )}

                {selectedAttendance?.recorder && !selectedAttendance?.pending_approval && (
                  <p className="text-xs text-subtext font-medium my-2">
                    This attendance was recorded by:{" "}
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
        {/* Drawer Actions */}
        {selectedAttendance?.pending_approval && (
          <div className="p-4 border-t border-blue-border bg-surface flex gap-3">
            <button onClick={() => openRejectDialog(selectedMember.id)} className="cursor-pointer flex-1 bg-red text-white px-4 py-2 rounded-lg font-geist text-sm hover:bg-red transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">close</span>
              Reject
            </button>
            <button className="cursor-pointer flex-1 bg-green text-white px-4 py-2 rounded-lg font-geist text-sm hover:bg-green transition-colors shadow-sm flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check</span>
              Approve
            </button>
          </div>
        )}
      </aside>
      {/* Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-text/20 z-65 transition-opacity"
          onClick={closeDrawer}
        />
      )}

      {isConfirmSaveDialogOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-4">
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 items-center">
                  <span className="material-symbols-outlined text-yellow mb-1 text-[30px]!">
                    warning
                  </span>
                  <p className="w-fit font-geist text-lg font-semibold text-text mb-1">
                    Save Changes?
                  </p>
                </div>
                <p className="font-geist text-text">
                  You are about to update {unsavedCount} attendance record{unsavedCount === 1 ? "" : "s"}.
                </p>

                <div className="mt-3 space-y-4 max-h-[45vh] overflow-y-auto">
                  <p className="font-geist text-sm font-bold text-text">
                    {event?.title}
                  </p>
                  <ul className="mt-1 ml-5 list-disc space-y-0.5 text-sm text-subtext">
                    {changes.map((change) => (
                      <li key={change.user_id}>
                        {getMemberName(change.user_id)} &mdash;{" "}
                        <span className="capitalize line-through">
                          {getSavedStatus(change.user_id) ?? "no record"}
                        </span>{" "}
                        &rarr;{" "}
                        <span
                          className={`font-semibold capitalize ${change.status === "present"
                            ? "text-green"
                            : change.status === "absent"
                              ? "text-red"
                              : "text-yellow"
                            }`}
                        >
                          {change.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-full flex items-center mt-4">
                  <div className="flex flex-col sm:flex-row flex-1 items-center justify-end gap-2">
                    <button onClick={() => setIsConfirmSaveDialogOpen(false)} className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-low transition-all cursor-pointer">
                      Cancel
                    </button>
                    <button onClick={handleConfirmSaveDialogSubmit} className="w-full sm:w-auto bg-blue text-white hover:bg-blue transition-all font-geist font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]!">save</span>
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isConfirmUnsetDialogOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-4">
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 items-center">
                  <span className="material-symbols-outlined text-yellow mb-1 text-[30px]!">
                    warning
                  </span>
                  <p className="w-fit font-geist text-lg font-semibold text-text mb-1">
                    Unset Attendance?
                  </p>
                </div>
                <p className="font-geist text-text">
                  Unsetting this will allow the member to set their own attendance again.
                </p>

                <div className="w-full flex items-center mt-4">
                  <div className="flex flex-col sm:flex-row flex-1 items-center justify-end gap-2">
                    <button onClick={closeUnsetDialog} className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-low transition-all cursor-pointer">
                      Cancel
                    </button>
                    <button onClick={unsetAttendance} className="w-full sm:w-auto bg-blue text-white hover:bg-blue transition-all font-geist font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]!">refresh</span>
                      <span>Unset</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCorrectionDialogOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-4">
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 items-center">
                  <span className="material-symbols-outlined text-yellow mb-1 text-[30px]!">
                    warning
                  </span>
                  <p className="w-fit font-geist text-lg font-semibold text-text mb-1">
                    Accept Correction?
                  </p>
                </div>
                <p className="font-geist text-text">
                  Approving this will allow the member to set their attendance again. You can always set it yourself.
                </p>

                <div className="w-full flex items-center mt-4">
                  <div className="flex flex-col sm:flex-row flex-1 items-center justify-end gap-2">
                    <button onClick={closeCorrectionDialog} className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-low transition-all cursor-pointer">
                      Close
                    </button>
                    <button className="w-full sm:w-auto bg-red text-white hover:bg-red transition-all font-geist font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]!">close</span>
                      <span>Reject</span>
                    </button>
                    <button onClick={unsetAttendance} className="w-full sm:w-auto bg-green text-white hover:bg-green transition-all font-geist font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]!">check</span>
                      <span>Approve</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isConfirmRejectDialogOpen && (
        <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-4">
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 items-center">
                  <span className="material-symbols-outlined text-yellow mb-1 text-[30px]!">
                    warning
                  </span>
                  <p className="w-fit font-geist text-lg font-semibold text-text mb-1">
                    Reject Attendance?
                  </p>
                </div>
                <p className="font-geist text-text">
                  Rejecting this will delete what {getMemberName(rejectTarget)} submitted. They can set their attendance again.
                </p>

                <ul className="mt-3 ml-5 list-disc space-y-0.5 text-sm text-subtext">
                  <li>
                    Status:{" "}
                    <span className="font-semibold capitalize text-text">
                      {rejectAttendance?.status ?? "none"}
                    </span>
                  </li>
                  {rejectAttendance?.timein_hour && (
                    <li>
                      Time In:{" "}
                      <span className="font-semibold text-text">
                        {rejectAttendance.timein_hour}:{rejectAttendance.timein_minute} {rejectAttendance.timein_ampm}
                      </span>
                    </li>
                  )}
                  {rejectAttendance?.proof_of_attendance && (
                    <li>
                      Proof of Attendance:{" "}
                      <span className="font-semibold text-text wrap-break-word">
                        {rejectAttendance.proof_of_attendance}
                      </span>
                    </li>
                  )}
                  {rejectAttendance?.absent_reason && (
                    <li>
                      Reason:{" "}
                      <span className="font-semibold text-text wrap-break-word">
                        {rejectAttendance.absent_reason}
                      </span>
                    </li>
                  )}
                  {rejectAttendance?.absent_supporting_image && (
                    <li>
                      Supporting Image:{" "}
                      <span className="font-semibold text-text wrap-break-word">
                        {rejectAttendance.absent_supporting_image}
                      </span>
                    </li>
                  )}
                </ul>

                <div className="w-full flex items-center mt-4">
                  <div className="flex flex-col sm:flex-row flex-1 items-center justify-end gap-2">
                    <button onClick={closeRejectDialog} className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-low transition-all cursor-pointer">
                      Cancel
                    </button>
                    <button onClick={rejectPendingAttendance} className="w-full sm:w-auto bg-red text-white hover:bg-red transition-all font-geist font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]!">close</span>
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </>
  );
}

function AttendanceList({ members, getStatus, wantsCorrection, pendingApproval, openRejectDialog, changeStatus, openUnsetDialog, openCorrectionDialog, openDrawer }) {

  const noRecordCount = members.filter(
    (member) => !getStatus(member.id)
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
            const status = getStatus(member.id);
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
                    <p className="text-xs text-subtext truncate">
                      {member.membership_application?.course} - {member.membership_application?.year_level} Year
                    </p>
                  </div>
                  {wantsCorrection(member.id) && (
                    <div className="flex items-center gap-0.5">
                      <button
                        onClick={(e) => { e.stopPropagation(); openCorrectionDialog(member.id); }}
                        className="px-2 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-high transition-colors text-xs font-bold flex items-center justify-center cursor-pointer">
                        wants correction
                      </button>
                      <button className="material-symbols-outlined text-[18px]! px-1 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-high transition-colors font-bold flex items-center justify-center cursor-pointer">close</button>
                    </div>
                  )}
                  {pendingApproval(member.id) && (
                    <div className="flex items-center gap-0.5">
                      <button
                        onClick={() => openDrawer(member)}
                        className="px-2 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-high transition-colors text-xs font-bold flex items-center justify-center cursor-pointer">
                        update attendance
                        <span className="material-symbols-outlined text-[18px]!">more_vert</span>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); openRejectDialog(member.id); }}
                        className="material-symbols-outlined text-[18px]! px-1 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-high transition-colors font-bold flex items-center justify-center cursor-pointer">close</button>
                      <button className="material-symbols-outlined text-[18px]! px-1 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-high transition-colors font-bold flex items-center justify-center cursor-pointer">check</button>
                    </div>
                  )}
                </div>
                {/* stop the click here so the drawer doesn't open */}
                <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 shrink-0">
                  {status && (
                    <button
                      title="Unset"
                      onClick={() => openUnsetDialog(member.id)}
                      className="w-9 h-9 rounded flex items-center justify-center text-subtext hover:bg-surface-container-highest hover:text-text transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-[18px]!">refresh</span>
                    </button>
                  )}

                  {status === "present" ? (
                    <button className="min-w-10 px-2 h-9 rounded bg-green-bg border border-green-border text-green text-xs font-bold flex items-center justify-center gap-1">
                      <span>Present</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => changeStatus(member.id, "present")}
                      className="min-w-10 px-2 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-high transition-colors text-xs font-bold cursor-pointer">
                      Present
                    </button>
                  )}

                  {status === "absent" ? (
                    <button className="min-w-10 px-2 h-9 rounded bg-red-bg border border-red-border text-red text-xs font-bold flex items-center justify-center gap-1">
                      <span>Absent</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => changeStatus(member.id, "absent")}
                      className="min-w-10 px-2 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-high transition-colors text-xs font-bold cursor-pointer">
                      Absent
                    </button>
                  )}

                  {status === "late" ? (
                    <button className="min-w-10 px-2 h-9 rounded bg-yellow-bg border border-yellow-border text-yellow text-xs font-bold flex items-center justify-center gap-1">
                      <span>Late</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => changeStatus(member.id, "late")}
                      className="min-w-10 px-2 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-high transition-colors text-xs font-bold cursor-pointer">
                      Late
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
