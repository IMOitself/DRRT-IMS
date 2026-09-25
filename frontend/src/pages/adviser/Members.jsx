import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
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
    const [selectedForDelete, setSelectedForDelete] = useState([]);
    const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
    const [isConfirmGraduateDialogOpen, setIsConfirmGraduateDialogOpen] = useState(false);
    const [isConfirmRemoveDialogOpen, setIsConfirmRemoveDialogOpen] = useState(false);
    const moreMenuRef = useRef(null);
    const [events, setEvents] = useState([]);
    const [attendances, setAttendances] = useState([]);
    const { user } = useAuth();
    const location = useLocation();

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
            application.last_name,
            application.first_name,
            application.middle_name,
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
        if (memberFilter === "all") return application.status !== "graduated";
        if (memberFilter === "graduated") return application.status === "graduated";
        return Number(application.year_level) === memberFilter;
    };

    const pillClassName = (filter) =>
        memberFilter === filter && !searchQuery.trim()
            ? "whitespace-nowrap px-4 py-1.5 rounded-full bg-blue text-white font-geist text-xs shrink-0 hover:bg-blue/80 cursor-pointer"
            : "whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-highest border border-blue-border text-text font-geist text-xs hover:bg-blue/80 hover:text-white transition-colors shrink-0 cursor-pointer";

    const filteredApplications = listedApplications.filter(
        (application) => matchesSearch(application) && matchesFilter(application)
    );

    // the status page needs the link token for applicants who have no account yet
    const applicationStatusLink = (application) =>
        `${window.location.origin}/join-form/${application.id}?token=${application.access_token}`;

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    function openDrawer(application) {
        setSelectedMemberApplication(application);
        setIsAddMemberDialogOpen(false);
        setDrawerOpen(true);
    }

    function closeDrawer() {
        setDrawerOpen(false);
        setIsMoreMenuOpen(false);
    }

    // close the options menu when clicking anywhere outside it
    useEffect(() => {
        if (!isMoreMenuOpen) return;

        function handleClickOutside(e) {
            if (moreMenuRef.current && !moreMenuRef.current.contains(e.target)) {
                setIsMoreMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMoreMenuOpen]);

    useEffect(() => {
        api
            .get("/membership-applications")
            .then((res) => {
                setMemberApplications(res.data.data);

                // opened from another page (e.g. attendance details) to show a specific member
                const openMemberUserId = location.state?.openMemberUserId;
                const application = res.data.data.find((ma) => ma.user_id === openMemberUserId);
                if (openMemberUserId && application) openDrawer(application);
            })
            .catch((err) => console.error(err));

        api
            .get("/events")
            .then((res) => setEvents(res.data))
            .catch((err) => console.error(err));

        api
            .get("/attendances", { params: { all: 1 } })
            .then((res) => setAttendances(res.data))
            .catch((err) => console.error(err));
    }, []);

    const hasEventStarted = (event) => {
        const start = new Date(event.date);
        if (event.time_hour) {
            start.setHours(
                (Number(event.time_hour) % 12) + (event.time_ampm === "PM" ? 12 : 0),
                Number(event.time_minute) || 0, 0, 0
            );
        } else {
            start.setHours(0, 0, 0, 0);
        }
        return start <= new Date();
    };

    const startedEvents = events.filter(hasEventStarted);
    const presentAttendances = attendances.filter(
        (attendance) =>
            attendance.user_id === selectedMemberApplication?.user_id &&
            attendance.status === "present"
    );
    const attendanceRatePercentage = startedEvents.length
        ? ((presentAttendances.length / startedEvents.length) * 100).toFixed(2)
        : "0.00";

    const handleDelete = () => {
        setSelectedForDelete([selectedMemberApplication.id]);
        setIsConfirmDeleteDialogOpen(true);
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

    // keeps the application so they can be unmarked later
    const handleConfirmGraduate = () => {
        // unmarking puts them back as a regular member
        const status = selectedMemberApplication.status === "graduated" ? "approved_member_now" : "graduated";
        api
            .put("/membership-applications/" + selectedMemberApplication.id, { status: status })
            .then(() => {
                setSelectedMemberApplication({ ...selectedMemberApplication, status: status });
                setMemberApplications(memberApplications.map((app) =>
                    app.id === selectedMemberApplication.id ? { ...app, status: status } : app
                ));
                setIsConfirmGraduateDialogOpen(false);
            })
            .catch((err) => console.error(err));
    };

    // deletes both the application and the member's account
    const removeMember = () => {
        api
            .delete("/membership-applications/" + selectedMemberApplication.id + "/member")
            .then(() => {
                setMemberApplications(memberApplications.filter((app) => app.id !== selectedMemberApplication.id));
                setIsConfirmRemoveDialogOpen(false);
                closeDrawer();
            })
            .catch((err) => console.error(err));
    };

    const toggleSelectedForDelete = (id) => {
        setSelectedForDelete((selected) =>
            selected.includes(id) ? selected.filter((selectedId) => selectedId !== id) : [...selected, id]
        );
    };

    const handleConfirmDelete = () => {
        Promise.all(
            selectedForDelete.map((id) => api.delete("/membership-applications/" + id))
        )
            .then(() => {
                setMemberApplications(memberApplications.filter((ma) => !selectedForDelete.includes(ma.id)));
                setSelectedForDelete([]);
                setIsConfirmDeleteDialogOpen(false);
                if (selectedMemberApplication && selectedForDelete.includes(selectedMemberApplication.id)) closeDrawer();
            })
            .catch((err) => console.error(err));
    };

    return (
        <>
            <title>Members - DRRT Adviser Portal</title>

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
                                Add Member
                                {incomingApplications.length > 0 &&
                                    <><span className="w-2 h-2 rounded-full bg-yellow" /><span className="text-yellow">{incomingApplications.length}</span></>
                                }
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
                                All Members ({listedApplications.filter((ma) => ma.status !== "graduated").length})
                            </button>
                            {[1, 2, 3, 4].map((year) => (
                                <button key={year} onClick={() => setMemberFilter(year)} className={pillClassName(year)}>
                                    {yearLabels[year]}
                                </button>
                            ))}
                            <div className="w-0.5 bg-blue-border shrink-0" />
                            <button onClick={() => setMemberFilter("graduated")} className={pillClassName("graduated")}>
                                Graduated ({listedApplications.filter((ma) => ma.status === "graduated").length})
                            </button>
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
                                    ) : ('')}
                                    {application.removal_requested && (
                                        <span className="bg-red-bg text-red inline-flex items-center gap-1.5 font-geist font-semibold px-2.5 py-0.5 rounded-full w-fit">
                                            <span className="bg-red w-2 h-2 rounded-full" />
                                            REMOVAL REQUESTED
                                        </span>
                                    )}
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
            {isConfirmGraduateDialogOpen && selectedMemberApplication && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-text/20 p-4">
                    <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto">
                        <div className="glass-bg border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-4">
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-row gap-2 items-center">
                                    <span className="material-symbols-outlined text-blue mb-1 text-[30px]!">
                                        school
                                    </span>
                                    <p className="w-fit font-geist text-lg font-semibold text-text mb-1">
                                        {selectedMemberApplication.status === "graduated" ? "Unmark as Graduated?" : "Mark as Graduated?"}
                                    </p>
                                </div>
                                <p className="font-geist text-text">
                                    {selectedMemberApplication.status === "graduated"
                                        ? "Unmarking " + selectedMemberApplication.full_name + " as graduated brings them back to attendance."
                                        : "Marking " + selectedMemberApplication.full_name + " as graduated removes them from attendance."}
                                </p>

                                <div className="w-full flex items-center mt-4">
                                    <div className="flex flex-col sm:flex-row flex-1 items-center justify-end gap-2">
                                        <button onClick={() => setIsConfirmGraduateDialogOpen(false)} className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-low transition-all cursor-pointer">
                                            Cancel
                                        </button>
                                        <button onClick={handleConfirmGraduate} className="w-full sm:w-auto bg-blue text-white hover:bg-blue/90 transition-all font-geist font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer">
                                            <span className="material-symbols-outlined text-[20px]!">school</span>
                                            <span>{selectedMemberApplication.status === "graduated" ? "Unmark as Graduated" : "Mark as Graduated"}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isConfirmRemoveDialogOpen && selectedMemberApplication && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-text/20 p-4">
                    <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto">
                        <div className="glass-bg border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-4">
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-row gap-2 items-center">
                                    <span className="material-symbols-outlined text-red mb-1 text-[30px]!">
                                        warning
                                    </span>
                                    <p className="w-fit font-geist text-lg font-semibold text-text mb-1">
                                        Remove Member?
                                    </p>
                                </div>
                                <p className="font-geist text-text">
                                    This cannot be undone. {selectedMemberApplication.full_name}'s application, account and attendance records will be permanently deleted.
                                </p>

                                <div className="w-full flex items-center mt-4">
                                    <div className="flex flex-col sm:flex-row flex-1 items-center justify-end gap-2">
                                        <button onClick={() => setIsConfirmRemoveDialogOpen(false)} className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-low transition-all cursor-pointer">
                                            Cancel
                                        </button>
                                        <button onClick={removeMember} className="w-full sm:w-auto bg-red text-white hover:bg-red/90 transition-all font-geist font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer">
                                            <span className="material-symbols-outlined text-[20px]!">person_remove</span>
                                            <span>Remove</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isConfirmDeleteDialogOpen && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-text/20 p-4">
                    <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto">
                        <div className="glass-bg border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-4">
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-row gap-2 items-center">
                                    <span className="material-symbols-outlined text-red mb-1 text-[30px]!">
                                        warning
                                    </span>
                                    <p className="w-fit font-geist text-lg font-semibold text-text mb-1">
                                        Delete Applications?
                                    </p>
                                </div>
                                <p className="font-geist text-text">
                                    This cannot be undone. The following applications will be permanently deleted.
                                </p>

                                <ul className="mt-3 ml-5 list-disc space-y-0.5 text-sm text-subtext max-h-[45vh] overflow-y-auto">
                                    {incomingApplications
                                        .filter((application) => selectedForDelete.includes(application.id))
                                        .map((application) =>
                                            <li key={application.id}>
                                                <span className="font-semibold text-text">{application.full_name}</span>
                                                {" "}&bull; {yearLabels[application.year_level]}
                                            </li>
                                        )}
                                </ul>

                                <div className="w-full flex items-center mt-4">
                                    <div className="flex flex-col sm:flex-row flex-1 items-center justify-end gap-2">
                                        <button onClick={() => setIsConfirmDeleteDialogOpen(false)} className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-low transition-all cursor-pointer">
                                            Cancel
                                        </button>
                                        <button onClick={handleConfirmDelete} className="w-full sm:w-auto bg-red text-white hover:bg-red/90 transition-all font-geist font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer">
                                            <span className="material-symbols-outlined text-[20px]!">delete</span>
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isAddMemberDialogOpen && (
                <div className="fixed inset-0 z-60 flex items-center justify-center bg-text/20 p-4">
                    <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto">
                        <div className="glass-bg border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-4">
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
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 accent-red shrink-0 cursor-pointer"
                                                    checked={selectedForDelete.includes(application.id)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    onChange={() => toggleSelectedForDelete(application.id)}
                                                />
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
                                        <button onClick={() => { setSelectedForDelete([]); setIsAddMemberDialogOpen(false); }} className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-low transition-all cursor-pointer">
                                            Close
                                        </button>
                                        {selectedForDelete.length > 0 && (
                                            <button onClick={() => setIsConfirmDeleteDialogOpen(true)} className="w-full sm:w-auto bg-red text-white hover:bg-red/90 transition-all font-geist font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer">
                                                <span className="material-symbols-outlined text-[20px]!">delete</span>
                                                <span>Delete ({selectedForDelete.length})</span>
                                            </button>
                                        )}
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
                                        : ""
                                }
                                {selectedMemberApplication.removal_requested && (
                                    <span className="bg-red-bg text-red border border-red-border inline-flex items-center gap-1.5 font-geist font-semibold px-2.5 py-0.5 rounded-full mt-1">REMOVAL REQUESTED</span>
                                )}
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
                                            <p className="text-xs text-subtext">
                                                Send this link to the applicant so they can check their status and create their account:
                                            </p>
                                            <button className="flex w-full min-w-0 text-sm items-center gap-1 font-bold text-blue hover:underline cursor-pointer bg-blue-bg px-3 py-1 rounded-lg active:scale-95"
                                                onClick={() => copyToClipboard(applicationStatusLink(selectedMemberApplication))}>
                                                <span className="font-mono truncate">
                                                    {applicationStatusLink(selectedMemberApplication)}
                                                </span>
                                                <span className="material-symbols-outlined text-blue text-[20px]! ml-auto">
                                                    {copied ? "check" : "content_copy"}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {selectedMemberApplication.status === "approved_member_now" && (
                                    <div className="border-t border-blue-border pt-4">
                                        <p className="font-geist text-xs text-blue uppercase tracking-wider font-bold mb-3">
                                            Duty Performance
                                        </p>

                                        <div className="bg-surface-container-low border border-blue-border rounded-lg p-3 space-y-3">
                                            <div className="flex justify-between items-end">
                                                <span className="font-geist text-sm font-semibold text-subtext">
                                                    Attendance Rate
                                                </span>
                                                <span className="font-geist text-3xl font-bold text-blue leading-none">
                                                    {attendanceRatePercentage}%
                                                </span>
                                            </div>
                                            <div className="h-3.5 w-full bg-progress-ring-track rounded-full overflow-hidden relative">
                                                {/* 80% threshold marker */}
                                                <div className="absolute h-full w-0.5 bg-red z-10 left-[80%]" />
                                                {/* progress bar */}
                                                <div className="h-full bg-blue rounded-full transition-all duration-500" style={{ width: attendanceRatePercentage + "%" }} />
                                            </div>
                                            <p className="font-geist text-xs text-subtext">
                                                Present on {presentAttendances.length} of {startedEvents.length} Events
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
                        <button onClick={handleDelete} className="cursor-pointer flex-1 bg-red text-white px-4 py-2 rounded-lg font-geist text-sm hover:bg-red transition-colors flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                            Reject
                        </button>
                        <button onClick={handleApprove} className="cursor-pointer flex-1 bg-green text-white px-4 py-2 rounded-lg font-geist text-sm hover:bg-green transition-colors shadow-sm flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">check</span>
                            Approve
                        </button>
                    </div>
                ) : selectedMemberApplication && selectedMemberApplication.status === "approved_need_register" ? (
                    <div className="p-4 border-t border-blue-border bg-surface">
                        <div className="text-center text-sm text-subtext">
                            <span className="material-symbols-outlined text-yellow text-[18px] align-middle mr-1">schedule</span>
                            Waiting for applicant to register their account
                        </div>
                    </div>
                ) : selectedMemberApplication && (selectedMemberApplication.status === "approved_member_now" || selectedMemberApplication.status === "graduated") && (
                    <div className="p-4 border-t border-blue-border bg-surface space-y-3">
                        {/* an officer asked for this, so approving removes them right away */}
                        {selectedMemberApplication.removal_requested && (
                            <button
                                type="button"
                                onClick={removeMember}
                                className="cursor-pointer w-full bg-red text-white px-4 py-2 rounded-lg font-geist text-md hover:bg-red/90 transition-colors shadow-sm flex items-center justify-center gap-2 font-semibold"
                            >
                                <span className="material-symbols-outlined text-[22px]!">check</span>
                                Approve Removal Request
                            </button>
                        )}
                        <div className="relative" ref={moreMenuRef}>
                            <button
                                type="button"
                                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                                className="cursor-pointer w-full border border-blue-border text-text px-4 py-2 rounded-lg font-geist text-md hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2 font-semibold"
                            >
                                <span className="material-symbols-outlined text-[24px]!">list</span>
                                Options
                            </button>
                            {/* opens upward since the button sits at the bottom of the drawer */}
                            {isMoreMenuOpen && (
                                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-blue-border rounded-xl shadow-md overflow-hidden z-10">
                                    <button
                                        type="button"
                                        onClick={() => { setIsMoreMenuOpen(false); setIsConfirmGraduateDialogOpen(true); }}
                                        className="w-full flex items-center gap-3 px-4 py-3.5 font-geist text-base font-semibold text-text hover:bg-surface-container-low cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-[22px]!">school</span>
                                        {selectedMemberApplication.status === "graduated" ? "Unmark as graduated" : "Mark as graduated"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setIsMoreMenuOpen(false); setIsConfirmRemoveDialogOpen(true); }}
                                        className="w-full flex items-center gap-3 px-4 py-3.5 font-geist text-base font-semibold text-red hover:bg-surface-container-low cursor-pointer border-t border-blue-border"
                                    >
                                        <span className="material-symbols-outlined text-[22px]!">person_remove</span>
                                        Remove Member
                                    </button>
                                </div>
                            )}
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
