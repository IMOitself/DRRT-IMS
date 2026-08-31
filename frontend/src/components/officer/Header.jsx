import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AccountDropdown from "../AccountDropdown";

export default function Header() {
    const navigate = useNavigate();
    const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

    return (
        <header className="w-full border-b border-outline-variant dark:border-outline bg-surface dark:bg-surface-dim sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop h-16 flex justify-between items-center">
                <div className="flex items-center gap-sm">
                    <button className="hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors p-2 rounded-full">
                        <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">
                            shield
                        </span>
                    </button>
                    <span className="font-headline-md text-headline-md-mobile font-bold text-primary dark:text-primary-fixed">
                        DRRT Officer Portal
                    </span>
                </div>
                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex items-center gap-8 font-label-md text-on-surface-variant">
                    <a href="#" className="hover:text-primary transition-colors py-1">
                        Dashboard
                    </a>
                    <a href="#" className="hover:text-primary transition-colors py-1">
                        Attendance
                    </a>
                    <a href="#" className="text-primary font-bold border-b-2 border-primary py-1">
                        Roster
                    </a>
                    <a href="#" className="hover:text-primary transition-colors py-1">
                        Vault
                    </a>
                    <a href="#" className="hover:text-primary transition-colors py-1">
                        Training
                    </a>
                </nav>
                <div className="flex items-center gap-2">
                    <button className="hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors p-2 rounded-full">
                        <span className="material-symbols-outlined text-on-surface-variant">
                            notifications
                        </span>
                    </button>
                    <button onClick={() => setAccountDropdownOpen(!accountDropdownOpen)} className="cursor-pointer w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant flex-shrink-0">
                        <img
                            className="w-full h-full object-cover"
                            alt="Security Officer Avatar"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoIok9cQ3NXBCVrAd2Wwn8DNTgQY92hX9UjJf-Srf_LSbQl6NryNTLqIt5UMLRw7zn_mnlkvz_cwvLk47nUaxjifBfkhPI9t2eq-aiFkrdQxnJQS-ss-yTgCqHWQkes6kdju4v_hSo6_bxqCxAtXDjNn7ZuGAIz85-mZg1dCCS0itCt0idcpbHZEb5blpMEGqWxmZSinf2A2TJNOK28e5mWM_Ps_w5--MQhdWPjIkTVyLNqK9m39WwRQ"
                        />
                    </button>
                </div>
            </div>
            <AccountDropdown navigate={navigate} isOpen={accountDropdownOpen} />
        </header>
    )
}