import { Link, NavLink, useLocation } from "react-router-dom";
import AccountDropdown from "./AccountDropdown";
import { useAuth } from "../context/AuthContext";

export default function Header() {
    const { pathname } = useLocation();
    const { isLoggedIn, user } = useAuth();

    const is_public_pages = pathname === "/" || pathname === "/join" || pathname.startsWith("/join-form");

    let dashboardLink = "/member/dashboard";
    if (user?.role === "officer") dashboardLink = "/officer/dashboard";
    if (user?.role === "adviser") dashboardLink = "/adviser/dashboard";

    return (
        <header className="glass-bg sticky top-0 w-full z-50 border-b border-blue-border/60 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex justify-between items-center">
                <div className="flex items-center gap-1 md:gap-3">
                    <div className="flex w-9 h-9 rounded-full bg-blue/10 flex items-center justify-center text-blue">
                        <span className="material-symbols-outlined text-[24px]!">shield</span>
                    </div>
                    <div>
                        <h1 className="font-geist text-lg md:text-xl font-bold text-blue flex items-center gap-2">
                            DRRT 
                            <span className="hidden lg:inline">Portal</span>
                            <span className="font-geist text-sm text-blue font-semibold bg-blue-bg px-2 py-0.5 rounded-full uppercase tracking-wider">
                                LVCC
                            </span>
                        </h1>
                    </div>
                </div>

                {pathname.startsWith("/adviser") ? (
                    <nav className="hidden md:flex items-center gap-8 font-geist text-subtext">
                        <NavLink to="/adviser/dashboard" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            Dashboard
                        </NavLink>
                        <NavLink to="/adviser/vault" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            Vault
                        </NavLink>
                        <NavLink to="/adviser/bylaws" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            Bylaws
                        </NavLink>
                        <NavLink to="/adviser/reports" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            Reports
                        </NavLink>
                        <NavLink to="/adviser/approvals" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            Approvals
                        </NavLink>
                    </nav>
                ) : pathname.startsWith("/officer") ? (
                    <nav className="hidden md:flex items-center gap-8 font-geist text-subtext">
                        <NavLink to="/officer/dashboard" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            Dashboard
                        </NavLink>
                        <NavLink to="/officer/events" className={() => {
                            const isActive = pathname.startsWith("/officer/events") || pathname === "/officer/create-event"

                            return isActive 
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }}>
                            Events
                        </NavLink>
                        <NavLink to="/officer/members" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            Members
                        </NavLink>
                        <NavLink to="/officer/incidents" className={() => {
                            const isActive = pathname.startsWith("/officer/incidents"); // include incidents id too e.g /officer/incidents/67
                            return isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }}>
                            Incidents
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
                    <Link to="/login" className={`${isLoggedIn ? "hidden" : ""} font-geist text-sm bg-blue text-white transition-all px-5 py-2 rounded-full font-semibold shadow-sm active:scale-95 hover:bg-blue/70 cursor-pointer`}>
                        Login
                    </Link>
                    {isLoggedIn && (
                        <div className="flex items-center justify-center gap-3">
                            {is_public_pages && (
                                <Link to={dashboardLink} className="font-geist text-xs md:text-sm bg-blue text-white transition-all px-5 py-2 rounded-full font-semibold shadow-sm active:scale-95 hover:bg-blue/70 cursor-pointer">
                                    Dashboard
                                </Link>
                            )}
                            
                            <AccountDropdown />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}