import { useState, useEffect } from "react";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import api from "../../api/axios";

export default function Attendance() {
    const [attendances, setAttendances] = useState({});
    const [events, setEvents] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const selectedStatus = selectedEvent ? (attendances[selectedEvent.id] || "unset") : "unset";

    useEffect(() => {
        api
            .get("/events")
            .then((res) => {
                setEvents(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const setStatus = (id, status) => {
        setAttendances((prev) => ({
            ...prev,
            [id]: status,
        }));
    };
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
                        <div className="flex justify-between items-center">
                            <h3 className="font-geist text-2xl font-bold text-text">
                                Recent Events
                            </h3>
                        </div>

                        {/* attendance dialog */}
                        {isDialogOpen && (
                            <div
                                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                                onClick={() => setIsDialogOpen(false)}
                            >
                                <div
                                    className="w-full max-w-xl max-h-[90vh] overflow-y-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <form onSubmit={(e) => { e.preventDefault(); setIsDialogOpen(false); }} className="space-y-6">
                                        <fieldset className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-4">
                                            <div className="flex items-center gap-3 mb-2 border-b border-blue-border/40 pb-3">
                                                <legend className="font-geist text-lg font-bold text-text">
                                                    {selectedEvent?.title || "event name here idk"}
                                                </legend>

                                                {selectedStatus === "present" && (
                                                    <button type="button" className="min-w-10 px-2 h-9 rounded bg-green-bg border border-green-border text-green text-xs font-bold flex items-center justify-center gap-1">
                                                        <div className="md:hidden">
                                                            <span className="material-symbols-outlined text-[14px]!">
                                                                check
                                                            </span>{" "}
                                                        </div>
                                                        <span>Present</span>
                                                    </button>
                                                )}

                                                {selectedStatus === "late" && (
                                                    <button type="button" className="min-w-10 px-2 h-9 rounded bg-yellow-bg border border-yellow-border text-yellow text-xs font-bold flex items-center justify-center gap-1">
                                                        <div className="md:hidden">
                                                            <span className="material-symbols-outlined text-[14px]!">
                                                                schedule
                                                            </span>{" "}
                                                        </div>
                                                        <span>Late</span>
                                                    </button>
                                                )}

                                                {selectedStatus === "absent" && (
                                                    <button type="button" className="min-w-10 px-2 h-9 rounded bg-red-bg border border-red-border text-red text-xs font-bold flex items-center justify-center gap-1">
                                                        <div className="md:hidden">
                                                            <span className="material-symbols-outlined text-[14px]!">
                                                                close
                                                            </span>{" "}
                                                        </div>
                                                        <span>Absent</span>
                                                    </button>
                                                )}

                                            </div>

                                            {/* proof of attendance */}
                                            <div>
                                                <label className="block font-geist text-sm font-semibold text-text mb-1">
                                                    Proof of Attendance{" "}
                                                    <span className="text-red">*</span>
                                                </label>
                                                <p className="text-sm text-subtext mb-2">
                                                    This event is set to need a proof of attendance. Kindly upload a screenshot or a photo captured during event.
                                                </p>
                                                <input
                                                    type="file"
                                                    name="proof_of_attendance"
                                                    // required
                                                    accept=".pdf,.png,.jpg,.jpeg"
                                                    className="block w-full text-sm text-subtext file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:font-geist file:font-bold file:bg-blue/10 file:text-blue hover:file:bg-blue/20 file:transition-all cursor-pointer border border-blue-border rounded-xl p-1"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <label htmlFor="timein" className="w-fit font-geist text-md font-semibold text-text mb-1">
                                                    Time in<span className="text-red">*</span>
                                                </label>
                                                <div className="w-full flex items-center">
                                                    {/* time in */}
                                                    <div className="flex items-center gap-1">
                                                        <input
                                                            type="number"
                                                            id="timein"
                                                            name="timein"
                                                            placeholder="08"
                                                            min="0"
                                                            max="23"
                                                            required
                                                            className="w-18 px-4 py-2.5 rounded-xl border border-blue-border bg-white text-text focus:ring-1 focus:ring-blue outline-none transition-all"
                                                        />
                                                        <span>:</span>
                                                        <input
                                                            type="number"
                                                            id="timein"
                                                            name="timein"
                                                            placeholder="00"
                                                            min="0"
                                                            max="59"
                                                            required
                                                            className="w-18 px-4 py-2.5 rounded-xl border border-blue-border bg-white text-text focus:ring-1 focus:ring-blue outline-none transition-all"
                                                        />
                                                        <div className="flex flex-col">
                                                            <select name="ampm" id="ampm" className="w-fit px-4 py-2.5 rounded-xl border border-blue-border bg-white text-text focus:ring-1 focus:ring-blue outline-none transition-all">
                                                                <option value="AM">AM</option>
                                                                <option value="PM">PM</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row flex-1 items-center justify-end gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => setIsDialogOpen(false)}
                                                            className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-low transition-all cursor-pointer"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setIsDialogOpen(false)}
                                                            className="w-full sm:w-auto bg-blue text-white hover:bg-blue transition-all font-geist text-sm font-bold px-8 py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] active:opacity-50 cursor-pointer"
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]!">save</span>
                                                            <span>Save</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* confirm save dialog  */}
                        <div
                            className="w-full max-w-xl max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <form onSubmit={(e) => { e.preventDefault(); setIsDialogOpen(false); }} className="space-y-6">
                                <fieldset className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-4">

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
                                        <div className="w-full flex items-center">
                                            <div className="flex flex-col sm:flex-row flex-1 items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsDialogOpen(false)}
                                                    className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-low transition-all cursor-pointer"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsDialogOpen(false)}
                                                    className="w-full sm:w-auto bg-blue text-white hover:bg-blue transition-all font-geist text-sm font-bold px-8 py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] active:opacity-50 cursor-pointer"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]!">save</span>
                                                    <span>Save</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </fieldset>
                            </form>
                        </div>


                        {/* recorded */}
                        <div className="space-y-4">
                            <div className="bg-white border border-blue-border rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm card-hover-level">
                                <div className="flex items-center gap-4">
                                    {/* desktop only icons */}
                                    <div className="hidden md:flex">
                                        {/* present icon */}
                                        <div className="w-12 h-12 rounded-lg bg-green-bg border border-green-border flex items-center justify-center text-green shrink-0">
                                            <span className="material-symbols-outlined text-[24px]!">
                                                check
                                            </span>
                                        </div>

                                        {/* late icon */}
                                        <div className="w-12 h-12 rounded-lg bg-yellow-bg border border-yellow-border flex items-center justify-center text-yellow shrink-0">
                                            <span className="material-symbols-outlined text-[24px]!">
                                                schedule
                                            </span>
                                        </div>

                                        {/* absent icon */}
                                        <div className="w-12 h-12 rounded-lg bg-red-bg border border-red-border flex items-center justify-center text-red shrink-0">
                                            <span className="material-symbols-outlined text-[24px]!">
                                                close
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-geist text-lg text-text font-semibold">
                                            Emergency Drill
                                        </h4>
                                        <p className="text-sm text-subtext flex items-center gap-1 mt-0.5">
                                            <span className="material-symbols-outlined text-[16px]!">
                                                calendar_today
                                            </span>{" "}
                                            Sep 28, 2026 • 02:00 PM
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto justify-between sm:justify-start">

                                    {/* attendance marks */}
                                    <div className="flex">
                                        {/* active present */}
                                        <button className="min-w-10 px-2 h-9 rounded bg-green-bg border border-green-border text-green text-xs font-bold flex items-center justify-center gap-1">
                                            <div className="md:hidden">
                                                <span className="material-symbols-outlined text-[14px]!">
                                                    check
                                                </span>{" "}
                                            </div>
                                            <span>Present</span>
                                        </button>

                                        {/* active late */}
                                        <button className="min-w-10 px-2 h-9 rounded bg-yellow-bg border border-yellow-border text-yellow text-xs font-bold flex items-center justify-center gap-1">
                                            <div className="md:hidden">
                                                <span className="material-symbols-outlined text-[14px]!">
                                                    schedule
                                                </span>{" "}
                                            </div>
                                            <span>Late</span>
                                        </button>

                                        {/* active absent */}
                                        <button className="min-w-10 px-2 h-9 rounded bg-red-bg border border-red-border text-red text-xs font-bold flex items-center justify-center gap-1">
                                            <div className="md:hidden">
                                                <span className="material-symbols-outlined text-[14px]!">
                                                    close
                                                </span>{" "}
                                            </div>
                                            <span>Absent</span>
                                        </button>


                                    </div>
                                    <button className="font-geist text-xs text-blue font-bold hover:underline cursor-pointer">
                                        Request Correction
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* editable */}
                        <div className="space-y-4">
                            {events.map((event) => {
                                const eventId = event.id;
                                const currentStatus = attendances[eventId] || "unset";

                                return (
                                    <div key={eventId} className="bg-white border border-blue-border rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm card-hover-level">
                                        <div className="flex items-center gap-4">

                                            {/* desktop only icons */}
                                            <div className="hidden md:flex">
                                                {currentStatus === "unset" && (
                                                    <div className="w-12 h-12 rounded-lg bg-blue-bg border border-blue-border flex items-center justify-center text-blue shrink-0">
                                                        <span className="material-symbols-outlined text-[24px]!">
                                                            edit
                                                        </span>
                                                    </div>
                                                )}

                                                {currentStatus === "present" && (
                                                    <div className="w-12 h-12 rounded-lg bg-green-bg border border-green-border flex items-center justify-center text-green shrink-0">
                                                        <span className="material-symbols-outlined text-[24px]!">
                                                            check
                                                        </span>
                                                    </div>
                                                )}

                                                {currentStatus === "late" && (
                                                    <div className="w-12 h-12 rounded-lg bg-yellow-bg border border-yellow-border flex items-center justify-center text-yellow shrink-0">
                                                        <span className="material-symbols-outlined text-[24px]!">
                                                            schedule
                                                        </span>
                                                    </div>
                                                )}

                                                {currentStatus === "absent" && (
                                                    <div className="w-12 h-12 rounded-lg bg-red-bg border border-red-border flex items-center justify-center text-red shrink-0">
                                                        <span className="material-symbols-outlined text-[24px]!">
                                                            close
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <h4 className="font-geist text-lg text-text font-semibold">
                                                    {event.title}
                                                </h4>
                                                <p className="text-sm text-subtext flex items-center gap-1 mt-0.5">
                                                    <span className="material-symbols-outlined text-[16px]!">
                                                        calendar_today
                                                    </span>{" "}
                                                    {event.date_time}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto justify-between sm:justify-start">

                                            {/* attendance marks */}
                                            <div className="flex gap-1">
                                                {currentStatus === "present" ? (
                                                    <button className="min-w-10 px-2 h-9 rounded bg-green-bg border border-green-border text-green text-xs font-bold flex items-center justify-center gap-1">
                                                        <div className="md:hidden">
                                                            <span className="material-symbols-outlined text-[14px]!">
                                                                check
                                                            </span>{" "}
                                                        </div>
                                                        <span>Present</span>
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => setStatus(eventId, "present")}
                                                        className="w-9 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-high transition-colors text-xs font-bold cursor-pointer"
                                                    >
                                                        P
                                                    </button>
                                                )}

                                                {currentStatus === "late" ? (
                                                    <button className="min-w-10 px-2 h-9 rounded bg-yellow-bg border border-yellow-border text-yellow text-xs font-bold flex items-center justify-center gap-1">
                                                        <div className="md:hidden">
                                                            <span className="material-symbols-outlined text-[14px]!">
                                                                schedule
                                                            </span>{" "}
                                                        </div>
                                                        <span>Late</span>
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => setStatus(eventId, "late")}
                                                        className="w-9 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-high transition-colors text-xs font-bold cursor-pointer"
                                                    >
                                                        L
                                                    </button>
                                                )}

                                                {currentStatus === "absent" ? (
                                                    <button className="min-w-10 px-2 h-9 rounded bg-red-bg border border-red-border text-red text-xs font-bold flex items-center justify-center gap-1">
                                                        <div className="md:hidden">
                                                            <span className="material-symbols-outlined text-[14px]!">
                                                                close
                                                            </span>{" "}
                                                        </div>
                                                        <span>Absent</span>
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => setStatus(eventId, "absent")}
                                                        className="w-9 h-9 rounded bg-surface-container-highest text-subtext hover:bg-surface-container-high transition-colors text-xs font-bold cursor-pointer"
                                                    >
                                                        A
                                                    </button>
                                                )}

                                            </div>
                                            <div className="flex gap-1 mt-1">
                                                <button
                                                    onClick={() => {
                                                        setSelectedEvent(event);
                                                        setIsDialogOpen(true);
                                                    }}
                                                    className={currentStatus === "unset" ? "hidden" : "flex items-center justify-center gap-1 p-1 px-4 rounded bg-blue text-white hover:bg-blue/80 transition-colors text-xs font-bold cursor-pointer"}
                                                >
                                                    <span className="material-symbols-outlined text-[14px]">check</span>
                                                    <span>Save</span>
                                                </button>

                                                <button
                                                    onClick={() => setStatus(eventId, "unset")}
                                                    className={currentStatus === "unset" ? "hidden" : "flex items-center justify-center gap-1 p-1 px-4 rounded border border-blue text-blue hover:bg-blue/80 transition-colors text-xs font-bold cursor-pointer"}
                                                >
                                                    <span className="material-symbols-outlined text-[14px]">history</span>
                                                    <span>Reset</span>
                                                </button>
                                            </div>
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