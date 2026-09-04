import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "../components/Header"
import BottomNav from "../components/BottomNav";

import api from "../api/axios";

const SAVED_FORM_DATA_KEY = "auto_saved_join_form";

export default function JoinDRRTForm() {

    const initialFormData = {
        student_id: '',
        full_name: '',
        course: '',
        year_level: '',
        email: '',
        phone_number: '',
        emergency_person_name: '',
        emergency_phone: '',
        blood_type: '',
        consent_form: null, // TODO: for now its a file path, but we need this to be an actual file
        class_schedule: null, // TODO: for now its a file path, but we need this to be an actual file
    };

    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem(SAVED_FORM_DATA_KEY);
        if (savedData) return JSON.parse(savedData);
        return initialFormData;
    });

    useEffect(() => {
        if (formData) localStorage.setItem(SAVED_FORM_DATA_KEY, JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        api
            .get("/user")
            .then((res) => {
                const formWithUserID = {
                    ...formData, user_id: res.data.id,
                }

                setFormData(formWithUserID);

                api
                    .post("/membership-applications", formWithUserID)
                    .then((res) => {
                        localStorage.removeItem(SAVED_FORM_DATA_KEY);
                        navigate(`/join-form/${res.data.application_id}`);
                    })
                    .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));
    }

    const testAutoFillEveryField = () => {
        setFormData({
            student_id: "24-00123ABC",
            full_name: "Braus, Sasha B.",
            course: "BSIS",
            year_level: "1",
            email: "sasha.braus@student.laverdad.edu.ph",
            phone_number: "09123456789",
            emergency_person_name: "Jean Kirstein",
            emergency_phone: "09123456789",
            blood_type: "Unknown",
            consent_form: "C:\\fakepath\\consent_form.pdf",
            class_schedule: "C:\\fakepath\\class_schedule.png",
        });
    };

    return (
        <>
            <title>DRRT Membership Application - Student Portal</title>
            <Header />

            <div className="grow w-full">
                {/* Main Form Container */}
                <main className="max-w-3xl mx-auto w-full px-4 md:px-8 py-6 md:py-8 pb-28 md:pb-12 space-y-6">
                    {/* Navigation Back Link */}
                    <Link to="/join" className="inline-flex items-center gap-2 text-blue font-geist font-semibold hover:underline">
                        <span className="material-symbols-outlined text-[18px]">
                            arrow_back
                        </span>
                        <span>Back to Recruitment Overview</span>
                    </Link>

                    <br /><button onClick={testAutoFillEveryField}>test auto fill hehe</button>

                    {/* Form Banner Header */}
                    <section className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue/5 rounded-bl-full pointer-events-none" />
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
                                    <span className="material-symbols-outlined text-[20px]">
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
                                {/* Full Name */}
                                <div>
                                    <label htmlFor="full-name" className="block font-geist text-sm font-semibold text-text mb-1">
                                        Full Name <span className="text-red">*</span>
                                    </label>
                                    <input
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        type="text"
                                        id="full-name"
                                        name="full_name"
                                        required
                                        pattern="[a-zA-Z\s]+,\s*[a-zA-Z\s]+(\s+[a-zA-Z]\.?)?"
                                        title="Full name, for example: Ackerman, Levi A. (include the comma)"
                                        placeholder="Surname, Firstname M."
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
                                        <option value="BSIS">BS Information Systems</option>
                                        <option value="BSA">BS Accountancy</option>
                                        <option value="BSBA">BS Business Administration</option>
                                        <option value="BSSW">BS Social Work</option>
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
                                        <option value={3}>3rd Year</option>
                                        <option value={4}>4th Year</option>
                                    </select>
                                </div>
                            </div>
                        </fieldset>
                        {/* Section 2: Contact & Medical Information */}
                        <fieldset className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
                            <div className="flex items-center gap-3 mb-2 border-b border-blue-border/40 pb-3">
                                <div className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center text-blue shrink-0">
                                    <span className="material-symbols-outlined text-[20px]">
                                        call
                                    </span>
                                </div>
                                <legend className="font-geist text-lg font-bold text-text">
                                    Contact &amp; Emergency Profile
                                </legend>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Institutional Email */}
                                <div>
                                    <label htmlFor="email" className="block font-geist text-sm font-semibold text-text mb-1">
                                        LV Email <span className="text-red">*</span>
                                    </label>
                                    <input
                                        value={formData.email}
                                        onChange={handleChange}
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        pattern=".+laverdad\.edu\.ph"
                                        title="Your La Verdad email for example: levi.ackerman@student.laverdad.edu.ph"
                                        placeholder="example@student.laverdad.edu.ph"

                                        className="w-full px-4 py-2.5 rounded-xl border border-blue-border bg-white text-text focus:ring-1 focus:ring-blue outline-none transition-all"
                                    />
                                </div>
                                {/* Mobile Number */}
                                <div>
                                    <label htmlFor="mobile" className="block font-geist text-sm font-semibold text-text mb-1">
                                        Mobile Number <span className="text-red">*</span>
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
                                        Emergency Contact Phone <span className="text-red">*</span>
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
                                        placeholder="09123456789"
                                        className="w-full px-4 py-2.5 rounded-xl border border-blue-border bg-white text-text focus:ring-1 focus:ring-blue outline-none transition-all"
                                    />
                                </div>
                                {/* Blood Type */}
                                <div className="md:col-span-2">
                                    <label htmlFor="blood-type" className="block font-geist text-sm font-semibold text-text mb-1">
                                        Blood Type <span className="text-red">*</span>
                                    </label>
                                    <select
                                        value={formData.blood_type}
                                        onChange={handleChange}
                                        id="blood-type"
                                        name="blood_type"
                                        required
                                        className="w-full md:w-1/2 px-4 py-2.5 rounded-xl border border-blue-border bg-white text-text focus:ring-1 focus:ring-blue outline-none transition-all"
                                    >
                                        <option value="" disabled="">
                                            Select Blood Type
                                        </option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="Unknown">Unknown / Need Testing</option>
                                    </select>
                                </div>
                            </div>
                        </fieldset>
                        {/* Section 3: Document Attachments */}
                        {/* Required Downloads Card */}
                        <article className="bg-surface-container border border-blue-border/80 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-9 h-9 rounded-xl bg-blue/10 flex items-center justify-center text-blue shrink-0">
                                    <span className="material-symbols-outlined text-[20px] filled-icon">
                                        folder
                                    </span>
                                </div>
                                <h2 className="font-geist text-lg font-bold text-text">
                                    Required Resources
                                </h2>
                            </div>
                            <div className="space-y-3">
                                <a href="#" className="flex items-center justify-between p-4 bg-white rounded-xl border border-blue-border/80 card-hover transition-all group">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-red text-[24px] filled-icon">
                                            picture_as_pdf
                                        </span>
                                        <div>
                                            <h3 className="font-geist text-sm font-bold text-text group-hover:text-blue transition-colors">
                                                Parent Consent Form
                                            </h3>
                                            <p className="text-[12px] text-subtext">
                                                PDF Document • 450 KB
                                            </p>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-subtext group-hover:text-blue transition-colors">
                                        download
                                    </span>
                                </a>
                            </div>
                        </article>

                        <fieldset className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
                            <div className="flex items-center gap-3 mb-2 border-b border-blue-border/40 pb-3">
                                <div className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center text-blue shrink-0">
                                    <span className="material-symbols-outlined text-[20px]">
                                        upload_file
                                    </span>
                                </div>
                                <legend className="font-geist text-lg font-bold text-text">
                                    Required Attachments
                                </legend>
                            </div>
                            <div className="space-y-4">
                                {/* Parent Consent Form Upload */}
                                <div>
                                    <label className="block font-geist text-sm font-semibold text-text mb-1">
                                        Signed Parent/Guardian Consent Form{" "}
                                        <span className="text-red">*</span>
                                    </label>
                                    <p className="text-sm text-subtext mb-2">
                                        Download Parent Consent Form above and ask your parents to sign it. Then upload the signed document. <br />
                                        Accepted formats: PDF, PNG, JPG, JPEG (Max 5MB)
                                    </p>
                                    <input
                                        onChange={handleChange}
                                        type="file"
                                        name="consent_form"
                                        // required
                                        accept=".pdf,.png,.jpg,.jpeg"
                                        className="block w-full text-sm text-subtext file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:font-geist file:font-bold file:bg-blue/10 file:text-blue hover:file:bg-blue/20 file:transition-all cursor-pointer border border-blue-border rounded-xl p-1"
                                    />
                                </div>
                                {/* Class Schedule Upload */}
                                <div>
                                    <label className="block font-geist text-sm font-semibold text-text mb-1">
                                        Current Class Schedule <span className="text-red">*</span>
                                    </label>
                                    <p className="text-sm text-subtext mb-2">
                                        Upload official schedule copy to verify duty availability
                                    </p>
                                    <input
                                        onChange={handleChange}
                                        type="file"
                                        name="class_schedule"
                                        // required
                                        accept=".pdf,.png,.jpg,.jpeg"
                                        className="block w-full text-sm text-subtext file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:font-geist file:font-bold file:bg-blue/10 file:text-blue hover:file:bg-blue/20 file:transition-all cursor-pointer border border-blue-border rounded-xl p-1"
                                    />
                                </div>
                            </div>
                        </fieldset>
                        {/* Section 4: Bylaws & Code of Conduct Agreements */}
                        <fieldset className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
                            <div className="flex items-center gap-3 mb-2 border-b border-blue-border/40 pb-3">
                                <div className="w-8 h-8 rounded-lg bg-blue/10 flex items-center justify-center text-blue shrink-0">
                                    <span className="material-symbols-outlined text-[20px]">
                                        gavel
                                    </span>
                                </div>
                                <legend className="font-geist text-lg font-bold text-text">
                                    Commitment &amp; Bylaw Agreement
                                </legend>
                            </div>
                            <div className="space-y-3">
                                {/* Article IV Agreement */}
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        onChange={handleChange}
                                        type="checkbox"
                                        name="agreed_article4"
                                        required
                                        className="mt-1 w-5 h-5 border-blue-border text-blue focus:ring-blue rounded-md"
                                    />
                                    <span className="text-sm text-text leading-relaxed">
                                        I agree to abide by <strong>Article IV Membership Rules</strong>
                                        , maintaining active availability for drills, mandatory
                                        emergency response calls, and required monthly volunteer hours.
                                    </span>
                                </label>
                                {/* Article X Uniform Policy Agreement */}
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        onChange={handleChange}
                                        type="checkbox"
                                        name="agreed_article10"
                                        required
                                        className="mt-1 w-5 h-5 border-blue-border text-blue focus:ring-blue rounded-md"
                                    />
                                    <span className="text-sm text-text leading-relaxed">
                                        I acknowledge and commit to compliance with{" "}
                                        <strong>Article X Uniform Guidelines</strong> (proper grooming,
                                        designated duty wear, and official badge protocols).
                                    </span>
                                </label>
                            </div>
                        </fieldset>
                        {/* Submission Actions */}
                        <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3">
                            <Link to="/join" className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-low transition-all">
                                <button type="button" className="w-full text-center">
                                    Cancel
                                </button>
                            </Link>
                            <button type="submit" className="w-full sm:w-auto bg-blue text-white hover:bg-blue transition-all font-geist text-sm font-bold px-8 py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] active:opacity-50">
                                <span>Submit Application</span>
                                <span className="material-symbols-outlined text-[18px]">send</span>
                            </button>
                        </div>
                    </form>
                </main>
            </div>

            <BottomNav />
        </>

    )
}