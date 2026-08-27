import { NavLink } from "react-router-dom";

export default function BottomNav() {
    const navItems = [
        { to: "/", label: "Home", icon: "home" },
        { to: "/events", label: "Events", icon: "event" },
        { to: "/join", label: "Join", icon: "person_add" },
    ];

    return (
        <nav aria-label="Mobile Navigation" className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2.5 bg-surface border-t border-outline-variant shadow-lg">
            {navItems.map(({ to, label, icon }) => (
                <NavLink key={to} to={to} className={({ isActive }) =>
                    isActive
                        ? "flex flex-col items-center justify-center bg-primary text-on-primary rounded-xl px-4 py-1.5 font-bold shadow-md scale-95 transition-all relative"
                        : "flex flex-col items-center justify-center text-on-surface-variant hover:text-primary px-3 py-1 rounded-xl transition-colors"
                }>
                    {({ isActive }) => (
                        <>
                            <span className={`material-symbols-outlined ${isActive ? "filled-icon" : ""}`}>{icon}</span>
                            <span className="font-label-sm text-label-sm mt-0.5">{label}</span>
                        </>
                    )}
                </NavLink>
            ))}
        </nav>
    );
}