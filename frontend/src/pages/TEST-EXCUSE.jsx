import Header from "../components/Header"
import BottomNav from '../components/BottomNav';
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Excuse() {
    const { user } = useAuth();

    const [events, setEvents] = useState([]);
    const [eventId, setEventId] = useState("");
    const [reason, setReason] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!eventId || !reason.trim()) {
            setError("Please select an event and provide a reason.");
            return;
        }

        setSubmitting(true);
        try {
            await api.post("/absence-excuses", {
                event_id: eventId,
                reason: reason.trim(),
            });
            setSuccess(true);
            setEventId("");
            setReason("");
        } catch (err) {
            console.error(err);
            setError("Failed to submit excuse. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <title>Submit Absence Excuse - DRRT Portal</title>
            <Header />

            <div className="grow w-full">
                <main className="max-w-5xl mx-auto w-full px-4 md:px-8 py-6 md:py-8 pb-28 md:pb-12 space-y-6 md:space-y-8">
                    <section className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-10 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center text-blue shrink-0">
                                <span className="material-symbols-outlined text-[20px]! filled-icon">
                                    event_busy
                                </span>
                            </div>
                            <h1 className="font-geist text-xl md:text-2xl font-bold text-text">
                                Submit Absence Excuse
                            </h1>
                        </div>

                        {success ? (
                            <div className="p-4 bg-green/10 border border-green/20 rounded-xl">
                                <p className="font-geist text-sm font-bold text-green">
                                    Your absence excuse has been submitted and is pending review.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <label htmlFor="event" className="font-geist text-sm font-bold text-text">
                                        Event
                                    </label>
                                    <select
                                        id="event"
                                        value={eventId}
                                        onChange={(e) => setEventId(e.target.value)}
                                        className="w-full p-2.5 bg-surface rounded-xl border border-blue-border/40 text-sm text-text focus:outline-none focus:ring-2 focus:ring-blue/40"
                                    >
                                        <option value="">Select an event</option>
                                        {events.map((event) => (
                                            <option key={event.id} value={event.id}>
                                                {event.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="reason" className="font-geist text-sm font-bold text-text">
                                        Reason
                                    </label>
                                    <textarea
                                        id="reason"
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        rows={4}
                                        placeholder="Explain why you were unable to attend"
                                        className="w-full p-2.5 bg-surface rounded-xl border border-blue-border/40 text-sm text-text placeholder:text-subtext focus:outline-none focus:ring-2 focus:ring-blue/40"
                                    />
                                </div>

                                {error && (
                                    <p className="text-sm text-red-600 font-geist">{error}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="bg-blue text-white hover:bg-blue/70 transition-all font-geist text-md font-bold px-6 py-3 rounded-xl shadow-md active:scale-[0.98] disabled:opacity-60"
                                >
                                    {submitting ? "Submitting..." : "Submit Excuse"}
                                </button>
                            </form>
                        )}
                    </section>
                </main>
            </div>

            <BottomNav />
        </>
    )
}