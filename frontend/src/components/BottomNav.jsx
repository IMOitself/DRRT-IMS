export default function BottomNav() {
    return (
        <nav
            className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2.5 bg-surface border-t border-outline-variant shadow-lg"
            aria-label="Mobile Navigation"
        >
            <button className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary px-3 py-1 rounded-xl transition-colors">
                <span className="material-symbols-outlined">home</span>
                <span className="font-label-sm text-label-sm mt-0.5">Home</span>
            </button>
            <button className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary px-3 py-1 rounded-xl transition-colors">
                <span className="material-symbols-outlined">event</span>
                <span className="font-label-sm text-label-sm mt-0.5">Events</span>
            </button>
            {/* Active Tab for Join */}
            <button
                className="flex flex-col items-center justify-center bg-primary text-on-primary rounded-xl px-4 py-1.5 font-bold shadow-md scale-95 transition-all relative"
                aria-current="page"
            >
                <span className="material-symbols-outlined filled-icon">person_add</span>
                <span className="font-label-sm text-label-sm mt-0.5">Join</span>
            </button>
        </nav>
    )
}