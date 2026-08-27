import Header from "../components/Header"
import BottomNav from '../components/BottomNav';
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function JoinDRRTFormStatus() {
    const { id } = useParams();

    const [application, setApplication] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/membership-applications/${id}`)
            .then((res) => setApplication(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    console.log(application);

    return (
        <>
            <title>Application Submitted - DRRT Student Portal</title>
            <Header />

            <div className="flex-grow w-full flex items-center justify-center">
                {/* Main Confirmation Container */}
                <main className="max-w-2xl mx-auto w-full px-4 md:px-8 py-10 pb-28 md:pb-12 space-y-6">
                    <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-2xl p-6 md:p-10 shadow-sm relative overflow-hidden text-center space-y-6">
                        {/* Decorative Background Glow */}
                        <div className="absolute top-0 right-1/2 translate-x-1/2 -mt-12 w-64 h-64 bg-status-success/10 rounded-full blur-2xl pointer-events-none" />
                        {/* Success Icon Badge */}
                        <div className="relative mx-auto w-20 h-20 rounded-full bg-status-success/10 text-status-success flex items-center justify-center ring-8 ring-status-success/5">
                            <span className="material-symbols-outlined text-[48px] filled-icon">
                                check_circle
                            </span>
                        </div>
                        {/* Main Headline */}
                        <div className="space-y-2">
                            <span className="font-label-sm text-label-sm font-bold text-status-success bg-status-success/10 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                                Application Received
                            </span>
                            <h1 className="font-display-lg text-2xl md:text-3xl font-bold text-on-surface">
                                Your Application Has Been Submitted!
                            </h1>
                            <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto leading-relaxed">
                                Thank you for applying to join the Disaster Response and Readiness
                                Team (DRRT) LVCC Apalit Chapter.
                            </p>
                        </div>
                        {/* Reference Details Card */}
                        <div className="bg-surface-container-low border border-outline-variant/50 rounded-xl p-4 text-left space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-outline-variant/40 pb-3">
                                <span className="font-body-sm text-on-surface-variant">
                                    Application Reference:
                                </span>
                                <span className="font-label-md font-bold text-primary font-mono text-base">
                                    {id}
                                </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <span className="font-body-sm text-on-surface-variant">
                                    Current Status:
                                </span>
                                <span className="inline-flex items-center gap-1.5 font-label-sm font-semibold text-status-warning bg-status-warning/10 px-2.5 py-0.5 rounded-full w-fit">
                                    <span className="w-2 h-2 rounded-full bg-status-warning animate-pulse" />
                                    {application.data?.status.toUpperCase()}
                                </span>
                            </div>
                        </div>
                        {/* Review Timeline Instructions */}
                        <div className="text-left space-y-4 pt-2">
                            <h2 className="font-headline-md text-md font-bold text-on-surface flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">
                                    info
                                </span>
                                What Happens Next?
                            </h2>
                            <ol className="space-y-3 font-body-sm text-on-surface-variant">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold font-label-sm flex items-center justify-center shrink-0 mt-0.5">
                                        1
                                    </div>
                                    <div>
                                        <strong className="text-on-surface">
                                            Document Verification:
                                        </strong>{" "}
                                        The DRRT Officers and Adviser will review your details, signed
                                        consent form, and class schedule.
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold font-label-sm flex items-center justify-center shrink-0 mt-0.5">
                                        2
                                    </div>
                                    <div>
                                        <strong className="text-on-surface">Email Notification:</strong>{" "}
                                        You will receive an official status update via your registered
                                        institutional email within <strong>2 to 3 business days</strong>
                                        .
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold font-label-sm flex items-center justify-center shrink-0 mt-0.5">
                                        3
                                    </div>
                                    <div>
                                        <strong className="text-on-surface">
                                            Orientation &amp; Badge Issuance:
                                        </strong>{" "}
                                        Approved applicants will receive an invitation for the physical
                                        orientation and duty schedule assignment.
                                    </div>
                                </li>
                            </ol>
                        </div>
                        {/* Action Buttons */}
                        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link
                                to="/"
                                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-outline-variant text-secondary font-label-md font-bold hover:bg-surface-container-low transition-all text-center"
                            >
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