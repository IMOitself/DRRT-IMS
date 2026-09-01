export default function Header() {
    return (
        <header className="w-full border-b border-outline-variant bg-surface sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop h-16 flex justify-between items-center">
                <div className="flex items-center gap-sm">
                    <button className="hover:bg-surface-container-high transition-colors p-2 rounded-full">
                        <span className="material-symbols-outlined text-primary">shield</span>
                    </button>
                    <span className="font-headline-md text-headline-md-mobile font-bold text-primary">
                        Member Portal
                    </span>
                </div>
                {/* Desktop Navigation Links directly mapped from Mobile Bottom Navigation */}
                <nav className="hidden md:flex items-center gap-8 font-label-md text-on-surface-variant">
                    <a href="#" className="text-primary font-bold border-b-2 border-primary py-1">
                        Dashboard
                    </a>
                    <a href="#" className="hover:text-primary transition-colors py-1">
                        Attendance
                    </a>
                    <a href="#" className="hover:text-primary transition-colors py-1">
                        Training
                    </a>
                    <a href="#" className="hover:text-primary transition-colors py-1">
                        Alerts
                    </a>
                    <a href="#" className="hover:text-primary transition-colors py-1">
                        ID Card
                    </a>
                </nav>
                <div className="flex items-center gap-2">
                    <button className="hover:bg-surface-container-high transition-colors p-2 rounded-full relative">
                        <span className="material-symbols-outlined text-on-surface-variant">
                            notifications
                        </span>
                    </button>
                    <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant flex-shrink-0">
                        <img
                            className="w-full h-full object-cover"
                            alt="Alex Rivera Profile"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZPHITGvKrDOXrPfitF6BBJ67fhCoSLrfMG7ee_kMkOFnUxtEp4IQ9SlcZAX-fT7wcdf3YZT2bZ7eRh0heXdIn1j3dmWBHijEgkqA7DkYOK8-3HyAm40t_VnYpgAN_wQKeRpDgf0LfjCWBwqAmlm-4j0IvRr_yhhT_fxD9rGhhBw7FjGLg6Vn2dpCGcUShdPvI5NneYXzjPGeDWsM-X2KAmMdcs2yhwQGEhkpfiLjhCVxiOPW9Hl42Jw"
                        />
                    </div>
                </div>
            </div>
        </header>
    )
}