import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { useAuth } from "../context/AuthContext";
import { getInitials } from "../utils/format";

export default function Profile() {
    const { user, setUser } = useAuth();
    const application = user?.membership_application;

    const [isEditing, setIsEditing] = useState(false);
    const [profileForm, setProfileForm] = useState({});
    const [initialProfileForm, setInitialProfileForm] = useState({});
    const [profileError, setProfileError] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // compare as strings since year_level comes back from the select as a string
    const hasProfileChanges = Object.keys(profileForm).some(
        (key) => String(profileForm[key]) !== String(initialProfileForm[key])
    );

    const startEditing = () => {
        const initialForm = {
            name: user?.name ?? "",
            student_id: application?.student_id ?? "",
            last_name: application?.last_name ?? "",
            first_name: application?.first_name ?? "",
            middle_name: application?.middle_name ?? "",
            course: application?.course ?? "",
            year_level: application?.year_level ?? "",
            phone_number: application?.phone_number ?? "",
            emergency_person_name: application?.emergency_person_name ?? "",
            emergency_phone: application?.emergency_phone ?? "",
        };
        setProfileForm(initialForm);
        setInitialProfileForm(initialForm);
        setProfileError("");
        setIsEditing(true);
    };

    const handleProfileChange = (e) => {
        setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        setIsSaving(true);
        setProfileError("");

        api
            .put("/user", profileForm)
            .then((res) => {
                setUser(res.data);
                setIsSaving(false);
                setIsEditing(false);
            })
            .catch((err) => {
                setIsSaving(false);
                setProfileError(err.response?.data?.message || "Something went wrong. Please try again.");
            });
    };

    let dashboardLink = "/member/dashboard";
    if (user?.role === "officer") dashboardLink = "/officer/dashboard";
    if (user?.role === "adviser") dashboardLink = "/adviser/dashboard";

    // change password reuses the forgot password flow, but with the logged in email
    const [codeSent, setCodeSent] = useState(false);
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleError = (err) => {
        setIsLoading(false);
        setErrorMessage(err.response?.data?.message || "Something went wrong. Please try again.");
    };

    const handleSendCode = () => {
        setIsLoading(true);
        setErrorMessage("");

        api
            .post("/send-password-reset-code", { email: user.email })
            .then(() => {
                setIsLoading(false);
                setCodeSent(true);
            })
            .catch(handleError);
    };

    const handleChangePassword = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        setIsLoading(true);
        setErrorMessage("");

        api
            .post("/reset-password", { email: user.email, code: code, password: password })
            .then(() => {
                alert("Your password has been changed.");
                setIsLoading(false);
                setCodeSent(false);
                setCode("");
                setPassword("");
                setConfirmPassword("");
            })
            .catch(handleError);
    };

    const applicationDetails = application ? [
        ["Student ID", application.student_id],
        ["Full Name", application.full_name],
        ["Course", application.course],
        ["Year Level", application.year_level],
        ["Email", application.email],
        ["Phone Number", application.phone_number],
        ["Emergency Person", application.emergency_person_name],
        ["Emergency Phone", application.emergency_phone],
    ] : [];

    const fieldCss = "w-full px-4 py-3 sm:py-2.5 min-h-11 bg-surface border border-blue-border rounded-xl text-sm text-text focus:ring-2 focus:ring-blue/30 focus:border-blue outline-none transition-all";
    const inputCss = "w-full pl-10 pr-4 py-3 sm:py-2.5 min-h-11 bg-surface border border-blue-border rounded-xl text-sm text-text placeholder:text-subtext/50 focus:ring-2 focus:ring-blue/30 focus:border-blue outline-none transition-all";

    return (
        <>
            <title>Profile - DRRT Portal</title>

            <Header />

            <main className="max-w-2xl w-full mx-auto px-4 md:px-8 py-8 pb-28 md:pb-12 space-y-6">
                {isEditing ? (
                    <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        disabled={isSaving}
                        className="inline-flex items-center gap-1.5 text-xs text-subtext font-bold hover:text-blue transition-colors cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-[16px]!">arrow_back</span>
                        <span>Cancel</span>
                    </button>
                ) : (
                    <Link
                        to={dashboardLink}
                        className="inline-flex items-center gap-1.5 text-xs text-subtext font-bold hover:text-blue transition-colors"
                    >
                        <span className="material-symbols-outlined text-[16px]!">arrow_back</span>
                        <span>Back to Dashboard</span>
                    </Link>
                )}

                {!isEditing ? (<>
                {/* Account Card */}
                <div className="bg-white border border-blue-border rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-surface-container-high border border-blue-border flex items-center justify-center font-bold text-xl text-blue shrink-0">
                        {getInitials(user?.name)}
                    </div>
                    <div className="min-w-0 space-y-1 grow">
                        <h1 className="font-geist text-lg sm:text-xl font-bold text-text truncate">
                            {user?.name}
                        </h1>
                        <p className="text-sm text-subtext truncate">{user?.email}</p>
                        <span className="inline-block font-geist text-[11px] font-bold text-blue bg-blue-bg px-3 py-1 rounded-full uppercase tracking-wider">
                            {user?.role}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={startEditing}
                        className="self-start flex items-center gap-1 text-sm font-geist font-bold text-blue bg-blue-bg px-3 py-1.5 rounded-lg hover:bg-blue/20 transition-all cursor-pointer shrink-0"
                    >
                        <span className="material-symbols-outlined text-[18px]!">edit</span>
                        <span>Edit</span>
                    </button>
                </div>

                {/* Membership Details (members only) */}
                {user?.role === "member" && (
                    <div className="bg-white border border-blue-border rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm space-y-4">
                        <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center text-blue shrink-0">
                                <span className="material-symbols-outlined text-[22px]! filled-icon">badge</span>
                            </div>
                            <div>
                                <h2 className="font-geist text-lg sm:text-xl font-bold text-text">
                                    Membership Details
                                </h2>
                                <p className="text-xs text-subtext">
                                    From your submitted membership application.
                                </p>
                            </div>
                        </div>

                        {application ? (
                            <div className="bg-surface-container-low border border-blue-border/50 rounded-xl p-4 space-y-3">
                                {applicationDetails.map(([label, value]) => (
                                    <div key={label} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-blue-border/40 pb-3">
                                        <span className="text-subtext">{label}:</span>
                                        <span className="font-bold text-blue font-mono text-base break-all">{value}</span>
                                    </div>
                                ))}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-blue-border/40 pb-3">
                                    <span className="text-subtext">Consent Form:</span>
                                    <a href={application.consent_form} target="_blank" rel="noopener noreferrer" className="font-bold text-blue font-mono text-base hover:underline">
                                        View Consent Form
                                    </a>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                    <span className="text-subtext">Class Schedule:</span>
                                    <a href={application.class_schedule} target="_blank" rel="noopener noreferrer" className="font-bold text-blue font-mono text-base hover:underline">
                                        View Class Schedule
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-subtext">No membership application linked to this account.</p>
                        )}
                    </div>
                )}
                </>) : (
                    /* Edit Profile Form */
                    <form onSubmit={handleSaveProfile} className="bg-white border border-blue-border rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm space-y-4">
                        <div className="flex items-center gap-3.5 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center text-blue shrink-0">
                                <span className="material-symbols-outlined text-[22px]! filled-icon">edit</span>
                            </div>
                            <h2 className="font-geist text-lg sm:text-xl font-bold text-text">
                                Edit Profile
                            </h2>
                        </div>

                        {profileError && (
                            <div className="bg-red-bg text-red border border-red-border rounded-xl p-3 text-sm font-medium">
                                {profileError}
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                ["name", "Account Name", "text", true],
                                ...(application ? [
                                    ["student_id", "Student ID", "text", true],
                                    ["last_name", "Last Name", "text", true],
                                    ["first_name", "First Name", "text", true],
                                    ["middle_name", "Middle Name", "text", false],
                                    ["phone_number", "Phone Number", "tel", true],
                                    ["emergency_person_name", "Emergency Person", "text", true],
                                    ["emergency_phone", "Emergency Phone", "tel", true],
                                ] : []),
                            ].map(([name, label, type, required]) => (
                                <div key={name}>
                                    <label htmlFor={name} className="block font-geist text-xs font-bold text-text mb-1.5">
                                        {label}
                                    </label>
                                    <input
                                        type={type}
                                        id={name}
                                        name={name}
                                        required={required}
                                        value={profileForm[name]}
                                        onChange={handleProfileChange}
                                        className={fieldCss}
                                    />
                                </div>
                            ))}

                            {application && (<>
                                <div>
                                    <label htmlFor="course" className="block font-geist text-xs font-bold text-text mb-1.5">
                                        Course
                                    </label>
                                    <select id="course" name="course" required value={profileForm.course} onChange={handleProfileChange} className={fieldCss}>
                                        <option value="" disabled>Select Course</option>
                                        <option value="BSIS">BS Information Systems</option>
                                        <option value="BSA">BS Accountancy</option>
                                        <option value="BSBA">BS Business Administration</option>
                                        <option value="BSSW">BS Social Work</option>
                                        <option value="ACT">Associate in Computer Technology</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="year_level" className="block font-geist text-xs font-bold text-text mb-1.5">
                                        Year Level
                                    </label>
                                    <select id="year_level" name="year_level" required value={profileForm.year_level} onChange={handleProfileChange} className={fieldCss}>
                                        <option value="" disabled>Select Year Level</option>
                                        <option value={1}>1st Year</option>
                                        <option value={2}>2nd Year</option>
                                        <option value={3}>3rd Year</option>
                                        <option value={4}>4th Year</option>
                                    </select>
                                </div>
                            </>)}
                        </div>

                        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={isSaving || !hasProfileChanges}
                                className="w-full bg-blue text-white hover:bg-blue transition-all font-geist font-bold py-3 min-h-11 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                            >
                                <span className="material-symbols-outlined text-[18px]!">save</span>
                                <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                            </button>
                        </div>
                    </form>
                )}

                {/* Change Password */}
                <div className="bg-white border border-blue-border rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm">
                    <div className="flex items-center gap-3.5 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-green-bg flex items-center justify-center text-green shrink-0">
                            <span className="material-symbols-outlined text-[22px]! filled-icon">lock_reset</span>
                        </div>
                        <div>
                            <h2 className="font-geist text-lg sm:text-xl font-bold text-text">
                                Change Password
                            </h2>
                            <p className="text-xs text-subtext">
                                {codeSent
                                    ? "Check your email for the 6-digit verification code (valid for 10 minutes)."
                                    : "We will send a verification code to your email first."}
                            </p>
                        </div>
                    </div>

                    {errorMessage && (
                        <div className="bg-red-bg text-red border border-red-border rounded-xl p-3 mb-4 text-sm font-medium">
                            {errorMessage}
                        </div>
                    )}

                    {!codeSent ? (
                        <button
                            type="button"
                            onClick={handleSendCode}
                            disabled={isLoading}
                            className="w-full bg-blue text-white hover:bg-blue transition-all font-geist font-bold py-3 min-h-11 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined text-[18px]!">mark_email_read</span>
                            <span>{isLoading ? "Sending Code..." : "Send Verification Code"}</span>
                        </button>
                    ) : (
                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div>
                                <label htmlFor="verification_code" className="block font-geist text-xs font-bold text-text mb-1.5">
                                    Verification Code
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-subtext text-[20px]!">pin</span>
                                    <input
                                        type="text"
                                        id="verification_code"
                                        maxLength={6}
                                        pattern="[0-9]{6}"
                                        inputMode="numeric"
                                        placeholder="123456"
                                        required
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        className={inputCss}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="new_password" className="block font-geist text-xs font-bold text-text mb-1.5">
                                    New Password
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-subtext text-[20px]!">key</span>
                                    <input
                                        type="password"
                                        id="new_password"
                                        placeholder="••••••••"
                                        required
                                        minLength={8}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={inputCss}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirm_new_password" className="block font-geist text-xs font-bold text-text mb-1.5">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-subtext text-[20px]!">lock_reset</span>
                                    <input
                                        type="password"
                                        id="confirm_new_password"
                                        placeholder="••••••••"
                                        required
                                        minLength={8}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={inputCss}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue text-white hover:bg-blue transition-all font-geist font-bold py-3 min-h-11 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] mt-2 cursor-pointer disabled:opacity-50"
                            >
                                <span>{isLoading ? "Changing..." : "Change Password"}</span>
                            </button>

                            <div className="pt-4 border-t border-blue-border/40 flex flex-wrap items-center justify-between gap-2 text-xs">
                                <button
                                    type="button"
                                    onClick={handleSendCode}
                                    disabled={isLoading}
                                    className="text-blue font-bold hover:underline flex items-center gap-1 py-2 px-1 rounded-lg cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-[16px]!">refresh</span>
                                    <span>Resend Code</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setErrorMessage(""); setCodeSent(false); }}
                                    className="text-subtext font-bold hover:text-blue transition-colors flex items-center gap-1 py-2 px-1 rounded-lg cursor-pointer"
                                >
                                    <span>Cancel</span>
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </main>

            <BottomNav />
        </>
    );
}
