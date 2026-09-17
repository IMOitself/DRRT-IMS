import { Link } from "react-router-dom";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import WIP from "../components/WIP";

export default function PasswordForgot() {
  return (
    <>
      <title>Reset Password - DRRT Member Portal</title>

      <Header />
      <WIP />

      {/* Main Container with extra bottom padding for mobile navbar space */}
      <div className="grow w-full flex items-center justify-center p-4 md:p-8 pb-24 md:pb-8">
        {/* Step 1 Card Container */}
        <main className="max-w-md w-full mx-auto space-y-6">
          <div className="bg-white border border-blue-border rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm relative overflow-hidden">
            {/* Step Indicator Badge */}
            <div className="inline-flex items-center gap-1.5 bg-blue-bg text-blue px-3 py-1 rounded-full font-geist text-[11px] font-bold uppercase tracking-wider mb-4">
              <span>Step 1 of 3</span>
            </div>

            {/* Card Header */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center text-blue shrink-0">
                <span className="material-symbols-outlined text-[22px]! filled-icon">
                  lock_reset
                </span>
              </div>
              <div>
                <h2 className="font-geist text-lg sm:text-xl font-bold text-text">
                  Forgot Password?
                </h2>
                <p className="text-xs text-subtext">
                  Enter your registered email address to initiate recovery.
                </p>
              </div>
            </div>

            {/* Email Request Form */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block font-geist text-xs font-bold text-text mb-1.5"
                >
                  Registered Institutional Email
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-subtext text-[20px]!">
                    mail
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="student@lvcc.edu.ph"
                    required
                    className="w-full pl-10 pr-4 py-3 sm:py-2.5 min-h-11 bg-surface border border-blue-border rounded-xl text-sm text-text placeholder:text-subtext/50 focus:ring-2 focus:ring-blue/30 focus:border-blue outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue text-white hover:bg-blue transition-all font-geist font-bold py-3 min-h-11 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] mt-2 cursor-pointer"
              >
                <span>Send Verification Code</span>
                <span className="material-symbols-outlined text-[18px]!">
                  mark_email_read
                </span>
              </button>
            </form>

            {/* Back Link */}
            <div className="mt-6 pt-4 border-t border-blue-border/40 text-center">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-1.5 text-xs text-subtext font-bold hover:text-blue transition-colors py-2 px-3 rounded-lg"
              >
                <span className="material-symbols-outlined text-[16px]!">
                  arrow_back
                </span>
                <span>Back to Login</span>
              </Link>
            </div>
          </div>
        </main>

        {/* Step 2 Card Container */}
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

        {/* Step 3 Card Container */}
        <main className="max-w-md w-full mx-auto space-y-6">
          <div className="bg-white border border-blue-border rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm relative overflow-hidden">
            {/* Step Indicator Badge */}
            <div className="inline-flex items-center gap-1.5 bg-blue-bg text-blue px-3 py-1 rounded-full font-geist text-[11px] font-bold uppercase tracking-wider mb-4">
              <span>Step 3 of 3</span>
            </div>

            {/* Card Header */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-bg flex items-center justify-center text-green shrink-0">
                <span className="material-symbols-outlined text-[22px]! filled-icon">
                  published_with_changes
                </span>
              </div>
              <div>
                <h2 className="font-geist text-lg sm:text-xl font-bold text-text">
                  Create New Password
                </h2>
                <p className="text-xs text-subtext">
                  Set a new strong password to secure your portal account.
                </p>
              </div>
            </div>

            {/* Password Creation Form */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {/* New Password Field */}
              <div>
                <label
                  htmlFor="new_password"
                  className="block font-geist text-xs font-bold text-text mb-1.5"
                >
                  New Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-subtext text-[20px]!">
                    key
                  </span>
                  <input
                    type="password"
                    id="new_password"
                    name="new_password"
                    placeholder="••••••••"
                    required
                    minLength={8}
                    className="w-full pl-10 pr-4 py-3 sm:py-2.5 min-h-11 bg-surface border border-blue-border rounded-xl text-sm text-text placeholder:text-subtext/50 focus:ring-2 focus:ring-blue/30 focus:border-blue outline-none transition-all"
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirm_new_password"
                  className="block font-geist text-xs font-bold text-text mb-1.5"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-subtext text-[20px]!">
                    lock_reset
                  </span>
                  <input
                    type="password"
                    id="confirm_new_password"
                    name="confirm_new_password"
                    placeholder="••••••••"
                    required
                    minLength={8}
                    className="w-full pl-10 pr-4 py-3 sm:py-2.5 min-h-11 bg-surface border border-blue-border rounded-xl text-sm text-text placeholder:text-subtext/50 focus:ring-2 focus:ring-blue/30 focus:border-blue outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password Complexity Checklist */}
              <div className="p-3.5 bg-surface rounded-xl border border-blue-border/60 space-y-2 text-xs">
                <span className="font-geist text-[11px] font-bold text-subtext uppercase tracking-wider block mb-1">
                  Password Requirements
                </span>
                <div className="flex items-center gap-2 text-green">
                  <span className="material-symbols-outlined text-[16px]! shrink-0">
                    check_circle
                  </span>
                  <span>At least 8 characters long</span>
                </div>
                <div className="flex items-center gap-2 text-subtext/70">
                  <span className="material-symbols-outlined text-[16px]! shrink-0">
                    radio_button_unchecked
                  </span>
                  <span>At least 1 uppercase letter (A-Z)</span>
                </div>
                <div className="flex items-center gap-2 text-subtext/70">
                  <span className="material-symbols-outlined text-[16px]! shrink-0">
                    radio_button_unchecked
                  </span>
                  <span>At least 1 number (0-9)</span>
                </div>
                <div className="flex items-center gap-2 text-subtext/70">
                  <span className="material-symbols-outlined text-[16px]! shrink-0">
                    radio_button_unchecked
                  </span>
                  <span>At least 1 special character (@, #, $, etc.)</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue text-white hover:bg-blue transition-all font-geist font-bold py-3 min-h-11 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] mt-2 cursor-pointer"
              >
                <span>Reset Password</span>
                <span className="material-symbols-outlined text-[18px]!">check</span>
              </button>
            </form>

            {/* Back Link */}
            <div className="mt-6 pt-4 border-t border-blue-border/40 text-center">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-1.5 text-xs text-subtext font-bold hover:text-blue transition-colors py-2 px-3 rounded-lg"
              >
                <span className="material-symbols-outlined text-[16px]!">
                  arrow_back
                </span>
                <span>Cancel &amp; Return to Login</span>
              </Link>
            </div>
          </div>
        </main>

      </div>

      <BottomNav />
    </>
  );
}
