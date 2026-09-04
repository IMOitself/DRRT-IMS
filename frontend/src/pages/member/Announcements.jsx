import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import WIP from "../../components/WIP";

export default function Announcements() {
  return (
    <>
      <title>Announcements - DRRT Member Portal</title>

      <Header />
      <WIP />

      {/* Main Content Canvas */}
      <main className="grow pb-24 md:pb-12">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 space-y-6">
          {/* Screen Title */}
          <div>
            <h1 className="font-geist text-3xl md:text-5xl text-text font-bold">
              Announcements
            </h1>
            <p className="text-base md:text-lg text-subtext mt-1">
              Official directives and operational updates.
            </p>
          </div>

          {/* Feed Container */}
          <div className="space-y-4">
            {/* Urgent Alert Card */}
            <article className="bg-white rounded-xl border border-red-border shadow-sm p-4 md:p-6 relative overflow-hidden card-hover hover:border-red cursor-pointer">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red" />
              <header className="flex justify-between items-start mb-3 pl-2">
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover border border-blue-border"
                    alt="Officer Santos Avatar"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuApE81KhZNqldRRwuyyRXle_karzBuIUDp0D5xvOoCXaE9ZlS9Wy8wVJFXCrBz3FqP-clWe7h_aKsYmq26MBrDq2ONrQouNu84ZVOlPxX2yemiT5zGxYtXXSbW5hBCA3JXLP2X114zuKdKl9swpf7exkjmH-rMPIT4pArVXkqJgNmlqU1ECbKL6WtEaKZmVhVHjmb0NGBRe5gr3ULmTulpu5sHXfmaL1DDFO9dhgJCCDmI0fMIRjLQY7g"
                  />
                  <div>
                    <h3 className="font-geist text-sm font-bold text-text">
                      Officer Santos
                    </h3>
                    <p className="text-xs text-subtext">
                      Command Staff • 10m ago
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red text-white font-geist text-xs uppercase tracking-wider font-bold shadow-sm">
                  <span className="material-symbols-outlined text-[14px]! filled-icon">
                    error
                  </span>
                  Urgent
                </span>
              </header>
              <div className="pl-2 space-y-2">
                <h4 className="font-geist text-lg md:text-xl font-bold text-text">
                  Emergency Drill Rescheduled
                </h4>
                <p className="text-sm md:text-base text-subtext leading-relaxed">
                  Due to unexpected weather systems moving through Sector 4,
                  tomorrow's full-scale evacuation drill is postponed to 0800hrs
                  Thursday. Ensure all go-bags are repacked accordingly.
                </p>
              </div>
            </article>

            {/* Standard Update Card 1 */}
            <article className="bg-white rounded-xl border border-blue-border shadow-sm p-4 md:p-6 card-hover hover:border-blue cursor-pointer">
              <header className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue/10 border border-blue-border flex items-center justify-center text-blue">
                    <span className="material-symbols-outlined text-[24px]!">campaign</span>
                  </div>
                  <div>
                    <h3 className="font-geist text-sm font-bold text-text">
                      HR Department
                    </h3>
                    <p className="text-xs text-subtext">
                      Logistics • 2h ago
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-subtext font-geist text-xs uppercase tracking-wider font-bold">
                  Notice
                </span>
              </header>
              <div className="space-y-2">
                <h4 className="font-geist text-lg md:text-xl font-bold text-text">
                  New Uniform Issue Protocol
                </h4>
                <p className="text-sm md:text-base text-subtext leading-relaxed">
                  Starting next Monday, all requests for Class B uniform
                  replacements must be submitted via the new digital requisition
                  portal. Paper forms will no longer be accepted at the
                  quartermaster desk.
                </p>
              </div>
            </article>

            {/* Standard Update Card 2 */}
            <article className="bg-white rounded-xl border border-blue-border shadow-sm p-4 md:p-6 card-hover hover:border-yellow cursor-pointer">
              <header className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover border border-blue-border"
                    alt="Dr. Chen Avatar"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM110tmZmlWYn25ouGPu4YN1DlFKmsas04jupME7EyjLjeGAIi9NRr9LYHORkv7z5X-KqQSD4hcdXhz4KHGOx1KlbP8gKA2jroUslj5DzLrz595wqPR6FcZRvAxChX5o3qxNHJB2Mcspy1kKM4Y8QL1QEsftp6Uh8Q0cyMdXGvPpuxQurIn4NNZP69NWGdlmscSnupEPbvfyaVDn9DYWqmkLatPJjt8i-YACa-8BALx8HBvINNY5iRSA"
                  />
                  <div>
                    <h3 className="font-geist text-sm font-bold text-text">
                      Dr. Chen
                    </h3>
                    <p className="text-xs text-subtext">
                      Medical Bay • Yesterday
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-bg text-yellow border border-yellow-border font-geist text-xs uppercase tracking-wider font-bold">
                  <span className="material-symbols-outlined text-[14px]!">
                    warning
                  </span>
                  Advisory
                </span>
              </header>
              <div className="space-y-2">
                <h4 className="font-geist text-lg md:text-xl font-bold text-text">
                  Seasonal Flu Shots Required
                </h4>
                <p className="text-sm md:text-base text-subtext leading-relaxed">
                  All active field agents are required to receive their seasonal
                  booster by end of month to maintain compliance status. Walk-ins
                  are accepted at MedBay 2 between 0900 and 1600 daily.
                </p>
              </div>
            </article>
          </div>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
