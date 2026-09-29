import Header from "../components/Header"
import BottomNav from '../components/BottomNav';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { formatDate } from "../utils/format";

export default function Home() {
    const navigate = useNavigate();

    const { user, isLoggedIn } = useAuth();
    const [copied, setCopied] = useState(false);

    let dashboardLink = "/member/dashboard";
    if (user?.role === "officer") dashboardLink = "/officer/dashboard";
    if (user?.role === "adviser") dashboardLink = "/adviser/dashboard";
    const [events, setEvents] = useState([]);
    const contact1 = "09123456789";
    const contact2 = "09123456789";
    const contact3 = "09123456789";
    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    useEffect(() => {
        api
        .get("/events")
        .then((res) => {
            setEvents(res.data.reverse());
        })
        .catch((err) => {
            console.error(err);
        });
    
    }, [isLoggedIn, user]);

    return (
        <>
            <title>Home - DRRT Portal</title>
            <Header />

            <div className="grow w-full">
                {/* Main Container */}
                <main className="max-w-5xl mx-auto w-full px-4 md:px-8 py-6 md:py-8 pb-28 md:pb-12 space-y-6 md:space-y-8">
                    {/* Hero Banner Card */}
                    <section className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-10 shadow-sm relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue/5 rounded-bl-full pointer-events-none" />
                        <div className="max-w-2xl space-y-3">
                            <span className="font-geist text-md font-bold text-blue tracking-wider uppercase bg-blue-bg/60 px-3 py-1 rounded-full">
                                DRRT – LVCC Apalit Chapter
                            </span>
                            <h1 className="font-geist text-3xl md:text-5xl font-bold text-text tracking-tight mt-3">
                                Preparedness Starts Here
                            </h1>
                            <p className="text-base text-subtext leading-relaxed pt-1">
                                Promoting disaster awareness, emergency response readiness, and
                                proactive safety across our entire campus community.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center md:justify-start">
                                <Link to={isLoggedIn ? dashboardLink : "/join"} className="bg-blue text-white hover:bg-blue/70 transition-all font-geist text-md font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98]">
                                    <span className="material-symbols-outlined text-[18px]!">
                                        {isLoggedIn ? "dashboard" : "person_add"}
                                    </span>
                                    <span>{isLoggedIn ? "Go To Dashboard" : "Join DRRT Team"}</span>
                                </Link>
                            </div>
                        </div>
                        <div className="hidden lg:flex shrink-0 w-44 h-44 rounded-full bg-blue/10 border-2 border-blue/20 items-center justify-center text-blue shadow-inner">
                            <span className="material-symbols-outlined text-[80px]! filled-icon">
                                health_and_safety
                            </span>
                        </div>
                    </section>
                    
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <article className="bg-white rounded-2xl p-6 border border-blue-border/80 shadow-sm card-hover transition-all flex flex-col justify-between space-y-4 group">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center text-blue shrink-0">
                                        <span className="material-symbols-outlined text-[20px]! filled-icon">
                                            call
                                        </span>
                                    </div>
                                    <h3 className="font-geist text-lg font-bold text-text">
                                        Emergency Hotline
                                    </h3>
                                </div>
                                <div className="space-y-3 text-sm">

                                    <div className="flex items-center justify-between p-2.5 bg-surface rounded-xl border border-blue-border/40">
                                        <span className="font-semibold text-text shrink-0">
                                            Change Me
                                        </span>
                                        <button className="flex min-w-0 text-sm items-center gap-1 font-bold text-blue hover:underline group-hover:underline cursor-pointer bg-blue-bg px-2 py-1 rounded-lg active:scale-95"
                                            onClick={() => copyToClipboard(contact1)}>
                                            <span className="font-mono truncate">
                                                {contact1}
                                            </span>
                                            <span className="material-symbols-outlined text-blue text-[16px]! hover:bg-blue-bg rounded-lg">
                                                {copied ? "" : "content_copy"}
                                            </span>
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between p-2.5 bg-surface rounded-xl border border-blue-border/40">
                                        <span className="font-semibold text-text shrink-0">
                                            Change Me
                                        </span>
                                        <button className="flex min-w-0 text-sm items-center gap-1 font-bold text-blue hover:underline cursor-pointer bg-blue-bg px-2 py-1 rounded-lg active:scale-95"
                                            onClick={() => copyToClipboard(contact2)}>
                                            <span className="font-mono truncate">
                                                {contact2}
                                            </span>
                                            <span className="material-symbols-outlined text-blue text-[16px]! hover:bg-blue-bg rounded-lg">
                                                {copied ? "" : "content_copy"}
                                            </span>
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between p-2.5 bg-surface rounded-xl border border-blue-border/40">
                                        <span className="font-semibold text-text shrink-0">
                                            Change Me
                                        </span>
                                        <button className="flex min-w-0 text-sm items-center gap-1 font-bold text-blue hover:underline cursor-pointer bg-blue-bg px-2 py-1 rounded-lg active:scale-95"
                                            onClick={() => copyToClipboard(contact3)}>
                                            <span className="font-mono truncate">
                                                {contact3}
                                            </span>
                                            <span className="material-symbols-outlined text-blue text-[16px]! hover:bg-blue-bg rounded-lg">
                                                {copied ? "" : "content_copy"}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <article className="bg-white rounded-2xl p-6 border border-blue-border/80 shadow-sm card-hover transition-all flex flex-col justify-between space-y-4 relative overflow-hidden group">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-green/10 flex items-center justify-center text-green shrink-0">
                                        <span className="material-symbols-outlined text-[20px]! filled-icon">
                                            person_add
                                        </span>
                                    </div>
                                    <h3 className="font-geist text-lg font-bold text-text">
                                        Be a DRRT Member
                                    </h3>
                                </div>
                                <p className="text-md text-subtext leading-relaxed">
                                    Do you have a passion in helping others and want to volunteer on something meaningful? <br/>
                                    Become a DRRT member now! <br/>
                                    Click the button below to learn more.
                                </p>
                            </div>
                            <Link to="/join" className="font-geist text-sm font-bold text-blue hover:text-blue/80 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                <span>Read Full Guide</span>
                                <span className="material-symbols-outlined text-[18px]!">
                                    arrow_forward
                                </span>
                            </Link>
                        </article>
                        <article className="bg-white rounded-2xl p-6 border border-blue-border/80 shadow-sm card-hover transition-all flex flex-col justify-between space-y-4">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-yellow/10 flex items-center justify-center text-yellow shrink-0">
                                        <span className="material-symbols-outlined text-[20px]! filled-icon">
                                            campaign
                                        </span>
                                    </div>
                                    <h3 className="font-geist text-lg font-bold text-text">
                                        Upcoming Events
                                    </h3>
                                </div>
                                <div className="space-y-3">
                                    {events.length === 0 ? (
                                        <p className="text-xs text-subtext text-center">No upcoming events.</p>
                                    ) : (
                                        events.map((event) => {
                                            const [month, day] = formatDate(event.date).split(" ");
                                            return (
                                                <div key={event.id} className="flex items-center gap-3 p-2 bg-surface rounded-xl border border-blue-border/40">
                                                    <div className="bg-surface-container-high text-subtext rounded-lg px-2.5 py-1 text-center shrink-0">
                                                        <span className="font-geist text-[10px] font-bold uppercase block">
                                                            {month?.slice(0, 3) || "Event"}
                                                        </span>
                                                        <span className="font-geist text-sm font-bold block leading-none">
                                                            {String(parseInt(day) || "--").padStart(2, "0")}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-geist text-xs font-bold text-text">
                                                            {event.title}
                                                        </h4>
                                                        <p className="text-[12px] text-subtext line-clamp-2">
                                                            {event.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </article>
                    </section>

                    {/* Bottom Join DRRT Banner */}
                    <section className="bg-surface-container border border-blue-border/80 rounded-2xl p-6 md:p-8 text-center space-y-3 shadow-sm card-hover transition-all group">
                        <h2 className="font-geist text-xl md:text-2xl font-bold text-blue">
                            Become Part of DRRT
                        </h2>
                        <p className="text-sm text-subtext max-w-xl mx-auto leading-relaxed">
                            Join our team of dedicated student responders and help build a
                            resilient and secure campus environment for everyone.
                        </p>
                        <div className="pt-2">
                            <Link to="/join" className="bg-blue text-white hover:bg-blue/70 group-hover:bg-blue/70 transition-transform font-geist text-sm font-bold px-8 py-3 rounded-xl shadow-md active:scale-[0.98]">
                                View Membership Guide
                            </Link>
                        </div>
                    </section>
                </main>
            </div>

            <BottomNav />
        </>

    )
}