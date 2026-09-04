import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import WIP from "../../components/WIP";

export default function Incidents() {
  return (
    <>
      <title>Incident Vault - DRRT Officer Portal</title>

      <Header />
      <WIP />

      {/* Main Content */}
      <main className="grow px-4 md:px-8 py-6 max-w-7xl mx-auto w-full flex flex-col gap-6 pb-24 md:pb-12">
        {/* Privacy Banner */}
        <div className="bg-red-bg text-red border border-red-border rounded-lg p-4 flex items-start gap-3 shadow-sm">
          <span className="material-symbols-outlined filled-icon text-red text-[24px]! mt-0.5">
            shield_lock
          </span>
          <div>
            <h2 className="font-geist text-xs md:text-sm font-bold uppercase tracking-wider mb-1">
              CONFIDENTIALITY NOTICE: DATA PRIVACY ACT OF 2012 (R.A. 10173)
            </h2>
            <p className="font-geist text-xs md:text-sm text-red/90">
              Access to medical records is strictly monitored and logged.
            </p>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-1/2">
            <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-subtext text-[20px]!">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 border border-blue-border rounded-lg bg-white focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue font-geist text-sm text-text transition-colors shadow-sm"
              placeholder="Search Vault..."
              type="text"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto items-center justify-between md:justify-end overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-full bg-blue text-white font-geist text-xs font-semibold whitespace-nowrap shadow-sm cursor-pointer">
                All
              </button>
              <button className="px-4 py-1.5 rounded-full border border-blue-border bg-white hover:bg-surface-container-low text-subtext font-geist text-xs font-medium whitespace-nowrap transition-colors cursor-pointer">
                Minor
              </button>
              <button className="px-4 py-1.5 rounded-full border border-blue-border bg-white hover:bg-surface-container-low text-subtext font-geist text-xs font-medium whitespace-nowrap transition-colors cursor-pointer">
                Moderate
              </button>
              <button className="px-4 py-1.5 rounded-full border border-blue-border bg-white hover:bg-surface-container-low text-subtext font-geist text-xs font-medium whitespace-nowrap transition-colors cursor-pointer">
                Critical
              </button>
            </div>
            {/* Desktop Audit Export Action */}
            <button className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-surface-container-low border border-blue-border rounded-lg font-geist text-xs font-semibold text-text transition-colors shadow-sm cursor-pointer">
              <span className="material-symbols-outlined text-[18px]!">
                download
              </span>{" "}
              Export Audit Log
            </button>
          </div>
        </div>

        {/* Desktop Incident Records Table */}
        <div className="hidden md:block bg-white border border-blue-border rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b border-blue-border font-geist text-xs uppercase tracking-wider font-semibold text-subtext">
              <tr>
                <th className="p-4">Incident ID</th>
                <th className="p-4">Subject Name</th>
                <th className="p-4">Date &amp; Time</th>
                <th className="p-4">Severity level</th>
                <th className="p-4 text-right">Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-border font-geist text-sm text-text">
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="p-4 font-mono text-subtext font-medium">INC-089</td>
                <td className="p-4 font-semibold text-text">Jane Doe</td>
                <td className="p-4 text-subtext">
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]!">
                      schedule
                    </span>{" "}
                    10/24/2023 14:30
                  </span>
                </td>
                <td className="p-4">
                  <span className="bg-red-bg text-red border border-red-border px-2.5 py-1 rounded font-geist text-xs uppercase font-semibold">
                    Critical
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="px-3.5 py-1.5 bg-blue hover:bg-blue/90 text-white rounded-lg font-geist text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer">
                    <span className="material-symbols-outlined text-[16px]!">
                      lock_open
                    </span>{" "}
                    Open Secured Record
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="p-4 font-mono text-subtext font-medium">INC-088</td>
                <td className="p-4 font-semibold text-text">John Smith</td>
                <td className="p-4 text-subtext">
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]!">
                      schedule
                    </span>{" "}
                    10/24/2023 11:15
                  </span>
                </td>
                <td className="p-4">
                  <span className="bg-yellow-bg text-yellow border border-yellow-border px-2.5 py-1 rounded font-geist text-xs uppercase font-semibold">
                    Moderate
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="px-3.5 py-1.5 bg-surface-container-low hover:bg-surface-container text-text border border-blue-border rounded-lg font-geist text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-[16px]!">
                      lock_open
                    </span>{" "}
                    Open Secured Record
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="p-4 font-mono text-subtext font-medium">INC-087</td>
                <td className="p-4 font-semibold text-text">Alice Johnson</td>
                <td className="p-4 text-subtext">
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]!">
                      schedule
                    </span>{" "}
                    10/23/2023 09:00
                  </span>
                </td>
                <td className="p-4">
                  <span className="bg-green-bg text-green border border-green-border px-2.5 py-1 rounded font-geist text-xs uppercase font-semibold">
                    Minor
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="px-3.5 py-1.5 bg-surface-container-low hover:bg-surface-container text-text border border-blue-border rounded-lg font-geist text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-[16px]!">
                      lock_open
                    </span>{" "}
                    Open Secured Record
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Incident Records List */}
        <div className="grid grid-cols-1 md:hidden gap-4">
          {/* Record 1 (Critical) */}
          <div className="bg-white border border-blue-border rounded-xl p-4 shadow-sm flex flex-col gap-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-red" />
            <div className="flex justify-between items-start pl-2">
              <div>
                <span className="font-mono text-xs text-subtext font-medium">
                  INC-089
                </span>
                <h3 className="font-geist text-base font-bold text-text mt-0.5">
                  Jane Doe
                </h3>
                <p className="font-geist text-xs text-subtext flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[16px]!">
                    schedule
                  </span>{" "}
                  10/24/2023 14:30
                </p>
              </div>
              <span className="bg-red-bg text-red border border-red-border px-2.5 py-1 rounded font-geist text-xs uppercase font-semibold">
                Critical
              </span>
            </div>
            <button className="w-full py-2 bg-blue hover:bg-blue/90 text-white rounded-lg font-geist text-xs font-semibold flex justify-center items-center gap-2 transition-colors shadow-sm cursor-pointer">
              <span className="material-symbols-outlined text-[18px]!">
                lock_open
              </span>{" "}
              Open Secured Record
            </button>
          </div>

          {/* Record 2 (Moderate) */}
          <div className="bg-white border border-blue-border rounded-xl p-4 shadow-sm flex flex-col gap-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-yellow" />
            <div className="flex justify-between items-start pl-2">
              <div>
                <span className="font-mono text-xs text-subtext font-medium">
                  INC-088
                </span>
                <h3 className="font-geist text-base font-bold text-text mt-0.5">
                  John Smith
                </h3>
                <p className="font-geist text-xs text-subtext flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[16px]!">
                    schedule
                  </span>{" "}
                  10/24/2023 11:15
                </p>
              </div>
              <span className="bg-yellow-bg text-yellow border border-yellow-border px-2.5 py-1 rounded font-geist text-xs uppercase font-semibold">
                Moderate
              </span>
            </div>
            <button className="w-full py-2 bg-surface-container-low hover:bg-surface-container text-text rounded-lg border border-blue-border font-geist text-xs font-semibold flex justify-center items-center gap-2 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px]!">
                lock_open
              </span>{" "}
              Open Secured Record
            </button>
          </div>

          {/* Record 3 (Minor) */}
          <div className="bg-white border border-blue-border rounded-xl p-4 shadow-sm flex flex-col gap-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-green" />
            <div className="flex justify-between items-start pl-2">
              <div>
                <span className="font-mono text-xs text-subtext font-medium">
                  INC-087
                </span>
                <h3 className="font-geist text-base font-bold text-text mt-0.5">
                  Alice Johnson
                </h3>
                <p className="font-geist text-xs text-subtext flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[16px]!">
                    schedule
                  </span>{" "}
                  10/23/2023 09:00
                </p>
              </div>
              <span className="bg-green-bg text-green border border-green-border px-2.5 py-1 rounded font-geist text-xs uppercase font-semibold">
                Minor
              </span>
            </div>
            <button className="w-full py-2 bg-surface-container-low hover:bg-surface-container text-text rounded-lg border border-blue-border font-geist text-xs font-semibold flex justify-center items-center gap-2 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[18px]!">
                lock_open
              </span>{" "}
              Open Secured Record
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
