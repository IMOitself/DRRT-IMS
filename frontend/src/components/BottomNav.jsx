import { NavLink, useLocation } from "react-router-dom";

export default function BottomNav() {
    const { pathname } = useLocation();

    if (["/login", "/register", "/forgot-password", "/profile"].includes(pathname)) return null;

    if (pathname.startsWith("/adviser")) {
        return (
            <nav aria-label="Adviser Mobile Navigation" className="bottom-nav-container">
                <NavLink to="/adviser/dashboard" className={({ isActive }) =>
                    isActive
                        ? "bottom-nav-active"
                        : "bottom-nav-inactive"
                }>
                    {({ isActive }) => (
                        <>
                            <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>dashboard</span>
                            <span className="bottom-nav-label">Dashboard</span>
                        </>
                    )}
                </NavLink>

                <NavLink to="/adviser/events" className={() => {
                    const isActive = pathname.startsWith("/adviser/events"); // include event attendance too e.g /adviser/events/67
                    return isActive
                        ? "bottom-nav-active"
                        : "bottom-nav-inactive";
                }}>
                    {() => {
                        const isActive = pathname.startsWith("/adviser/events");
                        return (
                            <>
                                <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>how_to_reg</span>
                                <span className="bottom-nav-label">Events</span>
                            </>
                        );
                    }}
                </NavLink>

                <NavLink to="/adviser/members" className={({ isActive }) =>
                    isActive
                        ? "bottom-nav-active"
                        : "bottom-nav-inactive"
                }>
                    {({ isActive }) => (
                        <>
                            <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>group</span>
                            <span className="bottom-nav-label">Members</span>
                        </>
                    )}
                </NavLink>

                <NavLink to="/adviser/incidents" className={({ isActive }) =>
                    isActive
                        ? "bottom-nav-active"
                        : "bottom-nav-inactive"
                }>
                    {({ isActive }) => (
                        <>
                            <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>security</span>
                            <span className="bottom-nav-label">Vault</span>
                        </>
                    )}
                </NavLink>
            </nav>
        );
    }

    if (pathname.startsWith("/officer")) {
        return (
            <nav aria-label="Officer Mobile Navigation" className="bottom-nav-container">
                <NavLink to="/officer/dashboard" className={({ isActive }) =>
                    isActive
                        ? "bottom-nav-active"
                        : "bottom-nav-inactive"
                }>
                    {({ isActive }) => (
                        <>
                            <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>dashboard</span>
                            <span className="bottom-nav-label">Dashboard</span>
                        </>
                    )}
                </NavLink>

                <NavLink to="/officer/events" className={() => {
                    const isActive = pathname.startsWith("/officer/events"); // include event attendance too e.g /officer/events/67
                    return isActive
                        ? "bottom-nav-active"
                        : "bottom-nav-inactive";
                }}>
                    {() => {
                        const isActive = pathname.startsWith("/officer/events");
                        return (
                            <>
                                <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>how_to_reg</span>
                                <span className="bottom-nav-label">Events</span>
                            </>
                        );
                    }}
                </NavLink>

                <NavLink to="/officer/members" className={({ isActive }) =>
                    isActive
                        ? "bottom-nav-active"
                        : "bottom-nav-inactive"
                }>
                    {({ isActive }) => (
                        <>
                            <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>group</span>
                            <span className="bottom-nav-label">Members</span>
                        </>
                    )}
                </NavLink>

                <NavLink to="/officer/report" className={({ isActive }) =>
                    isActive
                        ? "bottom-nav-active"
                        : "bottom-nav-inactive"
                }>
                    {({ isActive }) => (
                        <>
                            <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>description</span>
                            <span className="bottom-nav-label">Report</span>
                        </>
                    )}
                </NavLink>
            </nav>
        );
    }

    if (pathname.startsWith("/member")) {
        return (
            <nav aria-label="Member Mobile Navigation" className="bottom-nav-container">
                <NavLink to="/member/dashboard" className={({ isActive }) =>
                    isActive
                        ? "bottom-nav-active"
                        : "bottom-nav-inactive"
                }>
                    {({ isActive }) => (
                        <>
                            <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>dashboard</span>
                            <span className="bottom-nav-label">Dashboard</span>
                        </>
                    )}
                </NavLink>

                <NavLink to="/member/attendance" className={({ isActive }) =>
                    isActive
                        ? "bottom-nav-active"
                        : "bottom-nav-inactive"
                }>
                    {({ isActive }) => (
                        <>
                            <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>calendar_today</span>
                            <span className="bottom-nav-label">Attendance</span>
                        </>
                    )}
                </NavLink>

                <NavLink to="/member/incidents" className={() => {
                    const isActive = pathname.startsWith("/member/incidents") || pathname === "/member/create-incident";
                    return isActive
                        ? "bottom-nav-active"
                        : "bottom-nav-inactive";
                }}>
                    {() => {
                        const isActive = pathname.startsWith("/member/incidents") || pathname === "/member/create-incident";
                        return (
                            <>
                                <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>security</span>
                                <span className="bottom-nav-label">Vault</span>
                            </>
                        );
                    }}
                </NavLink>
            </nav>
        );
    }

    return (
        <nav aria-label="Mobile Navigation" className="bottom-nav-container">
            <NavLink to="/" className={({ isActive }) =>
                isActive 
                    ? "bottom-nav-active"
                    : "bottom-nav-inactive px-3"
            }>
                {({ isActive }) => (
                    <>
                        <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>home</span>
                        <span className="bottom-nav-label">Home</span>
                    </>
                )}
            </NavLink>
            <NavLink to="/join" className={() => {
                const isActive = pathname === "/join" || pathname.startsWith("/join-form"); // include join-form id too e.g join-form/67
                return isActive 
                    ? "bottom-nav-active"
                    : "bottom-nav-inactive px-3"
            }}>
                {({ isActive }) => (
                    <>
                        <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>person_add</span>
                        <span className="bottom-nav-label">Join</span>
                    </>
                )}
            </NavLink>
        </nav>
    );
}