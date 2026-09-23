import { Link } from "react-router-dom";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

// underlined blank, like the lines on the paper form
const lineInput = "min-w-0 bg-transparent border-0 border-b border-text px-1 font-normal text-text focus:outline-none focus:border-blue";

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
  return (
    <>
      <title>Create Incident - DRRT Officer Portal</title>

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
                  Create Incident
                </h2>
                <p className="text-sm text-subtext mt-1">
                  Fill out to create an incident report below. Once submitted, the report is locked and only the adviser can view it.
                </p>
              </div>
            </div>
          </section>

          <form className="w-full bg-white border border-blue-border rounded-xl shadow-sm p-6 md:p-20 font-geist text-text text-xs md:text-lg space-y-6 [&_label]:font-bold">
            {/* Form Heading */}
            <div className="text-center uppercase space-y-1">
              <p>LVCC DRRT (DISASTER RESPONSE AND RESCUE TEAM) CLUB</p>
              <p>STANDBY DUTY - EXTERNAL</p>
              <p className="font-bold text-blue">PERSONAL MEDICAL SAMPLE HISTORY</p>
              <p className="pt-2 pb-1 border-b-3 border-text">
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
                  <input type="text" name="name" className={lineInput + " flex-1"} />
                </label>
                <label className="flex items-end gap-2">
                  AGE:
                  <input type="number" name="age" min="0" className={lineInput + " w-16"} />
                </label>
              </div>
              <label className="flex items-end gap-2">
                ADDRESS:
                <input type="text" name="address" className={lineInput + " flex-1"} />
              </label>
              <label className="flex items-end gap-2">
                CC:
                <input type="text" name="chief_complaint" placeholder="Chief Complaint" className={lineInput + " flex-1"} />
              </label>
            </div>

            {/* Vital Signs */}
            <div className="space-y-2">
              <p className="text-blue font-bold">Vital Signs:</p>
              {[0, 1, 2].map((row) => (
                <div key={row} className="flex flex-wrap gap-x-3 gap-y-2">
                  {vitalSigns.map((vital) => (
                    <label key={vital.name} className="flex items-end gap-1 font-normal!">
                      {vital.label}:
                      <input
                        type={vital.type || "text"}
                        name={`vitals[${row}][${vital.name}]`}
                        className={lineInput + " w-16"}
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
                  rows={6}
                  className="w-full resize-none bg-transparent border-0 px-1 font-normal text-text leading-8 focus:outline-none"
                  style={{
                    backgroundImage: "repeating-linear-gradient(to bottom, transparent 0, transparent calc(2rem - 1px), var(--color-text) calc(2rem - 1px), var(--color-text) 2rem)",
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
          </form>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
