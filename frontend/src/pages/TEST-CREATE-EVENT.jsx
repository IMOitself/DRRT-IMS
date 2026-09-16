import Header from "../components/Header"
import BottomNav from "../components/BottomNav"
import { useState } from "react";

export default function CreateEvent() {

    const [formData, setFormData] = useState({
        event_name: "",
        event_date: "",
        event_time: "",
        event_location: "",
        event_description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // api
        //     .post("/membership-applications", formData)
        //     .then((res) => {
        //         localStorage.removeItem(AUTO_SAVED_FORM_DATA_KEY);
        //         navigate(`/join-form/${res.data.application_id}`);
        //     })
        //     .catch((err) => console.error(err));
    }

    return (
        <>
            <Header />
            <div className="p-5 flex flex-row justify-center items-top gap-5">
                <form className="p-5 flex flex-col flex-1 gap-3 border-blue border rounded-xl w-fit" onSubmit={handleSubmit}>
                    <input type="text" placeholder="event name" />
                    <input type="text" placeholder="event date" />
                    <input type="text" placeholder="event time" />
                    <input type="text" placeholder="event location" />
                    <input type="text" placeholder="event description" />
                    <button type="submit" className="cursor-pointer hover:bg-blue-bg">add event</button>
                    event list idk:

                </form>
                <div className="flex flex-col gap-2 flex-2 gap-5">
                    <p>events page</p>
                    <article class="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-sm card-hover transition-all duration-300 space-y-5"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2"><div class="flex items-center gap-2 text-blue"><span class="material-symbols-outlined text-[18px] filled-icon">videocam</span><span class="font-geist text-xs font-bold uppercase tracking-wider">Open Webinar</span></div><span class="font-geist text-xs font-semibold text-subtext bg-surface-container-high px-2.5 py-1 rounded-full w-fit">Virtual Event</span></div><div><h3 class="font-geist text-xl md:text-2xl font-bold text-text">Severe Weather Readiness Briefing</h3><div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-subtext text-sm"><div class="flex items-center gap-2.5"><span class="material-symbols-outlined text-blue text-[18px]">calendar_today</span><span>Nov 02, 2024 • 6:00 PM</span></div><div class="flex items-center gap-2.5"><span class="material-symbols-outlined text-blue text-[18px]">laptop_mac</span><span>Online (Zoom Webinar)</span></div><div class="flex items-center gap-2.5"><span class="material-symbols-outlined text-blue text-[18px]">public</span><span>Open to General Public</span></div></div></div><div class="bg-surface-container-low p-4 rounded-xl border border-blue-border/50"><h4 class="font-geist text-xs font-bold text-text uppercase tracking-wider mb-1">Briefing Overview</h4><p class="text-sm text-subtext leading-relaxed">A 45-minute presentation by the regional meteorological team on emergency preparedness and weather safety, followed by a 15-minute live Q&amp;A on personal kit assembly.</p></div><div class="flex flex-col sm:flex-row gap-3 pt-2"><button class="sm:w-auto px-8 bg-blue text-white font-geist text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue transition-colors shadow-sm active:scale-[0.98]"><span class="material-symbols-outlined text-[18px]">how_to_reg</span><span>Register Now</span></button></div></article>
                    <p>member dashboard page</p>
                    <div class="bg-white border border-blue-border rounded-xl p-4 shadow-sm hover:border-yellow transition-all flex flex-col justify-between md:col-span-2 lg:col-span-1"><div><div class="flex justify-between items-start mb-1"><h2 class="font-geist text-sm text-subtext flex items-center gap-2 font-bold uppercase tracking-wider"><span class="material-symbols-outlined text-yellow text-[20px]">event_upcoming</span> Upcoming Event</h2><span class="bg-yellow-bg text-yellow border border-yellow-border text-xs font-geist px-2 py-0.5 rounded uppercase font-bold">Required</span></div><h3 class="font-geist text-2xl-mobile font-bold text-text mt-2">Foundation Week 2027</h3><p class="text-base text-subtext flex items-center gap-1.5 mt-1"><span class="material-symbols-outlined text-[18px]">schedule</span> Jan 1, 2027 08:00 AM</p></div><button class="w-full mt-4 bg-surface-container-low border border-blue-border text-text h-10 rounded-lg font-geist text-sm flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors font-semibold"><span class="material-symbols-outlined text-[18px]">calendar_add_on</span> Add to Calendar</button></div>
                    <p>officer attendance page</p>
                    <section class="bg-white border border-blue-border p-4 rounded-xl shadow-sm space-y-2"><div class="flex items-start justify-between"><div><p class="font-geist text-xs text-blue uppercase tracking-wider font-bold">Event</p><div class="flex flex-row gap-3"><h2 class="font-geist text-2xl font-semibold text-text mt-1">Earthquake Drill 2026</h2><span class="inline-flex items-center gap-1.5 bg-blue/10 text-blue px-2.5 my-1.5 rounded font-geist text-xs uppercase font-semibold"><span class="w-2 h-2 rounded-full bg-blue animate-pulse"></span> Live</span></div><p class="text-sm md:text-sm text-subtext mt-1">October 24, 2026 • 8:00 AM</p></div></div><div class="flex items-center gap-2 text-subtext border-t border-blue-border pt-3 mt-3"><span class="material-symbols-outlined text-[18px]!">location_on</span><p class="text-sm font-medium">LVCC Main Campus</p></div><div class="flex flex-wrap p-3 gap-x-4 gap-y-2 justify-between items-center text-sm shadow-sm rounded-xl"><div class="font-geist text-sm text-text font-semibold">Checked In: <span class="text-blue font-bold">112 / 142</span></div><div class="flex gap-4 text-xs font-geist"><div class="font-bold flex items-center gap-1.5 text-green"><span class="w-2 h-2 rounded-full bg-green"></span> Present: 102</div><div class="font-bold flex items-center gap-1.5 text-yellow"><span class="w-2 h-2 rounded-full bg-yellow"></span> Late: 10</div><div class="font-bold flex items-center gap-1.5 text-red"><span class="w-2 h-2 rounded-full bg-red"></span> Absent: 30</div></div></div></section>
                </div>
            </div>




            <BottomNav />
        </>
    )
}