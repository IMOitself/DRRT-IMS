import { Link } from "react-router-dom";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { getInitials, formatDate } from "../../utils/format";

// static placeholder data until the incidents api is wired up
const incidents = [
  { id: 1, date: "2026-09-21", patient_name: "Juan Dela Cruz" },
  { id: 2, date: "2026-09-18", patient_name: "Maria Santos" },
  { id: 3, date: "2026-09-12", patient_name: "Jose Rizal Reyes" },
];

export default function Incidents() {
  return (
    <>
      <title>Incidents - DRRT Officer Portal</title>

      <Header />

      {/* Main Content Canvas */}
      <main className="grow pb-32">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 space-y-4">
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

          {/* Incidents Context Header */}
          <section className="bg-white border border-blue-border p-6 rounded-xl shadow-sm space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-geist text-2xl md:text-3xl font-bold text-text mt-1">
                  Incident Reports
                </h2>
                <p className="text-sm text-subtext mt-1">
                  Incident reports you have filed. Once submitted, only the adviser can view them.
                </p>
              </div>
              <Link to="/officer/create-incident" className="flex font-geist text-xs md:text-sm bg-blue-bg text-blue border border-blue-border transition-all px-4 py-2 rounded-full font-bold shadow-sm active:scale-95 hover:bg-blue hover:text-white cursor-pointer items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]!">add</span>
                Create Incident Report
              </Link>
            </div>
          </section>

          {/* Incident List Cards */}
          <section className="space-y-2">
            {incidents.map((incident) =>
              <div
                key={incident.id}
                className="bg-white border border-blue-border rounded-lg p-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-blue shrink-0">
                    {getInitials(incident.patient_name)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-geist text-text truncate">
                      {incident.patient_name}
                    </p>
                    <p className="text-[11px] text-subtext truncate">
                      {formatDate(incident.date)}
                    </p>
                  </div>
                </div>
                <div className="relative group/lock shrink-0">
                  <span className="material-symbols-outlined text-subtext text-[20px]! p-1 cursor-help">
                    lock
                  </span>
                  <span className="pointer-events-none absolute right-0 bottom-full mb-1 whitespace-nowrap rounded-md bg-text text-white font-geist text-xs px-2.5 py-1 shadow-md opacity-0 group-hover/lock:opacity-100 transition-opacity">
                    Only the adviser can see this now
                  </span>
                </div>
              </div>
            )}
            {incidents.length === 0 && (
              <p className="font-geist text-sm text-subtext text-center py-4">
                No incidents reported yet.
              </p>
            )}
          </section>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
