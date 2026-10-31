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
        proof_of_attendance: null,
        absent_supporting_image: null,
        absent_reason: "",
        late_supporting_image: null,
        late_reason: "",
        timein_hour: "",
        timein_minute: "",
        timein_ampm: "AM",
    };
    const [formData, setFormData] = useState(initialFormData);
    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === "timein_hour" || name === "timein_minute") {
            value = value.replace(/\D/g, "");
            const max = name === "timein_hour" ? 12 : 59;
            if (value !== "" && Number(value) > max) value = String(max);
        }
        setFormData({ ...formData, [name]: value });
    };

    // time fields are always 2 digits
    const handleTimeMakeSure2Digits = (e) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
                ? String(Math.min(e.target.name === "timein_hour" ? 12 : 59, Math.max(e.target.name === "timein_hour" ? 1 : 0, Number(e.target.value)))).padStart(2, "0")
                : "",
        });

    const [isPresentAttendanceDialogOpen, setIsPresentAttendanceDialogOpen] = useState(false);
    const [isAbsentAttendanceDialogOpen, setIsAbsentAttendanceDialogOpen] = useState(false);
    const [isLateAttendanceDialogOpen, setIsLateAttendanceDialogOpen] = useState(false);
    const [isConfirmSaveDialogOpen, setIsConfirmSaveDialogOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [attendances, setAttendances] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState({ id: null, unsaved_status: null });

    const handleSelectEvent = (event, unsaved_status) => {
        setSelectedEvent({ ...event, unsaved_status: unsaved_status });
    }

    const toTotalMinutes = (hour, minute, ampm) =>
        ((Number(hour) % 12) + (ampm === "PM" ? 12 : 0)) * 60 + Number(minute);

    const isTimeinLate = () => {
        if (!selectedEvent.time_hour) return false;
        return toTotalMinutes(formData.timein_hour, formData.timein_minute, formData.timein_ampm) >
            toTotalMinutes(selectedEvent.time_hour, selectedEvent.time_minute, selectedEvent.time_ampm) + 5;
    }

    const handlePresentAttendanceDialogSubmit = (e) => {
        e.preventDefault();
        const isLate = isTimeinLate();
        setFormData((prev) => ({
            ...prev,
            user_id: user.id,
            event_id: selectedEvent.id,
            status: isLate ? "late" : "present",
        }));
        if (isLate) setSelectedEvent((prev) => ({ ...prev, unsaved_status: "late" }));
        setIsPresentAttendanceDialogOpen(false);
        if (isLate) setIsLateAttendanceDialogOpen(true);
        else setIsConfirmSaveDialogOpen(true);
    }

    const handleLateAttendanceDialogSubmit = (e) => {
        e.preventDefault();
        setIsLateAttendanceDialogOpen(false);
        setIsConfirmSaveDialogOpen(true);
    }

    const handleAbsentAttendanceDialogSubmit = (e) => {
        e.preventDefault();
        setFormData((prev) => ({
            ...prev,
            user_id: user.id,
            event_id: selectedEvent.id,
            status: selectedEvent.unsaved_status,
        }));
        setIsAbsentAttendanceDialogOpen(false);
        setIsConfirmSaveDialogOpen(true);
    }

    const handleConfirmSaveDialogSubmit = () => {
        api
            .post("/attendances", formData)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.error(err));

        api
            .get("/attendances")
            .then((res) => {
                setAttendances(res.data);
            })
            .catch((err) => {
                console.error(err);
            });

        setIsConfirmSaveDialogOpen(false);

    }

    const handleRequestCorrection = (attendanceId) => {
        api
            .put(`/attendances/${attendanceId}/correction-request`)
            .then(() => api.get("/attendances"))
            .then((res) => setAttendances(res.data))
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        api
            .get("/events")
            .then((res) => {
                setEvents(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });

        api
            .get("/attendances")
            .then((res) => {
                setAttendances(res.data);
                console.log(res.data)
            })
            .catch((err) => {
                console.error(err);
            });
    }, [user]);

    const selectedEventSavedStatus = attendances.find((attendance) => attendance.event_id === selectedEvent.id)?.status;

    const eventStartDate = (event) => {
        const start = new Date(event.date);
        if (event.time_hour) {
            start.setHours(
                (Number(event.time_hour) % 12) + (event.time_ampm === "PM" ? 12 : 0),
                Number(event.time_minute) || 0, 0, 0
            );
        } else {
            start.setHours(0, 0, 0, 0);
        }
        return start;
    };
    const hasEventStarted = (event) => eventStartDate(event) <= new Date();

    const sortedEvents = [...events].sort((a, b) => eventStartDate(b) - eventStartDate(a));
    const startedEvents = events.filter(hasEventStarted);

    const eventsWithPresentAttendance = attendances.filter((attendance) => attendance.status === "present");
    const attendanceRatePercentage = startedEvents.length
        ? ((eventsWithPresentAttendance.length / startedEvents.length) * 100).toFixed(2)
        : "0.00";

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
                                        Attendance Compliance
                                    </h3>
                                    <p className="text-sm text-subtext mt-0.5">
                                        Current Standing Period: 2026
                                    </p>
                                </div>
                                {attendanceRatePercentage >= 80 && (
                                    <div className="bg-green-bg border border-green-border px-3 py-1 rounded-full flex items-center gap-1.5">                                        <>
                                        <span className="w-2 h-2 rounded-full bg-green" />
                                        <span className="font-geist text-xs font-bold uppercase text-green">
                                            Compliant
                                        </span>
                                    </>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <span className="font-geist text-sm font-semibold text-subtext">
                                        Attendance Rate
                                    </span>
                                    <span className="font-geist text-3xl font-bold text-blue">
                                        {attendanceRatePercentage}%
                                    </span>
                                </div>
                                <div className="h-3.5 w-full bg-progress-ring-track rounded-full overflow-hidden relative">
                                    {/* 80% threshold marker */}
                                    <div className="absolute h-full w-0.5 bg-red z-10 left-[80%]" />
                                    {/* progress bar */}
                                    <div className="h-full bg-blue rounded-full transition-all duration-500" style={{ width: attendanceRatePercentage + "%" }} />
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
                                    {startedEvents.length}
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
                                    {eventsWithPresentAttendance.length}
                                </span>
                                <span className="font-geist text-xs text-subtext mt-1.5 font-semibold uppercase tracking-wider">
                                    Attended
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* attendance list*/}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                        <div className="space-y-4">
                            {loading && (
                                <div className="flex flex-col items-center justify-center py-16 text-subtext gap-3">
                                    <span className="material-symbols-outlined text-[36px]! animate-spin text-blue">
                                        progress_activity
                                    </span>
                                    <p className="font-geist text-sm">Loading attendance records...</p>
                                </div>
                            )}
                            {sortedEvents.map((event) => {
                                const started = hasEventStarted(event);
                                let currentStatus = "unset";
                                let userAlreadyHaveRecord = false;
                                let currentAttendance = null;

                                for (const attendance of attendances) {
                                    if (attendance.event_id === event.id) {
                                        currentStatus = attendance.status;
                                        userAlreadyHaveRecord = true;
                                        currentAttendance = attendance;
                                        break;
                                    }
                                }

                                const displayStatus = selectedEvent.id === event.id ? selectedEvent.unsaved_status : currentStatus;

                                return (
                                    <div key={event.id} className="bg-white border border-blue-border rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm card-hover-level">
                                        <div className="flex items-center gap-4">

                                            {/* status icon */}
                                            {!started && (
                                                <div className="w-12 h-12 rounded-lg bg-surface-container-highest border border-blue-border flex items-center justify-center text-subtext shrink-0">
                                                    <span className="material-symbols-outlined text-[24px]!">hourglass_top</span>
                                                </div>
                                            )}
                                            {started && displayStatus === "unset" && (
                                                <div className="w-12 h-12 rounded-lg bg-blue-bg border border-blue-border flex items-center justify-center text-blue shrink-0">
                                                    <span className="material-symbols-outlined text-[24px]!">border_color</span>
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

                                            <div>
                                                <div className="font-geist text-lg text-text font-semibold">
                                                    {event.title}
                                                </div>
                                                <p className="text-sm text-subtext flex items-center gap-1 mt-0.5">
                                                    <span className="material-symbols-outlined text-[16px]!">
                                                        calendar_today
                                                    </span>
                                                    {formatDate(event.date)}
                                                    {event.time_hour && ` ${event.time_hour}:${event.time_minute} ${event.time_ampm}`}
                                                </p>
                                                {(currentStatus === "present" || currentStatus === "late") &&
                                                    currentAttendance?.timein_hour && (
                                                        <p className="text-sm text-subtext flex items-center gap-1 mt-0.5">
                                                            <span className="material-symbols-outlined text-[16px]!">
                                                                schedule
                                                            </span>
                                                            Time In: {currentAttendance.timein_hour}:{currentAttendance.timein_minute} {currentAttendance.timein_ampm}
                                                        </p>
                                                    )}
                                            </div>
                                        </div>

                                        {!started ? (
                                            <div className="px-3 h-9 rounded bg-surface-container-low border border-blue-border text-subtext text-xs font-bold flex items-center justify-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]!">hourglass_top</span>
                                                <span>Not Yet Started</span>
                                            </div>
                                        ) : (
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
                                                    </>
                                                ) : (
                                                    <>
                                                        {displayStatus === "present" ? (
                                                            <button className="min-w-10 px-2 h-9 rounded bg-green-bg border border-green-border text-green text-xs font-bold flex items-center justify-center gap-1">
                                                                <span>Present</span>
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleSelectEvent(event, "present")}
                                                                className="min-w-10 px-2 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-highest transition-colors text-xs font-bold cursor-pointer"
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
                                                                onClick={() => handleSelectEvent(event, "absent")}
                                                                className="min-w-10 px-2 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-highest transition-colors text-xs font-bold cursor-pointer"
                                                            >
                                                                <span>Absent</span>
                                                            </button>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                            {userAlreadyHaveRecord ? (
                                                currentAttendance?.correction_requested ? (
                                                    <span className="font-geist text-xs text-subtext font-bold">
                                                        Correction Requested
                                                    </span>
                                                ) : (
                                                    <button
                                                        onClick={() => handleRequestCorrection(currentAttendance.id)}
                                                        className="font-geist text-xs text-blue font-bold hover:underline cursor-pointer"
                                                    >
                                                        Request Correction
                                                    </button>
                                                )
                                            ) : (
                                                <div className={userAlreadyHaveRecord || displayStatus === "unset" ? "hidden" : "flex gap-1 mt-2 justify-end"}>
                                                    <button
                                                        onClick={() => {
                                                            setFormData(initialFormData);
                                                            if (displayStatus === "absent") setIsAbsentAttendanceDialogOpen(true);
                                                            else setIsPresentAttendanceDialogOpen(true);
                                                        }}
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
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>

            {/* present attendance dialog */}
            {isPresentAttendanceDialogOpen && (
                <div onClick={() => { }} className="fixed inset-0 z-50 flex items-center justify-center bg-text/20 p-4">
                    <form key={selectedEvent.id} onSubmit={(e) => handlePresentAttendanceDialogSubmit(e)}
                        className="w-full max-w-xl max-h-[90vh] overflow-y-auto glass-bg border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
                        <div className="flex items-center gap-3 mb-2 border-b border-blue-border/40 pb-3">
                            <button type="button" className="min-w-10 px-2 h-9 rounded bg-green-bg border border-green-border text-green text-sm font-bold flex items-center justify-center gap-1">
                                <span className="material-symbols-outlined text-[16px]!">check</span>
                                <span>Present</span>
                            </button>
                            <legend className="font-geist text-lg font-bold text-text">
                                {selectedEvent?.title || "event name here idk"}
                            </legend>

                        </div>

                        {/* proof of attendance */}
                        <div>
                            <label className="block font-geist text-sm font-semibold text-text mb-1">
                                Proof of Attendance{" "}
                                <span className="text-red">*</span>
                            </label>
                            <p className="text-sm text-subtext mb-2">
                                Kindly upload a screenshot or a photo captured during event.
                            </p>
                            <input
                                type="file"
                                name="proof_of_attendance"
                                onChange={handleChange}
                                // required
                                accept=".pdf,.png,.jpg,.jpeg"
                                className="block w-full text-sm text-subtext file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:font-geist file:font-bold file:bg-blue/10 file:text-blue hover:file:bg-blue/20 file:transition-all cursor-pointer border border-blue-border rounded-xl p-1"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="timein_hour" className="w-fit font-geist text-md font-semibold text-text mb-1">
                                Time in<span className="text-red">*</span>
                            </label>
                            <div className="w-full flex flex-row justify-between gap-2">
                                {/* time in */}
                                <div className="w-fit flex items-center gap-1">
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        id="timein_hour"
                                        name="timein_hour"
                                        value={formData.timein_hour || ""}
                                        onChange={handleChange}
                                        onBlur={handleTimeMakeSure2Digits}
                                        placeholder={selectedEvent.time_hour}
                                        maxLength="2"
                                        required
                                        className="w-18 px-4 py-2.5 rounded-xl border border-blue-border bg-white text-text focus:ring-1 focus:ring-blue outline-none transition-all"
                                    />
                                    <span>:</span>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        id="timein_minute"
                                        name="timein_minute"
                                        value={formData.timein_minute || ""}
                                        onChange={handleChange}
                                        onBlur={handleTimeMakeSure2Digits}
                                        placeholder={selectedEvent.time_minute}
                                        maxLength="2"
                                        required
                                        className="w-18 px-4 py-2.5 rounded-xl border border-blue-border bg-white text-text focus:ring-1 focus:ring-blue outline-none transition-all"
                                    />
                                    <div className="flex flex-col">
                                        <select
                                            name="timein_ampm"
                                            id="timein_ampm"
                                            value={formData.timein_ampm || "AM"}
                                            onChange={handleChange}
                                            className="w-fit px-4 py-2.5 rounded-xl border border-blue-border bg-white text-text focus:ring-1 focus:ring-blue outline-none transition-all"
                                        >
                                            <option value="AM">AM</option>
                                            <option value="PM">PM</option>
                                        </select>
                                    </div>
                                </div>
                                {/* dialog buttons */}
                                <div className="w-fit flex flex-row items-center justify-end gap-2">
                                    <button type="submit" className="gap-2 flex items-center justify-center px-4 py-2.5 rounded-xl border bg-blue text-white font-geist font-bold hover:bg-blue/80 transition-all active:scale-[0.98] cursor-pointer">
                                        <span className="material-symbols-outlined text-[16px]!">save</span>
                                        <span>Save</span>
                                    </button>
                                    <button type="button" onClick={() => setIsPresentAttendanceDialogOpen(false)} className="gap-2 flex items-center justify-center px-4 py-2.5 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-highest transition-all cursor-pointer">
                                        <span>Cancel</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {/* absent attendance dialog */}
            {isAbsentAttendanceDialogOpen && (
                <div onClick={() => { }} className="fixed inset-0 z-50 flex items-center justify-center bg-text/20 p-4">
                    <form key={selectedEvent.id} onSubmit={(e) => handleAbsentAttendanceDialogSubmit(e)}
                        className="w-full max-w-xl max-h-[90vh] overflow-y-auto glass-bg border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
                        <div className="flex items-center gap-3 mb-2 border-b border-blue-border/40 pb-3">
                            <button type="button" className="min-w-10 px-2 h-9 rounded bg-red-bg border border-red-border text-red text-sm font-bold flex items-center justify-center gap-1">
                                <span className="material-symbols-outlined text-[16px]!">close</span>
                                <span>Absent</span>
                            </button>
                            <legend className="font-geist text-lg font-bold text-text">
                                {selectedEvent?.title || "event name here idk"}
                            </legend>

                        </div>

                        {/* reason for absence */}
                        <div>
                            <label htmlFor="absent_reason" className="block font-geist text-sm font-semibold text-text mb-1">
                                Reason for Absence{" "}
                                <span className="text-red">*</span>
                            </label>
                            <p className="text-sm text-subtext mb-2">
                                Kindly explain why you were unable to attend. This will be reviewed by the officers.
                            </p>
                            <textarea
                                id="absent_reason"
                                name="absent_reason"
                                value={formData.absent_reason || ""}
                                onChange={handleChange}
                                rows={4}
                                required
                                placeholder="Explain why you were unable to attend"
                                className="w-full px-4 py-2.5 rounded-xl border border-blue-border bg-white text-text placeholder:text-subtext focus:ring-1 focus:ring-blue outline-none transition-all"
                            />
                        </div>

                        {/* supporting document */}
                        <div>
                            <label className="block font-geist text-sm font-semibold text-text mb-1">
                                Supporting Document
                            </label>
                            <p className="text-sm text-subtext mb-2">
                                Optional. Upload a medical certificate or any document that supports your reason.
                            </p>
                            <input
                                type="file"
                                name="absent_supporting_image"
                                onChange={handleChange}
                                accept=".pdf,.png,.jpg,.jpeg"
                                className="block w-full text-sm text-subtext file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:font-geist file:font-bold file:bg-blue/10 file:text-blue hover:file:bg-blue/20 file:transition-all cursor-pointer border border-blue-border rounded-xl p-1"
                            />
                        </div>

                        {/* dialog buttons */}
                        <div className="w-full flex flex-row items-center justify-end gap-2">
                            <button type="submit" className="gap-2 flex items-center justify-center px-4 py-2.5 rounded-xl border bg-blue text-white font-geist font-bold hover:bg-blue/80 transition-all active:scale-[0.98] cursor-pointer">
                                <span className="material-symbols-outlined text-[16px]!">save</span>
                                <span>Save</span>
                            </button>
                            <button type="button" onClick={() => setIsAbsentAttendanceDialogOpen(false)} className="gap-2 flex items-center justify-center px-4 py-2.5 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-highest transition-all cursor-pointer">
                                <span>Cancel</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* late attendance dialog */}
            {isLateAttendanceDialogOpen && (
                <div onClick={() => { }} className="fixed inset-0 z-50 flex items-center justify-center bg-text/20 p-4">
                    <form key={selectedEvent.id} onSubmit={(e) => handleLateAttendanceDialogSubmit(e)}
                        className="w-full max-w-xl max-h-[90vh] overflow-y-auto glass-bg border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
                        <div className="flex items-center gap-3 mb-2 border-b border-blue-border/40 pb-3">
                            <button type="button" className="min-w-10 px-2 h-9 rounded bg-yellow-bg border border-yellow-border text-yellow text-sm font-bold flex items-center justify-center gap-1">
                                <span className="material-symbols-outlined text-[16px]!">schedule</span>
                                <span>Late</span>
                            </button>
                            <legend className="font-geist text-lg font-bold text-text">
                                {selectedEvent?.title || "event name here idk"}
                            </legend>

                        </div>

                        {/* reason for being late */}
                        <div>
                            <label htmlFor="late_reason" className="block font-geist text-sm font-semibold text-text mb-1">
                                Reason for Being Late{" "}
                                <span className="text-red">*</span>
                            </label>
                            <p className="text-sm text-subtext mb-2">
                                The event started at <span className="font-bold text-text">{selectedEvent.time_hour}:{selectedEvent.time_minute} {selectedEvent.time_ampm}</span>.
                                Your time in is <span className="font-bold text-text">{formData.timein_hour}:{formData.timein_minute} {formData.timein_ampm}</span>.<br />
                                This is more than 5 minutes. Kindly explain why you were late. This will be reviewed by the officers.
                            </p>
                            <textarea
                                id="late_reason"
                                name="late_reason"
                                value={formData.late_reason || ""}
                                onChange={handleChange}
                                rows={4}
                                required
                                placeholder="Explain why you were late"
                                className="w-full px-4 py-2.5 rounded-xl border border-blue-border bg-white text-text placeholder:text-subtext focus:ring-1 focus:ring-blue outline-none transition-all"
                            />
                        </div>

                        {/* supporting document */}
                        <div>
                            <label className="block font-geist text-sm font-semibold text-text mb-1">
                                Supporting Document
                            </label>
                            <p className="text-sm text-subtext mb-2">
                                Optional. Upload any document or photo that supports your reason.
                            </p>
                            <input
                                type="file"
                                name="late_supporting_image"
                                onChange={handleChange}
                                accept=".pdf,.png,.jpg,.jpeg"
                                className="block w-full text-sm text-subtext file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:font-geist file:font-bold file:bg-blue/10 file:text-blue hover:file:bg-blue/20 file:transition-all cursor-pointer border border-blue-border rounded-xl p-1"
                            />
                        </div>

                        {/* dialog buttons */}
                        <div className="w-full flex flex-row items-center justify-end gap-2">
                            <button type="button" onClick={() => { setIsLateAttendanceDialogOpen(false); setIsPresentAttendanceDialogOpen(true); }} className="gap-2 flex items-center justify-center px-4 py-2.5 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-highest transition-all cursor-pointer">
                                <span>Back</span>
                            </button>
                            <button type="submit" className="gap-2 flex items-center justify-center px-4 py-2.5 rounded-xl border bg-blue text-white font-geist font-bold hover:bg-blue/80 transition-all active:scale-[0.98] cursor-pointer">
                                <span className="material-symbols-outlined text-[16px]!">save</span>
                                <span>Save</span>
                            </button>

                        </div>
                    </form>
                </div>
            )}

            {/* confirm save dialog  */}
            {isConfirmSaveDialogOpen && (
                <div onClick={() => { }} className="fixed inset-0 z-60 flex items-center justify-center bg-text/20 p-4">
                    <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto">
                        <div className="glass-bg border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-4">
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
                                    Once saved, it will be reviewed by the officers. You can still request correction afterwards.
                                </p>

                                <div className="mt-3 space-y-4 max-h-[45vh] overflow-y-auto">
                                    <p className="font-geist text-sm font-bold text-text">
                                        {selectedEvent?.title}
                                    </p>
                                    <ul className="mt-1 ml-5 list-disc space-y-0.5 text-sm text-subtext">
                                        <li>
                                            <span className="capitalize line-through">
                                                {selectedEventSavedStatus ?? "no record"}
                                            </span>{" "}
                                            &rarr;{" "}
                                            <span
                                                className={`font-semibold capitalize ${formData.status === "present"
                                                    ? "text-green"
                                                    : formData.status === "absent"
                                                        ? "text-red"
                                                        : "text-yellow"
                                                    }`}
                                            >
                                                {formData.status}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-full flex items-center">
                                    <div className="flex flex-col sm:flex-row flex-1 items-center justify-end gap-2">
                                        <button onClick={() => { setIsConfirmSaveDialogOpen(false) }} className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-highest transition-all cursor-pointer">
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

            <BottomNav />
        </>

    );
}