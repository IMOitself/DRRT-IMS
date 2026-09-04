import Header from "../../components/Header";
import BottomNav from "../../components/member/BottomNav";

export default function Training() {
  return (
    <>
      <title>Training Hub - Member Portal</title>

      <Header />

      {/* Main Content Canvas */}
      <main className="grow max-w-7xl w-full mx-auto px-margin-mobile md:px-margin-desktop py-lg pb-28 md:pb-12 space-y-lg">
        {/* Page Title Header */}
        <div>
          <h2 className="font-display-lg text-headline-lg md:text-display-lg text-on-surface font-bold">
            Training Hub
          </h2>
          <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant mt-1">
            Enhance your skills, register for certifications, and manage active
            deployments.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-6 border-b border-outline-variant/60 overflow-x-auto pb-xs scrollbar-none">
          <button className="font-label-md text-label-md text-primary font-bold border-b-2 border-primary pb-2 px-1 whitespace-nowrap">
            Available Programs
          </button>
          <button className="font-label-md text-label-md text-on-surface-variant hover:text-primary pb-2 px-1 whitespace-nowrap transition-colors">
            My Registrations
          </button>
          <button className="font-label-md text-label-md text-on-surface-variant hover:text-primary pb-2 px-1 whitespace-nowrap transition-colors">
            Certificates &amp; Records
          </button>
        </div>

        {/* Training Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {/* Card 1: Advanced Disaster Response */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-md md:p-lg flex flex-col justify-between card-hover transition-all duration-300 shadow-sm">
            <div>
              <div className="flex justify-between items-center mb-sm">
                <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-2.5 py-1 rounded-full font-semibold">
                  Specialized
                </span>
                <span className="bg-surface-container text-primary font-label-sm text-label-sm px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[14px]!">
                    group
                  </span>{" "}
                  15 slots left
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-xs">
                Advanced Disaster Response
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-md">
                Tactical coordination and resource management in high-stress
                disaster environments.
              </p>
              <div className="space-y-1.5 mb-lg">
                <div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]! text-primary">
                    calendar_month
                  </span>{" "}
                  Oct 12 - Oct 14
                </div>
                <div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]! text-primary">
                    location_on
                  </span>{" "}
                  Regional HQ, Room B
                </div>
              </div>
            </div>
            <div>
              <div className="w-full bg-progress-ring-track h-2 rounded-full mb-3 overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: "75%" }}
                />
              </div>
              <button className="w-full h-12 bg-primary text-on-primary font-label-md text-label-md font-semibold rounded-xl hover:bg-primary-container transition-all active:scale-[0.98] shadow-sm">
                Enroll Now
              </button>
            </div>
          </div>

          {/* Card 2: Basic Life Support */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-md md:p-lg flex flex-col justify-between card-hover transition-all duration-300 shadow-sm">
            <div>
              <div className="flex justify-between items-center mb-sm">
                <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-2.5 py-1 rounded-full font-semibold">
                  Core Requirement
                </span>
                <span className="bg-compliance-green/15 text-compliance-green font-label-sm text-label-sm px-2.5 py-1 rounded-full flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-[14px]! filled-icon">
                    check_circle
                  </span>{" "}
                  Enrolled
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-xs">
                Basic Life Support
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-md">
                Essential CPR, AED usage, and initial emergency medical response
                techniques.
              </p>
              <div className="space-y-1.5 mb-lg">
                <div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]! text-primary">
                    calendar_month
                  </span>{" "}
                  Sep 28 (Upcoming)
                </div>
                <div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]! text-primary">
                    location_on
                  </span>{" "}
                  Online Portal
                </div>
              </div>
            </div>
            <div>
              <div className="w-full bg-progress-ring-track h-2 rounded-full mb-3 overflow-hidden">
                <div
                  className="bg-compliance-green h-full rounded-full"
                  style={{ width: "100%" }}
                />
              </div>
              <button className="w-full h-12 bg-surface-container-high text-primary font-label-md text-label-md font-semibold rounded-xl border border-outline-variant/60 hover:bg-surface-variant transition-all active:scale-[0.98]">
                View Details
              </button>
            </div>
          </div>

          {/* Card 3: Logistics Management */}
          <div className="bg-surface-container-low/70 rounded-2xl border border-outline-variant p-md md:p-lg flex flex-col justify-between opacity-90 shadow-sm">
            <div>
              <div className="flex justify-between items-center mb-sm">
                <span className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm px-2.5 py-1 rounded-full font-semibold">
                  Leadership
                </span>
                <span className="bg-error-container text-error font-label-sm text-label-sm px-2.5 py-1 rounded-full flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-[14px]!">
                    block
                  </span>{" "}
                  Full
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-xs">
                Logistics Management
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-md">
                Supply chain optimization and deployment strategies for large-scale
                disaster operations.
              </p>
              <div className="space-y-1.5 mb-lg">
                <div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]! text-outline">
                    calendar_month
                  </span>{" "}
                  Nov 05 - Nov 07
                </div>
                <div className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]! text-outline">
                    location_on
                  </span>{" "}
                  Main Campus
                </div>
              </div>
            </div>
            <div>
              <div className="w-full bg-progress-ring-track h-2 rounded-full mb-3 overflow-hidden">
                <div
                  className="bg-outline h-full rounded-full"
                  style={{ width: "100%" }}
                />
              </div>
              <button className="w-full h-12 bg-surface-container-high text-on-surface-variant font-label-md text-label-md font-semibold rounded-xl cursor-not-allowed opacity-70">
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
