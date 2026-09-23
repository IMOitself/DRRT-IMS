import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

// underlined blank, like the lines on the paper form
const lineInput = "min-w-0 bg-transparent border-0 border-b border-blue-border px-1 font-normal text-text focus:outline-none focus:border-blue";

const sampleHistory = [
  { letter: "S", name: "signs_symptoms", placeholder: "Signs & Symptoms" },
  { letter: "A", name: "allergies", placeholder: "Allergies" },
  { letter: "M", name: "medications", placeholder: "Medications" },
  { letter: "P", name: "past_medical_history", placeholder: "Past Pertinent Medical History" },
  { letter: "L", name: "last_oral_intake", placeholder: "Last Oral Intake" },
  { letter: "E", name: "events_leading", placeholder: "Events Leading to Injury or Illness" },
];

const painAssessment = [
  { letter: "O", name: "onset", placeholder: "Onset" },
  { letter: "P", name: "provocation", placeholder: "Provocation" },
  { letter: "Q", name: "quality", placeholder: "Quality" },
  { letter: "R", name: "region_radiation", placeholder: "Region / Radiation" },
  { letter: "S", name: "severity", placeholder: "Severity (1-10)" },
  { letter: "T", name: "time", placeholder: "Time" },
];

const vitalSigns = [
  { label: "Time", name: "time", type: "time" },
  { label: "BP", name: "bp" },
  { label: "SpO2", name: "spo2" },
  { label: "PR", name: "pr" },
  { label: "RR", name: "rr" },
  { label: "Temp", name: "temp" },
];

function LetterRow({ letter, name, placeholder }) {
  return (
    <label className="flex items-end gap-2">
      <span className="text-blue">{letter} -</span>
      <textarea rows={1} name={name} placeholder={placeholder} className={lineInput + " flex-1 resize-none field-sizing-content"} />
    </label>
  );
}

export default function CreateIncident() {
  const [isConfirmSubmitDialogOpen, setIsConfirmSubmitDialogOpen] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsConfirmSubmitDialogOpen(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      // field names like vitals[0][bp] are parsed into nested arrays by laravel
      await api.post("/incident-reports", new FormData(formRef.current));
      navigate("/officer/incidents");
    } catch (error) {
      console.error(error);
      alert("Failed to submit incident report.");
      setIsConfirmSubmitDialogOpen(false);
    }
  };

  return (
    <>
      <title>Create Incident Report - DRRT Officer Portal</title>

      <Header />

      <main className="grow pb-32">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 space-y-4">
          {/* Back Link */}
          <Link to="/officer/incidents" className="inline-flex items-center gap-2 text-blue font-geist font-semibold hover:underline">
            <span className="material-symbols-outlined text-[18px]!">arrow_back</span>
            <span>Back to Incidents</span>
          </Link>

          {/* Incidents Context Header */}
          <section className="bg-white border border-blue-border p-6 rounded-xl shadow-sm space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-geist text-2xl md:text-3xl font-bold text-text mt-1">
                  Create Incident Report
                </h2>
                <p className="text-sm text-subtext mt-1">
                  Fill out to create an incident report below. Once submitted, the report is locked and only the adviser can view it.
                </p>
              </div>
            </div>
          </section>

          <form ref={formRef} onSubmit={handleSubmit} className="w-full bg-white border border-blue-border rounded-xl shadow-sm p-6 md:p-16 font-geist text-text text-xs md:text-lg space-y-6 [&_label]:font-bold">
            {/* Form Heading */}
            <div className="text-center uppercase space-y-1 text-sm">
              <p className="font-semibold">LVCC DRRT (DISASTER RESPONSE AND RESCUE TEAM) CLUB</p>
              <p className="font-semibold">STANDBY DUTY - EXTERNAL</p>
              <p className="font-bold text-blue">PERSONAL MEDICAL SAMPLE HISTORY</p>
              <p className="pt-2 pb-1 border-b-3 border-blue-border text-subtext">
                NOTE: THIS FORM IS TEMPORARY BUT CONFIDENTIAL INFORMATION CONTAINED HERE WILL BE
                RELEASED ONLY IF YOU HAVE AUTHORIZED US TO DO SO.
              </p>
            </div>

            {/* Patient Details */}
            <div className="space-y-2 uppercase">
              <label className="flex items-end gap-2">
                DATE:
                <input type="date" name="date" className={lineInput + " w-40"} />
              </label>
              <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
                <label className="flex items-end gap-2 flex-1 min-w-48">
                  NAME:
                  <input type="text" name="name" required className={lineInput + " flex-1"} />
                </label>
                <label className="flex items-end gap-2">
                  AGE:
                  <input type="number" name="age" min="0" required className={lineInput + " w-16"} />
                </label>
              </div>
              <label className="flex items-end gap-2">
                ADDRESS:
                <input type="text" name="address" required className={lineInput + " flex-1"} />
              </label>
              <label className="flex items-end gap-2">
                CC:
                <input type="text" name="chief_complaint" placeholder="Chief Complaint" required className={lineInput + " flex-1"} />
              </label>
            </div>

            {/* Vital Signs */}
            <div className="space-y-2">
              <p className="text-blue font-bold">Vital Signs:</p>
              {[0, 1, 2].map((row) => (
                <div key={row} className="grid grid-cols-5 md:grid-cols-[max-content_repeat(5,minmax(0,1fr))] gap-x-2 md:gap-x-3 gap-y-2">
                  {vitalSigns.map((vital) => (
                    <label key={vital.name} className={"flex md:flex-row md:items-end md:gap-1 min-w-0 font-normal! " + (vital.type === "time" ? "items-end gap-1 col-span-5 md:col-span-1" : "flex-col gap-0.5")}>
                      {vital.label}:
                      <input
                        type={vital.type || "text"}
                        name={`vitals[${row}][${vital.name}]`}
                        className={lineInput + (vital.type === "time" ? " w-fit md:w-28 shrink-0 min-w-28! cursor-pointer [&::-webkit-calendar-picker-indicator]:hidden" : " w-full")}
                        // the picker icon is hidden to save space, so clicking the input opens it instead
                        onClick={vital.type === "time" ? (e) => { try { e.currentTarget.showPicker(); } catch { /* unsupported */ } } : undefined}
                      />
                    </label>
                  ))}
                </div>
              ))}
            </div>

            {/* SAMPLE History */}
            <div className="space-y-2">
              {sampleHistory.map((item) => <LetterRow key={item.name} {...item} />)}
            </div>

            {/* OPQRST Pain Assessment, bracketed like the paper */}
            <div className="space-y-2">
              {painAssessment.map((item) => <LetterRow key={item.name} {...item} />)}
            </div>

            {/* Treatment & Signatures */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 uppercase">
              <label className="flex flex-col gap-1">
                TREATMENT:
                <textarea
                  name="treatment"
                  rows={3}
                  className="w-full resize-none bg-transparent border-0 px-1 font-normal text-text leading-8 focus:outline-none"
                  style={{
                    backgroundImage: "repeating-linear-gradient(to bottom, transparent 0, transparent calc(2rem - 1px), var(--color-blue-border) calc(2rem - 1px), var(--color-blue-border) 2rem)",
                  }}
                />
              </label>
              <div className="flex flex-col justify-around gap-10 text-center">
                <label className="flex flex-col gap-1">
                  <input type="text" name="team_leader" className={lineInput + " text-center"} />
                  TEAM LEADER
                </label>
                <label className="flex flex-col gap-1">
                  <input type="text" name="endorsed_to" className={lineInput + " text-center"} />
                  ENDORSED TO
                </label>
              </div>
            </div>

            {/* Submission Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3">
              <Link to="/officer/incidents" className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-low transition-all">
                <button type="button" className="w-full text-center">
                  Cancel
                </button>
              </Link>
              <button type="submit" className="w-full sm:w-auto bg-blue text-white hover:bg-blue transition-all font-geist font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] active:opacity-50 cursor-pointer">
                <span>Submit Report</span>
                <span className="material-symbols-outlined text-[18px]!">send</span>
              </button>
            </div>
          </form>
        </div>
      </main>

      {isConfirmSubmitDialogOpen && (
        <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="bg-white border border-blue-border/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-4">
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2 items-center">
                  <span className="material-symbols-outlined text-yellow mb-1 text-[30px]!">
                    warning
                  </span>
                  <p className="w-fit font-geist text-lg font-semibold text-text mb-1">
                    Submit Incident Report?
                  </p>
                </div>
                <p className="font-geist text-text">
                  Once submitted, the report is locked and only the adviser can view it.
                </p>

                <div className="w-full flex items-center mt-4">
                  <div className="flex flex-col sm:flex-row flex-1 items-center justify-end gap-2">
                    <button onClick={() => setIsConfirmSubmitDialogOpen(false)} className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl border border-blue-border text-subtext font-geist font-bold hover:bg-surface-container-low transition-all cursor-pointer">
                      Cancel
                    </button>
                    <button onClick={handleConfirmSubmit} className="w-full sm:w-auto bg-blue text-white hover:bg-blue/90 transition-all font-geist font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer">
                      <span className="material-symbols-outlined text-[20px]!">send</span>
                      <span>Submit</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </>
  );
}
