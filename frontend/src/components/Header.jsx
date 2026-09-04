import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import AccountDropdown from "./AccountDropdown";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { user, isLoggedIn } = useAuth();
    const role = user?.role;

    const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) 
                setAccountDropdownOpen(false);
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [accountDropdownOpen]);

    return (
        <header className="glass-bg sticky top-0 w-full z-50 border-b border-blue-border/60 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue/10 flex items-center justify-center text-blue">
                        <span className="material-symbols-outlined text-[24px]">shield</span>
                    </div>
                    <div>
                        <h1 className="font-geist text-2xl font-bold text-blue flex items-center gap-2">
                            DRRT Portal
                            <span className="font-geist text-xs text-blue font-semibold bg-blue-bg px-2 py-0.5 rounded-full uppercase tracking-wider">
                                LVCC
                            </span>
                        </h1>
                    </div>
                </div>

                {/* officer role */}
                {role === "officer" ? (
                    <nav className="hidden md:flex items-center gap-8 font-geist text-subtext">
                        <a href="#" className="hover:text-blue transition-colors py-1">
                            Dashboard
                        </a>
                        <a href="#" className="hover:text-blue transition-colors py-1">
                            Attendance
                        </a>
                        <a href="#" className="text-blue font-bold border-b-2 border-blue py-1">
                            Roster
                        </a>
                        <a href="#" className="hover:text-blue transition-colors py-1">
                            Vault
                        </a>
                        <a href="#" className="hover:text-blue transition-colors py-1">
                            Training
                        </a>
                    </nav>
                ) : role === "member" ? (
                    <nav className="hidden md:flex items-center gap-8 font-geist text-subtext">
                        <NavLink to="/member/dashboard" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            Dashboard
                        </NavLink>
                        <NavLink to="/member/attendance" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            Attendance
                        </NavLink>
                        <NavLink to="/" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            Training
                        </NavLink>
                        <NavLink to="/" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            Alerts
                        </NavLink>
                        <NavLink to="/" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            ID Card
                        </NavLink>
                    </nav>
                ) : (
                    <nav className="hidden md:flex items-center gap-8 font-geist text-subtext">
                        {/* public */}
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
                )}


                <div className="flex items-center gap-3">
                    <Link to="/login-register" className={`${isLoggedIn ? "hidden" : ""} font-geist text-sm bg-blue text-white hover:bg-blue transition-all px-5 py-2 rounded-full font-semibold shadow-sm active:scale-95`}>
                        Login
                    </Link>
                    <div ref={dropdownRef} className="relative">
                        <button onClick={() => setAccountDropdownOpen(!accountDropdownOpen)} className={`${isLoggedIn ? "" : "hidden"} cursor-pointer w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-blue-border shrink-0`}>
                            <img
                                className="w-full h-full object-cover"
                                alt="Security Officer Avatar"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoIok9cQ3NXBCVrAd2Wwn8DNTgQY92hX9UjJf-Srf_LSbQl6NryNTLqIt5UMLRw7zn_mnlkvz_cwvLk47nUaxjifBfkhPI9t2eq-aiFkrdQxnJQS-ss-yTgCqHWQkes6kdju4v_hSo6_bxqCxAtXDjNn7ZuGAIz85-mZg1dCCS0itCt0idcpbHZEb5blpMEGqWxmZSinf2A2TJNOK28e5mWM_Ps_w5--MQhdWPjIkTVyLNqK9m39WwRQ"
                            />
                        </button>
                        <AccountDropdown navigate={navigate} isOpen={accountDropdownOpen} />
                    </div>
                </div>
            </div>
        </header>
    )
}