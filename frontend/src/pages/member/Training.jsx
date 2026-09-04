import Header from "../../components/Header";
import BottomNav from "../../components/member/BottomNav";

export default function Training() {
  return (
    <>
      <title>Training Hub - Member Portal</title>

      <Header />

      {/* Main Content Canvas */}
      <main className="grow max-w-7xl w-full mx-auto px-4 md:px-8 py-6 pb-24 md:pb-12 space-y-6">
        {/* Page Title Header */}
        <div>
          <h2 className="font-geist text-3xl md:text-5xl text-text font-bold">
            Training Hub
          </h2>
          <p className="text-base md:text-lg text-subtext mt-1">
            Enhance your skills, register for certifications, and manage active
            deployments.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-6 border-b border-blue-border/60 overflow-x-auto pb-1 no-scrollbar">
          <button className="font-geist text-sm text-blue font-bold border-b-2 border-blue pb-2 px-1 whitespace-nowrap cursor-pointer">
            Available Programs
          </button>
          <button className="font-geist text-sm text-subtext hover:text-blue pb-2 px-1 whitespace-nowrap transition-colors cursor-pointer">
            My Registrations
          </button>
          <button className="font-geist text-sm text-subtext hover:text-blue pb-2 px-1 whitespace-nowrap transition-colors cursor-pointer">
            Certificates &amp; Records
          </button>
        </div>

        {/* Training Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Advanced Disaster Response */}
          <div className="bg-white rounded-xl border border-blue-border p-4 md:p-6 flex flex-col justify-between card-hover shadow-sm">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="bg-surface-container-high text-subtext font-geist text-xs px-2.5 py-1 rounded-full font-semibold">
                  Specialized
                </span>
                <span className="bg-surface-container text-blue font-geist text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[14px]!">
                    group
                  </span>{" "}
                  15 slots left
                </span>
              </div>
              <h3 className="font-geist text-xl md:text-2xl font-bold text-text mb-1">
                Advanced Disaster Response
              </h3>
              <p className="text-sm text-subtext mb-4">
                Tactical coordination and resource management in high-stress
                disaster environments.
              </p>
              <div className="space-y-1.5 mb-6">
                <div className="flex items-center gap-2 text-sm text-subtext">
                  <span className="material-symbols-outlined text-[18px]! text-blue">
                    calendar_month
                  </span>{" "}
                  Oct 12 - Oct 14
                </div>
                <div className="flex items-center gap-2 text-sm text-subtext">
                  <span className="material-symbols-outlined text-[18px]! text-blue">
                    location_on
                  </span>{" "}
                  Regional HQ, Room B
                </div>
              </div>
            </div>
            <div>
              <div className="w-full bg-progress-ring-track h-2 rounded-full mb-3 overflow-hidden">
                <div
                  className="bg-blue h-full rounded-full"
                  style={{ width: "75%" }}
                />
              </div>
              <button className="w-full h-11 bg-blue text-white font-geist text-sm font-semibold rounded-lg hover:bg-blue/90 transition-all active:scale-[0.98] shadow-sm cursor-pointer">
                Enroll Now
              </button>
            </div>
          </div>

          {/* Card 2: Basic Life Support */}
          <div className="bg-white rounded-xl border border-blue-border p-4 md:p-6 flex flex-col justify-between card-hover shadow-sm">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="bg-surface-container-high text-subtext font-geist text-xs px-2.5 py-1 rounded-full font-semibold">
                  Core Requirement
                </span>
                <span className="bg-green-bg text-green border border-green-border font-geist text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-[14px]! filled-icon">
                    check_circle
                  </span>{" "}
                  Enrolled
                </span>
              </div>
              <h3 className="font-geist text-xl md:text-2xl font-bold text-text mb-1">
                Basic Life Support
              </h3>
              <p className="text-sm text-subtext mb-4">
                Essential CPR, AED usage, and initial emergency medical response
                techniques.
              </p>
              <div className="space-y-1.5 mb-6">
                <div className="flex items-center gap-2 text-sm text-subtext">
                  <span className="material-symbols-outlined text-[18px]! text-blue">
                    calendar_month
                  </span>{" "}
                  Sep 28 (Upcoming)
                </div>
                <div className="flex items-center gap-2 text-sm text-subtext">
                  <span className="material-symbols-outlined text-[18px]! text-blue">
                    location_on
                  </span>{" "}
                  Online Portal
                </div>
              </div>
            </div>
            <div>
              <div className="w-full bg-progress-ring-track h-2 rounded-full mb-3 overflow-hidden">
                <div
                  className="bg-green h-full rounded-full"
                  style={{ width: "100%" }}
                />
              </div>
              <button className="w-full h-11 bg-surface-container-high text-blue font-geist text-sm font-semibold rounded-lg border border-blue-border/60 hover:bg-surface-container-highest transition-all active:scale-[0.98] cursor-pointer">
                View Details
              </button>
            </div>
          </div>

          {/* Card 3: Logistics Management */}
          <div className="bg-surface-container-low/70 rounded-xl border border-blue-border p-4 md:p-6 flex flex-col justify-between opacity-90 shadow-sm">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="bg-surface-container-high text-subtext font-geist text-xs px-2.5 py-1 rounded-full font-semibold">
                  Leadership
                </span>
                <span className="bg-red-bg text-red border border-red-border font-geist text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-[14px]!">
                    block
                  </span>{" "}
                  Full
                </span>
              </div>
              <h3 className="font-geist text-xl md:text-2xl font-bold text-text mb-1">
                Logistics Management
              </h3>
              <p className="text-sm text-subtext mb-4">
                Supply chain optimization and deployment strategies for large-scale
                disaster operations.
              </p>
              <div className="space-y-1.5 mb-6">
                <div className="flex items-center gap-2 text-sm text-subtext">
                  <span className="material-symbols-outlined text-[18px]! text-subtext">
                    calendar_month
                  </span>{" "}
                  Nov 05 - Nov 07
                </div>
                <div className="flex items-center gap-2 text-sm text-subtext">
                  <span className="material-symbols-outlined text-[18px]! text-subtext">
                    location_on
                  </span>{" "}
                  Main Campus
                </div>
              </div>
            </div>
            <div>
              <div className="w-full bg-progress-ring-track h-2 rounded-full mb-3 overflow-hidden">
                <div
                  className="bg-subtext/40 h-full rounded-full"
                  style={{ width: "100%" }}
                />
              </div>
              <button className="w-full h-11 bg-surface-container-high text-subtext font-geist text-sm font-semibold rounded-lg cursor-not-allowed opacity-70">
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
