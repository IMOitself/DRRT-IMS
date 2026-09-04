import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import WIP from "../../components/WIP";

export default function Dashboard() {
  return (
    <>
      <title>Dashboard - DRRT Officer Portal</title>

      <Header />
      <WIP />

      {/* Main Content Canvas */}
      <main className="grow pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
          {/* Welcome Context Header */}
          <section className="bg-white border border-blue-border p-4 md:p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <p className="font-geist text-xs text-blue uppercase tracking-wider font-bold">
                Disaster Response &amp; Readiness Team
              </p>
              <h2 className="font-geist text-2xl md:text-3xl text-text mt-1 font-bold">
                Welcome back, Officer Santos
              </h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-subtext text-xs md:text-sm mt-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]! text-blue">
                    schedule
                  </span>{" "}
                  System Time: 02:45 PM
                </span>
                <span className="text-blue-border">•</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green animate-pulse" />{" "}
                  Active Duty: On-Call
                </span>
                <span className="text-blue-border">•</span>
                <span className="font-mono text-subtext font-medium">
                  Badge #DRRT-104
                </span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full md:w-auto">
              <button className="flex-1 sm:flex-initial bg-blue text-white px-3.5 py-2 rounded-lg font-geist text-sm flex items-center justify-center shadow-sm hover:bg-blue/90 transition-colors gap-1.5 font-semibold cursor-pointer">
                <span className="material-symbols-outlined text-[18px]!">add</span>{" "}
                Quick Attendance
              </button>
              <button className="flex-1 sm:flex-initial bg-white border border-red text-red px-3.5 py-2 rounded-lg font-geist text-sm flex items-center justify-center hover:bg-red-bg transition-colors gap-1.5 font-bold cursor-pointer">
                <span className="material-symbols-outlined text-[18px]!">
                  add_alert
                </span>{" "}
                Log Incident
              </button>
              <button className="flex-1 sm:flex-initial bg-white border border-blue-border text-text px-3.5 py-2 rounded-lg font-geist text-sm flex items-center justify-center hover:bg-surface-container-low transition-colors gap-1.5 font-medium cursor-pointer">
                <span className="material-symbols-outlined text-[18px]!">event</span>{" "}
                Schedule
              </button>
            </div>
          </section>

          {/* KPIs Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* KPI 1 */}
            <div className="bg-white border border-blue-border rounded-xl p-4 md:p-6 shadow-sm relative overflow-hidden card-hover hover:border-blue transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="font-geist text-xs text-subtext uppercase tracking-wider font-bold">
                  Active Members
                </span>
                <span className="material-symbols-outlined text-[24px]! text-blue bg-blue-bg p-1.5 rounded-lg">
                  groups
                </span>
              </div>
              <div className="flex items-end justify-between mt-3">
                <div className="font-geist text-4xl md:text-5xl text-text leading-none font-bold">
                  142
                </div>
                <div className="flex items-center text-green bg-green-bg border border-green-border px-2 py-0.5 rounded font-geist text-xs font-semibold">
                  <span className="material-symbols-outlined text-[14px]! mr-0.5">
                    arrow_upward
                  </span>{" "}
                  +5
                </div>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="bg-white border border-blue-border rounded-xl p-4 md:p-6 shadow-sm relative overflow-hidden card-hover hover:border-blue transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="font-geist text-xs text-subtext uppercase tracking-wider font-bold">
                  Avg Attendance
                </span>
                <span className="material-symbols-outlined text-[24px]! text-blue bg-blue-bg p-1.5 rounded-lg">
                  fact_check
                </span>
              </div>
              <div className="flex items-end justify-between mt-3">
                <div className="font-geist text-4xl md:text-5xl text-text leading-none font-bold">
                  88.4<span className="text-2xl text-subtext">%</span>
                </div>
                <div className="flex items-center text-subtext font-geist text-xs bg-surface-container px-2 py-1 rounded">
                  <span className="w-2 h-2 rounded-full bg-green mr-1.5" />{" "}
                  Stable
                </div>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="bg-white border border-blue-border rounded-xl p-4 md:p-6 shadow-sm relative overflow-hidden card-hover hover:border-red transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="font-geist text-xs text-subtext uppercase tracking-wider font-bold">
                  Incidents Logged
                </span>
                <span className="material-symbols-outlined text-[24px]! text-red bg-red-bg p-1.5 rounded-lg">
                  warning
                </span>
              </div>
              <div className="flex items-end justify-between mt-3">
                <div className="font-geist text-4xl md:text-5xl text-text leading-none font-bold">
                  6
                </div>
                <div className="text-subtext font-geist text-xs bg-surface-container px-2 py-1 rounded font-medium">
                  All resolved
                </div>
              </div>
            </div>

            {/* KPI 4 */}
            <div className="bg-white border border-blue-border rounded-xl p-4 md:p-6 shadow-sm relative overflow-hidden card-hover hover:border-yellow transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="font-geist text-xs text-subtext uppercase tracking-wider font-bold">
                  Pending Training
                </span>
                <span className="material-symbols-outlined text-[24px]! text-yellow bg-yellow-bg p-1.5 rounded-lg">
                  model_training
                </span>
              </div>
              <div className="flex items-end justify-between mt-3">
                <div className="font-geist text-4xl md:text-5xl text-text leading-none font-bold">
                  24
                </div>
                <div className="flex items-center text-yellow font-geist text-xs bg-yellow-bg border border-yellow-border px-2 py-0.5 rounded font-bold">
                  <span className="material-symbols-outlined text-[14px]! mr-1">
                    schedule
                  </span>{" "}
                  Action req.
                </div>
              </div>
            </div>
          </section>

          {/* Analytics Chart & Activity Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Analytics Chart */}
            <section className="lg:col-span-2 bg-white border border-blue-border rounded-xl shadow-sm p-4 md:p-6 flex flex-col min-h-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-geist text-xl font-bold text-text">
                    Monthly Activity Attendance
                  </h3>
                  <p className="text-xs md:text-sm text-subtext">
                    Trends breakdown by year level (Jan - May)
                  </p>
                </div>
                <button className="text-subtext hover:text-blue p-2 rounded-full hover:bg-surface-container-low transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[20px]!">more_vert</span>
                </button>
              </div>
              <div className="flex-1 relative w-full h-70">
                <canvas id="attendanceChart" />
              </div>
            </section>

            {/* Recent Activity Timeline */}
            <section className="bg-white border border-blue-border rounded-xl shadow-sm p-4 md:p-6 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-geist text-xl font-bold text-text">
                  Recent Activity
                </h3>
                <button className="text-blue font-geist text-sm hover:underline font-bold cursor-pointer">
                  View All
                </button>
              </div>
              <div className="flex-1 relative pl-6 space-y-6 before:absolute before:inset-y-2 before:left-2.75 before:w-0.5 before:bg-blue-border">
                {/* Item 1 */}
                <div className="relative">
                  <div className="absolute -left-7.5 top-0.5 w-6 h-6 rounded-full bg-red-bg text-red flex items-center justify-center border-2 border-white z-10 shadow-sm">
                    <span className="material-symbols-outlined text-[14px]!">
                      warning
                    </span>
                  </div>
                  <p className="text-sm text-text">
                    <span className="font-bold">Officer Cruz</span> created Incident{" "}
                    <a
                      className="text-blue font-semibold hover:underline"
                      href="#"
                    >
                      #INC-089
                    </a>
                  </p>
                  <p className="font-geist text-xs text-subtext mt-0.5 font-medium">
                    10 mins ago
                  </p>
                </div>

                {/* Item 2 */}
                <div className="relative">
                  <div className="absolute -left-7.5 top-0.5 w-6 h-6 rounded-full bg-blue-bg text-blue flex items-center justify-center border-2 border-white z-10 shadow-sm">
                    <span className="material-symbols-outlined text-[14px]!">
                      fact_check
                    </span>
                  </div>
                  <p className="text-sm text-text">
                    Attendance logged for{" "}
                    <span className="font-bold">Alpha Squad</span> (24/25 present)
                  </p>
                  <p className="font-geist text-xs text-subtext mt-0.5 font-medium">
                    1 hour ago
                  </p>
                </div>

                {/* Item 3 */}
                <div className="relative">
                  <div className="absolute -left-7.5 top-0.5 w-6 h-6 rounded-full bg-surface-container-high text-subtext flex items-center justify-center border-2 border-white z-10 shadow-sm">
                    <span className="material-symbols-outlined text-[14px]!">
                      edit_document
                    </span>
                  </div>
                  <p className="text-sm text-text">
                    System generated Weekly Roster Report
                  </p>
                  <p className="font-geist text-xs text-subtext mt-0.5 font-medium">
                    3 hours ago
                  </p>
                </div>

                {/* Item 4 */}
                <div className="relative">
                  <div className="absolute -left-7.5 top-0.5 w-6 h-6 rounded-full bg-blue text-white flex items-center justify-center border-2 border-white z-10 shadow-sm">
                    <span className="material-symbols-outlined text-[14px]!">
                      model_training
                    </span>
                  </div>
                  <p className="text-sm text-text">
                    <span className="font-bold">Sgt. Reyes</span> scheduled CPR
                    Recertification
                  </p>
                  <p className="font-geist text-xs text-subtext mt-0.5 font-medium">
                    Yesterday, 14:30
                  </p>
                </div>

                {/* Item 5 */}
                <div className="relative">
                  <div className="absolute -left-7.5 top-0.5 w-6 h-6 rounded-full bg-yellow-bg text-yellow flex items-center justify-center border-2 border-white z-10 shadow-sm">
                    <span className="material-symbols-outlined text-[14px]!">
                      security
                    </span>
                  </div>
                  <p className="text-sm text-text">
                    Vault access granted to{" "}
                    <span className="font-bold">Officer Santos</span>
                  </p>
                  <p className="font-geist text-xs text-subtext mt-0.5 font-medium">
                    Yesterday, 09:15
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
