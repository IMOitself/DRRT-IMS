import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Roster() {
    const [membersApplication, setMembersApplication] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [officer, setOfficer] = useState(null);
    const navigate = useNavigate();

    function openDrawer(application) {
        setSelectedMember(application);
        setDrawerOpen(true);
    }

    function closeDrawer() {
        setDrawerOpen(false);
    }
    useEffect(() => {
        api
            .get(`/user`)
            .then((res) => {
                if (res.data.role === 'officer') {
                    setOfficer(res.data);
                } else {
                    alert("You are not authorized to access this page");
                    navigate("/");
                }
            })
            .catch((err) => console.error(err));
        api
            .get("/membership-applications")
            .then((res) => {
                console.log(res.data.data);
                setMembersApplication(res.data.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleReject = () => {
        api
            .put("/membership-applications/" + selectedMember.id, { status: "rejected", reviewer_id: officer.id })
            .then(() => {
                setMembersApplication((prev) =>
                    prev.map((app) =>
                        app.id === selectedMember.id ? { ...app, status: "rejected" } : app
                    )
                );
                setSelectedMember((prev) => ({ ...prev, status: "rejected" }));
            })
            .catch((err) => console.error(err));
    };

    const handleApprove = () => {
        api
            .put("/membership-applications/" + selectedMember.id, { status: "approved", reviewer_id: officer.id })
            .then(() => {
                setMembersApplication((prev) =>
                    prev.map((app) =>
                        app.id === selectedMember.id ? { ...app, status: "approved" } : app
                    )
                );
                setSelectedMember((prev) => ({ ...prev, status: "approved" }));
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <title>DRRT Member Roster - Officer Portal</title>

            {/* Top Navigation Bar */}
            <header className="w-full border-b border-outline-variant dark:border-outline bg-surface dark:bg-surface-dim sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop h-16 flex justify-between items-center">
                    <div className="flex items-center gap-sm">
                        <button className="hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors p-2 rounded-full">
                            <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">
                                shield
                            </span>
                        </button>
                        <span className="font-headline-md text-headline-md-mobile font-bold text-primary dark:text-primary-fixed">
                            DRRT Member Roster
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
                        <a
                            href="#"
                            className="text-primary font-bold border-b-2 border-primary py-1"
                        >
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
                        <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant flex-shrink-0">
                            <img
                                className="w-full h-full object-cover"
                                alt="Security Officer Avatar"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoIok9cQ3NXBCVrAd2Wwn8DNTgQY92hX9UjJf-Srf_LSbQl6NryNTLqIt5UMLRw7zn_mnlkvz_cwvLk47nUaxjifBfkhPI9t2eq-aiFkrdQxnJQS-ss-yTgCqHWQkes6kdju4v_hSo6_bxqCxAtXDjNn7ZuGAIz85-mZg1dCCS0itCt0idcpbHZEb5blpMEGqWxmZSinf2A2TJNOK28e5mWM_Ps_w5--MQhdWPjIkTVyLNqK9m39WwRQ"
                            />
                        </div>
                    </div>
                </div>
            </header>
            {/* Main Content Canvas */}
            <main className="flex-grow pb-32">
                <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-lg space-y-md">
                    {/* Active Roster Context Header */}
                    <section className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl shadow-sm space-y-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <p className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
                                    Disaster Response Team Directory
                                </p>
                                <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-xs">
                                    Active Responder Roster
                                </h2>
                                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                                    Manage personnel records, squad assignments, and status.
                                </p>
                            </div>
                            <button className="bg-primary text-on-primary hover:bg-primary-container transition-colors py-2 px-4 rounded-lg font-label-md text-sm flex items-center justify-center gap-2 shadow-sm self-start sm:self-auto">
                                <span className="material-symbols-outlined text-[18px]">add</span>{" "}
                                Add Member
                            </button>
                        </div>
                    </section>
                    {/* Live Roster Summary */}
                    <div className="bg-surface-container-low border border-outline-variant rounded-lg p-3 flex flex-wrap gap-x-4 gap-y-2 justify-between items-center text-sm shadow-sm">
                        <div className="font-label-md text-on-surface">
                            Total Personnel:{" "}
                            <span className="text-primary font-bold">{membersApplication.length} Registered</span>
                        </div>
                        <div className="flex gap-4 font-body-sm">
                            <div className="flex items-center gap-1.5 text-[#166534] font-medium">
                                <span className="w-2 h-2 rounded-full bg-[#166534]" /> Active: 0
                            </div>
                            <div className="flex items-center gap-1.5 text-[#854d0e] font-medium">
                                <span className="w-2 h-2 rounded-full bg-[#ca8a04]" /> Pending: {membersApplication.filter((ma) => ma.status === 'pending').length}
                            </div>
                            <div className="flex items-center gap-1.5 text-error font-medium">
                                <span className="w-2 h-2 rounded-full bg-error" /> Inactive: 0
                            </div>
                        </div>
                    </div>
                    {/* Search & Filters */}
                    <div className="space-y-3">
                        {/* Search Bar */}
                        <div className="relative w-full">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-outline">
                                search
                            </span>
                            <input
                                className="w-full pl-10 pr-4 py-2 border border-outline-variant rounded-lg bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md transition-colors"
                                placeholder="Search by name, ID, course, or squad..."
                                type="text"
                            />
                        </div>
                        {/* Rapid Filter Pills */}
                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
                            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-on-surface text-surface font-label-sm text-label-sm flex-shrink-0">
                                All Members ({membersApplication.length})
                            </button>
                            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-outline-variant text-on-surface font-label-sm text-label-sm hover:bg-surface-dim transition-colors flex-shrink-0">
                                Active Only (0)
                            </button>
                            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-outline-variant text-on-surface font-label-sm text-label-sm hover:bg-surface-dim transition-colors flex-shrink-0">
                                1st Year
                            </button>
                            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-outline-variant text-on-surface font-label-sm text-label-sm hover:bg-surface-dim transition-colors flex-shrink-0">
                                2nd Year
                            </button>
                            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-outline-variant text-on-surface font-label-sm text-label-sm hover:bg-surface-dim transition-colors flex-shrink-0">
                                3rd Year
                            </button>
                            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-outline-variant text-on-surface font-label-sm text-label-sm hover:bg-surface-dim transition-colors flex-shrink-0">
                                4th Year
                            </button>
                        </div>
                        {/* Duty Squad Dropdown Filter */}
                        <div className="relative w-fit">
                            <select className="w-full appearance-none bg-surface-container-lowest border border-outline-variant text-on-surface text-sm rounded-lg block p-2.5 focus:ring-primary focus:border-primary pr-8 font-body-sm shadow-sm">
                                <option selected="">All Squads / Duty Teams</option>
                                <option value="medical">Medical Squad</option>
                                <option value="sar">Search &amp; Rescue</option>
                                <option value="logistics">Logistics</option>
                                <option value="comm">Comm Duty</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-on-surface-variant">
                                <span className="material-symbols-outlined text-[20px]">
                                    arrow_drop_down
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Member List Cards */}
                    <section className="space-y-2">
                        {membersApplication.map((application) => {
                            return (
                                <div
                                    className="member-card bg-surface-container-lowest border border-outline-variant rounded-lg p-3 flex items-center justify-between shadow-sm hover:border-outline transition-colors cursor-pointer group"
                                    onClick={() => openDrawer(application)}
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-primary flex-shrink-0">
                                            {application.full_name.split(' ').map((n) => n[0]).join('')}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-label-md text-on-surface truncate group-hover:text-primary transition-colors">
                                                {application.full_name}
                                            </p>
                                            <p className="text-[11px] text-on-surface-variant truncate">
                                                ID: {application.student_id} • {application.course + " " + application.year_level}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        {application.status === 'pending' ? (
                                            <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider bg-[#fef08a] text-[#854d0e] border border-[#ca8a04]/20">
                                                {application.status}
                                            </span>
                                        ) : application.status === 'rejected' ? (
                                            <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider bg-surface-container-highest text-on-surface-variant border border-outline-variant">
                                                {application.status}
                                            </span>
                                        ) : application.status === 'active' ? (
                                            <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider bg-[#dcfce7] text-[#166534] border border-[#166534]/20">
                                                Active
                                            </span>
                                        ) : application.status === 'inactive' ? (
                                            <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider bg-surface-container-highest text-on-surface-variant border border-outline-variant">
                                                Inactive
                                            </span>
                                        ) : ('')}
                                        <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                                            chevron_right
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </section>
                </div>
            </main>
            {/* Member Profile Drawer */}
            <aside
                className={`fixed inset-y-0 right-0 z-[70] w-full md:w-[400px] bg-surface-container-lowest shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-outline-variant flex flex-col ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-4 border-b border-outline-variant bg-surface-container-low">
                    <h3 className="font-headline-md text-body-lg font-bold text-on-surface m-0">
                        Member Profile
                    </h3>
                    <button
                        aria-label="Close"
                        className="hover:bg-surface-container-high rounded-full p-2 transition-colors text-on-surface-variant"
                        onClick={closeDrawer}
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                {/* Drawer Content */}
                <div className="flex-grow overflow-y-auto p-6 space-y-6">
                    {selectedMember && (
                        <>
                            <div className="flex flex-col items-center text-center">
                                <div
                                    className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center text-2xl font-bold text-primary border-2 border-outline-variant mb-3"
                                >
                                    {selectedMember.full_name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h3
                                    className="font-headline-md text-xl font-bold text-on-surface m-0"
                                >
                                    {selectedMember.full_name}
                                </h3>
                                <p
                                    className="font-body-sm text-body-sm text-on-surface-variant mt-0.5"
                                >
                                    ID: {selectedMember.student_id}
                                </p>
                                <span
                                    className={`inline-flex items-center px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mt-3 ${selectedMember.status === 'active'
                                            ? 'bg-[#dcfce7] text-[#166534] border border-[#166534]/20'
                                            : selectedMember.status === 'pending'
                                                ? 'bg-[#fef08a] text-[#854d0e] border border-[#ca8a04]/20'
                                                : 'bg-surface-container-highest text-on-surface-variant border border-outline-variant'
                                        }`}
                                >
                                    {selectedMember.status}
                                </span>
                            </div>
                            <div className="space-y-4">
                                <div className="border-t border-outline-variant pt-4">
                                    <p className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold mb-3">
                                        Academic &amp; Contact
                                    </p>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <p className="text-xs text-on-surface-variant font-medium">
                                                Program / Year
                                            </p>
                                            <p
                                                className="font-body-sm text-on-surface font-semibold"
                                            >
                                                {selectedMember.course + " " + selectedMember.year_level}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-on-surface-variant font-medium">
                                                Phone
                                            </p>
                                            <p className="font-body-sm text-on-surface font-semibold">
                                                {selectedMember.phone_number}
                                            </p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-xs text-on-surface-variant font-medium">
                                                Email Address
                                            </p>
                                            <p className="font-body-sm text-primary font-semibold">
                                                {selectedMember.email}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-on-surface-variant font-medium">
                                                Emergency Contact
                                            </p>
                                            <p className="font-body-sm text-on-surface font-semibold">
                                                {selectedMember.emergency_person_name}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-on-surface-variant font-medium">
                                                Emergency Contact Phone
                                            </p>
                                            <p className="font-body-sm text-on-surface font-semibold">
                                                {selectedMember.emergency_phone}
                                            </p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-xs text-on-surface-variant font-medium">
                                                Blood Type
                                            </p>
                                            <p className="font-body-sm text-on-surface font-semibold">
                                                {selectedMember.blood_type}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-on-surface-variant font-medium">
                                                Consent Form
                                            </p>
                                            <p className="font-body-sm text-on-surface font-semibold">
                                                {selectedMember.consent_form}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-on-surface-variant font-medium">
                                                Class Schedule
                                            </p>
                                            <p className="font-body-sm text-on-surface font-semibold">
                                                {selectedMember.class_schedule}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {selectedMember.status === "pending" ? ("") : (
                                    <div className="border-t border-outline-variant pt-4">
                                        <p className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold mb-3">
                                            Duty Performance
                                        </p>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-surface-container-low border border-outline-variant rounded-lg p-3 text-center">
                                                <p className="font-headline-lg text-headline-lg text-primary font-bold m-0">
                                                    N/A
                                                </p>
                                                <p className="font-label-sm text-xs text-on-surface-variant mt-1">
                                                    Attendance Rate
                                                </p>
                                            </div>
                                            <div className="bg-surface-container-low border border-outline-variant rounded-lg p-3 text-center">
                                                <p className="font-headline-lg text-headline-lg text-primary font-bold m-0">
                                                    N/A
                                                </p>
                                                <p className="font-label-sm text-xs text-on-surface-variant mt-1">
                                                    Incidents Handled
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
                {/* Drawer Actions */}
                {selectedMember && selectedMember.status === "pending" ? (
                    <div className="p-4 border-t border-outline-variant bg-surface flex gap-3">
                        <button onClick={handleReject} className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-label-md text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">close</span>
                            Reject
                        </button>
                        <button onClick={handleApprove} className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-label-md text-sm hover:bg-green-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">check</span>
                            Approve
                        </button>
                    </div>
                ) : (
                    <div className="p-4 border-t border-outline-variant bg-surface flex gap-3">
                        <button className="flex-1 bg-surface-container-lowest border border-outline-variant text-on-surface px-4 py-2 rounded-lg font-label-md text-sm hover:bg-surface-container-low transition-colors">
                            Edit
                        </button>
                        <button className="flex-1 bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-sm hover:bg-primary-container transition-colors shadow-sm">
                            Message
                        </button>
                    </div>
                )}
            </aside>
            {/* Drawer Overlay */}
            {drawerOpen && (
                <div
                    className="fixed inset-0 bg-on-surface/20 z-[65] transition-opacity"
                    onClick={closeDrawer}
                />
            )}
            {/* Bottom Navigation Bar (Mobile) */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2.5 bg-surface border-t border-outline-variant shadow-sm">
                <button className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-highest px-3 py-1 rounded-xl transition-colors">
                    <span className="material-symbols-outlined">dashboard</span>
                    <span className="font-label-sm text-label-sm mt-0.5">Dashboard</span>
                </button>
                <button className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-highest px-3 py-1 rounded-xl transition-colors">
                    <span className="material-symbols-outlined">how_to_reg</span>
                    <span className="font-label-sm text-label-sm mt-0.5">Attendance</span>
                </button>
                <button className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-3 py-1 scale-90 duration-150 ease-in-out">
                    <span className="material-symbols-outlined filled-icon">group</span>
                    <span className="font-label-sm text-label-sm mt-0.5">Roster</span>
                </button>
                <button className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-highest px-3 py-1 rounded-xl transition-colors">
                    <span className="material-symbols-outlined">security</span>
                    <span className="font-label-sm text-label-sm mt-0.5">Vault</span>
                </button>
                <button className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-highest px-3 py-1 rounded-xl transition-colors">
                    <span className="material-symbols-outlined">model_training</span>
                    <span className="font-label-sm text-label-sm mt-0.5">Training</span>
                </button>
            </nav>
        </>
    )
}