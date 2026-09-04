import { useAuth } from "../context/AuthContext";

export default function AccountDropdown({ navigate, isOpen }) {
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <ul className={`absolute right-0 mt-2 w-48 bg-surface border border-blue-border rounded-lg shadow-lg ${isOpen ? "" : "hidden"}`}>
            <li className="px-4 py-2 hover:bg-surface-container-highest cursor-pointer text-subtext">
                View Profile
            </li>
            <li onClick={handleLogout} className="px-4 py-2 hover:bg-surface-container-highest cursor-pointer text-subtext">
                Logout
            </li>
        </ul>
    );
}