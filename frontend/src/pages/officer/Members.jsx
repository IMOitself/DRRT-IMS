import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { getInitials } from "../../utils/format";

export default function Members() {
    const [memberApplications, setMemberApplications] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
    const [selectedMemberApplication, setSelectedMemberApplication] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [memberFilter, setMemberFilter] = useState("all");
    const { user } = useAuth();

    const incomingApplications = memberApplications.filter(
        (ma) => ma.status === 'pending' || ma.status === 'approved_need_register'
    );
    const listedApplications = memberApplications.filter(
        (ma) => !(ma.status === 'pending' || ma.status === 'approved_need_register')
    );

    const yearLabels = ["", "1st Year", "2nd Year", "3rd Year", "4th Year"];

    // every searchable detail of an application in one string, so any word can match
    const matchesSearch = (application) => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return true;

        const applicationDetails = [
            application.full_name,
            application.email,
            application.student_id,
            application.course,
            application.year_level,
            yearLabels[application.year_level],
        ].join(" ").toLowerCase();

        return query.split(/\s+/).every((word) => applicationDetails.includes(word));
    };

    const matchesFilter = (application) => {
        if (searchQuery.trim()) return true;
        if (memberFilter === "all") return true;
        return Number(application.year_level) === memberFilter;
    };

    const pillClassName = (filter) =>
        memberFilter === filter && !searchQuery.trim()
            ? "whitespace-nowrap px-4 py-1.5 rounded-full bg-blue text-white font-geist text-xs shrink-0 hover:bg-blue/80 cursor-pointer"
            : "whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-blue-border text-text font-geist text-xs hover:bg-blue/80 hover:text-white transition-colors shrink-0 cursor-pointer";

    const filteredApplications = listedApplications.filter(
        (application) => matchesSearch(application) && matchesFilter(application)
    );

    function openDrawer(application) {
        setSelectedMemberApplication(application);
        setIsAddMemberDialogOpen(false);
        setDrawerOpen(true);
    }

    function closeDrawer() {
        setDrawerOpen(false);
    }

    useEffect(() => {
        api
            .get("/membership-applications")
            .then((res) => {
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
                    {/* Members Context Header */}
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
                            <button onClick={() => setIsAddMemberDialogOpen(true)} className="flex font-geist text-xs md:text-sm bg-blue-bg text-blue border border-blue-border transition-all px-4 py-2 rounded-full font-bold shadow-sm active:scale-95 hover:bg-blue hover:text-white cursor-pointer items-center gap-1.5">
                                <span className="material-symbols-outlined text-[18px]!">person_add</span>
                                Add Member<span className="w-2 h-2 rounded-full bg-yellow" /><span className="text-yellow">{incomingApplications.length}</span>
                            </button>
                        </div>
                        <div className="flex flex-wrap p-3 gap-x-4 gap-y-2 justify-between items-center text-sm shadow-sm rounded-xl">
                            <div className="font-geist text-sm text-text font-semibold">
                                Total Members: <span className="text-blue font-bold">{listedApplications.length} Registered</span>
                            </div>
                            <div className="text-yellow font-medium">
                                <span className="w-2 h-2 rounded-full bg-yellow" /> Pending: {incomingApplications.length}
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
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    // back to a plain list once the search is cleared
                                    if (!e.target.value.trim()) setMemberFilter("all");
                                }}
                            />
                        </div>
                        {/* Rapid Filter Pills */}
                        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
                            <button onClick={() => setMemberFilter("all")} className={pillClassName("all")}>
                                All Members ({listedApplications.length})
                            </button>
                            {[1, 2, 3, 4].map((year) => (
                                <button key={year} onClick={() => setMemberFilter(year)} className={pillClassName(year)}>
                                    {yearLabels[year]}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Member List Cards */}
                    <section className="space-y-2">
                        {filteredApplications.map((application) =>
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
                        {filteredApplications.length === 0 && (
                            <p className="font-geist text-sm text-subtext text-center py-4">
                                No members found.
                            </p>
                        )}
                    </section>
                </div>
            </main>
            {isAddMemberDialogOpen && (
                <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto">
                        <div className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-4">
                            <div className="flex flex-col gap-1">
                                <p className="w-fit font-geist text-lg font-semibold text-text mb-1">
                                    Pending Applications
                                </p>
                                <p className="font-geist text-text">
                                    Click on the application below to view details.
                                </p>

                                <div className="mt-3 space-y-2 max-h-[45vh] overflow-y-auto">
                                    {incomingApplications.length === 0 && (
                                        <p className="font-geist text-sm text-subtext">No pending applications.</p>
                                    )}
                                    {incomingApplications.map((application) =>
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
                                                        ID: {application.student_id} &bull; {application.course + " " + application.year_level}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                {application.status === 'pending' ? (
                                                    <span className="bg-yellow-bg text-yellow inline-flex items-center gap-1.5 font-geist font-semibold px-2.5 py-0.5 rounded-full w-fit">
                                                        <span className="bg-yellow animate-pulse w-2 h-2 rounded-full" />
                                                        PENDING
                                                    </span>
                                                ) : (
                                                    <span className="bg-yellow-bg text-yellow inline-flex items-center gap-1.5 font-geist font-semibold px-2.5 py-0.5 rounded-full w-fit">
                                                        <span className="bg-yellow w-2 h-2 rounded-full" />
                                                        AWAITING REGISTRATION
                                                    </span>
                                                )}
                                                <span className="material-symbols-outlined text-subtext text-[18px]">
                                                    chevron_right
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="w-full flex items-center">
                                    <div className="flex flex-col sm:flex-row flex-1 items-center justify-end gap-2">
                                        <button onClick={() => setIsAddMemberDialogOpen(false)} className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-low transition-all cursor-pointer">
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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

                                {selectedMemberApplication.status === 'pending'
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

                                        <div className="bg-surface-container-low border border-blue-border rounded-lg p-3 text-center">
                                            <p className="font-geist text-3xl text-blue font-bold m-0">
                                                N/A
                                            </p>
                                            <p className="font-geist text-xs text-subtext mt-1">
                                                Attendance Rate
                                            </p>
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
