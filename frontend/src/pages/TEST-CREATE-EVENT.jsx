import Header from "../components/Header"
import BottomNav from "../components/BottomNav"
import { useState, useEffect } from "react";
import api from "../api/axios";

export default function CreateEvent() {
    
    const [events, setEvents] = useState([]);
    const initialFormData = {
        title: "",
        description: "",
        date: "",
        time: "",
        type: "",
        participants: "",
        "venue-onsite": "",
        "venue-online": "",
        require_proof_of_attendance: false,
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        api
            .post("/events", formData)
            .then((res) => {
                setFormData(initialFormData);
                api.get("/events").then((res) => setEvents(res.data));
            })
            .catch((err) => console.error(err));
    };

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

    return (
        <>
            <Header />
            <div className="p-5 flex flex-row justify-center items-top gap-5">
                <form className="p-10 px-24 flex flex-col flex-1 gap-3 w-fit" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="event title"
                    />
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="event description"
                    />
                    <input
                        type="text"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        placeholder="event date"
                    />
                    <input
                        type="text"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        placeholder="event time"
                    />
                    event type:
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="type"
                                value="drill"
                                checked={formData.type === "drill"}
                                onChange={handleChange}
                            /> drill
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="type"
                                value="meeting"
                                checked={formData.type === "meeting"}
                                onChange={handleChange}
                            /> meeting
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="type"
                                value="deployment"
                                checked={formData.type === "deployment"}
                                onChange={handleChange}
                            /> deployment
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="type"
                                value="others"
                                checked={formData.type === "others" || Boolean(formData.type && !["drill", "meeting", "deployment"].includes(formData.type))}
                                onChange={handleChange}
                            /> others 
                            <input
                                type="text"
                                placeholder="specify.."
                                name="type"
                                value={!["drill", "meeting", "deployment"].includes(formData.type) ? formData.type : ""}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <input
                        type="text"
                        name="participants"
                        value={formData.participants}
                        onChange={handleChange}
                        placeholder="event participants like teachers, BSIS 1 students, etc idk"
                    />

                    <div className="flex flex-row flex-nowrap md:w-50 gap-5">
                        <div className="border-black border">
                            onsite:
                            <input
                                type="text"
                                name="venue-onsite"
                                value={formData["venue-onsite"]}
                                onChange={handleChange}
                                placeholder="event location"
                            />
                        </div>

                        <div className="border-black border min-w-100">
                            online:
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="venue-online"
                                        value="gmeet"
                                        checked={formData["venue-online"] === "gmeet"}
                                        onChange={handleChange}
                                    /> Google Meet
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="venue-online"
                                        value="zoom"
                                        checked={formData["venue-online"] === "zoom"}
                                        onChange={handleChange}
                                    /> Zoom
                                </label>
                            </div>
                        </div>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            name="require_proof_of_attendance"
                            checked={formData.require_proof_of_attendance}
                            onChange={handleChange}
                            className="mt-1 w-5 h-5 border-blue-border text-blue focus:ring-blue rounded-md"
                        />
                        require proof of attendance
                    </label>
                    <button type="submit" className="p-3 cursor-pointer bg-blue text-white active:bg-blue-bg">add event</button>
                    event list:
                    {[...events].reverse().map((event) => (
                        <div key={event.id} className="flex flex-col gap-3 border p-4">
                            <input type="text" value={event.title || ""} readOnly placeholder="event title" />
                            <input type="text" value={event.description || ""} readOnly placeholder="event description" />
                            <input type="text" value={event.date || ""} readOnly placeholder="event date" />
                            <input type="text" value={event.time || ""} readOnly placeholder="event time" />
                            event type:
                            <div>
                                <label>
                                    <input type="radio" checked={event.type === "drill"} disabled /> drill
                                </label>
                                <label>
                                    <input type="radio" checked={event.type === "meeting"} disabled /> meeting
                                </label>
                                <label>
                                    <input type="radio" checked={event.type === "deployment"} disabled /> deployment
                                </label>
                                <label>
                                    <input type="radio" checked={Boolean(event.type && !["drill", "meeting", "deployment"].includes(event.type))} disabled /> others 
                                    <input type="text" value={!["drill", "meeting", "deployment"].includes(event.type) ? (event.type || "") : ""} readOnly placeholder="specify.." />
                                </label>
                            </div>
                            <input type="text" value={event.participants || ""} readOnly placeholder="event participants like teachers, BSIS 1 students, etc idk" />

                            <div className="flex flex-row flex-nowrap md:w-50 gap-5">
                                <div className="border-black border">
                                    onsite:
                                    <input type="text" value={event["venue-onsite"] || ""} readOnly placeholder="event location" />
                                </div>

                                <div className="border-black border min-w-100">
                                    online:
                                    <div>
                                        <label>
                                            <input type="radio" checked={event["venue-online"] === "gmeet"} disabled /> Google Meet
                                        </label>
                                        <label>
                                            <input type="radio" checked={event["venue-online"] === "zoom"} disabled /> Zoom
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <label className="flex items-start gap-3">
                                <input type="checkbox" checked={Boolean(event.require_proof_of_attendance)} disabled className="mt-1 w-5 h-5 border-blue-border text-blue focus:ring-blue rounded-md" />
                                require proof of attendance
                            </label>
                        </div>
                    ))}

                </form>


                <details className="flex flex-col gap-2 gap-5 w-fit">
                    <summary>ui designs that will display events</summary>
                    <p>events page</p>
                    <article className="bg-white border border-blue-border/80 rounded-2xl shadow-sm overflow-hidden card-hover transition-all duration-300 flex flex-col md:flex-row">
                        {/* Event Image */}
                        <div className="md:w-5/12 h-48 md:h-auto relative shrink-0">
                            <img
                                className="w-full h-full object-cover"
                                alt="Campus Earthquake Drill"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjebMw4hZSsLgSu_mvDQiLCZ3iroKxWAW_iL1foPbOWulxOv2nXYMm49Q5ISFxL-bbtBNtRUjeP0HR100IKfgO_INmjx36DeP7-BJhhg9mtv7dLi6KThOv8_5AD9KoJaehg9xPm_Ff6Mn-sB44caydRr0W6wtoZ3S641hns01Mrew6xQVjSwhRU8W_3sAnse96xLxeNDj_b1ns3vCHITx8cCFEl74tpoqa9LXt_NYhwO5axx-NmHpW7Q"
                            />
                            <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full border border-blue-border/60 shadow-sm flex items-center gap-1.5 text-yellow font-geist text-xs font-bold uppercase tracking-wider">
                                <span className="material-symbols-outlined text-[15px] filled-icon">
                                    warning
                                </span>
                                <span>Campus Drill</span>
                            </div>
                        </div>
                        {/* Event Details */}
                        <div className="p-6 md:p-8 md:w-7/12 flex flex-col justify-between space-y-5">
                            <div>
                                <h3 className="font-geist text-xl md:text-2xl font-bold text-text leading-snug">
                                    Campus-Wide Earthquake Preparedness Simulation
                                </h3>
                                {/* Metadata List */}
                                <div className="space-y-2 mt-4 text-subtext text-sm">
                                    <div className="flex items-center gap-2.5">
                                        <span className="material-symbols-outlined text-blue text-[18px]">
                                            calendar_today
                                        </span>
                                        <span>Oct 15, 2024 • 10:00 AM - 12:00 PM</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <span className="material-symbols-outlined text-blue text-[18px]">
                                            location_on
                                        </span>
                                        <span>Main Quad &amp; Surrounding Campus Buildings</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <span className="material-symbols-outlined text-blue text-[18px]">
                                            group
                                        </span>
                                        <span>All Students, Faculty, and Staff</span>
                                    </div>
                                </div>
                                {/* Expectations Note Box */}
                                <div className="bg-surface-container-low p-4 rounded-xl border border-blue-border/50 mt-4">
                                    <h4 className="font-geist text-xs font-bold text-text uppercase tracking-wider mb-1">
                                        What to expect
                                    </h4>
                                    <p className="text-sm text-subtext leading-relaxed">
                                        Sirens will activate at 10:00 AM. Practice 'Drop, Cover, and
                                        Hold On'. Proceed directly to designated Assembly Areas upon
                                        instruction.
                                    </p>
                                </div>
                            </div>
                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <button className="flex-1 bg-blue text-white font-geist text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue transition-colors shadow-sm active:scale-[0.98]">
                                    <span className="material-symbols-outlined text-[18px]">
                                        event
                                    </span>
                                    <span>Add to Calendar</span>
                                </button>
                                <button className="flex-1 bg-surface border border-blue-border text-blue hover:bg-surface-container-low font-geist text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-[0.98]">
                                    <span className="material-symbols-outlined text-[18px]">
                                        description
                                    </span>
                                    <span>View Guidelines</span>
                                </button>
                            </div>
                        </div>
                    </article>
                    <article className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-sm card-hover transition-all duration-300 space-y-5">
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
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button className="sm:w-auto px-8 bg-blue text-white font-geist text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue transition-colors shadow-sm active:scale-[0.98]">
                                <span className="material-symbols-outlined text-[18px]">
                                    how_to_reg
                                </span>
                                <span>Register Now</span>
                            </button>
                        </div>
                    </article>
                    <p>member dashboard page</p>
                    <div class="bg-white border border-blue-border rounded-xl p-4 shadow-sm hover:border-yellow transition-all flex flex-col justify-between md:col-span-2 lg:col-span-1"><div><div class="flex justify-between items-start mb-1"><h2 class="font-geist text-sm text-subtext flex items-center gap-2 font-bold uppercase tracking-wider"><span class="material-symbols-outlined text-yellow text-[20px]">event_upcoming</span> Upcoming Event</h2><span class="bg-yellow-bg text-yellow border border-yellow-border text-xs font-geist px-2 py-0.5 rounded uppercase font-bold">Required</span></div><h3 class="font-geist text-2xl-mobile font-bold text-text mt-2">Foundation Week 2027</h3><p class="text-base text-subtext flex items-center gap-1.5 mt-1"><span class="material-symbols-outlined text-[18px]">schedule</span> Jan 1, 2027 08:00 AM</p></div><button class="w-full mt-4 bg-surface-container-low border border-blue-border text-text h-10 rounded-lg font-geist text-sm flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors font-semibold"><span class="material-symbols-outlined text-[18px]">calendar_add_on</span> Add to Calendar</button></div>
                    <p>officer attendance page</p>
                    <section class="bg-white border border-blue-border p-4 rounded-xl shadow-sm space-y-2"><div class="flex items-start justify-between"><div><p class="font-geist text-xs text-blue uppercase tracking-wider font-bold">Event</p><div class="flex flex-row gap-3"><h2 class="font-geist text-2xl font-semibold text-text mt-1">Earthquake Drill 2026</h2><span class="inline-flex items-center gap-1.5 bg-blue/10 text-blue px-2.5 my-1.5 rounded font-geist text-xs uppercase font-semibold"><span class="w-2 h-2 rounded-full bg-blue animate-pulse"></span> Live</span></div><p class="text-sm md:text-sm text-subtext mt-1">October 24, 2026 • 8:00 AM</p></div></div><div class="flex items-center gap-2 text-subtext border-t border-blue-border pt-3 mt-3"><span class="material-symbols-outlined text-[18px]!">location_on</span><p class="text-sm font-medium">LVCC Main Campus</p></div><div class="flex flex-wrap p-3 gap-x-4 gap-y-2 justify-between items-center text-sm shadow-sm rounded-xl"><div class="font-geist text-sm text-text font-semibold">Checked In: <span class="text-blue font-bold">112 / 142</span></div><div class="flex gap-4 text-xs font-geist"><div class="font-bold flex items-center gap-1.5 text-green"><span class="w-2 h-2 rounded-full bg-green"></span> Present: 102</div><div class="font-bold flex items-center gap-1.5 text-yellow"><span class="w-2 h-2 rounded-full bg-yellow"></span> Late: 10</div><div class="font-bold flex items-center gap-1.5 text-red"><span class="w-2 h-2 rounded-full bg-red"></span> Absent: 30</div></div></div></section>
                </details>
            </div>

            <BottomNav />
        </>
    )
}