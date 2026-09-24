import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getInitials } from "../utils/format";

export default function AccountDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

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
                className="cursor-pointer w-9 h-9 flex rounded-full bg-surface-container-high overflow-hidden border border-blue-border shrink-0"
            >
                <div className="w-full h-full rounded-full text-sm bg-surface-container-high flex items-center justify-center font-bold text-blue shrink-0">
                    {getInitials(user.name)}
                </div>
            </button>

            {isOpen && (
                <ul className="glass-bg absolute right-0 mt-2 w-48 bg-surface border border-blue-border rounded-lg shadow-lg z-50">
                    <li
                        onClick={() => { setIsOpen(false); navigate('/profile'); }}
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