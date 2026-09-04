import Header from "../../components/Header";
import BottomNav from "../../components/officer/BottomNav";

export default function IncidentDetails() {
  return (
    <>
      <title>New Incident Reporting - DRRT Officer Portal</title>

      <Header />

      {/* Main Content Canvas */}
      <main className="grow pb-52 md:pb-36">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 space-y-6">
          {/* Context Header */}
          <section className="bg-white border border-blue-border p-4 md:p-6 rounded-xl shadow-sm space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-geist text-xs text-blue uppercase tracking-wider font-bold">
                  Encrypted First-Aid &amp; Clinical Log
                </p>
                <h2 className="font-geist text-2xl md:text-3xl font-bold text-text mt-1">
                  New Incident Report
                </h2>
                <p className="text-xs md:text-sm text-subtext mt-1">
                  Record medical interventions, personnel vitals, and emergency responses.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 bg-blue-bg text-blue border border-blue-border/60 px-2.5 py-1 rounded font-geist text-xs uppercase font-semibold">
                <span className="material-symbols-outlined text-[14px]!">lock</span>{" "}
                Encrypted Mode
              </span>
            </div>
            <div className="flex items-center gap-2 text-subtext border-t border-blue-border pt-3 mt-3">
              <span className="font-geist text-xs bg-surface-container text-text px-2 py-0.5 rounded font-mono font-bold">
                INC-2026-0892
              </span>
              <p className="font-geist text-xs md:text-sm">
                R.A. 10173 Data Privacy Protocol Active
              </p>
            </div>
          </section>

          {/* Strict Confidentiality Callout */}
          <div className="bg-red-bg text-red border border-red-border p-4 rounded-lg flex gap-3 items-start shadow-sm">
            <span className="material-symbols-outlined text-red mt-0.5 shrink-0 text-[24px]!">
              shield_lock
            </span>
            <div>
              <h3 className="font-geist text-sm font-bold text-red mb-0.5">
                Strict Confidentiality Notice
              </h3>
              <p className="font-geist text-xs md:text-sm text-red/90">
                This record is classified as sensitive personal medical information.
                All inputs are end-to-end encrypted under the Data Privacy Act of
                2012 (R.A. 10173). Unauthorized disclosure is subject to legal
                sanctions.
              </p>
            </div>
          </div>

          {/* Section 1: Patient Identification */}
          <section className="bg-white border border-blue-border p-4 md:p-6 rounded-xl shadow-sm space-y-4">
            <p className="font-geist text-xs text-blue uppercase tracking-wider font-bold border-b border-blue-border pb-2">
              1. Patient Identification
            </p>
            {/* Patient Category Toggle Buttons */}
            <div className="flex bg-surface-container rounded-lg p-1">
              <button className="flex-1 bg-white text-blue font-geist text-xs md:text-sm py-2 rounded shadow-sm font-bold cursor-pointer text-center">
                LVCC Student
              </button>
              <button className="flex-1 text-subtext hover:text-text font-geist text-xs md:text-sm py-2 transition-colors cursor-pointer text-center">
                Faculty / Staff
              </button>
              <button className="flex-1 text-subtext hover:text-text font-geist text-xs md:text-sm py-2 transition-colors cursor-pointer text-center">
                Guest / Visitor
              </button>
            </div>
            {/* ID Lookup Field */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  className="w-full h-11 border border-blue-border rounded-lg px-3 pt-3 pb-1 bg-white text-text font-geist text-sm focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors peer"
                  id="student-id"
                  placeholder=" "
                  type="text"
                  defaultValue="2023-0145"
                />
                <label
                  className="absolute text-xs text-subtext left-3 top-1 font-geist transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue pointer-events-none"
                  htmlFor="student-id"
                >
                  Student ID Number
                </label>
              </div>
              <button className="bg-blue text-white px-5 rounded-lg font-geist text-sm font-semibold hover:bg-blue/90 transition-colors flex items-center gap-2 shadow-sm cursor-pointer">
                <span className="material-symbols-outlined text-[18px]!">
                  search
                </span>{" "}
                Lookup
              </button>
            </div>
            {/* Patient Information Card */}
            <div className="bg-surface-container-low border border-blue-border rounded-lg p-4 flex gap-4 items-center shadow-sm">
              <img
                className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border border-blue-border shrink-0"
                alt="Student Profile Photo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgikfHXFcBfqrh6v23Z9IzFdWiPI7kqo3PXLOq3fqLF8Z-BEHDORxv_3eqHb-PbqadrfBgqwF90Izp8G9DHd8UHwsftTEEpgQ64vAiv0WCYjBJnB3SObyrhPi1rzw4xsjUDJ-S-D70__inuMy0W1BKU-k73AutHl_1_QI6Jgdjw6uOtIJWH8XpWQt8uz50XLVFimKvvpA04gJpF3Ttbl9dCmM7QqrB1rktIUL690W__PWF0x5f8vW9DQ"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-geist text-base md:text-lg font-bold text-text truncate">
                  Juan De La Cruz
                </h4>
                <p className="font-geist text-xs md:text-sm text-subtext truncate">
                  BS Information Technology • 3rd Year
                </p>
                <div className="flex items-center gap-1 mt-1 text-red">
                  <span className="material-symbols-outlined text-[15px]!">
                    emergency
                  </span>
                  <p className="font-geist text-xs text-subtext font-medium">
                    Emergency: +63 917 *** **45 (Mother)
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-green bg-green-bg p-1.5 rounded-full border border-green-border shrink-0 text-[20px]!">
                check_circle
              </span>
            </div>
          </section>

          {/* Section 2: Event Details */}
          <section className="bg-white border border-blue-border p-4 md:p-6 rounded-xl shadow-sm space-y-4">
            <p className="font-geist text-xs text-blue uppercase tracking-wider font-bold border-b border-blue-border pb-2">
              2. Event Details
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <div className="w-full h-11 border border-blue-border rounded-lg px-3 flex items-center justify-between bg-surface-container-low text-text font-geist text-sm">
                  <span className="font-geist text-sm text-text font-medium">
                    Oct 24, 2026 | 10:14 AM
                  </span>
                  <span className="material-symbols-outlined text-subtext text-[18px]!">
                    calendar_today
                  </span>
                </div>
                <span className="absolute -top-2 left-2 bg-white px-1 font-geist text-[11px] text-subtext font-bold">
                  Date &amp; Time
                </span>
              </div>
              <div className="relative">
                <select className="w-full h-11 border border-blue-border rounded-lg px-3 font-geist text-sm bg-white text-text focus:border-blue focus:ring-1 focus:ring-blue focus:outline-none appearance-none cursor-pointer">
                  <option>Main Quadrangle</option>
                  <option>Gymnasium</option>
                  <option>IT Laboratory</option>
                  <option>University Clinic</option>
                  <option>Student Center</option>
                </select>
                <span className="absolute -top-2 left-2 bg-white px-1 font-geist text-[11px] text-subtext font-bold">
                  Campus Location
                </span>
                <span className="material-symbols-outlined absolute right-3 top-2.5 text-subtext pointer-events-none text-[20px]!">
                  arrow_drop_down
                </span>
              </div>
            </div>
            <div className="relative">
              <input
                className="w-full h-11 border border-blue-border rounded-lg px-3 pt-3 pb-1 bg-white text-text font-geist text-sm focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-colors peer"
                id="location-details"
                placeholder=" "
                type="text"
                defaultValue="Near the main gate entrance food stalls"
              />
              <label
                className="absolute text-xs text-subtext left-3 top-1 font-geist transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue pointer-events-none"
                htmlFor="location-details"
              >
                Specific Spot / Landmark Details
              </label>
            </div>
          </section>

          {/* Section 3: Severity Assessment */}
          <section className="bg-white border border-blue-border p-4 md:p-6 rounded-xl shadow-sm space-y-4">
            <p className="font-geist text-xs text-blue uppercase tracking-wider font-bold border-b border-blue-border pb-2">
              3. Severity Assessment
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Minor Option */}
              <div className="border border-blue-border rounded-lg p-4 hover:bg-surface-container-low cursor-pointer transition-colors bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-green text-[20px]!">
                    local_hospital
                  </span>
                  <h4 className="font-geist text-xs md:text-sm text-text font-bold">
                    MINOR
                  </h4>
                </div>
                <p className="font-geist text-xs text-subtext">
                  Basic first aid required. No immediate danger to life or limb.
                </p>
              </div>
              {/* Moderate Option (Selected) */}
              <div className="border-2 border-yellow bg-yellow-bg rounded-lg p-4 cursor-pointer transition-colors relative shadow-sm">
                <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-yellow rounded-full animate-pulse" />
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-yellow text-[20px]!">
                    healing
                  </span>
                  <h4 className="font-geist text-xs md:text-sm text-yellow font-bold">
                    MODERATE
                  </h4>
                </div>
                <p className="font-geist text-xs text-subtext">
                  Requires medical attention, clinic evaluation. Non-life threatening.
                </p>
              </div>
              {/* Critical Option */}
              <div className="border border-blue-border rounded-lg p-4 hover:bg-surface-container-low cursor-pointer transition-colors bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-red text-[20px]!">
                    emergency
                  </span>
                  <h4 className="font-geist text-xs md:text-sm text-text font-bold">
                    CRITICAL
                  </h4>
                </div>
                <p className="font-geist text-xs text-subtext">
                  Immediate threat to life. Requires emergency medical services (EMS).
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Clinical Vitals & First Aid */}
          <section className="bg-white border border-blue-border p-4 md:p-6 rounded-xl shadow-sm space-y-4">
            <p className="font-geist text-xs text-blue uppercase tracking-wider font-bold border-b border-blue-border pb-2">
              4. Clinical Vitals &amp; First Aid
            </p>
            <div className="relative">
              <select className="w-full h-11 border border-blue-border rounded-lg px-3 font-geist text-sm bg-white text-text focus:border-blue focus:ring-1 focus:ring-blue focus:outline-none appearance-none cursor-pointer">
                <option>Fainting / Dizziness</option>
                <option>Laceration / Cut</option>
                <option>Sports Injury (Sprain/Strain)</option>
                <option>Allergic Reaction</option>
                <option>Heat Exhaustion</option>
              </select>
              <span className="absolute -top-2 left-2 bg-white px-1 font-geist text-[11px] text-subtext font-bold">
                Incident Classification
              </span>
              <span className="material-symbols-outlined absolute right-3 top-2.5 text-subtext pointer-events-none text-[20px]!">
                arrow_drop_down
              </span>
            </div>
            {/* Vitals Form Grid */}
            <div className="bg-surface-container-low border border-blue-border rounded-lg p-4 space-y-2">
              <h4 className="font-geist text-xs text-blue uppercase font-bold mb-2">
                Initial Vitals (Optional)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <input
                  className="w-full h-10 border border-blue-border rounded-lg px-3 font-geist text-sm bg-white focus:border-blue focus:ring-1 focus:ring-blue focus:outline-none"
                  placeholder="BP (120/80)"
                  type="text"
                />
                <input
                  className="w-full h-10 border border-blue-border rounded-lg px-3 font-geist text-sm bg-white focus:border-blue focus:ring-1 focus:ring-blue focus:outline-none"
                  placeholder="Pulse (82 bpm)"
                  type="text"
                />
                <input
                  className="w-full h-10 border border-blue-border rounded-lg px-3 font-geist text-sm bg-white focus:border-blue focus:ring-1 focus:ring-blue focus:outline-none"
                  placeholder="SpO2 (98%)"
                  type="text"
                />
                <input
                  className="w-full h-10 border border-blue-border rounded-lg px-3 font-geist text-sm bg-white focus:border-blue focus:ring-1 focus:ring-blue focus:outline-none"
                  placeholder="Temp (36.6 °C)"
                  type="text"
                />
              </div>
            </div>
            <div className="relative">
              <textarea
                className="w-full border border-blue-border rounded-lg p-3 font-geist text-sm bg-white text-text focus:border-blue focus:ring-1 focus:ring-blue focus:outline-none"
                placeholder="Describe patient condition, symptoms observed, and specific first-aid steps administered..."
                rows={4}
                defaultValue={""}
              />
              <span className="absolute -top-2 left-2 bg-white px-1 font-geist text-[11px] text-subtext font-bold">
                First-Aid Administered &amp; Observations
              </span>
            </div>
          </section>

          {/* Section 5: Disposition & Responding Personnel */}
          <section className="bg-white border border-blue-border p-4 md:p-6 rounded-xl shadow-sm space-y-4">
            <p className="font-geist text-xs text-blue uppercase tracking-wider font-bold border-b border-blue-border pb-2">
              5. Disposition &amp; Responding Officers
            </p>
            <div className="relative">
              <select className="w-full h-11 border border-blue-border rounded-lg px-3 font-geist text-sm bg-white text-text focus:border-blue focus:ring-1 focus:ring-blue focus:outline-none appearance-none cursor-pointer">
                <option>Transported to University Clinic</option>
                <option>Treated and released back to class</option>
                <option>Emergency Services Contacted (911 / Ambulance)</option>
                <option>Parent / Guardian Contacted for Pickup</option>
              </select>
              <span className="absolute -top-2 left-2 bg-white px-1 font-geist text-[11px] text-subtext font-bold">
                Final Action Taken
              </span>
              <span className="material-symbols-outlined absolute right-3 top-2.5 text-subtext pointer-events-none text-[20px]!">
                arrow_drop_down
              </span>
            </div>
            {/* Responding Officers Chips */}
            <div className="relative">
              <div className="w-full min-h-11 border border-blue-border rounded-lg p-2 flex flex-wrap gap-2 items-center bg-white focus-within:border-blue">
                <div className="bg-surface-container-high border border-blue-border flex items-center gap-1.5 px-3 py-1 rounded-full font-geist text-xs text-text font-medium">
                  Officer Santos{" "}
                  <span className="material-symbols-outlined text-[16px]! cursor-pointer text-subtext hover:text-red transition-colors">
                    close
                  </span>
                </div>
                <div className="bg-surface-container-high border border-blue-border flex items-center gap-1.5 px-3 py-1 rounded-full font-geist text-xs text-text font-medium">
                  Officer Cruz{" "}
                  <span className="material-symbols-outlined text-[16px]! cursor-pointer text-subtext hover:text-red transition-colors">
                    close
                  </span>
                </div>
                <input
                  className="border-none bg-transparent outline-none flex-1 min-w-30 font-geist text-sm focus:ring-0 p-1"
                  placeholder="Add officer..."
                  type="text"
                />
              </div>
              <span className="absolute -top-2 left-2 bg-white px-1 font-geist text-[11px] text-subtext font-bold">
                Responding Officers
              </span>
            </div>
          </section>
        </div>
      </main>

      {/* Sticky Sync / Save Action Bar */}
      <div className="fixed bottom-16 md:bottom-0 left-0 w-full bg-white border-t border-blue-border shadow-[0_-4px_12px_rgba(0,0,0,0.08)] z-40 p-3 md:p-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-subtext">
            <span className="material-symbols-outlined text-blue text-[20px]!">
              save
            </span>
            <span className="font-geist text-sm text-text font-medium">
              Draft Record Saved (Auto)
            </span>
          </div>
          <div className="flex w-full sm:w-auto gap-3">
            <button className="flex-1 sm:flex-none px-5 py-2 rounded-lg bg-white border border-blue-border text-text font-geist text-sm hover:bg-surface-container-low transition-colors cursor-pointer">
              Discard Draft
            </button>
            <button className="flex-1 sm:flex-none px-6 py-2 rounded-lg bg-blue text-white font-geist text-sm font-semibold hover:bg-blue/90 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]!">
                lock
              </span>{" "}
              Encrypt &amp; Submit
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </>
  );
}