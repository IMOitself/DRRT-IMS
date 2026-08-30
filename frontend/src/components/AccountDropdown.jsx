import { logout } from "../api/axios";

export default function AccountDropdown({navigate, isOpen}) {
    return (
        <ul className={`absolute right-0 mt-2 w-48 bg-surface border border-outline-variant rounded-lg shadow-lg ${isOpen ? "" : "hidden"}`}>
            <li className="px-4 py-2 hover:bg-surface-container-highest cursor-pointer text-on-surface-variant">
                View Profile
            </li>
            <li onClick={() => { logout(navigate) }} className="px-4 py-2 hover:bg-surface-container-highest cursor-pointer text-on-surface-variant">
                Logout
            </li>
        </ul>
    );
}