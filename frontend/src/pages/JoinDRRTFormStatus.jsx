import Header from "../components/Header"
import BottomNav from '../components/BottomNav';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function JoinDRRTFormStatus() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [application, setApplication] = useState([]);
    const statusCssColor = {
        "PENDING": "bg-yellow-bg text-yellow",
        "APPROVED": "bg-green-bg text-green",
        "REJECTED": "bg-red-bg text-red"
    }
    const statusDotCssColor = {
        "PENDING": "bg-yellow",
        "APPROVED": "bg-green",
        "REJECTED": "bg-red"
    }

    useEffect(() => {
        window.scrollTo(0, 0);

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login-register");
            return;
        }

        api
            .get(`/membership-applications/${id}`)
            .then((res) => setApplication(res.data))
            .catch((err) => console.error(err));
    }, [id, navigate]);

    return (
        <>
            <title>Application Submitted - DRRT Student Portal</title>
            <Header />

            <div className="grow w-full flex items-center justify-center">
                {/* Main Confirmation Container */}
                <main className="max-w-2xl mx-auto w-full px-4 md:px-8 py-10 pb-28 md:pb-12 space-y-6">
                    <div className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-10 shadow-sm relative overflow-hidden text-center space-y-6">
                        {/* Decorative Background Glow */}
                        <div className="absolute top-0 right-1/2 translate-x-1/2 -mt-12 w-64 h-64 bg-green-bg/20 rounded-full blur-3xl" />
                        {/* Success Icon Badge */}
                        <div className="relative mx-auto w-20 h-20 rounded-full bg-green-bg text-green flex items-center justify-center ring-8 ring-green/5">
                            <span className="material-symbols-outlined text-[48px] filled-icon">
                                check_circle
                            </span>
                        </div>
                        {/* Main Headline */}
                        <div className="space-y-2">
                            <span className="font-geist text-xs font-bold text-green bg-green-bg px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                                Application Received
                            </span>
                            <h1 className="font-geist text-2xl md:text-3xl font-bold text-text">
                                Your Application Has Been Submitted!
                            </h1>
                            <p className="text-base text-subtext mx-auto leading-relaxed">
                                Thank you for applying to join the Disaster Response and Readiness
                                Team (DRRT) LVCC Apalit Chapter.
                            </p>
                        </div>
                        {/* Reference Details Card */}
                        <div className="bg-surface-container-low border border-blue-border/50 rounded-xl p-4 text-left space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-blue-border/40 pb-3">
                                <span className="text-subtext">
                                    Application Reference:
                                </span>
                                <span className="font-bold text-blue font-mono text-base">
                                    {id}
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <span className="text-subtext">
                                    Current Status:
                                </span>

                                <span className={`${statusCssColor[application.data?.status.toUpperCase()]} inline-flex items-center gap-1.5 font-geist font-semibold px-2.5 py-0.5 rounded-full w-fit`}>
                                    <span className={`${statusDotCssColor[application.data?.status.toUpperCase()]} animate-pulse w-2 h-2 rounded-full`} />
                                    {application.data?.status.toUpperCase()}
                                </span>
                            </div>
                        </div>
                        {/* Review Timeline Instructions */}
                        <div className="text-left space-y-4 pt-2">
                            <h2 className="font-geist text-md font-bold text-text flex items-center gap-2">
                                <span className="material-symbols-outlined text-blue text-[20px]">
                                    info
                                </span>
                                What Happens Next?
                            </h2>
                            <ol className="space-y-3 text-subtext">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-blue/10 text-blue font-bold font-geist flex items-center justify-center shrink-0 mt-0.5">
                                        1
                                    </div>
                                    <div>
                                        <strong className="text-text">
                                            Document Verification:
                                        </strong>{" "}
                                        The DRRT Officers and Adviser will review your details, signed
                                        consent form, and class schedule.
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-blue/10 text-blue font-bold font-geist flex items-center justify-center shrink-0 mt-0.5">
                                        2
                                    </div>
                                    <div>
                                        <strong className="text-text">Email Notification:</strong>{" "}
                                        You will receive an official status update via your registered
                                        institutional email within <strong>2 to 3 business days</strong>
                                        .
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-blue/10 text-blue font-bold font-geist flex items-center justify-center shrink-0 mt-0.5">
                                        3
                                    </div>
                                    <div>
                                        <strong className="text-text">
                                            Orientation &amp; Badge Issuance:
                                        </strong>{" "}
                                        Approved applicants will receive an invitation for the physical
                                        orientation and duty schedule assignment.
                                    </div>
                                </li>
                            </ol>
                        </div>
                        <h2 className="font-geist text-md font-bold text-text flex items-center gap-2">
                            <span className="material-symbols-outlined text-blue text-[20px]">
                                info
                            </span>
                            Submitted Application Details:
                        </h2>
                        <div className="bg-surface-container-low border border-blue-border/50 rounded-xl p-4 text-left space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-blue-border/40 pb-3">
                                <span className="text-subtext">
                                    Student ID:
                                </span>
                                <span className="font-bold text-blue font-mono text-base">
                                    {application.data?.student_id}
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-blue-border/40 pb-3">
                                <span className="text-subtext">
                                    Full Name:
                                </span>
                                <span className="font-bold text-blue font-mono text-base">
                                    {application.data?.full_name}
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-blue-border/40 pb-3">
                                <span className="text-subtext">
                                                                    </span>
                                <span className="font-bold text-blue font-mono text-base">
                                    {application.data?.course}
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-blue-border/40 pb-3">
                                <span className="text-subtext">
                                    Year Level:
                                </span>
                                <span className="font-bold text-blue font-mono text-base">
                                    {application.data?.year_level}
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-blue-border/40 pb-3">
                                <span className="text-subtext">
                                    Email:
                                </span>
                                <span className="font-bold text-blue font-mono text-base">
                                    {application.data?.email}
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-blue-border/40 pb-3">
                                <span className="text-subtext">
                                    Phone Number:
                                </span>
                                <span className="font-bold text-blue font-mono text-base">
                                    {application.data?.phone_number}
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-blue-border/40 pb-3">
                                <span className="text-subtext">
                                    Emergency Person:
                                </span>
                                <span className="font-bold text-blue font-mono text-base">
                                    {application.data?.emergency_person_name}
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-blue-border/40 pb-3">
                                <span className="text-subtext">
                                    Emergency Phone:
                                </span>
                                <span className="font-bold text-blue font-mono text-base">
                                    {application.data?.emergency_phone}
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-blue-border/40 pb-3">
                                <span className="text-subtext">
                                    Blood Type:
                                </span>
                                <span className="font-bold text-blue font-mono text-base">
                                    {application.data?.blood_type}
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-blue-border/40 pb-3">
                                <span className="text-subtext">
                                    Consent Form:
                                </span>
                                <span className="font-bold text-blue font-mono text-base">
                                    <a href={application.data?.consent_form} target="_blank" rel="noopener noreferrer">
                                        View Consent Form
                                    </a>
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <span className="text-subtext">
                                    Class Schedule:
                                </span>
                                <span className="font-bold text-blue font-mono text-base">
                                    <a href={application.data?.class_schedule} target="_blank" rel="noopener noreferrer">
                                        View Class Schedule
                                    </a>
                                </span>
                            </div>
                        </div>
                        {/* Action Buttons */}
                        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link to="/" className="w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-low transition-all text-center">
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
            
            <BottomNav />
        </>
    )
}