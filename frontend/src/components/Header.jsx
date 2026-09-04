import { Link, NavLink, useLocation } from "react-router-dom";
import AccountDropdown from "./AccountDropdown";
import { useAuth } from "../context/AuthContext";

export default function Header() {
    const { pathname } = useLocation();
    const { isLoggedIn } = useAuth();

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

                {pathname.startsWith("/officer") ? (
                    <nav className="hidden md:flex items-center gap-8 font-geist text-subtext">
                        <NavLink to="/officer/dashboard" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            Dashboard
                        </NavLink>
                        <NavLink to="/officer/attendance" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            Attendance
                        </NavLink>
                        <NavLink to="/officer/roster" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            Roster
                        </NavLink>
                        <NavLink to="/" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            Vault
                        </NavLink>
                        <NavLink to="/" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            Training
                        </NavLink>
                    </nav>
                ) : pathname.startsWith("/member") ? (
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
                        <NavLink to="/member/training" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            Training
                        </NavLink>
                        <NavLink to="/member/announcements" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            Announcements
                        </NavLink>
                        <NavLink to="/member/id" className={({ isActive }) =>
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
                    {isLoggedIn && <AccountDropdown />}
                </div>
            </div>
        </header>
    )
}