import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

export default function Roster() {
    const [membersApplication, setMembersApplication] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const { user } = useAuth();

    function openDrawer(application) {
        setSelectedMember(application);
        setDrawerOpen(true);
    }

    function closeDrawer() {
        setDrawerOpen(false);
    }

    useEffect(() => {
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
            .put("/membership-applications/" + selectedMember.id, { status: "rejected", reviewer_id: user.id })
            .then(() => {
                // Update selected member status
                setSelectedMember({ ...selectedMember, status: "rejected" });

                // Update the application item in the list
                const updatedList = membersApplication.map((app) =>
                    app.id === selectedMember.id ? { ...app, status: "rejected" } : app
                );
                setMembersApplication(updatedList);
            })
            .catch((err) => console.error(err));
    };

    const handleApprove = () => {
        api
            .put("/membership-applications/" + selectedMember.id, { status: "approved", reviewer_id: user.id })
            .then(() => {
                setSelectedMember({ ...selectedMember, status: "approved" });

                const updatedList = membersApplication.map((app) =>
                    app.id === selectedMember.id ? { ...app, status: "approved" } : app
                );
                setMembersApplication(updatedList);
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <title>Roster - DRRT Officer Portal</title>

            <Header />

            {/* Main Content Canvas */}
            <main className="grow pb-32">
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 space-y-4">
                    {/* Active Roster Context Header */}
                    <section className="bg-white border border-blue-border p-4 rounded-xl shadow-sm space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <p className="font-geist text-xs text-blue uppercase tracking-wider font-bold">
                                    Disaster Response Team Directory
                                </p>
                                <h2 className="font-geist text-2xl text-text mt-1">
                                    Active Responder Roster
                                </h2>
                                <p className="text-sm text-subtext mt-1">
                                    Manage personnel records, squad assignments, and status.
                                </p>
                            </div>
                            <button className="bg-blue text-white hover:bg-blue transition-colors py-2 px-4 rounded-lg font-geist text-sm flex items-center justify-center gap-2 shadow-sm self-start sm:self-auto">
                                <span className="material-symbols-outlined text-[18px]">add</span>{" "}
                                Add Member
                            </button>
                        </div>
                    </section>
                    {/* Live Roster Summary */}
                    <div className="bg-surface-container-low border border-blue-border rounded-lg p-3 flex flex-wrap gap-x-4 gap-y-2 justify-between items-center text-sm shadow-sm">
                        <div className="font-geist text-text">
                            Total Members:{" "}
                            <span className="text-blue font-bold">{membersApplication.length} Registered</span>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1.5 text-green font-medium">
                                <span className="w-2 h-2 rounded-full bg-green" /> Active: 0
                            </div>
                            <div className="flex items-center gap-1.5 text-yellow font-medium">
                                <span className="w-2 h-2 rounded-full bg-yellow" /> Pending: {membersApplication.filter((ma) => ma.status === 'pending').length}
                            </div>
                            <div className="flex items-center gap-1.5 text-red font-medium">
                                <span className="w-2 h-2 rounded-full bg-red" /> Inactive: 0
                            </div>
                        </div>
                    </div>
                    {/* Search & Filters */}
                    <div className="space-y-3">
                        {/* Search Bar */}
                        <div className="relative w-full">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-subtext pointer-events-none">
                                search
                            </span>
                            <input
                                className="w-full pl-10 pr-4 py-2 border border-blue-border rounded-lg bg-white hover:border-blue focus:outline-none focus:ring-1 focus:ring-blue text-base transition-colors"
                                placeholder="Search by name, ID, course, or squad..."
                                type="text"
                            />
                        </div>
                        {/* Rapid Filter Pills */}
                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
                            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-blue text-white font-geist text-xs shrink-0">
                                All Members ({membersApplication.length})
                            </button>
                            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-blue-border text-text font-geist text-xs hover:bg-surface-dim transition-colors shrink-0">
                                Active Only (0)
                            </button>
                            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-blue-border text-text font-geist text-xs hover:bg-surface-dim transition-colors shrink-0">
                                1st Year
                            </button>
                            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-blue-border text-text font-geist text-xs hover:bg-surface-dim transition-colors shrink-0">
                                2nd Year
                            </button>
                            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-blue-border text-text font-geist text-xs hover:bg-surface-dim transition-colors shrink-0">
                                3rd Year
                            </button>
                            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-blue-border text-text font-geist text-xs hover:bg-surface-dim transition-colors shrink-0">
                                4th Year
                            </button>
                        </div>
                        {/* Duty Squad Dropdown Filter */}
                        <div className="relative w-fit">
                            <select className="w-full appearance-none bg-white border border-blue-border hover:border-blue text-text text-sm rounded-lg block p-2.5 pr-8 focus:outline-none focus:ring-1 focus:ring-blue shadow-sm transition-colors cursor-pointer">
                                <option selected="">All Squads / Duty Teams</option>
                                <option value="medical">Medical Squad</option>
                                <option value="sar">Search &amp; Rescue</option>
                                <option value="logistics">Logistics</option>
                                <option value="comm">Comm Duty</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-subtext">
                                <span className="material-symbols-outlined text-[20px]">
                                    arrow_drop_down
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Member List Cards */}
                    <section className="space-y-2">
                        {membersApplication.map((application) =>
                            <div
                                className="member-card bg-white border border-blue-border rounded-lg p-3 flex items-center justify-between shadow-sm hover:border-blue transition-colors cursor-pointer group"
                                onClick={() => openDrawer(application)}>
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-blue shrink-0">
                                        {application.full_name.split(' ').map((n) => n[0]).join('')}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-geist text-text truncate group-hover:text-blue transition-colors">
                                            {application.full_name}
                                        </p>
                                        <p className="text-[11px] text-subtext truncate">
                                            ID: {application.student_id} • {application.course + " " + application.year_level}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    {application.status === 'pending' ? (
                                        <span className={"bg-yellow-bg text-yellow inline-flex items-center gap-1.5 font-geist font-semibold px-2.5 py-0.5 rounded-full w-fit"}>
                                            <span className={"bg-yellow animate-pulse w-2 h-2 rounded-full"} />
                                            {application.status.toUpperCase()}
                                        </span>
                                    ) : application.status === 'inactive' ? (
                                        <span className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider bg-surface-container-highest text-subtext border border-blue-border">
                                            Inactive
                                        </span>
                                    ) : ('')}
                                    <span className="material-symbols-outlined text-subtext text-[18px]">
                                        chevron_right
                                    </span>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </main>
            {/* Member Profile Drawer */}
            <aside className={`glass-bg fixed inset-y-0 right-0 z-70 w-full md:w-100 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-blue-border flex flex-col ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-4 border-b border-blue-border">
                    <h3 className="font-geist text-lg font-bold text-text m-0">
                        Member Profile
                    </h3>
                    <button
                        aria-label="Close"
                        className="cursor-pointer hover:bg-surface-container-high p-2 transition-colors text-subtext"
                        onClick={closeDrawer}
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                {/* Drawer Content */}
                <div className="grow overflow-y-auto p-6 space-y-6">
                    {selectedMember && (
                        <>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 text-3xl rounded-full bg-surface-container-high flex items-center justify-center font-bold text-blue shrink-0">
                                    {selectedMember.full_name.split(' ').map((n) => n[0]).join('')}
                                </div>
                                <h3 className="font-geist text-xl font-bold text-text m-0">
                                    {selectedMember.full_name}
                                </h3>
                                <p className="text-sm text-subtext mt-0.5">
                                    ID: {selectedMember.student_id}
                                </p>

                                {selectedMember.status === 'active'
                                    ? <span className={'bg-green-bg text-green border border-green-border'}>{selectedMember.status}</span>
                                    : selectedMember.status === 'pending'
                                        ? <span className={'bg-yellow-bg text-yellow border border-yellow-border'}>{selectedMember.status}</span>
                                        : ""
                                }
                            </div>
                            <div className="space-y-4">
                                <div className="border-t border-blue-border pt-4">
                                    <p className="font-geist text-xs text-blue uppercase tracking-wider font-bold mb-3">
                                        Academic &amp; Contact
                                    </p>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div>
                                            <p className="text-xs text-subtext font-medium">
                                                Program / Year
                                            </p>
                                            <p className="text-text font-semibold">
                                                {selectedMember.course + " " + selectedMember.year_level}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-subtext font-medium">
                                                Phone
                                            </p>
                                            <p className="text-text font-semibold">
                                                {selectedMember.phone_number}
                                            </p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-xs text-subtext font-medium">
                                                Email Address
                                            </p>
                                            <p className="text-blue font-semibold">
                                                {selectedMember.email}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-subtext font-medium">
                                                Emergency Contact
                                            </p>
                                            <p className="text-text font-semibold">
                                                {selectedMember.emergency_person_name}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-subtext font-medium">
                                                Emergency Contact Phone
                                            </p>
                                            <p className="text-text font-semibold">
                                                {selectedMember.emergency_phone}
                                            </p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-xs text-subtext font-medium">
                                                Blood Type
                                            </p>
                                            <p className="text-text font-semibold">
                                                {selectedMember.blood_type}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-subtext font-medium">
                                                Consent Form
                                            </p>
                                            <p className="text-text font-semibold truncate">
                                                {selectedMember.consent_form}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-subtext font-medium">
                                                Class Schedule
                                            </p>
                                            <p className="text-text font-semibold truncate">
                                                {selectedMember.class_schedule}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {selectedMember.status === "pending" ? ("") : (
                                    <div className="border-t border-blue-border pt-4">
                                        <p className="font-geist text-xs text-blue uppercase tracking-wider font-bold mb-3">
                                            Duty Performance
                                        </p>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-surface-container-low border border-blue-border rounded-lg p-3 text-center">
                                                <p className="font-geist text-3xl text-blue font-bold m-0">
                                                    N/A
                                                </p>
                                                <p className="font-geist text-xs text-subtext mt-1">
                                                    Attendance Rate
                                                </p>
                                            </div>
                                            <div className="bg-surface-container-low border border-blue-border rounded-lg p-3 text-center">
                                                <p className="font-geist text-3xl text-blue font-bold m-0">
                                                    N/A
                                                </p>
                                                <p className="font-geist text-xs text-subtext mt-1">
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
                    <div className="p-4 border-t border-blue-border bg-surface flex gap-3">
                        <button onClick={handleReject} className="cursor-pointer flex-1 bg-red text-white px-4 py-2 rounded-lg font-geist text-sm hover:bg-red transition-colors flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">close</span>
                            Reject
                        </button>
                        <button onClick={handleApprove} className="cursor-pointer flex-1 bg-green text-white px-4 py-2 rounded-lg font-geist text-sm hover:bg-green transition-colors shadow-sm flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">check</span>
                            Approve
                        </button>
                    </div>
                ) : (
                    <div className="p-4 border-t border-blue-border bg-surface flex gap-3">
                        <button className="cursor-pointer flex-1 bg-white border border-blue-border text-text px-4 py-2 rounded-lg font-geist text-sm hover:bg-surface-container-low transition-colors">
                            Edit
                        </button>
                        <button className="cursor-pointer flex-1 bg-blue text-white px-4 py-2 rounded-lg font-geist text-sm hover:bg-blue transition-colors shadow-sm">
                            Message
                        </button>
                    </div>
                )}
            </aside>
            {/* Drawer Overlay */}
            {drawerOpen && (
                <div
                    className="fixed inset-0 bg-text/20 z-65 transition-opacity"
                    onClick={closeDrawer}
                />
            )}

            <BottomNav />
        </>
    )
}