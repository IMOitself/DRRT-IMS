import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";

export default function Dashboard() {
  return (
    <>
      <title>Dashboard - DRRT Officer Portal</title>

      <Header />

      {/* Main Content Canvas */}
      <main className="grow pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">

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
        </div>
      </main>

      <BottomNav />
    </>
  );
}
