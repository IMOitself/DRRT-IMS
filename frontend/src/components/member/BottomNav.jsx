export default function BottomNav() {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2.5 bg-surface border-t border-outline-variant shadow-sm">
            <button className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-3 py-1 scale-90 duration-150 ease-in-out">
                <span className="material-symbols-outlined filled-icon">dashboard</span>
                <span className="font-label-sm text-label-sm mt-0.5">Dashboard</span>
            </button>
            <button className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-highest px-3 py-1 rounded-xl transition-colors">
                <span className="material-symbols-outlined">calendar_today</span>
                <span className="font-label-sm text-label-sm mt-0.5">Attendance</span>
            </button>
            <button className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-highest px-3 py-1 rounded-xl transition-colors">
                <span className="material-symbols-outlined">school</span>
                <span className="font-label-sm text-label-sm mt-0.5">Training</span>
            </button>
            <button className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-highest px-3 py-1 rounded-xl transition-colors">
                <span className="material-symbols-outlined">notifications</span>
                <span className="font-label-sm text-label-sm mt-0.5">Alerts</span>
            </button>
            <button className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-highest px-3 py-1 rounded-xl transition-colors">
                <span className="material-symbols-outlined">badge</span>
                <span className="font-label-sm text-label-sm mt-0.5">ID Card</span>
            </button>
        </nav>
    )
}