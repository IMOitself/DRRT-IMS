import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

export default function Incidents() {
  return (
    <>
      <title>Incidents - DRRT Officer Portal</title>

      <Header />

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
      </main>
      <BottomNav />
    </>
  );
}
