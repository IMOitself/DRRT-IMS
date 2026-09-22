import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { getInitials } from "../../utils/format";

export default function Members() {
    const [memberApplications, setMemberApplications] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedMemberApplication, setSelectedMemberApplication] = useState(null);
    const { user } = useAuth();

    function openDrawer(application) {
        setSelectedMemberApplication(application);
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
                setMemberApplications(res.data.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleReject = () => {
        updateMemberApplication("rejected");
    };

    const handleApprove = () => {
        updateMemberApplication("approved_need_register");
    };

    const updateMemberApplication = (status) => {
        api
            .put("/membership-applications/" + selectedMemberApplication.id, { status: status, reviewer_id: user.id })
            .then(() => {
                setSelectedMemberApplication({ ...selectedMemberApplication, status: status });

                const updatedList = memberApplications.map((app) =>
                    app.id === selectedMemberApplication.id ? { ...app, status: status } : app
                );
                setMemberApplications(updatedList);
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <title>Members - DRRT Officer Portal</title>

            <Header />

            {/* Main Content Canvas */}
            <main className="grow pb-32">
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 space-y-4">
                    {/* Active Members Context Header */}
                    <section className="bg-white border border-blue-border p-6 rounded-xl shadow-sm space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h2 className="font-geist text-2xl md:text-3xl font-bold text-text mt-1">
                                    Members List
                                </h2>
                                <p className="text-sm text-subtext mt-1">
                                    Manage personnel records, squad assignments, and status.
                                </p>
                            </div>
                            <button className="flex font-geist text-xs md:text-sm bg-blue-bg text-blue border border-blue-border transition-all px-4 py-2 rounded-full font-bold shadow-sm active:scale-95 hover:bg-blue hover:text-white cursor-pointer items-center gap-1.5">
                                <span className="material-symbols-outlined text-[18px]!">add</span>
                                Add Member Guide
                            </button>
                        </div>
                        <div className="flex flex-wrap p-3 gap-x-4 gap-y-2 justify-between items-center text-sm shadow-sm rounded-xl">
                            <div className="font-geist text-sm text-text font-semibold">
                                Total Members: <span className="text-blue font-bold">{memberApplications.length} Registered</span>
                            </div>
                            <div className="flex gap-4 text-xs font-geist">
                                <div className="flex items-center gap-1.5 text-green font-medium">
                                    <span className="w-2 h-2 rounded-full bg-green" /> Active: 0
                                </div>
                                <div className="flex items-center gap-1.5 text-yellow font-medium">
                                    <span className="w-2 h-2 rounded-full bg-yellow" /> Pending: {memberApplications.filter((ma) => ma.status === 'pending').length}
                                </div>
                                <div className="flex items-center gap-1.5 text-red font-medium">
                                    <span className="w-2 h-2 rounded-full bg-red" /> Inactive: 0
                                </div>
                            </div>
                        </div>
                    </section>

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
                                All Members ({memberApplications.length})
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
                    </div>
                    {/* Member List Cards */}
                    <section className="space-y-2">
                        {memberApplications.map((application) =>
                            <div
                                key={application.id}
                                className="member-card bg-white border border-blue-border rounded-lg p-3 flex items-center justify-between shadow-sm hover:border-blue transition-colors cursor-pointer group"
                                onClick={() => openDrawer(application)}>
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-blue shrink-0">
                                        {getInitials(application.full_name)}
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
                                            PENDING
                                        </span>
                                    ) : application.status === 'approved_need_register' ? (
                                        <span className="bg-yellow-bg text-yellow inline-flex items-center gap-1.5 font-geist font-semibold px-2.5 py-0.5 rounded-full w-fit">
                                            <span className="bg-yellow w-2 h-2 rounded-full" />
                                            AWAITING REGISTRATION
                                        </span>
                                    ) : application.status === 'approved_member_now' ? (
                                        <span className="bg-green-bg text-green inline-flex items-center gap-1.5 font-geist font-semibold px-2.5 py-0.5 rounded-full w-fit">
                                            <span className="bg-green w-2 h-2 rounded-full" />
                                            ACTIVE
                                        </span>
                                    ) : application.status === 'rejected' ? (
                                        <span className="bg-red-bg text-red inline-flex items-center gap-1.5 font-geist font-semibold px-2.5 py-0.5 rounded-full w-fit">
                                            <span className="bg-red w-2 h-2 rounded-full" />
                                            REJECTED
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
                    {selectedMemberApplication && (
                        <>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 text-3xl rounded-full bg-surface-container-high flex items-center justify-center font-bold text-blue shrink-0">
                                    {getInitials(selectedMemberApplication.full_name)}
                                </div>
                                <h3 className="font-geist text-xl font-bold text-text m-0">
                                    {selectedMemberApplication.full_name}
                                </h3>
                                <p className="text-sm text-subtext mt-0.5">
                                    ID: {selectedMemberApplication.student_id}
                                </p>

                                {selectedMemberApplication.status === 'approved_member_now'
                                    ? <span className={'bg-green-bg text-green border border-green-border inline-flex items-center gap-1.5 font-geist font-semibold px-2.5 py-0.5 rounded-full'}>ACTIVE</span>
                                    : selectedMemberApplication.status === 'pending'
                                        ? <span className={'bg-yellow-bg text-yellow border border-yellow-border inline-flex items-center gap-1.5 font-geist font-semibold px-2.5 py-0.5 rounded-full'}>PENDING</span>
                                        : selectedMemberApplication.status === 'approved_need_register'
                                            ? <span className={'bg-yellow-bg text-yellow border border-yellow-border inline-flex items-center gap-1.5 font-geist font-semibold px-2.5 py-0.5 rounded-full'}>AWAITING REGISTRATION</span>
                                            : selectedMemberApplication.status === 'rejected'
                                                ? <span className={'bg-red-bg text-red border border-red-border inline-flex items-center gap-1.5 font-geist font-semibold px-2.5 py-0.5 rounded-full'}>REJECTED</span>
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
                                                {selectedMemberApplication.course + " " + selectedMemberApplication.year_level}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-subtext font-medium">
                                                Phone
                                            </p>
                                            <p className="text-text font-semibold">
                                                {selectedMemberApplication.phone_number}
                                            </p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-xs text-subtext font-medium">
                                                Email Address
                                            </p>
                                            <p className="text-blue font-semibold">
                                                {selectedMemberApplication.email}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-subtext font-medium">
                                                Emergency Contact
                                            </p>
                                            <p className="text-text font-semibold">
                                                {selectedMemberApplication.emergency_person_name}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-subtext font-medium">
                                                Emergency Contact Phone
                                            </p>
                                            <p className="text-text font-semibold">
                                                {selectedMemberApplication.emergency_phone}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-subtext font-medium">
                                                Consent Form
                                            </p>
                                            <p className="text-text font-semibold truncate">
                                                {selectedMemberApplication.consent_form}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-subtext font-medium">
                                                Class Schedule
                                            </p>
                                            <p className="text-text font-semibold truncate">
                                                {selectedMemberApplication.class_schedule}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {selectedMemberApplication.status === "approved_need_register" && (
                                    <div className="border-t border-blue-border pt-4">
                                        <div className="bg-yellow-bg border border-yellow-border rounded-xl p-4 text-center space-y-1">
                                            <span className="material-symbols-outlined text-yellow text-[32px]!">hourglass_top</span>
                                            <p className="font-geist text-sm font-bold text-yellow">Awaiting Account Registration</p>
                                            <p className="text-xs text-subtext">This applicant has been approved but hasn't created their account yet.</p>
                                        </div>
                                    </div>
                                )}
                                {selectedMemberApplication.status === "approved_member_now" && (
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
                {selectedMemberApplication && selectedMemberApplication.status === "pending" ? (
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
                ) : selectedMemberApplication && selectedMemberApplication.status === "approved_need_register" && (
                    <div className="p-4 border-t border-blue-border bg-surface">
                        <div className="text-center text-sm text-subtext">
                            <span className="material-symbols-outlined text-yellow text-[18px] align-middle mr-1">schedule</span>
                            Waiting for applicant to register their account
                        </div>
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
