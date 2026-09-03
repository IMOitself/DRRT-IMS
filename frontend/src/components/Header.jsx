import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import AccountDropdown from "./AccountDropdown";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Header() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
        api
            .get("/user") // TODO: other backend url only for checking if user is logged in
            .then((res) => {
                setIsLoggedIn(true);
            })
            .catch((err) => {
                if (err.response.status !== 401) return; // unauthorized
                localStorage.removeItem("token");
                setIsLoggedIn(false);
            });
    }, []);

    const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

    return (
        <header className="glass-header sticky top-0 w-full z-50 border-b border-blue-border/60 shadow-sm">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8 h-16 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue/10 flex items-center justify-center text-blue">
                        <span className="material-symbols-outlined text-[24px]">shield</span>
                    </div>
                    <div>
                        <h1 className="font-headline-md text-headline-md font-bold text-blue flex items-center gap-2">
                            DRRT Portal
                            <span className="font-label-sm text-label-sm text-blue font-semibold bg-blue-bg px-2 py-0.5 rounded-full uppercase tracking-wider">
                                LVCC
                            </span>
                        </h1>
                    </div>
                </div>
                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center gap-8 font-label-md text-subtext" aria-label="Main Navigation">
                    <NavLink to="/" className={({ isActive }) =>
                        isActive
                            ? "text-blue font-bold border-b-2 border-blue py-1"
                            : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                    }>
                        Home
                    </NavLink>
                    <NavLink to="/events" className={({ isActive }) =>
                        isActive
                            ? "text-blue font-bold border-b-2 border-blue py-1"
                            : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                    }>
                        Events
                    </NavLink>
                    <NavLink to="/join" className={() => {
                        const isActive = pathname === "/join" || pathname.startsWith("/join-form"); // include join-form id too e.g join-form/67
                        return isActive
                            ? "text-blue font-bold border-b-2 border-blue py-1"
                            : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                    }}>
                        Join
                    </NavLink>
                </nav>
                <div className="flex items-center gap-3">
                    <Link to="/login-register" className={`${isLoggedIn ? "hidden" : ""} font-label-md text-label-md bg-blue text-white hover:bg-blue transition-all px-5 py-2 rounded-full font-semibold shadow-sm active:scale-95`}>
                        Login
                    </Link>
                    <button onClick={() => setAccountDropdownOpen(!accountDropdownOpen)} className={`${isLoggedIn ? "" : "hidden"} cursor-pointer w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-blue-border flex-shrink-0`}>
                        <img
                            className="w-full h-full object-cover"
                            alt="Security Officer Avatar"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoIok9cQ3NXBCVrAd2Wwn8DNTgQY92hX9UjJf-Srf_LSbQl6NryNTLqIt5UMLRw7zn_mnlkvz_cwvLk47nUaxjifBfkhPI9t2eq-aiFkrdQxnJQS-ss-yTgCqHWQkes6kdju4v_hSo6_bxqCxAtXDjNn7ZuGAIz85-mZg1dCCS0itCt0idcpbHZEb5blpMEGqWxmZSinf2A2TJNOK28e5mWM_Ps_w5--MQhdWPjIkTVyLNqK9m39WwRQ"
                        />
                    </button>
                </div>
            </div>
            <AccountDropdown navigate={navigate} isOpen={accountDropdownOpen} />
        </header>
    )
}