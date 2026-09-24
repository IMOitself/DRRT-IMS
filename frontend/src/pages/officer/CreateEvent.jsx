import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import api from "../../api/axios";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

export default function CreateEvent() {
    const navigate = useNavigate();
    // editing when the events page passes an event
    const editEvent = useLocation().state?.event;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState(() => {
        const defaults = {
            title: "",
            description: "",
            date: "",
            time_hour: "",
            time_minute: "",
            time_ampm: "AM",
            type: "meeting", // default
            participants: "",
            venue_facetoface: "",
            venue_online: "",
            require_proof_of_attendance: false,
        };
        if (!editEvent) return defaults;
        // keep only form fields, nulls fall back to defaults
        return Object.fromEntries(
            Object.keys(defaults).map((key) => [key, editEvent[key] ?? defaults[key]])
        );
    });

    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleVenueOnline = (platform) =>
        setFormData((prev) => ({
            ...prev,
            venue_online: prev.venue_online === platform ? "" : platform,
            venue_facetoface: prev.venue_online === platform ? prev.venue_facetoface : "",
        }));

    const handleVenueFacetoface = (e) =>
        setFormData((prev) => ({
            ...prev,
            venue_facetoface: e.target.value,
            venue_online: e.target.value ? "" : prev.venue_online,
        }));

    // time fields are always 2 digits
    const handleTimeMakeSure2Digits = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value.padStart(2, "0") });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (editEvent) await api.put(`/events/${editEvent.id}`, formData);
            else await api.post("/events", formData);
            navigate("/officer/events");
        } catch (err) {
            console.error(err);
            alert(`Failed to ${editEvent ? "save" : "create"} event. Please try again.`);
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <title>Create Event - DRRT Officer Portal</title>
            <Header />

            <div className="grow w-full">
                <main className="max-w-3xl mx-auto w-full px-4 md:px-8 py-6 md:py-8 pb-28 md:pb-12 space-y-6">
                    {/* Back Link */}
                    <Link to="/officer/events" className="inline-flex items-center gap-2 text-blue font-geist font-semibold hover:underline">
                        <span className="material-symbols-outlined text-[18px]!">arrow_back</span>
                        <span>Back to Events</span>
                    </Link>

                    {/* Header Card */}
                    <section className="bg-white border border-blue-border/80 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-2 border-b border-blue-border/40 pb-4">
                            <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center text-blue shrink-0">
                                <span className="material-symbols-outlined text-[22px]! filled-icon">event_available</span>
                            </div>
                            <div>
                                <h1 className="font-geist text-xl md:text-2xl font-bold text-text">{editEvent ? "Edit Event" : "Create New Event"}</h1>
                                <p className="text-sm text-subtext">Publish a new drill, meeting, or deployment to the DRRT roster.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 mt-6">

                            {/* General Details */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block font-geist text-sm font-bold text-text mb-1.5">Event Title <span className="text-red">*</span></label>
                                    <input type="text" name="title" required value={formData.title} onChange={handleChange} placeholder="e.g. Foundation Week" className="w-full px-4 py-2.5 rounded-xl border border-blue-border bg-surface text-text focus:ring-2 focus:ring-blue/30 focus:border-blue outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block font-geist text-sm font-bold text-text mb-1.5">Description <span className="text-red">*</span></label>
                                    <textarea name="description" required rows="3" value={formData.description} onChange={handleChange} placeholder="What is this event about?" className="w-full px-4 py-2.5 rounded-xl border border-blue-border bg-surface text-text focus:ring-2 focus:ring-blue/30 focus:border-blue outline-none transition-all" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-geist text-sm font-bold text-text mb-1.5">Date <span className="text-red">*</span></label>
                                        <input type="date" name="date" required value={formData.date} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-blue-border bg-surface text-text focus:ring-2 focus:ring-blue/30 focus:border-blue outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block font-geist text-sm font-bold text-text mb-1.5">Start Time <span className="text-red">*</span></label>
                                        <div className="flex items-center gap-1">
                                            <input type="text" inputMode="numeric" name="time_hour" required maxLength="2" placeholder="08" value={formData.time_hour} onChange={handleChange} onBlur={handleTimeMakeSure2Digits} className="w-18 px-4 py-2.5 rounded-xl border border-blue-border bg-surface text-text focus:ring-2 focus:ring-blue/30 focus:border-blue outline-none transition-all" />
                                            <span>:</span>
                                            <input type="text" inputMode="numeric" name="time_minute" required maxLength="2" placeholder="00" value={formData.time_minute} onChange={handleChange} onBlur={handleTimeMakeSure2Digits} className="w-18 px-4 py-2.5 rounded-xl border border-blue-border bg-surface text-text focus:ring-2 focus:ring-blue/30 focus:border-blue outline-none transition-all" />
                                            <select name="time_ampm" value={formData.time_ampm} onChange={handleChange} className="px-4 py-2.5 rounded-xl border border-blue-border bg-surface text-text focus:ring-2 focus:ring-blue/30 focus:border-blue outline-none transition-all">
                                                <option value="AM">AM</option>
                                                <option value="PM">PM</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Classification */}
                            <div className="pt-4 border-t border-blue-border/40">
                                <label className="block font-geist text-sm font-bold text-text mb-3">Event Classification</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {['drill', 'meeting', 'deployment', 'others'].map((typeOption) => (
                                        <label key={typeOption} className={`border rounded-xl p-3 flex flex-col items-center gap-1 cursor-pointer transition-all ${formData.type === typeOption ? 'border-blue bg-blue-bg text-blue' : 'border-blue-border bg-white text-subtext hover:bg-surface-container-low'}`}>
                                            <input type="radio" name="type" value={typeOption} checked={formData.type === typeOption} onChange={handleChange} className="hidden" />
                                            <span className="font-geist text-xs font-bold uppercase tracking-wider">{typeOption}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Venue & Logistics */}
                            <div className="pt-4 border-t border-blue-border/40 space-y-4">
                                <div>
                                    <label className="block font-geist text-sm font-bold text-text mb-1.5">Target Participants <span className="text-red">*</span></label>
                                    <input type="text" name="participants" required value={formData.participants} onChange={handleChange} placeholder="e.g. All DRRT Members, BSIS 3rd Year" className="w-full px-4 py-2.5 rounded-xl border border-blue-border bg-surface text-text focus:ring-2 focus:ring-blue/30 focus:border-blue outline-none transition-all" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-geist text-sm font-bold text-text mb-1.5">On-Site Venue</label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-subtext text-[20px]!">location_on</span>
                                            <input type="text" name="venue_facetoface" value={formData.venue_facetoface} onChange={handleVenueFacetoface} placeholder="e.g. Audi Lobby" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-blue-border bg-surface text-text focus:ring-2 focus:ring-blue/30 focus:border-blue outline-none transition-all" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block font-geist text-sm font-bold text-text mb-1.5">Online Platform</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {[["gmeet", "Google Meet"], ["zoom", "Zoom"]].map(([value, label]) => (
                                                <button
                                                    key={value}
                                                    type="button"
                                                    onClick={() => handleVenueOnline(value)}
                                                    className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border font-geist text-sm font-semibold outline-none transition-all cursor-pointer ${formData.venue_online === value ? "border-blue bg-blue/10 text-blue" : "border-blue-border bg-surface text-subtext hover:border-blue"}`}
                                                >
                                                    <span className="material-symbols-outlined text-[20px]!">videocam</span>
                                                    {label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="pt-4 border-t border-blue-border/40">
                                <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border border-blue-border bg-surface hover:bg-surface-container-low transition-colors">
                                    <input type="checkbox" name="require_proof_of_attendance" checked={formData.require_proof_of_attendance} onChange={handleChange} className="w-5 h-5 border-blue-border text-blue focus:ring-blue rounded-md" />
                                    <div>
                                        <p className="font-geist text-sm font-bold text-text">Require Proof of Attendance</p>
                                        <p className="text-xs text-subtext mt-0.5">Members must upload a selfie/screenshot when logging their attendance.</p>
                                    </div>
                                </label>
                            </div>

                            {/* Submit */}
                            <div className="pt-6">
                                <button type="submit" disabled={isSubmitting} className="w-full bg-blue text-white hover:bg-blue/90 transition-all font-geist font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 cursor-pointer">
                                    {editEvent
                                        ? (isSubmitting ? "Saving Event..." : "Save Event")
                                        : (isSubmitting ? "Publishing Event..." : "Publish Event")}
                                    <span className="material-symbols-outlined text-[20px]!">campaign</span>
                                </button>
                            </div>

                        </form>
                    </section>
                </main>
            </div>

            <BottomNav />
        </>
    );
}