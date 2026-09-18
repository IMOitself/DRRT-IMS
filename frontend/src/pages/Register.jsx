import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  const applicationId = searchParams.get("application_id");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (applicationId) {
      api
        .get(`/membership-applications/${applicationId}`)
        .then((res) => {
          const app = res.data.data;
          if (app) {
            setName(app.full_name || "");
            setEmail(app.email || "");
          }
        })
        .catch((err) => {
          console.error("Failed to load application details:", err);
        });
    }
  }, [applicationId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    api
      .post("/register", {
        name: name,
        email: email,
        password: password,
        membership_application_id: applicationId,
      })
      .then((res) => {
        login(res.data.token, res.data.user);
        navigate("/member/dashboard");
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response && err.response.data && err.response.data.message) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
      });
  };

  if (!applicationId) {
    return (
      <>
        <title>Register - DRRT Membership</title>
        <Header />
        <div className="grow w-full flex items-center justify-center p-4 md:p-8 pb-24 md:pb-8">
          <main className="max-w-xl w-full mx-auto space-y-6">
            <div className="bg-white border border-blue-border rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-yellow-bg text-yellow flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[40px]!">warning</span>
              </div>
              <h2 className="font-geist text-xl font-bold text-text">
                Application Required
              </h2>
              <p className="text-subtext">
                You need an approved membership application before you can register an account.
                Please submit a membership application first, then use the registration link provided after approval.
              </p>
              <a
                href="/join"
                className="inline-block bg-blue text-white px-6 py-3 rounded-xl font-geist font-bold hover:bg-blue/80 transition-all"
              >
                Apply for Membership
              </a>
            </div>
          </main>
        </div>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <title>Register - DRRT Membership Application</title>

      <Header />

      {/* Main Wrapper with extra bottom padding on mobile to clear bottom navbar */}
      <div className="grow w-full flex items-center justify-center p-4 md:p-8 pb-24 md:pb-8">
        {/* Main Registration Container */}
        <main className="max-w-xl w-full mx-auto space-y-6">
          <div className="bg-white border border-blue-border rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm relative overflow-hidden">
            {/* Step Indicator Badge */}
            <div className="inline-flex items-center gap-1.5 bg-blue-bg text-blue px-3 py-1 rounded-full font-geist text-[11px] font-bold uppercase tracking-wider mb-4">
              <span>Step 1 of 3</span>
            </div>
            {/* Card Header */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center text-blue shrink-0">
                <span className="material-symbols-outlined text-[22px]! filled-icon">
                  how_to_reg
                </span>
              </div>
              <div>
                <h2 className="font-geist text-lg sm:text-xl font-bold text-text">
                  Create Your Account
                </h2>
                <p className="text-xs text-subtext">
                  Your application has been approved. Set up your login credentials below.
                </p>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-red-bg text-red border border-red-border rounded-xl p-3 mb-4 text-sm font-medium">
                {errorMessage}
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Input */}
              <div>
                <label
                  htmlFor="fullname"
                  className="block font-geist text-xs font-bold text-text mb-1.5"
                >
                  Full Name
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-subtext text-[20px]!">
                    person
                  </span>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    placeholder="Juan Dela Cruz"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 sm:py-2.5 min-h-11 bg-surface border border-blue-border rounded-xl text-sm text-text placeholder:text-subtext/50 focus:ring-2 focus:ring-blue/30 focus:border-blue outline-none transition-all"
                  />
                </div>
              </div>

              {/* Institutional Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-geist text-xs font-bold text-text mb-1.5"
                >
                  Institutional Email
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-subtext text-[20px]!">
                    mail
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="jdelacruz@lvcc.edu.ph"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 sm:py-2.5 min-h-11 bg-surface border border-blue-border rounded-xl text-sm text-text placeholder:text-subtext/50 focus:ring-2 focus:ring-blue/30 focus:border-blue outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block font-geist text-xs font-bold text-text mb-1.5"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-subtext text-[20px]!">
                      key
                    </span>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Min. 8 characters"
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 sm:py-2.5 min-h-11 bg-surface border border-blue-border rounded-xl text-sm text-text placeholder:text-subtext/50 focus:ring-2 focus:ring-blue/30 focus:border-blue outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirm_password"
                    className="block font-geist text-xs font-bold text-text mb-1.5"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-subtext text-[20px]!">
                      lock_reset
                    </span>
                    <input
                      type="password"
                      id="confirm_password"
                      name="confirm_password"
                      placeholder="Re-enter password"
                      required
                      minLength={8}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 sm:py-2.5 min-h-11 bg-surface border border-blue-border rounded-xl text-sm text-text placeholder:text-subtext/50 focus:ring-2 focus:ring-blue/30 focus:border-blue outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Qualification & Bylaws Checkbox Container */}
              <div className="p-3.5 sm:p-4 bg-surface rounded-xl border border-blue-border/60 space-y-3 mt-2">
                <span className="font-geist text-xs font-bold text-blue uppercase tracking-wider block">
                  Qualification Criteria (Article IV Bylaws)
                </span>
                <label className="flex items-start gap-3 cursor-pointer py-1">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 w-4 h-4 rounded border-blue-border text-blue focus:ring-blue shrink-0"
                  />
                  <span className="text-xs text-subtext leading-relaxed">
                    I confirm my availability for mandatory DRRT drills and
                    training sessions (minimum 10 hours/month).
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer py-1">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 w-4 h-4 rounded border-blue-border text-blue focus:ring-blue shrink-0"
                  />
                  <span className="text-xs text-subtext leading-relaxed">
                    I acknowledge and agree to abide by the DRRT Code of
                    Conduct and Student Safety Guidelines.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue text-white hover:bg-blue transition-all font-geist font-bold py-3 min-h-11 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] mt-4 disabled:opacity-50"
              >
                <span>{isLoading ? "Creating Account..." : "Next"}</span>
                <span className="material-symbols-outlined text-[18px]!">
                  {isLoading ? "hourglass_empty" : "arrow_forward"}
                </span>
              </button>
            </form>

            {/* Footer Link */}
            <div className="mt-6 pt-4 border-t border-blue-border/40 text-center">
              <p className="text-xs text-subtext">
                Already registered?{" "}
                <a
                  href="/login"
                  className="text-blue font-bold hover:underline inline-block py-1 px-1"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </main>

        <main className="max-w-md w-full mx-auto space-y-6">
          <div className="bg-white border border-blue-border rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm relative overflow-hidden">
            {/* Step Indicator Badge */}
            <div className="inline-flex items-center gap-1.5 bg-blue-bg text-blue px-3 py-1 rounded-full font-geist text-[11px] font-bold uppercase tracking-wider mb-4">
              <span>Step 2 of 3</span>
            </div>

            {/* Card Header */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-yellow-bg flex items-center justify-center text-yellow shrink-0">
                <span className="material-symbols-outlined text-[22px]! filled-icon">
                  pin
                </span>
              </div>
              <div>
                <h2 className="font-geist text-lg sm:text-xl font-bold text-text">
                  Enter Verification Code
                </h2>
                <p className="text-xs text-subtext">
                  Check your email for the 6-digit numeric verification code (valid for 10 minutes).
                </p>
              </div>
            </div>

            {/* Verification Code Form */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div>
                <label
                  htmlFor="verification_code"
                  className="block font-geist text-xs font-bold text-text mb-2 text-center"
                >
                  6-Digit Verification Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="verification_code"
                    name="verification_code"
                    maxLength={6}
                    pattern="[0-9]{6}"
                    inputMode="numeric"
                    placeholder="123456"
                    required
                    className="w-full tracking-[0.25em] sm:tracking-[0.5em] text-center font-mono text-xl sm:text-2xl font-bold py-3 px-3 sm:px-4 min-h-11 bg-surface border border-blue-border rounded-xl text-text placeholder:text-subtext/30 placeholder:tracking-[0.25em] sm:placeholder:tracking-[0.5em] focus:ring-2 focus:ring-blue/30 focus:border-blue outline-none transition-all"
                  />
                </div>
                <p className="text-[11px] text-subtext/70 text-center mt-2">
                  Code expires in{" "}
                  <span className="font-bold text-yellow">09:59</span>
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-blue text-white hover:bg-blue transition-all font-geist font-bold py-3 min-h-11 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
              >
                <span>Verify Code</span>
                <span className="material-symbols-outlined text-[18px]!">
                  verified
                </span>
              </button>
            </form>

            {/* Resend & Navigation Options */}
            <div className="mt-6 pt-4 border-t border-blue-border/40 flex flex-wrap items-center justify-between gap-2 text-xs">
              <button
                type="button"
                onClick={() => alert("A new verification code has been sent to your email.")}
                className="text-blue font-bold hover:underline flex items-center gap-1 py-2 px-1 rounded-lg cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]!">
                  refresh
                </span>
                <span>Resend Code</span>
              </button>
              <Link
                to="/forgot-password"
                className="text-subtext font-bold hover:text-blue transition-colors flex items-center gap-1 py-2 px-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-[16px]!">
                  arrow_back
                </span>
                <span>Change Email</span>
              </Link>
            </div>
          </div>
        </main>
      </div>

      <BottomNav />
    </>
  );
}
