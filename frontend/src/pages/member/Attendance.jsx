import { useState, useEffect } from "react";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import api from "../../api/axios";
import { formatDate } from "../../utils/format";
import { useAuth } from "../../context/AuthContext";

export default function Attendance() {
    const { user } = useAuth();

    const initialFormData = {
        user_id: null,
        event_id: null,
        status: "",
        attended_at: null,
        proof_of_attendance: null,
        timein_hour: "08",
        timein_minute: "00",
        ampm: "AM",
    };
    const [formData, setFormData] = useState(initialFormData);
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const [isPresentAttendanceDialogOpen, setIsPresentAttendanceDialogOpen] = useState(false);
    // const [isAbsentAttendanceDialogOpen, setIsAbsentAttendanceDialogOpen] = useState(false);
    const [isConfirmSaveDialogOpen, setIsConfirmSaveDialogOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const [attendances, setAttendances] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState({ id: null, unsaved_status: null });

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
            .get("/attendances")
            .then((res) => {
                setAttendances(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [user]);

    return (
        <>
            <title>Attendance - DRRT Member Portal</title>

            <Header />

            <main className="grow max-w-7xl w-full mx-auto px-4 md:px-8 py-6 pb-24 md:pb-12">
                {/* title */}
                <div className="mb-6">
                    <h2 className="font-geist text-3xl md:text-5xl text-text font-bold">
                        Attendance Records
                    </h2>
                    <p className="text-base md:text-lg text-subtext mt-1">
                        Track your compliance status, meeting history, and request record
                        updates.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* left cards and stuff */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        <div className="bg-white border border-blue-border rounded-xl p-4 md:p-6 shadow-sm flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-geist text-2xl font-bold text-text">
                                        Bylaw Compliance
                                    </h3>
                                    <p className="text-sm text-subtext mt-0.5">
                                        Current Standing Period: 2026
                                    </p>
                                </div>
                                <div className="bg-green-bg border border-green-border px-3 py-1 rounded-full flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-green" />
                                    <span className="font-geist text-xs font-bold uppercase text-green">
                                        Compliant
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <span className="font-geist text-sm font-semibold text-subtext">
                                        Attendance Rate
                                    </span>
                                    <span className="font-geist text-3xl font-bold text-blue">
                                        85%
                                    </span>
                                </div>
                                <div className="h-3.5 w-full bg-progress-ring-track rounded-full overflow-hidden relative">
                                    {/* 80% threshold marker */}
                                    <div className="absolute h-full w-0.5 bg-red z-10 left-[80%]" />
                                    {/* progress bar */}
                                    <div className="h-full bg-blue rounded-full transition-all duration-500" style={{ width: "85%" }} />
                                </div>
                                <div className="flex justify-between text-xs font-geist text-subtext pt-1">
                                    <span>0%</span>
                                    <span className="font-semibold text-green flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green" />{" "}
                                        80% Requirement
                                    </span>
                                    <span>100%</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* total events */}
                            <div className="bg-white border border-blue-border rounded-xl p-4 flex flex-col items-center text-center shadow-sm hover:border-blue transition-all">
                                <span className="material-symbols-outlined text-blue mb-1 text-[30px]!">
                                    groups
                                </span>
                                <span className="font-geist text-5xl font-bold text-text leading-none">
                                    12
                                </span>
                                <span className="font-geist text-xs text-subtext mt-1.5 font-semibold uppercase tracking-wider">
                                    Total Events
                                </span>
                            </div>

                            {/* attended */}
                            <div className="bg-white border border-blue-border rounded-xl p-4 flex flex-col items-center text-center shadow-sm hover:border-green transition-all">
                                <span className="material-symbols-outlined text-green mb-1 text-[30px]!">
                                    check_circle
                                </span>
                                <span className="font-geist text-5xl font-bold text-text leading-none">
                                    10
                                </span>
                                <span className="font-geist text-xs text-subtext mt-1.5 font-semibold uppercase tracking-wider">
                                    Attended
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* attendance list*/}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                        <h3 className="flex justify-between items-center font-geist text-2xl font-bold text-text">
                            Recent Events
                        </h3>

                        {/* editable */}
                        <div className="space-y-4">
                            {events.map((event) => {
                                let currentStatus = "unset";
                                let userAlreadyHaveRecord = false;

                                for (const attendance of attendances) {
                                    if (attendance.event_id === event.id && attendance.user_id === user?.id) {
                                        currentStatus = attendance.status;
                                        userAlreadyHaveRecord = true;
                                        break;
                                    }
                                }

                                const displayStatus = selectedEvent.id === event.id ? selectedEvent.unsaved_status : currentStatus;

                                return (
                                    <div key={event.id} className="bg-white border border-blue-border rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm card-hover-level">
                                        <div className="flex items-center gap-4">

                                            {/* status icon */}
                                            {displayStatus === "unset" && (
                                                <div className="w-12 h-12 rounded-lg bg-blue-bg border border-blue-border flex items-center justify-center text-blue shrink-0">
                                                    <span className="material-symbols-outlined text-[24px]!">edit</span>
                                                </div>
                                            )}
                                            {displayStatus === "present" && (
                                                <div className="w-12 h-12 rounded-lg bg-green-bg border border-green-border flex items-center justify-center text-green shrink-0">
                                                    <span className="material-symbols-outlined text-[24px]!">check</span>
                                                </div>
                                            )}
                                            {displayStatus === "absent" && (
                                                <div className="w-12 h-12 rounded-lg bg-red-bg border border-red-border flex items-center justify-center text-red shrink-0">
                                                    <span className="material-symbols-outlined text-[24px]!">close</span>
                                                </div>
                                            )}
                                            {displayStatus === "late" && (
                                                <div className="w-12 h-12 rounded-lg bg-yellow-bg border border-yellow-border flex items-center justify-center text-yellow shrink-0">
                                                    <span className="material-symbols-outlined text-[24px]!">schedule</span>
                                                </div>
                                            )}
                                            {displayStatus === "excused" && (
                                                <div className="w-12 h-12 rounded-lg bg-purple-bg border border-purple-border flex items-center justify-center text-purple shrink-0">
                                                    <span className="text-[24px]!">E</span>
                                                </div>
                                            )}

                                            <div>
                                                <div className="font-geist text-lg text-text font-semibold">
                                                    {event.title}
                                                </div>
                                                <p className="text-sm text-subtext flex items-center gap-1 mt-0.5">
                                                    <span className="material-symbols-outlined text-[16px]!">
                                                        calendar_today
                                                    </span>{" "}
                                                    {formatDate(event.date)} {event.venue_online && "(Online)" || event.venue_facetoface && "(Face to Face)"}
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            {/* attendance buttons */}
                                            <div className="flex gap-1 justify-start md:justify-end">
                                                {userAlreadyHaveRecord ? (
                                                    <>
                                                        {displayStatus === "present" && (
                                                            <button className="min-w-10 px-2 h-9 rounded bg-green-bg border border-green-border text-green text-xs font-bold flex items-center justify-center gap-1">
                                                                <span>Present</span>
                                                            </button>
                                                        )}
                                                        {displayStatus === "absent" && (
                                                            <button className="min-w-10 px-2 h-9 rounded bg-red-bg border border-red-border text-red text-xs font-bold flex items-center justify-center gap-1">
                                                                <span>Absent</span>
                                                            </button>
                                                        )}
                                                        {displayStatus === "late" && (
                                                            <button className="min-w-10 px-2 h-9 rounded bg-yellow-bg border border-yellow-border text-yellow text-xs font-bold flex items-center justify-center gap-1">
                                                                <span>Late</span>
                                                            </button>
                                                        )}
                                                        {displayStatus === "excused" && (
                                                            <button className="min-w-10 px-2 h-9 rounded bg-purple-bg border border-purple-border text-purple text-xs font-bold flex items-center justify-center gap-1">
                                                                <span>Excused</span>
                                                            </button>
                                                        )}
                                                    </>
                                                ) : (
                                                    <>
                                                        {displayStatus === "present" ? (
                                                            <button className="min-w-10 px-2 h-9 rounded bg-green-bg border border-green-border text-green text-xs font-bold flex items-center justify-center gap-1">
                                                                <span>Present</span>
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => setSelectedEvent({ id: event.id, unsaved_status: "present" })}
                                                                className="min-w-10 px-2 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-high transition-colors text-xs font-bold cursor-pointer"
                                                            >
                                                                <span>Present</span>
                                                            </button>
                                                        )}

                                                        {displayStatus === "absent" ? (
                                                            <button className="min-w-10 px-2 h-9 rounded bg-red-bg border border-red-border text-red text-xs font-bold flex items-center justify-center gap-1">
                                                                <span>Absent</span>
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => setSelectedEvent({ id: event.id, unsaved_status: "absent" })}
                                                                className="min-w-10 px-2 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-high transition-colors text-xs font-bold cursor-pointer"
                                                            >
                                                                <span>Absent</span>
                                                            </button>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                            {userAlreadyHaveRecord ? (
                                                <button className="font-geist text-xs text-blue font-bold hover:underline cursor-pointer">
                                                    Request Correction
                                                </button>
                                            ) : (
                                                <div className={userAlreadyHaveRecord || displayStatus === "unset" ? "hidden" : "flex gap-1 mt-2 justify-end"}>
                                                    <button
                                                        onClick={() => {}}
                                                        className="flex items-center justify-center gap-1 p-1 px-4 rounded bg-blue text-white hover:bg-blue/80 transition-colors text-xs font-bold cursor-pointer"
                                                    >
                                                        <span className="material-symbols-outlined text-[14px]">save</span>
                                                        <span>Save</span>
                                                    </button>

                                                    <button
                                                        onClick={() => setSelectedEvent({ id: event.id, unsaved_status: "unset" })}
                                                        className="flex items-center justify-center gap-1 p-1 px-4 rounded border border-blue text-blue hover:bg-blue/10 transition-colors text-xs font-bold cursor-pointer"
                                                    >
                                                        <span className="material-symbols-outlined text-[14px]">history</span>
                                                        <span>Reset</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>

            <BottomNav />
        </>

    );
}