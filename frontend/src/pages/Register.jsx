import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

export default function Register() {
  return (
    <>
      <title>Register - DRRT Membership Application</title>

      <Header />

      {/* Main Wrapper with extra bottom padding on mobile to clear bottom navbar */}
      <div className="grow w-full flex items-center justify-center p-4 md:p-8 pb-24 md:pb-8">
        {/* Main Registration Container */}
        <main className="max-w-xl w-full mx-auto space-y-6">
          <div className="bg-white border border-blue-border rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm relative overflow-hidden">
            {/* Card Header */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center text-blue shrink-0">
                <span className="material-symbols-outlined text-[22px]! filled-icon">
                  how_to_reg
                </span>
              </div>
              <div>
                <h2 className="font-geist text-lg sm:text-xl font-bold text-text">
                  DRRT Membership Application
                </h2>
                <p className="text-xs text-subtext">
                  Complete the form to apply as a student responder.
                </p>
              </div>
            </div>

            {/* Registration Form */}
            <form action="#" method="POST" className="space-y-4">
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
                className="w-full bg-blue text-white hover:bg-blue transition-all font-geist font-bold py-3 min-h-11 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] mt-4"
              >
                <span>Submit Application</span>
                <span className="material-symbols-outlined text-[18px]!">send</span>
              </button>
            </form>

            {/* Footer Link */}
            <div className="mt-6 pt-4 border-t border-blue-border/40 text-center">
              <p className="text-xs text-subtext">
                Already registered?{" "}
                <a
                  href="#"
                  className="text-blue font-bold hover:underline inline-block py-1 px-1"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>

      <BottomNav />
    </>
  );
}
