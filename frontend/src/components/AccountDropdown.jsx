import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AccountDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        setIsOpen(false);
        await logout();
        navigate('/');
    };

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="cursor-pointer w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-blue-border shrink-0"
            >
                <img
                    className="w-full h-full object-cover"
                    alt="User Avatar"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoIok9cQ3NXBCVrAd2Wwn8DNTgQY92hX9UjJf-Srf_LSbQl6NryNTLqIt5UMLRw7zn_mnlkvz_cwvLk47nUaxjifBfkhPI9t2eq-aiFkrdQxnJQS-ss-yTgCqHWQkes6kdju4v_hSo6_bxqCxAtXDjNn7ZuGAIz85-mZg1dCCS0itCt0idcpbHZEb5blpMEGqWxmZSinf2A2TJNOK28e5mWM_Ps_w5--MQhdWPjIkTVyLNqK9m39WwRQ"
                />
            </button>

            {isOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-surface border border-blue-border rounded-lg shadow-lg z-50">
                    <li
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 hover:bg-surface-container-highest cursor-pointer text-subtext"
                    >
                        View Profile
                    </li>
                    <li
                        onClick={handleLogout}
                        className="px-4 py-2 hover:bg-surface-container-highest cursor-pointer text-subtext"
                    >
                        Logout
                    </li>
                </ul>
            )}
        </div>
    );
}