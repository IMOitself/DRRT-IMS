import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../components/Header"
import BottomNav from "../components/BottomNav";

import api from "../api/axios";


const AUTO_SAVED_FORM_DATA_KEY = "auto_saved_join_form";

export default function JoinDRRTForm() {
    const navigate = useNavigate();

    const initialFormData = {
        student_id: '',
        last_name: '',
        first_name: '',
        middle_name: '',
        course: '',
        year_level: '',
        email: '',
        phone_number: '',
        emergency_person_name: '',
        emergency_phone: '',
    };

    const [formData, setFormData] = useState(() => {
        const autoSavedFormData = localStorage.getItem(AUTO_SAVED_FORM_DATA_KEY);
        if (autoSavedFormData) return { ...initialFormData, ...JSON.parse(autoSavedFormData) };
        return initialFormData;
    });

    useEffect(() => {
        if (formData) localStorage.setItem(AUTO_SAVED_FORM_DATA_KEY, JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            ...(name === "course" && value === "ACT" && formData.year_level > 2 ? { year_level: "" } : {}),
        });
    };

    const isSamePhone = Boolean(formData.phone_number && formData.phone_number === formData.emergency_phone);
    const [isDataPrivacyDialogOpen, setIsDataPrivacyDialogOpen] = useState(false);

    const handleSubmit = (e) => {
        if (isSamePhone) return e.preventDefault();
        e.preventDefault();

        api
            .post("/membership-applications", formData)
            .then((res) => {
                localStorage.removeItem(AUTO_SAVED_FORM_DATA_KEY);
                navigate(`/join-form/${res.data.application_id}?token=${res.data.access_token}`);
            })
            .catch((err) => console.error(err));
    }

    const testAutoFillEveryField = () => {
        setFormData({
            student_id: "24-00123ABC",
            last_name: "Braus",
            first_name: "Sasha",
            middle_name: "Blouse",
            course: "BSIS",
            year_level: "1",
            email: "sasha.braus@gmail.com",
            phone_number: "09123456789",
            emergency_person_name: "Jean Kirstein",
            emergency_phone: "09123456789",
        });
    };

    return (
        <>
            <title>Join Form - DRRT Portal</title>
            <Header />

            <div className="grow w-full">
                {/* Main Form Container */}
                <main className="max-w-3xl mx-auto w-full px-4 md:px-8 py-6 md:py-8 pb-28 md:pb-12 space-y-6">
                    {/* Navigation Back Link */}
                    <Link to="/join" className="inline-flex items-center gap-2 text-blue font-geist font-semibold hover:underline">
                        <span className="material-symbols-outlined text-[18px]!">
                            arrow_back
                        </span>
                        <span>Back to Recruitment Overview</span>
                    </Link>

                    <br /><button onClick={testAutoFillEveryField}>test auto fill hehe</button>

                    {/* Form Banner Header */}
                    <section className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="font-geist text-xs font-bold text-blue uppercase tracking-wider">
                                Step 1 of 4
                            </span>
                            <span className="text-blue-border">•</span>
                            <span className="font-geist text-xs font-semibold text-subtext">
                                Online Application
                            </span>
                        </div>
                        <h1 className="font-geist text-2xl md:text-3xl font-bold text-text">
                            DRRT Member Registration
                        </h1>
                        <p className="text-base text-subtext mt-2 leading-relaxed">
                            Please complete all required fields below. Your application will be
                            submitted for review by the DRRT Officers and the Adviser.
                        </p>
                    </section>
                    {/* Interactive Registration Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Section 1: Student Information */}
                        <fieldset className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
                            <div className="flex items-center gap-3 mb-2 border-b border-blue-border/40 pb-3">
                                <div className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center text-blue shrink-0">
                                    <span className="material-symbols-outlined text-[20px]!">
                                        person
                                    </span>
                                </div>
                                <legend className="font-geist text-lg font-bold text-text">
                                    Personal Information
                                </legend>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Student ID */}
                                <div>
                                    <label htmlFor="student-id" className="block font-geist text-sm font-semibold text-text mb-1">
                                        Student ID Number <span className="text-red">*</span>
                                    </label>
                                    <input
                                        value={formData.student_id}
                                        onChange={handleChange}
                                        type="text"
                                        id="student-id"
                                        name="student_id"
                                        required
                                        pattern="^\d{2}-?\d{5}[a-zA-Z]{3}$"
                                        title="Same format in your school ID, for example: 24-00123ABC or 2400123ABC"
                                        placeholder="e.g. 24-00123ABC"
                                        className="w-full px-4 py-2.5 rounded-xl border border-blue-border bg-white text-text focus:ring-1 focus:ring-blue outline-none transition-all"
                                    />
                                </div>
                                {/* Last Name */}
                                <div>
                                    <label htmlFor="last-name" className="block font-geist text-sm font-semibold text-text mb-1">
                                        Last Name <span className="text-red">*</span>
                                    </label>
                                    <input
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        type="text"
                                        id="last-name"
                                        name="last_name"
                                        required
                                        pattern="[a-zA-Z\s'-]+"
                                        title="Your surname, for example: Ackerman"
                                        placeholder="e.g. Ackerman"
                                        className="w-full px-4 py-2.5 rounded-xl border border-blue-border bg-white text-text focus:ring-1 focus:ring-blue outline-none transition-all"
                                    />
                                </div>
                                {/* First Name */}
                                <div>
                                    <label htmlFor="first-name" className="block font-geist text-sm font-semibold text-text mb-1">
                                        First Name <span className="text-red">*</span>
                                    </label>
                                    <input
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        type="text"
                                        id="first-name"
                                        name="first_name"
                                        required
                                        pattern="[a-zA-Z\s'-]+"
                                        title="Your given name, for example: Levi"
                                        placeholder="e.g. Levi"
                                        className="w-full px-4 py-2.5 rounded-xl border border-blue-border bg-white text-text focus:ring-1 focus:ring-blue outline-none transition-all"
                                    />
                                </div>
                                {/* Middle Name */}
                                <div>
                                    <label htmlFor="middle-name" className="block font-geist text-sm font-semibold text-text mb-1">
                                        Middle Name <span className="text-subtext font-normal">(optional)</span>
                                    </label>
                                    <input
                                        value={formData.middle_name}
                                        onChange={handleChange}
                                        type="text"
                                        id="middle-name"
                                        name="middle_name"
                                        pattern="[a-zA-Z\s'-]*"
                                        title="Your middle name, for example: Ackerman. Leave blank if you have none"
                                        placeholder="e.g. Ackerman"
                                        className="w-full px-4 py-2.5 rounded-xl border border-blue-border bg-white text-text focus:ring-1 focus:ring-blue outline-none transition-all"
                                    />
                                </div>
                                {/* Academic Program */}
                                <div>
                                    <label htmlFor="program" className="block font-geist text-sm font-semibold text-text mb-1">
                                        Academic Program / Course <span className="text-red">*</span>
                                    </label>
                                    <select
                                        value={formData.course}
                                        onChange={handleChange}
                                        id="program"
                                        name="course"
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl border border-blue-border bg-white text-text focus:ring-1 focus:ring-blue outline-none transition-all"
                                    >
                                        <option value="" disabled="">
                                            Select Course
                                        </option>
                                        <option value="BSIS">Bachelor of Science in Information Systems</option>
                                        <option value="BSA">Bachelor of Science in Accountancy</option>
                                        <option value="BSAIS">Bachelor of Science in Accounting Information System</option>
                                        <option value="BSSW">Bachelor of Science in Social Work</option>
                                        <option value="BAB">Bachelor of Arts in Broadcasting</option>
                                        <option value="ACT">Associate in Computer Technology</option>
                                    </select>
                                </div>
                                {/* Year Level */}
                                <div>
                                    <label htmlFor="year-level" className="block font-geist text-sm font-semibold text-text mb-1">
                                        Year Level <span className="text-red">*</span>
                                    </label>
                                    <select
                                        value={formData.year_level}
                                        onChange={handleChange}
                                        id="year-level"
                                        name="year_level"
                                        required
                                        className="w-full px-4 py-2.5 rounded-xl border border-blue-border bg-white text-text focus:ring-1 focus:ring-blue outline-none transition-all"
                                    >
                                        <option value="" disabled="">
                                            Select Year Level
                                        </option>
                                        <option value={1}>1st Year</option>
                                        <option value={2}>2nd Year</option>
                                        {formData.course !== "ACT" && (
                                            <>
                                                <option value={3}>3rd Year</option>
                                                <option value={4}>4th Year</option>
                                            </>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </fieldset>
                        {/* Section 2: Contact & Medical Information */}
                        <fieldset className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
                            <div className="flex items-center gap-3 mb-2 border-b border-blue-border/40 pb-3">
                                <div className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center text-blue shrink-0">
                                    <span className="material-symbols-outlined text-[20px]!">
                                        call
                                    </span>
                                </div>
                                <legend className="font-geist text-lg font-bold text-text">
                                    Contact &amp; Emergency Profile
                                </legend>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block font-geist text-sm font-semibold text-text mb-1">
                                        Your Email <span className="text-red">*</span>
                                    </label>
                                    <input
                                        value={formData.email}
                                        onChange={handleChange}
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        title="Your email for example: levi.ackerman@gmail.com"
                                        placeholder="example@gmail.com"

                                        className="w-full px-4 py-2.5 rounded-xl border border-blue-border bg-white text-text focus:ring-1 focus:ring-blue outline-none transition-all"
                                    />
                                </div>
                                {/* Mobile Number */}
                                <div>
                                    <label htmlFor="mobile" className="block font-geist text-sm font-semibold text-text mb-1">
                                        Your Number <span className="text-red">*</span>
                                    </label>
                                    <input
                                        value={formData.phone_number}
                                        onChange={handleChange}
                                        type="tel"
                                        id="mobile"
                                        name="phone_number"
                                        required
                                        pattern="[0-9]{11}"
                                        title="Your personal number for example: 09123456789 (11 digits)"
                                        placeholder="09123456789"
                                        className="w-full px-4 py-2.5 rounded-xl border border-blue-border bg-white text-text focus:ring-1 focus:ring-blue outline-none transition-all"
                                    />
                                </div>
                                {/* Emergency Contact Name */}
                                <div>
                                    <label htmlFor="emergency-name" className="block font-geist text-sm font-semibold text-text mb-1">
                                        Emergency Contact Person <span className="text-red">*</span>
                                    </label>
                                    <input
                                        value={formData.emergency_person_name}
                                        onChange={handleChange}
                                        type="text"
                                        id="emergency-name"
                                        name="emergency_person_name"
                                        required
                                        placeholder="Parent or Guardian Name"
                                        className="w-full px-4 py-2.5 rounded-xl border border-blue-border bg-white text-text focus:ring-1 focus:ring-blue outline-none transition-all"
                                    />
                                </div>
                                {/* Emergency Contact Phone */}
                                <div>
                                    <label htmlFor="emergency-phone" className="block font-geist text-sm font-semibold text-text mb-1">
                                        Emergency Contact Number <span className="text-red">*</span>
                                    </label>
                                    <input
                                        value={formData.emergency_phone}
                                        onChange={handleChange}
                                        type="tel"
                                        id="emergency-phone"
                                        name="emergency_phone"
                                        required
                                        pattern="[0-9]{11}"
                                        title="Emergency contact person's number for example: 09123456789 (11 digits)"
                                        ref={(el) => el?.setCustomValidity(isSamePhone ? "Emergency contact number cannot be the same as your personal number." : "")}
                                        placeholder="09123456789"
                                        className="w-full px-4 py-2.5 rounded-xl border border-blue-border bg-white text-text focus:ring-1 focus:ring-blue outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </fieldset>
                        {/* Section 3: Bylaws & Code of Conduct Agreements */}
                        <fieldset className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
                            <div className="flex items-center gap-3 mb-2 border-b border-blue-border/40 pb-3">
                                <div className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center text-blue shrink-0">
                                    <span className="material-symbols-outlined text-[20px]!">
                                        gavel
                                    </span>
                                </div>
                                <legend className="font-geist text-lg font-bold text-text">
                                    Commitment &amp; Bylaw Agreement
                                </legend>
                            </div>
                            <div className="space-y-3">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        onChange={handleChange}
                                        type="checkbox"
                                        name="agreed_data_privacy"
                                        required
                                        className="mt-1 w-5 h-5 border-blue-border text-blue focus:ring-blue rounded-md"
                                    />
                                    <span className="text-sm text-text leading-relaxed">
                                        I have read and understood the{" "}
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setIsDataPrivacyDialogOpen(true);
                                            }}
                                            className="font-bold text-blue hover:underline cursor-pointer"
                                        >
                                            Data Privacy Agreement
                                        </button>{" "}
                                        and agree to the processing of my personal information for the stated purposes, where consent is required
                                    </span>
                                </label>
                            </div>
                        </fieldset>
                        {/* Submission Actions */}
                        <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3">
                            <Link to="/join" className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-highest transition-all">
                                <button type="button" className="w-full text-center">
                                    Cancel
                                </button>
                            </Link>
                            <button type="submit" className="w-full sm:w-auto bg-blue text-white hover:bg-blue transition-all font-geist text-sm font-bold px-8 py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] active:opacity-50 cursor-pointer">
                                <span>Submit Application</span>
                                <span className="material-symbols-outlined text-[18px]!">send</span>
                            </button>
                        </div>
                    </form>
                </main>
            </div>

            {isDataPrivacyDialogOpen && (
                <div className="fixed inset-0 z-80 flex items-center justify-center bg-text/20 p-4">
                    <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto">
                        <div className="glass-bg border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-4">
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-row gap-2 items-center">
                                    <span className="material-symbols-outlined text-blue mb-1 text-[30px]!">
                                        gavel
                                    </span>
                                    <p className="w-fit font-geist text-lg font-semibold text-text mb-1">
                                        Data Privacy Agreement
                                    </p>
                                </div>
                                <div className="mt-2 space-y-3 max-h-[55vh] overflow-y-auto pr-2 font-geist text-sm text-text">
                                    <div className="space-y-0.5 text-xs text-subtext font-semibold">
                                        <p className="text-text font-bold">Disaster Response and Rescue Team Information Management System (DRRT-IMS)</p>
                                        <p>La Verdad Christian College – Apalit Chapter</p>
                                        <p>Last Updated: October 29, 2026</p>
                                    </div>

                                    <h3 className="font-bold text-text pt-1">1. Introduction</h3>
                                    <p>Welcome to the DRRT Information Management System (DRRT-IMS).</p>
                                    <p>We value your privacy and are committed to protecting your personal information in accordance with Republic Act No. 10173, also known as the Data Privacy Act of 2012.</p>
                                    <p>By using this system, you acknowledge that you have read and understood how your personal information is collected, used, stored, and protected as described in this agreement.</p>

                                    <h3 className="font-bold text-text pt-1">2. Information We Collect</h3>
                                    <p>We may collect the following information when you register or use the system:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li><strong>Personal Information:</strong> Full name, student ID, course, section, email address, and contact details.</li>
                                        <li><strong>Membership Information:</strong> Application details, membership status, and assigned organizational role.</li>
                                        <li><strong>Attendance Information:</strong> Attendance status, time-in records, reasons for absences or tardiness, and supporting evidence.</li>
                                        <li><strong>Incident Information:</strong> Details of reported incidents, including personal and sensitive medical information when necessary.</li>
                                        <li><strong>Account Information:</strong> Login credentials, verification information, and account activity needed for security.</li>
                                    </ul>

                                    <h3 className="font-bold text-text pt-1">3. How We Use Your Information</h3>
                                    <p>Your personal information will be used for legitimate organizational purposes, including:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Processing and managing membership applications.</li>
                                        <li>Managing organizational events and activities.</li>
                                        <li>Monitoring attendance and participation.</li>
                                        <li>Recording and managing emergency incidents.</li>
                                        <li>Verifying user identities and controlling system access.</li>
                                        <li>Improving the security, reliability, and functionality of the system.</li>
                                    </ul>
                                    <p>We will not use your personal information for unrelated purposes without an appropriate legal basis.</p>

                                    <h3 className="font-bold text-text pt-1">4. Data Protection and Security</h3>
                                    <p>We implement appropriate technical and organizational safeguards to protect personal information against unauthorized access, disclosure, alteration, or loss.</p>
                                    <p>Access to information is restricted based on user roles and responsibilities. Sensitive incident records are accessible only to authorized personnel.</p>
                                    <p>While we strive to protect your information, no electronic system can guarantee absolute security.</p>

                                    <h3 className="font-bold text-text pt-1">5. Information Sharing</h3>
                                    <p>We do not sell your personal information.</p>
                                    <p>Your information may be accessed or disclosed only to authorized personnel, trusted service providers acting under appropriate safeguards, or government authorities when required or permitted by law.</p>
                                    <p>Sensitive medical and incident information will be subject to additional access restrictions and confidentiality measures.</p>

                                    <h3 className="font-bold text-text pt-1">6. Data Retention</h3>
                                    <p>We retain personal information only for as long as necessary to fulfill its intended purposes or comply with applicable legal requirements.</p>
                                    <p>Once information is no longer required, it will be securely deleted, anonymized, or disposed of in accordance with applicable data protection procedures.</p>

                                    <h3 className="font-bold text-text pt-1">7. Your Rights</h3>
                                    <p>Under the Data Privacy Act of 2012, you have rights concerning your personal information, including the right to:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Be informed about how your information is processed.</li>
                                        <li>Request access to your personal information.</li>
                                        <li>Request correction of inaccurate or incomplete information.</li>
                                        <li>Object to certain processing activities.</li>
                                        <li>Request deletion or blocking of personal information when legally applicable.</li>
                                        <li>Exercise other rights provided by applicable data privacy laws.</li>
                                    </ul>
                                    <p>Requests may be subject to legitimate organizational requirements and applicable legal obligations.</p>

                                    <h3 className="font-bold text-text pt-1">8. Changes to This Agreement</h3>
                                    <p>We may update this Data Privacy Agreement to reflect changes in system operations, organizational policies, or applicable laws.</p>
                                    <p>Any significant changes will be communicated through the system or other appropriate channels.</p>

                                    <h3 className="font-bold text-text pt-1">9. Contact and Privacy Concerns</h3>
                                    <p>For questions, concerns, or requests regarding your personal information, please contact the DRRT's designated privacy representative through the official contact information provided by the organization.</p>

                                    <h3 className="font-bold text-text pt-1">10. Acknowledgment and Consent</h3>
                                    <p>By selecting <strong>"I Agree"</strong>, you confirm that you have read and understood this Data Privacy Agreement.</p>
                                    <p>Where consent is the applicable lawful basis, you voluntarily agree to the collection and processing of your personal information for the specific purposes described above. Processing that relies on another lawful basis will be handled in accordance with applicable law.</p>
                                </div>

                                <div className="w-full flex items-center mt-4">
                                    <div className="flex flex-col sm:flex-row flex-1 items-center justify-end gap-2">
                                        <button type="button" onClick={() => setIsDataPrivacyDialogOpen(false)} className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-highest transition-all cursor-pointer">
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <BottomNav />
        </>

    )
}
