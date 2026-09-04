import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import WIP from "../../components/WIP";

export default function ID() {
  return (
    <>
      <title>ID - DRRT Member Portal</title>

      <Header />
      <WIP />

      {/* Main Content Canvas */}
      <main className="grow max-w-3xl w-full mx-auto px-4 md:px-8 py-6 pb-24 md:pb-12 space-y-6">
        {/* Page Title Header */}
        <div>
          <h2 className="font-geist text-3xl md:text-5xl text-text font-bold">
            Digital ID Card
          </h2>
          <p className="text-base md:text-lg text-subtext mt-1">
            Official Disaster Response Team member identification &amp; field
            verification profile.
          </p>
        </div>

        {/* Digital ID Premium Card */}
        <section className="rounded-2xl bg-linear-to-br from-[#0052cc] via-blue to-[#002d70] text-white p-4 md:p-6 relative overflow-hidden shadow-xl ring-1 ring-white/20">
          {/* Glassmorphic Glow Layer */}
          <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none mix-blend-overlay" />
          <div className="absolute -top-24 -right-24 w-56 h-56 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          {/* Card Header Bar */}
          <div className="flex justify-between items-start relative z-10 border-b border-white/15 pb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-white/80 text-3xl! filled-icon">
                shield
              </span>
              <div>
                <span className="font-geist text-lg font-bold tracking-tight text-white block">
                  LVCC DRRT
                </span>
                <span className="font-geist text-xs text-white/80 uppercase tracking-wider block">
                  Disaster Response Team
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-white/90 font-geist text-xs font-semibold">
              <span className="material-symbols-outlined text-[16px]! filled-icon">
                verified
              </span>
              <span>Verified</span>
            </div>
          </div>

          {/* Card Identity Info Section */}
          <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 relative z-10">
            <div className="relative shrink-0">
              <img
                className="w-28 h-28 md:w-32 md:h-32 rounded-xl object-cover border-2 border-white/30 shadow-lg"
                alt="Alex Rivera Portrait"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeI7ijcdBDJ3ATq5G43UQ3TzYbHBkHQLGl6X1Ym06tMEvwTVAerVsAcADgx2loEnK9Sh6O-M0qnGxy7UaARj8hMvICWwHH5UwaiJt-52V8hgsRr6GGsy0UbB7LRvFrlfZF0PQSPBMcObGeLQuXIsZGnv6N6q-JZgzWPfUYcpRTGF1dAAmj0MRe6A6TCnVYharcHf8um_HLWNy-UdTF7HHbtd9G6E_0CD98WJxFsGiWI5VnuTK6L3uwGQ"
              />
              <div
                className="absolute -bottom-2 -right-2 bg-green text-white p-1 rounded-full border-2 border-blue shadow"
                title="Active Standing"
              >
                <span className="material-symbols-outlined text-[16px]! block filled-icon">
                  check_circle
                </span>
              </div>
            </div>
            <div className="flex flex-col text-center sm:text-left gap-1 grow">
              <h3 className="font-geist text-2xl md:text-3xl font-bold text-white leading-tight">
                Alex Rivera
              </h3>
              <p className="text-sm text-white/80 font-mono font-semibold">
                ID: 2021-0984
              </p>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-left bg-black/20 p-3 rounded-lg border border-white/10">
                <div>
                  <span className="font-geist text-xs text-white/60 block uppercase">
                    Chapter
                  </span>
                  <span className="font-geist text-sm text-white font-medium">
                    LVCC Apalit
                  </span>
                </div>
                <div>
                  <span className="font-geist text-xs text-white/60 block uppercase">
                    Academic Year
                  </span>
                  <span className="font-geist text-sm text-white font-medium">
                    2026–2027
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer Bar */}
          <div className="mt-6 pt-4 border-t border-white/15 relative z-10 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 bg-green/20 border border-green/40 text-white px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
              <span className="font-geist text-xs font-bold uppercase tracking-wider">
                Active Member
              </span>
            </div>
            <span className="font-geist text-xs text-white/70 font-mono">
              Valid Thru: 12/2027
            </span>
          </div>
        </section>

        {/* Quick Action Button */}
        <div>
          <button className="w-full bg-blue text-white h-11 rounded-lg flex items-center justify-center gap-2 font-geist text-sm font-semibold shadow-sm hover:bg-blue/90 transition-all active:scale-[0.98] cursor-pointer">
            <span className="material-symbols-outlined text-[20px]!">
              account_balance_wallet
            </span>
            Save to Mobile Wallet
          </button>
        </div>

        {/* Emergency Medical Profile (Expanded & Visible at a Glance) */}
        <section className="bg-white rounded-xl border border-blue-border shadow-sm overflow-hidden p-4 md:p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-4 pb-3 border-b border-blue-border/40">
            <div className="w-10 h-10 rounded-lg bg-red-bg text-red border border-red-border flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]! filled-icon">
                medical_services
              </span>
            </div>
            <div>
              <h3 className="font-geist text-base md:text-lg font-bold text-text">
                Emergency Medical Profile
              </h3>
              <p className="text-xs md:text-sm text-subtext">
                Critical medical notes &amp; contact info for immediate field access
              </p>
            </div>
          </div>

          {/* Direct Grid Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-4 rounded-lg border border-blue-border/60">
              <span className="font-geist text-xs text-subtext font-semibold uppercase tracking-wider block mb-1">
                Blood Type
              </span>
              <span className="font-geist text-xl md:text-2xl font-bold text-red">
                O Positive (O+)
              </span>
            </div>
            <div className="bg-surface-container-low p-4 rounded-lg border border-blue-border/60">
              <span className="font-geist text-xs text-subtext font-semibold uppercase tracking-wider block mb-1">
                Known Allergies
              </span>
              <span className="font-geist text-base md:text-lg font-semibold text-text">
                Penicillin
              </span>
            </div>
          </div>

          {/* Contact Info Box */}
          <div className="space-y-2">
            <span className="font-geist text-xs text-subtext font-semibold uppercase tracking-wider block">
              Primary Emergency Contact
            </span>
            <div className="flex items-center justify-between bg-surface-container-low p-4 rounded-lg border border-blue-border/60">
              <div>
                <p className="font-geist text-base font-bold text-text">
                  Maria Rivera
                </p>
                <p className="text-xs md:text-sm text-subtext">
                  Mother • +1 (555) 019-8234
                </p>
              </div>
              <a
                href="tel:+15550198234"
                className="w-10 h-10 rounded-full bg-blue text-white flex items-center justify-center shadow hover:bg-blue/90 transition-colors active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]! filled-icon">
                  call
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </>
  );
}
