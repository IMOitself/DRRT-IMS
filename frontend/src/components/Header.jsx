import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
    const { pathname } = useLocation();
    
    return (
        <header className="glass-header sticky top-0 w-full z-50 border-b border-outline-variant/60 shadow-sm">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8 h-16 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[24px]">shield</span>
                    </div>
                    <div>
                        <h1 className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2">
                            DRRT Portal
                            <span className="font-label-sm text-label-sm text-primary font-semibold bg-primary-fixed px-2 py-0.5 rounded-full uppercase tracking-wider">
                                LVCC
                            </span>
                        </h1>
                    </div>
                </div>
                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center gap-8 font-label-md text-on-surface-variant" aria-label="Main Navigation">
                    <NavLink to="/" className={({ isActive }) =>
                        isActive 
                            ? "text-primary font-bold border-b-2 border-primary py-1"
                            : "hover:text-primary hover:font-bold hover:border-b-2 border-primary py-1"
                    }>
                        Home
                    </NavLink>
                    <NavLink to="/events" className={({ isActive }) =>
                        isActive 
                            ? "text-primary font-bold border-b-2 border-primary py-1"
                            : "hover:text-primary hover:font-bold hover:border-b-2 border-primary py-1"
                    }>
                        Events
                    </NavLink>
                    <NavLink to="/join" className={() => {
                        const isActive = pathname === "/join" || pathname === "/join-form";
                        return isActive 
                            ? "text-primary font-bold border-b-2 border-primary py-1"
                            : "hover:text-primary hover:font-bold hover:border-b-2 border-primary py-1"
                    }}>
                        Join
                    </NavLink>
                </nav>
                <div className="flex items-center gap-3">
                    <button className="font-label-md text-label-md bg-primary text-on-primary hover:bg-primary-container transition-all px-5 py-2 rounded-full font-semibold shadow-sm active:scale-95">
                        Login
                    </button>
                </div>
            </div>
        </header>
    )
}