import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import AccountDropdown from "./AccountDropdown";
import WIP from "./WIP";
import { useAuth } from "../context/AuthContext";

export default function Header() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { isLoggedIn, user } = useAuth();

    const is_public_pages = pathname === "/" || pathname === "/join" || pathname.startsWith("/join-form");
    const is_no_nav_pages = ["/login", "/register", "/forgot-password", "/profile"].includes(pathname);

    let dashboardLink = "/member/dashboard";
    if (user?.role === "officer") dashboardLink = "/officer/dashboard";
    if (user?.role === "adviser") dashboardLink = "/adviser/dashboard";

    // officers are members too, so they can switch between the officer and member pages
    let switchTo = null;
    if (user?.role === "officer" && pathname.startsWith("/officer")) switchTo = "member";
    if (user?.role === "officer" && pathname.startsWith("/member")) switchTo = "officer";

    return (
        <header className="glass-bg sticky top-0 w-full z-50 border-b border-blue-border/60 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex justify-between items-center">
                <div className="flex items-center gap-1 md:gap-3 cursor-pointer" onClick={() => navigate("/")}>
                    <div className="flex w-9 h-9 rounded-full bg-blue/10 flex items-center justify-center text-blue">
                        <span className="material-symbols-outlined text-[24px]!">shield</span>
                    </div>
                    <div>
                        <h1 className="font-geist text-lg md:text-xl font-bold text-blue flex items-center gap-2">
                            DRRT 
                            {pathname.startsWith("/member") && <span className="hidden lg:inline">Member</span>}
                            {pathname.startsWith("/officer") && <span className="hidden lg:inline">Officer</span>}
                            {pathname.startsWith("/adviser") && <span className="hidden lg:inline">Adviser</span>}
                            <span className="hidden md:inline">Portal</span>
                            <span className="font-geist text-sm text-blue font-semibold bg-blue-bg px-2 py-0.5 rounded-full uppercase tracking-wider">
                                LVCC
                            </span>
                        </h1>
                    </div>
                </div>

                {is_no_nav_pages ? null : pathname.startsWith("/adviser") ? (
                    <nav className="hidden md:flex items-center gap-8 font-geist text-subtext">
                        <NavLink to="/adviser/dashboard" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            Dashboard
                        </NavLink>
                        <NavLink to="/adviser/approvals" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            Approvals
                        </NavLink>
                        <NavLink to="/adviser/members" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            Members
                        </NavLink>
                        <NavLink to="/adviser/events" className={() => {
                            const isActive = pathname.startsWith("/adviser/events");
                            return isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }}>
                            Events
                        </NavLink>
                        <NavLink to="/adviser/incidents" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            Incidents
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
                        <NavLink to="/officer/members" className={({ isActive }) =>
                            isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }>
                            Members
                        </NavLink>
                        <NavLink to="/officer/events" className={() => {
                            const isActive = pathname.startsWith("/officer/events") || pathname === "/officer/create-event"

                            return isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }}>
                            Events
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
                        <NavLink to="/member/incidents" className={() => {
                            const isActive = pathname.startsWith("/member/incidents") || pathname === "/member/create-incident";
                            return isActive
                                ? "text-blue font-bold border-b-2 border-blue py-1"
                                : "hover:text-blue hover:font-bold hover:border-b-2 border-blue py-1"
                        }}>
                            Incidents
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

                            {switchTo && (
                                <Link to={`/${switchTo}/dashboard`} className="font-geist text-xs md:text-sm bg-blue-bg text-blue transition-all px-3 md:px-4 py-2 rounded-full font-semibold shadow-sm active:scale-95 hover:bg-blue/20 cursor-pointer flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[18px]!">swap_horiz</span>
                                    <span><span className="hidden md:inline">Switch to </span><span className="capitalize">{switchTo}</span></span>
                                </Link>
                            )}

                            <AccountDropdown />
                        </div>
                    )}
                </div>
            </div>
            {/* {(pathname.startsWith("/adviser") || pathname.startsWith("/member/incidents")) && <WIP />} */}
            {(pathname.startsWith("/member/incidents")) && <WIP />}
        </header>
    );
}