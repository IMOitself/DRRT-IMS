import { NavLink, useLocation } from "react-router-dom";

export default function BottomNav() {
    const { pathname } = useLocation();

    return (
        <nav aria-label="Mobile Navigation" className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2.5 bg-surface border-t border-outline-variant shadow-lg">
            <NavLink to="/" className={({ isActive }) =>
                isActive 
                    ? "flex flex-col items-center justify-center bg-primary text-on-primary rounded-xl px-4 py-1.5 font-bold shadow-md scale-95 transition-all relative"
                    : "flex flex-col items-center justify-center text-on-surface-variant hover:text-primary px-3 py-1 rounded-xl transition-colors"
            }>
                {({ isActive }) => (
                    <>
                        <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>home</span>
                        <span className="font-label-sm text-label-sm mt-0.5">Home</span>
                    </>
                )}
            </NavLink>
            <NavLink to="/events" className={({ isActive }) =>
                isActive 
                    ? "flex flex-col items-center justify-center bg-primary text-on-primary rounded-xl px-4 py-1.5 font-bold shadow-md scale-95 transition-all relative"
                    : "flex flex-col items-center justify-center text-on-surface-variant hover:text-primary px-3 py-1 rounded-xl transition-colors"
            }>
                {({ isActive }) => (
                    <>
                        <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>event</span>
                        <span className="font-label-sm text-label-sm mt-0.5">Events</span>
                    </>
                )}
            </NavLink>
            <NavLink to="/join" className={() => {
                const isActive = pathname === "/join" || pathname.startsWith("/join-form"); // include join-form id too e.g join-form/67
                return isActive 
                    ? "flex flex-col items-center justify-center bg-primary text-on-primary rounded-xl px-4 py-1.5 font-bold shadow-md scale-95 transition-all relative"
                    : "flex flex-col items-center justify-center text-on-surface-variant hover:text-primary px-3 py-1 rounded-xl transition-colors"
            }}>
                {({ isActive }) => (
                    <>
                        <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>person_add</span>
                        <span className="font-label-sm text-label-sm mt-0.5">Join</span>
                    </>
                )}
            </NavLink>
        </nav>
    );
}