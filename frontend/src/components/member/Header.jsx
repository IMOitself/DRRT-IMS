import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import AccountDropdown from "../AccountDropdown";

export default function Header() {
    const navigate = useNavigate();
    const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

    return (
        <header className="w-full border-b border-blue-border bg-surface sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <button className="hover:bg-surface-container-high transition-colors p-2 rounded-full">
                        <span className="material-symbols-outlined text-blue">shield</span>
                    </button>
                    <span className="font-geist text-2xl-mobile font-bold text-blue">
                        Member Portal
                    </span>
                </div>
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
                <div className="flex items-center gap-2">
                    <button className="hover:bg-surface-container-high transition-colors p-2 rounded-full relative">
                        <span className="material-symbols-outlined text-subtext">
                            notifications
                        </span>
                    </button>
                    <button onClick={() => setAccountDropdownOpen(!accountDropdownOpen)} className="cursor-pointer w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-blue-border flex-shrink-0">
                        <img
                            className="w-full h-full object-cover"
                            alt="Alex Rivera Profile"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZPHITGvKrDOXrPfitF6BBJ67fhCoSLrfMG7ee_kMkOFnUxtEp4IQ9SlcZAX-fT7wcdf3YZT2bZ7eRh0heXdIn1j3dmWBHijEgkqA7DkYOK8-3HyAm40t_VnYpgAN_wQKeRpDgf0LfjCWBwqAmlm-4j0IvRr_yhhT_fxD9rGhhBw7FjGLg6Vn2dpCGcUShdPvI5NneYXzjPGeDWsM-X2KAmMdcs2yhwQGEhkpfiLjhCVxiOPW9Hl42Jw"
                        />
                    </button>
                </div>
            </div>
            <AccountDropdown navigate={navigate} isOpen={accountDropdownOpen} />
        </header>
    )
}