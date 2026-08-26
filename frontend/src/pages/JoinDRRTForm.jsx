import { Link } from "react-router-dom";
import { useState } from "react";

import Header from "../components/Header"
import BottomNav from "../components/BottomNav";

export default function JoinDRRTForm() {
    const [formData, setFormData] = useState({
        student_id: '',
        full_name: '',
        course: '',
        year_level: '',
        email: '',
        phone_number: '',
        emergency_person_name: '',
        emergency_phone: '',
        blood_type: '',
        consent_form: null,
        class_schedule: null,
    });

    return (
        <>
            <title>DRRT Membership Application - Student Portal</title>
            <Header/>

            <div className="flex-grow w-full">
                {/* Main Form Container */}
                <main className="max-w-3xl mx-auto w-full px-4 md:px-8 py-6 md:py-8 pb-28 md:pb-12 space-y-6">
                    {/* Navigation Back Link */}
                    <Link to="/join">
                        <a className="inline-flex items-center gap-2 text-primary font-label-md font-semibold hover:underline">
                            <span className="material-symbols-outlined text-[18px]">
                                arrow_back
                            </span>
                            <span>Back to Recruitment Overview</span>
                        </a>
                    </Link>
                    {/* Form Banner Header */}
                    <section className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-bl-full pointer-events-none" />
                        <div className="flex items-center gap-2 mb-2">
                            <span className="font-label-sm text-label-sm font-bold text-primary uppercase tracking-wider">
                                Step 1 of 4
                            </span>
                            <span className="text-outline-variant">•</span>
                            <span className="font-label-sm text-label-sm font-semibold text-on-surface-variant">
                                Online Application
                            </span>
                        </div>
                        <h1 className="font-display-lg text-2xl md:text-3xl font-bold text-on-surface">
                            DRRT Member Registration
                        </h1>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                            Please complete all required fields below. Your application will be
                            submitted for review by the DRRT Officers and the Adviser.
                        </p>
                    </section>
                    {/* Interactive Registration Form */}
                    <form className="space-y-6">
                        {/* Section 1: Student Information */}
                        <fieldset className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
                            <div className="flex items-center gap-3 mb-2 border-b border-outline-variant/40 pb-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <span className="material-symbols-outlined text-[20px]">
                                        person
                                    </span>
                                </div>
                                <legend className="font-headline-md text-lg font-bold text-on-surface">
                                    Personal Information
                                </legend>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Student ID */}
                                <div>
                                    <label
                                        htmlFor="student-id"
                                        className="block font-label-md text-label-md font-semibold text-on-surface mb-1"
                                    >
                                        Student ID Number <span className="text-error">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="student-id"
                                        name="student_id"
                                        required=""
                                        placeholder="e.g. 2026-01234"
                                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm"
                                    />
                                </div>
                                {/* Full Name */}
                                <div>
                                    <label
                                        htmlFor="full-name"
                                        className="block font-label-md text-label-md font-semibold text-on-surface mb-1"
                                    >
                                        Full Name <span className="text-error">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="full-name"
                                        name="full_name"
                                        required=""
                                        placeholder="Last Name, First Name M.I."
                                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm"
                                    />
                                </div>
                                {/* Academic Program */}
                                <div>
                                    <label
                                        htmlFor="program"
                                        className="block font-label-md text-label-md font-semibold text-on-surface mb-1"
                                    >
                                        Academic Program / Course <span className="text-error">*</span>
                                    </label>
                                    <select
                                        id="program"
                                        name="program"
                                        required=""
                                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm"
                                    >
                                        <option value="" disabled="" selected="">
                                            Select Course
                                        </option>
                                        <option value="BSIT">BS Information Technology</option>
                                        <option value="BSIS">BS Information Systems</option>
                                        <option value="BSA">BS Accountancy</option>
                                        <option value="BSBA">BS Business Administration</option>
                                        <option value="BSSW">BS Social Work</option>
                                        <option value="ACT">Associate in Computer Technology</option>
                                    </select>
                                </div>
                                {/* Year Level */}
                                <div>
                                    <label
                                        htmlFor="year-level"
                                        className="block font-label-md text-label-md font-semibold text-on-surface mb-1"
                                    >
                                        Year Level <span className="text-error">*</span>
                                    </label>
                                    <select
                                        id="year-level"
                                        name="year_level"
                                        required=""
                                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm"
                                    >
                                        <option value="" disabled="" selected="">
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
                        <fieldset className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
                            <div className="flex items-center gap-3 mb-2 border-b border-outline-variant/40 pb-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <span className="material-symbols-outlined text-[20px]">
                                        call
                                    </span>
                                </div>
                                <legend className="font-headline-md text-lg font-bold text-on-surface">
                                    Contact &amp; Emergency Profile
                                </legend>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Institutional Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block font-label-md text-label-md font-semibold text-on-surface mb-1"
                                    >
                                        LVCC Institutional Email <span className="text-error">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required=""
                                        placeholder="student@laverdad.edu.ph"
                                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm"
                                    />
                                </div>
                                {/* Mobile Number */}
                                <div>
                                    <label
                                        htmlFor="mobile"
                                        className="block font-label-md text-label-md font-semibold text-on-surface mb-1"
                                    >
                                        Mobile Number <span className="text-error">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="mobile"
                                        name="mobile"
                                        required=""
                                        placeholder="09XX-XXX-XXXX"
                                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm"
                                    />
                                </div>
                                {/* Emergency Contact Name */}
                                <div>
                                    <label
                                        htmlFor="emergency-name"
                                        className="block font-label-md text-label-md font-semibold text-on-surface mb-1"
                                    >
                                        Emergency Contact Person <span className="text-error">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="emergency-name"
                                        name="emergency_name"
                                        required=""
                                        placeholder="Parent or Guardian Name"
                                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm"
                                    />
                                </div>
                                {/* Emergency Contact Phone */}
                                <div>
                                    <label
                                        htmlFor="emergency-phone"
                                        className="block font-label-md text-label-md font-semibold text-on-surface mb-1"
                                    >
                                        Emergency Contact Phone <span className="text-error">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        id="emergency-phone"
                                        name="emergency_phone"
                                        required=""
                                        placeholder="09XX-XXX-XXXX"
                                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm"
                                    />
                                </div>
                                {/* Blood Type */}
                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="blood-type"
                                        className="block font-label-md text-label-md font-semibold text-on-surface mb-1"
                                    >
                                        Blood Type <span className="text-error">*</span>
                                    </label>
                                    <select
                                        id="blood-type"
                                        name="blood_type"
                                        required=""
                                        className="w-full md:w-1/2 px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-sm"
                                    >
                                        <option value="" disabled="" selected="">
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
                            <article className="bg-surface-container border border-outline-variant/80 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <span className="material-symbols-outlined text-[20px] filled-icon">
                                            folder
                                        </span>
                                    </div>
                                    <h2 className="font-headline-md text-lg font-bold text-on-surface">
                                        Required Resources
                                    </h2>
                                </div>
                                <div className="space-y-3">
                                    <a href="#" className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/80 card-hover transition-all group">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-error text-[24px] filled-icon">
                                                picture_as_pdf
                                            </span>
                                            <div>
                                                <h3 className="font-label-md text-label-md font-bold text-on-surface group-hover:text-primary transition-colors">
                                                    Parent Consent Form
                                                </h3>
                                                <p className="font-body-sm text-[12px] text-on-surface-variant">
                                                    PDF Document • 450 KB
                                                </p>
                                            </div>
                                        </div>
                                        <span className="material-symbols-outlined text-secondary group-hover:text-primary transition-colors">
                                            download
                                        </span>
                                    </a>
                                </div>
                            </article>

                        <fieldset className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
                            <div className="flex items-center gap-3 mb-2 border-b border-outline-variant/40 pb-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <span className="material-symbols-outlined text-[20px]">
                                        upload_file
                                    </span>
                                </div>
                                <legend className="font-headline-md text-lg font-bold text-on-surface">
                                    Required Attachments
                                </legend>
                            </div>
                            <div className="space-y-4">
                                {/* Parent Consent Form Upload */}
                                <div>
                                    <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                                        Signed Parent/Guardian Consent Form{" "}
                                        <span className="text-error">*</span>
                                    </label>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-2">
                                        Upload signed PDF or Image (Max 5MB)
                                    </p>
                                    <input
                                        type="file"
                                        required=""
                                        accept=".pdf,.png,.jpg,.jpeg"
                                        className="block w-full text-body-sm text-on-surface-variant file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:font-label-md file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:transition-all cursor-pointer border border-outline-variant rounded-xl p-1"
                                    />
                                </div>
                                {/* Class Schedule Upload */}
                                <div>
                                    <label className="block font-label-md text-label-md font-semibold text-on-surface mb-1">
                                        Current Class Schedule <span className="text-error">*</span>
                                    </label>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant mb-2">
                                        Upload official schedule copy to verify duty availability
                                    </p>
                                    <input
                                        type="file"
                                        required=""
                                        accept=".pdf,.png,.jpg,.jpeg"
                                        className="block w-full text-body-sm text-on-surface-variant file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:font-label-md file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:transition-all cursor-pointer border border-outline-variant rounded-xl p-1"
                                    />
                                </div>
                            </div>
                        </fieldset>
                        {/* Section 4: Bylaws & Code of Conduct Agreements */}
                        <fieldset className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
                            <div className="flex items-center gap-3 mb-2 border-b border-outline-variant/40 pb-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <span className="material-symbols-outlined text-[20px]">
                                        gavel
                                    </span>
                                </div>
                                <legend className="font-headline-md text-lg font-bold text-on-surface">
                                    Commitment &amp; Bylaw Agreement
                                </legend>
                            </div>
                            <div className="space-y-3">
                                {/* Article IV Agreement */}
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        required=""
                                        className="mt-1 w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary rounded-md"
                                    />
                                    <span className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                                        I agree to abide by <strong>Article IV Membership Rules</strong>
                                        , maintaining active availability for drills, mandatory
                                        emergency response calls, and required monthly volunteer hours.
                                    </span>
                                </label>
                                {/* Article X Uniform Policy Agreement */}
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        required=""
                                        className="mt-1 w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary rounded-md"
                                    />
                                    <span className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                                        I acknowledge and commit to compliance with{" "}
                                        <strong>Article X Uniform Guidelines</strong> (proper grooming,
                                        designated duty wear, and official badge protocols).
                                    </span>
                                </label>
                            </div>
                        </fieldset>
                        {/* Submission Actions */}
                        <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3">
                            <button
                                type="button"
                                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-outline-variant text-secondary font-label-md font-bold hover:bg-surface-container-low transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-primary text-on-primary hover:bg-primary-container transition-all font-label-md text-label-md font-bold px-8 py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98]"
                            >
                                <span>Submit Application</span>
                                <span className="material-symbols-outlined text-[18px]">send</span>
                            </button>
                        </div>
                    </form>
                </main>
            </div>
            
            <BottomNav/>
        </>

    )
}