import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import WIP from "../../components/WIP";

export default function Training() {
  return (
    <>
      <title>Training &amp; Event Management - DRRT Officer Portal</title>

      <Header />
      <WIP />

      {/* Main Content Canvas */}
      <main className="grow px-4 md:px-8 py-6 max-w-7xl mx-auto w-full flex flex-col gap-6 pb-24 md:pb-12">
        {/* Page Header & Action */}
        <section className="bg-white border border-blue-border p-4 md:p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <p className="font-geist text-xs text-blue uppercase tracking-wider font-bold">
              DRRT Officer Development
            </p>
            <h2 className="font-geist text-2xl md:text-3xl font-bold text-text mt-1">
              Training &amp; Event Management
            </h2>
            <p className="text-xs md:text-sm text-subtext mt-1">
              Manage, schedule, and track operational readiness programs.
            </p>
          </div>
          <button className="bg-blue text-white px-4 py-2.5 rounded-lg font-geist text-sm font-semibold flex items-center justify-center shadow-sm hover:bg-blue/90 transition-colors gap-2 w-full md:w-auto cursor-pointer">
            <span className="material-symbols-outlined text-[18px]!">add</span>{" "}
            Schedule New Training
          </button>
        </section>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto no-scrollbar border-b border-blue-border">
          <button className="px-5 py-3 font-geist text-sm text-blue font-bold border-b-2 border-blue whitespace-nowrap cursor-pointer">
            Upcoming Trainings
          </button>
          <button className="px-5 py-3 font-geist text-sm text-subtext hover:text-blue transition-colors whitespace-nowrap cursor-pointer">
            Completed
          </button>
          <button className="px-5 py-3 font-geist text-sm text-subtext hover:text-blue transition-colors whitespace-nowrap cursor-pointer">
            Drafts &amp; Templates
          </button>
        </div>

        {/* Search & Filters Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-subtext text-[20px]!">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-white border border-blue-border rounded-lg focus:outline-none focus:border-blue focus:ring-1 focus:ring-blue font-geist text-sm text-text transition-colors shadow-sm"
              placeholder="Search trainings by title, instructor, or location..."
              type="text"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-blue-border rounded-lg text-subtext hover:bg-surface-container-low transition-colors font-geist text-sm shadow-sm cursor-pointer">
            <span className="material-symbols-outlined text-[18px]!">
              filter_list
            </span>
            Filters
          </button>
        </div>

        {/* Training Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-blue-border rounded-xl overflow-hidden shadow-sm hover:border-blue transition-colors flex flex-col">
            <div className="h-28 w-full bg-surface-container-high relative">
              <div
                className="w-full h-full bg-cover bg-center opacity-90"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBl38Qa11jXnXF0P0uBhOvW3R6UR6w9W4qO9zY9K9a-L2tmTd1u9NtJ9OcdHvEOb_KlbLDtD4UUqtPU5g9B0lvLkZo-1QFITXJTPCFhEIFRpdRQPHvlZMPbPrV5RTDcsQOdnAoI-lim2oJ3oyUP358FzsvYvH0QfWpZyiK99DosNbi0EbDAXt27ra6LjpXTTSZZ9lWzenhArS6leMVurZYEoSq3SMD_QWkXR4qzwnpwMD3tCvN2xogMfA")',
                }}
              />
              <div className="absolute top-3 right-3 bg-blue-bg text-blue border border-blue-border/60 px-2.5 py-1 rounded-full font-geist text-xs uppercase tracking-wider font-bold flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined text-[14px]!">
                  event_available
                </span>{" "}
                Open
              </div>
            </div>
            <div className="p-4 md:p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-geist text-lg font-bold text-text line-clamp-2">
                  Basic Fire Fighting &amp; Evacuation Drill
                </h3>
                <p className="font-geist text-xs md:text-sm text-subtext mt-1 line-clamp-2">
                  Mandatory annual compliance and emergency evacuation drill for Sector A personnel.
                </p>
              </div>
              <div className="space-y-2 font-geist text-xs md:text-sm text-subtext pt-3 border-t border-blue-border">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]! text-blue">
                    calendar_month
                  </span>
                  <span>Oct 24, 2026 • 09:00 AM - 12:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]! text-blue">
                    location_on
                  </span>
                  <span>North Wing Plaza, Main Campus</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]! text-blue">
                    person
                  </span>
                  <span>Instructor: Cpt. Reynolds</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-geist text-xs mb-1.5">
                  <span className="text-subtext font-medium">Capacity</span>
                  <span className="text-blue font-bold">38 / 50 Enrolled</span>
                </div>
                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue rounded-full"
                    style={{ width: "76%" }}
                  />
                </div>
              </div>
            </div>
            <div className="px-4 md:p-5 py-3 border-t border-blue-border bg-surface-container-low flex justify-end gap-2">
              <button className="px-3 py-1.5 font-geist text-xs text-subtext hover:text-text border border-blue-border rounded-lg bg-white hover:bg-surface-container transition-colors font-semibold cursor-pointer">
                Edit Details
              </button>
              <button className="px-3 py-1.5 font-geist text-xs bg-blue text-white rounded-lg hover:bg-blue/90 transition-colors font-semibold shadow-sm cursor-pointer">
                View Roster
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-blue-border rounded-xl overflow-hidden shadow-sm hover:border-yellow transition-colors flex flex-col">
            <div className="h-28 w-full bg-surface-container-high relative">
              <div
                className="w-full h-full bg-cover bg-center opacity-90"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBV7g4qgIBwEZJVdNmMvlH9crWD4TOzQe8OFn-kfi7d6UAoJd9UepGa-07RkaOd1lAafpKDNW7yl6d9WOg335wA2aiy8FvsnBRcrxoTumNjUYe3AOphxIXAk_9FV7ZBB-c9VqbCUBw7IKho1WyJlK5kPt70-mvNzwHmrmjHb92z01xmANvF0DzVe8Mhdm6CH-SQdubOvUHR0-8Z5CEl2lbgHyqJF2i8KsmLcU0AotshaHWknZdEiUvTeA")',
                }}
              />
              <div className="absolute top-3 right-3 bg-yellow-bg text-yellow border border-yellow-border px-2.5 py-1 rounded-full font-geist text-xs uppercase tracking-wider font-bold flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined text-[14px]!">
                  warning
                </span>{" "}
                Almost Full
              </div>
            </div>
            <div className="p-4 md:p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-geist text-lg font-bold text-text line-clamp-2">
                  Advanced Crisis Negotiation Tactics
                </h3>
                <p className="font-geist text-xs md:text-sm text-subtext mt-1 line-clamp-2">
                  Specialized intensive seminar for Response Team Leaders and Incident Commanders.
                </p>
              </div>
              <div className="space-y-2 font-geist text-xs md:text-sm text-subtext pt-3 border-t border-blue-border">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]! text-yellow">
                    calendar_month
                  </span>
                  <span>Nov 02, 2026 • 01:00 PM - 05:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]! text-yellow">
                    videocam
                  </span>
                  <span>Virtual Briefing Room B</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]! text-yellow">
                    person
                  </span>
                  <span>Instructor: Dr. Aris Thorne</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-geist text-xs mb-1.5">
                  <span className="text-subtext font-medium">Capacity</span>
                  <span className="text-yellow font-bold">14 / 15 Enrolled</span>
                </div>
                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow rounded-full"
                    style={{ width: "93%" }}
                  />
                </div>
              </div>
            </div>
            <div className="px-4 md:p-5 py-3 border-t border-blue-border bg-surface-container-low flex justify-end gap-2">
              <button className="px-3 py-1.5 font-geist text-xs text-subtext hover:text-text border border-blue-border rounded-lg bg-white hover:bg-surface-container transition-colors font-semibold cursor-pointer">
                Edit Details
              </button>
              <button className="px-3 py-1.5 font-geist text-xs bg-blue text-white rounded-lg hover:bg-blue/90 transition-colors font-semibold shadow-sm cursor-pointer">
                View Roster
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-blue-border rounded-xl overflow-hidden shadow-sm hover:border-blue transition-colors flex flex-col">
            <div className="h-28 w-full bg-surface-container-high relative">
              <div
                className="w-full h-full bg-cover bg-center opacity-90"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAdMcwB4DkPBhOZa79f3gnBZwhfaxGZzSnRWGHJrQUTUz8XLnfYARCCdO1Z3XB3MvQZUufhgNa6mbZQfuRn0XzoxjdwWrqqabbW-LDZ9luH6Y3xPnb-caZ2sr-wRL7uRoy_HQFWgVvBXzWEDTlap147fVnx2F9Nc7WnibRhQlzYCd3rvRQrieNZ2qHacnsXszJAQ7x9DBqvqqTkQ6ZQJSyhz25GL_OWZsdc0VRTZK2pxVj_iIb5vp3OfQ")',
                }}
              />
              <div className="absolute top-3 right-3 bg-blue-bg text-blue border border-blue-border/60 px-2.5 py-1 rounded-full font-geist text-xs uppercase tracking-wider font-bold flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined text-[14px]!">
                  event_available
                </span>{" "}
                Open
              </div>
            </div>
            <div className="p-4 md:p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-geist text-lg font-bold text-text line-clamp-2">
                  Cyber-Physical Security Integration
                </h3>
                <p className="font-geist text-xs md:text-sm text-subtext mt-1 line-clamp-2">
                  Comprehensive briefing on cross-system monitoring and emergency protocol updates.
                </p>
              </div>
              <div className="space-y-2 font-geist text-xs md:text-sm text-subtext pt-3 border-t border-blue-border">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]! text-blue">
                    calendar_month
                  </span>
                  <span>Nov 15, 2026 • 10:00 AM - 11:30 AM</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]! text-blue">
                    location_on
                  </span>
                  <span>Briefing Theater 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]! text-blue">
                    person
                  </span>
                  <span>Instructor: IT Sec Ops Team</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-geist text-xs mb-1.5">
                  <span className="text-subtext font-medium">Capacity</span>
                  <span className="text-blue font-bold">12 / 100 Enrolled</span>
                </div>
                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue rounded-full"
                    style={{ width: "12%" }}
                  />
                </div>
              </div>
            </div>
            <div className="px-4 md:p-5 py-3 border-t border-blue-border bg-surface-container-low flex justify-end gap-2">
              <button className="px-3 py-1.5 font-geist text-xs text-subtext hover:text-text border border-blue-border rounded-lg bg-white hover:bg-surface-container transition-colors font-semibold cursor-pointer">
                Edit Details
              </button>
              <button className="px-3 py-1.5 font-geist text-xs bg-blue text-white rounded-lg hover:bg-blue/90 transition-colors font-semibold shadow-sm cursor-pointer">
                View Roster
              </button>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
