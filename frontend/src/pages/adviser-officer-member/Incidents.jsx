import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { getInitials, formatDate } from "../../utils/format";

const sampleLabels = [
  { letter: "S", label: "Signs & Symptoms", field: "signs_symptoms" },
  { letter: "A", label: "Allergies", field: "allergies" },
  { letter: "M", label: "Medications", field: "medications" },
  { letter: "P", label: "Past Medical History", field: "past_medical_history" },
  { letter: "L", label: "Last Oral Intake", field: "last_oral_intake" },
  { letter: "E", label: "Events Leading to Illness/Injury", field: "events_leading" },
];

const painLabels = [
  { letter: "O", label: "Onset", field: "onset" },
  { letter: "P", label: "Provocation", field: "provocation" },
  { letter: "Q", label: "Quality", field: "quality" },
  { letter: "R", label: "Region / Radiation", field: "region_radiation" },
  { letter: "S", label: "Severity (1-10)", field: "severity" },
  { letter: "T", label: "Time", field: "time" },
];

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { user } = useAuth();

  const isAdviser = user?.role === "adviser";
  const isOfficer = user?.role === "officer";
  const portalName = isAdviser ? "Adviser" : isOfficer ? "Officer" : "Member";
  const createIncidentPath = location.pathname.startsWith("/officer")
    ? "/officer/create-incident"
    : "/member/create-incident";

  useEffect(() => {
    api
      .get("/incident-reports")
      .then((response) => {
        setIncidents(response.data);

        // Check if opened from another page (e.g. Dashboard) with a specific incident
        const openIncidentId = location.state?.openIncidentId;
        if (openIncidentId) {
          const match = response.data.find((inc) => inc.id === Number(openIncidentId));
          if (match) {
            setSelectedIncident(match);
            setDrawerOpen(true);
          }
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [location.state?.openIncidentId]);

  const openDrawer = (incident) => {
    setSelectedIncident(incident);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  // Close drawer on Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && drawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [drawerOpen]);

  const filteredIncidents = incidents.filter((incident) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    const searchableText = [
      incident.name,
      incident.address,
      incident.chief_complaint,
      incident.treatment,
      incident.team_leader,
      incident.endorsed_to,
      incident.reporter?.name,
      incident.reporter?.email,
      incident.date,
      formatDate((incident.date || incident.created_at || "").slice(0, 10)),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return query.split(/\s+/).every((word) => searchableText.includes(word));
  });

  // Parse vitals JSON / array safely
  const parsedVitals = (() => {
    if (!selectedIncident?.vitals) return [];
    if (Array.isArray(selectedIncident.vitals)) return selectedIncident.vitals;
    try {
      return JSON.parse(selectedIncident.vitals);
    } catch {
      return [];
    }
  })().filter(
    (v) => v && (v.time || v.bp || v.spo2 || v.pr || v.rr || v.temp)
  );

  return (
    <>
      <title>{`Incidents - DRRT ${portalName} Portal`}</title>

      <Header />

      {/* Main Content Canvas */}
      <main className="grow pb-32">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 space-y-4">
          {/* Incidents Context Header */}
          <section className="bg-white border border-blue-border p-6 rounded-xl shadow-sm space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-geist text-2xl md:text-3xl font-bold text-text mt-1">
                  Incident Reports
                </h2>
                <p className="text-sm text-subtext mt-1">
                  Confidential medical, emergency response, and first-aid records filed by team responders.
                </p>
              </div>
              <div className="flex items-center gap-2">
                {!isAdviser ? (
                  <Link
                    to={createIncidentPath}
                    className="flex font-geist text-xs md:text-sm bg-blue-bg text-blue border border-blue-border transition-all px-4 py-2 rounded-full font-bold shadow-sm active:scale-95 hover:bg-blue hover:text-white cursor-pointer items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]!">add</span>
                    Create Incident Report
                  </Link>
                ) : (
                  <span className="font-geist text-xs font-bold bg-blue-bg text-blue border border-blue-border px-3 py-1.5 rounded-full">
                    {incidents.length} Total Reports
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* Confidentiality Notice */}
          <div className="bg-red-bg text-red border border-red-border rounded-lg p-4 flex items-start gap-3 shadow-sm">
            <span className="material-symbols-outlined filled-icon text-red text-[24px]! mt-0.5">
              shield_lock
            </span>
            <div>
              <h2 className="font-geist text-xs md:text-sm font-bold uppercase tracking-wider mb-1">
                CONFIDENTIALITY NOTICE: DATA PRIVACY ACT OF 2012 (R.A. 10173)
              </h2>
              <p className="font-geist text-xs md:text-sm text-red/90">
                You are accessing restricted emergency and medical records. All access is logged and strictly monitored.
              </p>
            </div>
          </div>

          {/* Search Controls */}
          <div className="w-full">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-subtext text-[20px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search incident by patient name, chief complaint, reporter, date..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-blue-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-text placeholder:text-subtext/70 focus:outline-none focus:ring-2 focus:ring-blue/30 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Incident List Cards */}
          <section className="space-y-2">
            {filteredIncidents.map((incident) => (
              <div
                key={incident.id}
                onClick={() => openDrawer(incident)}
                className="bg-white border border-blue-border rounded-lg p-3.5 flex items-center justify-between shadow-sm hover:border-blue transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-full bg-blue-bg flex items-center justify-center font-bold text-blue shrink-0">
                    {getInitials(incident.name || "UN")}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-geist font-bold text-text truncate group-hover:text-blue transition-colors">
                        {incident.name || "Unnamed Patient"}
                      </p>
                      {incident.age && (
                        <span className="text-xs text-subtext font-normal">
                          ({incident.age} yrs old)
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-subtext truncate">
                      <span className="font-medium text-text">
                        {incident.chief_complaint || "Emergency Response"}
                      </span>
                      {" • "}
                      <span>{formatDate((incident.date || incident.created_at || "").slice(0, 10))}</span>
                      {incident.reporter?.name && (
                        <span className="hidden sm:inline">
                          {" • "}Filed by {incident.reporter.name}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-geist text-xs font-semibold text-blue bg-blue-bg/80 border border-blue-border px-2.5 py-1 rounded-md hidden sm:inline-flex items-center gap-1 group-hover:bg-blue group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[14px]!">
                      visibility
                    </span>
                    View Report
                  </span>
                  <span className="material-symbols-outlined text-subtext group-hover:text-blue transition-colors text-[20px]!">
                    chevron_right
                  </span>
                </div>
              </div>
            ))}

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 text-subtext gap-3">
                <span className="material-symbols-outlined text-[36px]! animate-spin text-blue">
                  progress_activity
                </span>
                <p className="font-geist text-sm">Loading incident reports...</p>
              </div>
            ) : (
              filteredIncidents.length === 0 && (
                <p className="font-geist text-sm text-subtext text-center py-8">
                  {searchQuery ? "No matching incident reports found." : "No incidents reported yet."}
                </p>
              )
            )}
          </section>
        </div>
      </main>

      {/* Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-60 bg-text/20 backdrop-blur-xs transition-opacity"
          onClick={closeDrawer}
        />
      )}

      {/* Incident Details Slide-over Drawer */}
      <aside
        className={`glass-bg fixed inset-y-0 right-0 z-70 w-full md:w-160 max-w-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-blue-border flex flex-col ${drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-border bg-surface-container-low/40">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-red text-[24px]!">
              medical_information
            </span>
            <div>
              <h3 className="font-geist text-lg font-bold text-text m-0">
                Incident Report #{selectedIncident?.id}
              </h3>
              <p className="text-xs text-subtext">
                Filed on {formatDate((selectedIncident?.date || selectedIncident?.created_at || "").slice(0, 10))}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close"
            className="cursor-pointer hover:bg-surface-container-highest p-2 rounded-lg transition-colors text-subtext"
            onClick={closeDrawer}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Drawer Content */}
        {selectedIncident && (
          <div className="grow overflow-y-auto p-5 md:p-6 space-y-6">
            {/* Section 1: Patient Demographics */}
            <section className="bg-surface rounded-xl p-4 border border-blue-border/70 space-y-3">
              <h4 className="font-geist text-xs font-bold uppercase tracking-wider text-blue flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]!">person</span>
                Patient Demographics
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-xs text-subtext block font-geist">Patient Name</span>
                  <span className="font-semibold text-text font-geist text-base">
                    {selectedIncident.name || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-subtext block font-geist">Age</span>
                  <span className="font-semibold text-text font-geist">
                    {selectedIncident.age ? `${selectedIncident.age} years old` : "N/A"}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-xs text-subtext block font-geist">Address</span>
                  <span className="text-text font-geist">
                    {selectedIncident.address || "N/A"}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-xs text-subtext block font-geist">Chief Complaint (CC)</span>
                  <span className="font-bold text-red font-geist text-base">
                    {selectedIncident.chief_complaint || "N/A"}
                  </span>
                </div>
              </div>
            </section>

            {/* Section 2: Vital Signs */}
            <section className="bg-surface rounded-xl p-4 border border-blue-border/70 space-y-3">
              <h4 className="font-geist text-xs font-bold uppercase tracking-wider text-blue flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]!">monitor_heart</span>
                Vital Signs
              </h4>
              {parsedVitals.length === 0 ? (
                <p className="text-xs text-subtext italic">No vital signs were recorded during triage.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-geist border-collapse">
                    <thead>
                      <tr className="border-b border-blue-border text-subtext uppercase">
                        <th className="py-1.5 px-2 font-semibold">Time</th>
                        <th className="py-1.5 px-2 font-semibold">BP</th>
                        <th className="py-1.5 px-2 font-semibold">SpO2</th>
                        <th className="py-1.5 px-2 font-semibold">PR</th>
                        <th className="py-1.5 px-2 font-semibold">RR</th>
                        <th className="py-1.5 px-2 font-semibold">Temp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-border/40 text-text">
                      {parsedVitals.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/50">
                          <td className="py-2 px-2 font-mono font-medium">{row.time || "—"}</td>
                          <td className="py-2 px-2 font-medium">{row.bp || "—"}</td>
                          <td className="py-2 px-2">{row.spo2 ? `${row.spo2}%` : "—"}</td>
                          <td className="py-2 px-2">{row.pr ? `${row.pr} bpm` : "—"}</td>
                          <td className="py-2 px-2">{row.rr ? `${row.rr} cpm` : "—"}</td>
                          <td className="py-2 px-2">{row.temp ? `${row.temp}°C` : "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* Section 3: SAMPLE History */}
            <section className="bg-surface rounded-xl p-4 border border-blue-border/70 space-y-2.5">
              <h4 className="font-geist text-xs font-bold uppercase tracking-wider text-blue flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]!">history_edu</span>
                SAMPLE History
              </h4>
              <div className="space-y-2 text-xs md:text-sm">
                {sampleLabels.map(({ letter, label, field }) => (
                  <div key={field} className="flex items-start gap-2 pt-1 border-b border-blue-border/20 pb-1.5">
                    <span className="font-geist font-bold text-blue shrink-0 w-6">
                      {letter} -
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] text-subtext block font-geist">{label}</span>
                      <p className="text-text font-geist break-words">
                        {selectedIncident[field] || <span className="text-subtext/60 italic">None noted</span>}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: OPQRST Pain Assessment */}
            <section className="bg-surface rounded-xl p-4 border border-blue-border/70 space-y-2.5">
              <h4 className="font-geist text-xs font-bold uppercase tracking-wider text-blue flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]!">healing</span>
                OPQRST Pain Assessment
              </h4>
              <div className="space-y-2 text-xs md:text-sm">
                {painLabels.map(({ letter, label, field }) => (
                  <div key={field} className="flex items-start gap-2 pt-1 border-b border-blue-border/20 pb-1.5">
                    <span className="font-geist font-bold text-blue shrink-0 w-6">
                      {letter} -
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] text-subtext block font-geist">{label}</span>
                      <p className="text-text font-geist break-words">
                        {selectedIncident[field] || <span className="text-subtext/60 italic">None noted</span>}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5: Treatment & Handover */}
            <section className="bg-surface rounded-xl p-4 border border-blue-border/70 space-y-3">
              <h4 className="font-geist text-xs font-bold uppercase tracking-wider text-blue flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]!">assignment_turned_in</span>
                Treatment &amp; Endorsement
              </h4>
              <div className="space-y-3 text-xs md:text-sm">
                <div>
                  <span className="text-xs text-subtext block font-geist">Treatment Rendered</span>
                  <p className="font-geist text-text whitespace-pre-wrap bg-white p-2.5 rounded-lg border border-blue-border/50 mt-1">
                    {selectedIncident.treatment || <span className="text-subtext/60 italic">No treatment notes provided</span>}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <span className="text-xs text-subtext block font-geist">Team Leader</span>
                    <span className="font-semibold text-text font-geist">
                      {selectedIncident.team_leader || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-subtext block font-geist">Endorsed To</span>
                    <span className="font-semibold text-text font-geist">
                      {selectedIncident.endorsed_to || "—"}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: Responder Info */}
            <section className="p-3 bg-surface-container-low/60 rounded-xl border border-blue-border/40 text-xs text-subtext flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span>Report Filed By: </span>
                <strong className="text-text font-geist">
                  {selectedIncident.reporter?.name || "Responder"}
                </strong>
                {selectedIncident.reporter?.email && (
                  <span> ({selectedIncident.reporter.email})</span>
                )}
              </div>
              <div className="font-mono text-[11px]">
                ID: #{selectedIncident.id}
              </div>
            </section>
          </div>
        )}
      </aside>

      <BottomNav />
    </>
  );
}
