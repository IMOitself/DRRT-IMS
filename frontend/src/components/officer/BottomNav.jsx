export default function BottomNav() {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2.5 bg-surface border-t border-blue-border shadow-sm">
            <button className="flex flex-col items-center justify-center text-subtext hover:bg-surface-container-highest px-3 py-1 rounded-xl transition-colors">
                <span className="material-symbols-outlined">dashboard</span>
                <span className="font-label-sm text-label-sm mt-0.5">Dashboard</span>
            </button>
            <button className="flex flex-col items-center justify-center text-subtext hover:bg-surface-container-highest px-3 py-1 rounded-xl transition-colors">
                <span className="material-symbols-outlined">how_to_reg</span>
                <span className="font-label-sm text-label-sm mt-0.5">Attendance</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-blue text-blue rounded-xl px-3 py-1 scale-90 duration-150 ease-in-out">
                <span className="material-symbols-outlined filled-icon">group</span>
                <span className="font-label-sm text-label-sm mt-0.5">Roster</span>
            </button>
            <button className="flex flex-col items-center justify-center text-subtext hover:bg-surface-container-highest px-3 py-1 rounded-xl transition-colors">
                <span className="material-symbols-outlined">security</span>
                <span className="font-label-sm text-label-sm mt-0.5">Vault</span>
            </button>
            <button className="flex flex-col items-center justify-center text-subtext hover:bg-surface-container-highest px-3 py-1 rounded-xl transition-colors">
                <span className="material-symbols-outlined">model_training</span>
                <span className="font-label-sm text-label-sm mt-0.5">Training</span>
            </button>
        </nav>
    )
}