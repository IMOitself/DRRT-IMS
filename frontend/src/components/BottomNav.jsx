import { NavLink, useLocation } from "react-router-dom";

export default function BottomNav() {
    const { pathname } = useLocation();

    if (pathname.startsWith("/adviser")) {
        return (
            <nav aria-label="Adviser Mobile Navigation" className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2.5 bg-surface border-t border-blue-border shadow-lg">
                <NavLink to="/adviser/dashboard" className={({ isActive }) =>
                    isActive
                        ? "flex flex-col items-center justify-center bg-blue text-white rounded-xl px-3 py-1.5 font-bold shadow-md scale-95 transition-all relative"
                        : "flex flex-col items-center justify-center text-subtext hover:text-blue px-2 py-1 rounded-xl transition-colors"
                }>
                    {({ isActive }) => (
                        <>
                            <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>dashboard</span>
                            <span className="font-geist text-xs mt-0.5">Dashboard</span>
                        </>
                    )}
                </NavLink>

                <NavLink to="/adviser/vault" className={({ isActive }) =>
                    isActive
                        ? "flex flex-col items-center justify-center bg-blue text-white rounded-xl px-3 py-1.5 font-bold shadow-md scale-95 transition-all relative"
                        : "flex flex-col items-center justify-center text-subtext hover:text-blue px-2 py-1 rounded-xl transition-colors"
                }>
                    {({ isActive }) => (
                        <>
                            <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>shield</span>
                            <span className="font-geist text-xs mt-0.5">Vault</span>
                        </>
                    )}
                </NavLink>

                <NavLink to="/adviser/bylaws" className={({ isActive }) =>
                    isActive
                        ? "flex flex-col items-center justify-center bg-blue text-white rounded-xl px-3 py-1.5 font-bold shadow-md scale-95 transition-all relative"
                        : "flex flex-col items-center justify-center text-subtext hover:text-blue px-2 py-1 rounded-xl transition-colors"
                }>
                    {({ isActive }) => (
                        <>
                            <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>gavel</span>
                            <span className="font-geist text-xs mt-0.5">Bylaws</span>
                        </>
                    )}
                </NavLink>

                <NavLink to="/adviser/reports" className={({ isActive }) =>
                    isActive
                        ? "flex flex-col items-center justify-center bg-blue text-white rounded-xl px-3 py-1.5 font-bold shadow-md scale-95 transition-all relative"
                        : "flex flex-col items-center justify-center text-subtext hover:text-blue px-2 py-1 rounded-xl transition-colors"
                }>
                    {({ isActive }) => (
                        <>
                            <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>description</span>
                            <span className="font-geist text-xs mt-0.5">Reports</span>
                        </>
                    )}
                </NavLink>

                <NavLink to="/adviser/approvals" className={({ isActive }) =>
                    isActive
                        ? "flex flex-col items-center justify-center bg-blue text-white rounded-xl px-3 py-1.5 font-bold shadow-md scale-95 transition-all relative"
                        : "flex flex-col items-center justify-center text-subtext hover:text-blue px-2 py-1 rounded-xl transition-colors"
                }>
                    {({ isActive }) => (
                        <>
                            <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>fact_check</span>
                            <span className="font-geist text-xs mt-0.5">Approvals</span>
                        </>
                    )}
                </NavLink>
            </nav>
        );
    }

    if (pathname.startsWith("/officer")) {
        return (
            <nav aria-label="Officer Mobile Navigation" className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2.5 bg-surface border-t border-blue-border shadow-lg">
                <NavLink to="/officer/dashboard" className={({ isActive }) =>
                    isActive
                        ? "flex flex-col items-center justify-center bg-blue text-white rounded-xl px-3 py-1.5 font-bold shadow-md scale-95 transition-all relative"
                        : "flex flex-col items-center justify-center text-subtext hover:text-blue px-2 py-1 rounded-xl transition-colors"
                }>
                    {({ isActive }) => (
                        <>
                            <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>dashboard</span>
                            <span className="font-geist text-xs mt-0.5">Dashboard</span>
                        </>
                    )}
                </NavLink>

                <NavLink to="/officer/attendance" className={({ isActive }) =>
                    isActive
                        ? "flex flex-col items-center justify-center bg-blue text-white rounded-xl px-3 py-1.5 font-bold shadow-md scale-95 transition-all relative"
                        : "flex flex-col items-center justify-center text-subtext hover:text-blue px-2 py-1 rounded-xl transition-colors"
                }>
                    {({ isActive }) => (
                        <>
                            <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>how_to_reg</span>
                            <span className="font-geist text-xs mt-0.5">Attendance</span>
                        </>
                    )}
                </NavLink>

                <NavLink to="/officer/roster" className={({ isActive }) =>
                    isActive
                        ? "flex flex-col items-center justify-center bg-blue text-white rounded-xl px-3 py-1.5 font-bold shadow-md scale-95 transition-all relative"
                        : "flex flex-col items-center justify-center text-subtext hover:text-blue px-2 py-1 rounded-xl transition-colors"
                }>
                    {({ isActive }) => (
                        <>
                            <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>group</span>
                            <span className="font-geist text-xs mt-0.5">Roster</span>
                        </>
                    )}
                </NavLink>

                <NavLink to="/officer/incidents" className={() => {
                    const isActive = pathname.startsWith("/officer/incidents");
                    return isActive
                        ? "flex flex-col items-center justify-center bg-blue text-white rounded-xl px-3 py-1.5 font-bold shadow-md scale-95 transition-all relative"
                        : "flex flex-col items-center justify-center text-subtext hover:text-blue px-2 py-1 rounded-xl transition-colors";
                }}>
                    {() => {
                        const isActive = pathname.startsWith("/officer/incidents");
                        return (
                            <>
                                <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>security</span>
                                <span className="font-geist text-xs mt-0.5">Vault</span>
                            </>
                        );
                    }}
                </NavLink>
            </nav>
        );
    }

    if (pathname.startsWith("/member")) {
        return (
            <nav aria-label="Member Mobile Navigation" className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2.5 bg-surface border-t border-blue-border shadow-lg">
                <NavLink to="/member/dashboard" className={({ isActive }) =>
                    isActive
                        ? "flex flex-col items-center justify-center bg-blue text-white rounded-xl px-3 py-1.5 font-bold shadow-md scale-95 transition-all relative"
                        : "flex flex-col items-center justify-center text-subtext hover:text-blue px-2 py-1 rounded-xl transition-colors"
                }>
                    {({ isActive }) => (
                        <>
                            <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>dashboard</span>
                            <span className="font-geist text-xs mt-0.5">Dashboard</span>
                        </>
                    )}
                </NavLink>

                <NavLink to="/member/attendance" className={({ isActive }) =>
                    isActive
                        ? "flex flex-col items-center justify-center bg-blue text-white rounded-xl px-3 py-1.5 font-bold shadow-md scale-95 transition-all relative"
                        : "flex flex-col items-center justify-center text-subtext hover:text-blue px-2 py-1 rounded-xl transition-colors"
                }>
                    {({ isActive }) => (
                        <>
                            <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>calendar_today</span>
                            <span className="font-geist text-xs mt-0.5">Attendance</span>
                        </>
                    )}
                </NavLink>

                <NavLink to="/member/announcements" className={({ isActive }) =>
                    isActive
                        ? "flex flex-col items-center justify-center bg-blue text-white rounded-xl px-3 py-1.5 font-bold shadow-md scale-95 transition-all relative"
                        : "flex flex-col items-center justify-center text-subtext hover:text-blue px-2 py-1 rounded-xl transition-colors"
                }>
                    {({ isActive }) => (
                        <>
                            <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>notifications</span>
                            <span className="font-geist text-xs mt-0.5">Alerts</span>
                        </>
                    )}
                </NavLink>

                <NavLink to="/member/id" className={({ isActive }) =>
                    isActive
                        ? "flex flex-col items-center justify-center bg-blue text-white rounded-xl px-3 py-1.5 font-bold shadow-md scale-95 transition-all relative"
                        : "flex flex-col items-center justify-center text-subtext hover:text-blue px-2 py-1 rounded-xl transition-colors"
                }>
                    {({ isActive }) => (
                        <>
                            <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>badge</span>
                            <span className="font-geist text-xs mt-0.5">ID Card</span>
                        </>
                    )}
                </NavLink>
            </nav>
        );
    }

    return (
        <nav aria-label="Mobile Navigation" className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2.5 bg-surface border-t border-blue-border shadow-lg">
            <NavLink to="/" className={({ isActive }) =>
                isActive 
                    ? "flex flex-col items-center justify-center bg-blue text-white rounded-xl px-4 py-1.5 font-bold shadow-md scale-95 transition-all relative"
                    : "flex flex-col items-center justify-center text-subtext hover:text-blue px-3 py-1 rounded-xl transition-colors"
            }>
                {({ isActive }) => (
                    <>
                        <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>home</span>
                        <span className="font-geist text-xs mt-0.5">Home</span>
                    </>
                )}
            </NavLink>
            <NavLink to="/events" className={({ isActive }) =>
                isActive 
                    ? "flex flex-col items-center justify-center bg-blue text-white rounded-xl px-4 py-1.5 font-bold shadow-md scale-95 transition-all relative"
                    : "flex flex-col items-center justify-center text-subtext hover:text-blue px-3 py-1 rounded-xl transition-colors"
            }>
                {({ isActive }) => (
                    <>
                        <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>event</span>
                        <span className="font-geist text-xs mt-0.5">Events</span>
                    </>
                )}
            </NavLink>
            <NavLink to="/join" className={() => {
                const isActive = pathname === "/join" || pathname.startsWith("/join-form"); // include join-form id too e.g join-form/67
                return isActive 
                    ? "flex flex-col items-center justify-center bg-blue text-white rounded-xl px-4 py-1.5 font-bold shadow-md scale-95 transition-all relative"
                    : "flex flex-col items-center justify-center text-subtext hover:text-blue px-3 py-1 rounded-xl transition-colors"
            }}>
                {({ isActive }) => (
                    <>
                        <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>person_add</span>
                        <span className="font-geist text-xs mt-0.5">Join</span>
                    </>
                )}
            </NavLink>
        </nav>
    );
}