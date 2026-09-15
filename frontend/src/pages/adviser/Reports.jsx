import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import WIP from "../../components/WIP";

export default function Reports() {
  return (
    <>
      <title>Reports - DRRT Adviser Portal</title>

      <Header />
      <WIP />

      <div className="grow w-full">
        {/* Main Canvas */}
        <main className="max-w-5xl mx-auto w-full px-4 md:px-8 py-6 pb-28 md:pb-12 space-y-6">
          {/* Header */}
          <header className="border-b border-blue-border/60 pb-4">
            <h2 className="font-geist text-2xl md:text-3xl font-bold text-text">
              Executive Reports Hub
            </h2>
            <p className="text-sm md:text-base text-subtext mt-1">
              Configure and generate official governance documentation.
            </p>
          </header>

          {/* Report Configuration Panel */}
          <section className="bg-white border border-blue-border/80 rounded-2xl p-4 md:p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-executive-gold" />
            <h3 className="font-geist text-lg md:text-xl font-bold text-text mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]! text-executive-gold">
                tune
              </span>
              <span>Report Configuration</span>
            </h3>
            <div className="space-y-6">
              {/* Step 1: Report Type */}
              <div>
                <label
                  className="block font-geist text-sm font-semibold text-text mb-2"
                  htmlFor="report-type"
                >
                  1. Select Report Type
                </label>
                <div className="relative">
                  <select
                    className="w-full bg-surface border border-blue-border rounded-xl px-4 py-3 text-base text-text focus:outline-none focus:border-executive-gold focus:ring-2 focus:ring-executive-gold/30 transition-colors appearance-none pr-10 cursor-pointer"
                    id="report-type"
                  >
                    <option>Semester Compliance Audit</option>
                    <option>Safety Activity Log (Executive)</option>
                    <option>Incident Resolution Summary</option>
                    <option>Governance Override Record</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-3.5 text-subtext pointer-events-none text-[20px]!">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Step 2: Date Range */}
              <div>
                <label className="block font-geist text-sm font-semibold text-text mb-2">
                  2. Define Date Range
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="block font-geist text-xs text-subtext mb-1">
                      Start Date
                    </span>
                    <input
                      className="w-full bg-surface border border-blue-border rounded-xl px-4 py-2.5 text-base text-text focus:outline-none focus:border-executive-gold focus:ring-2 focus:ring-executive-gold/30 transition-colors"
                      type="date"
                      defaultValue="2023-09-01"
                    />
                  </div>
                  <div>
                    <span className="block font-geist text-xs text-subtext mb-1">
                      End Date
                    </span>
                    <input
                      className="w-full bg-surface border border-blue-border rounded-xl px-4 py-2.5 text-base text-text focus:outline-none focus:border-executive-gold focus:ring-2 focus:ring-executive-gold/30 transition-colors"
                      type="date"
                      defaultValue="2023-12-15"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Format */}
              <div>
                <label className="block font-geist text-sm font-semibold text-text mb-3">
                  3. Output Format
                </label>
                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      defaultChecked
                      className="w-4 h-4 text-executive-gold focus:ring-executive-gold border-blue-border"
                      name="format"
                      type="radio"
                    />
                    <span className="text-sm font-medium text-text">
                      PDF (Official)
                    </span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      className="w-4 h-4 text-executive-gold focus:ring-executive-gold border-blue-border"
                      name="format"
                      type="radio"
                    />
                    <span className="text-sm font-medium text-text">
                      CSV (Data Only)
                    </span>
                  </label>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-blue-border/40 mt-6">
                <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-executive-gold text-slate-950 font-geist text-sm font-bold hover:bg-executive-gold-dark transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 cursor-pointer">
                  <span className="material-symbols-outlined text-[20px]!">
                    visibility
                  </span>
                  <span>Generate Report Preview</span>
                </button>
              </div>
            </div>
          </section>

          {/* Document Preview Section */}
          <section className="bg-white border border-blue-border/80 rounded-2xl p-4 md:p-6 shadow-sm relative overflow-hidden">
            {/* Top Indicator Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-executive-gold" />
            {/* Document Frame */}
            <div className="relative z-10 bg-white border border-blue-border/40 rounded-xl p-4 md:p-6 shadow-inner">
              {/* Document Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-blue-border/60 pb-6 mb-6 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-executive-gold-light flex items-center justify-center border border-executive-gold/40 shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-executive-gold text-[30px]!">
                      shield
                    </span>
                  </div>
                  <div>
                    <h3 className="font-geist text-lg md:text-xl font-bold text-text uppercase tracking-tight">
                      LVCC / DRRT Official Report
                    </h3>
                    <p className="text-xs md:text-sm text-subtext font-medium">
                      Semester Compliance Audit (Q3-Q4)
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="inline-flex items-center gap-1 bg-executive-gold-light px-2.5 py-1 rounded-full border border-executive-gold/40 mb-1.5">
                    <span className="material-symbols-outlined text-[14px]! text-executive-gold">
                      verified
                    </span>
                    <span className="font-geist text-xs text-on-primary-container font-bold">
                      Verified System Gen
                    </span>
                  </div>
                  <p className="font-geist text-xs text-subtext">
                    Date: 2023-12-16
                  </p>
                  <p className="font-geist text-xs text-subtext font-mono">
                    Ref: DRRT-ADV-8842
                  </p>
                </div>
              </div>

              {/* Compliance Summary Table */}
              <div className="mb-8">
                <h4 className="font-geist text-base md:text-lg font-bold text-text mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-executive-gold text-[20px]!">
                    table_chart
                  </span>
                  <span>Compliance Summary Metrics</span>
                </h4>
                <div className="overflow-x-auto rounded-xl border border-blue-border/60">
                  <table className="w-full text-left border-collapse min-w-137.5">
                    <thead>
                      <tr className="bg-surface-container-low border-b border-blue-border/60 font-geist text-xs text-subtext uppercase tracking-wider">
                        <th className="p-3.5 font-semibold">Department</th>
                        <th className="p-3.5 font-semibold">Total Audits</th>
                        <th className="p-3.5 font-semibold">Pass Rate</th>
                        <th className="p-3.5 font-semibold">Critical Flags</th>
                        <th className="p-3.5 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-text divide-y divide-blue-border/30">
                      <tr className="hover:bg-surface-container-low/40 transition-colors">
                        <td className="p-3.5 font-semibold">Residence Life</td>
                        <td className="p-3.5">142</td>
                        <td className="p-3.5 font-bold text-text">98.5%</td>
                        <td className="p-3.5 text-subtext">0</td>
                        <td className="p-3.5">
                          <span className="inline-block bg-executive-gold-light text-on-primary-container font-geist text-xs px-2.5 py-0.5 rounded-full font-bold">
                            Compliant
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-surface-container-low/40 transition-colors">
                        <td className="p-3.5 font-semibold">Dining Services</td>
                        <td className="p-3.5">85</td>
                        <td className="p-3.5 font-bold text-text">94.2%</td>
                        <td className="p-3.5 text-red font-bold">2</td>
                        <td className="p-3.5">
                          <span className="inline-block bg-red-bg text-red font-geist text-xs px-2.5 py-0.5 rounded-full font-bold border border-red-border">
                            Review Req.
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-surface-container-low/40 transition-colors">
                        <td className="p-3.5 font-semibold">Facilities Mgmt</td>
                        <td className="p-3.5">210</td>
                        <td className="p-3.5 font-bold text-text">99.1%</td>
                        <td className="p-3.5 text-subtext">0</td>
                        <td className="p-3.5">
                          <span className="inline-block bg-executive-gold-light text-on-primary-container font-geist text-xs px-2.5 py-0.5 rounded-full font-bold">
                            Compliant
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Activity Distribution Chart */}
              <div className="mb-8">
                <h4 className="font-geist text-base md:text-lg font-bold text-text mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-executive-gold text-[20px]!">
                    bar_chart
                  </span>
                  <span>Activity Distribution</span>
                </h4>
                <div className="h-48 border border-blue-border/60 bg-white rounded-xl p-4 flex items-end gap-4 relative">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-20">
                    <div className="border-t border-blue-border w-full" />
                    <div className="border-t border-blue-border w-full" />
                    <div className="border-t border-blue-border w-full" />
                    <div className="border-t border-blue-border w-full" />
                  </div>
                  {/* Bars */}
                  <div className="flex-1 bg-executive-gold rounded-t-lg h-[80%] transition-all hover:bg-executive-gold-dark group relative">
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 font-geist bg-text text-white px-2 py-0.5 rounded shadow text-xs font-bold">
                      80%
                    </div>
                  </div>
                  <div className="flex-1 bg-executive-gold/80 rounded-t-lg h-[60%] transition-all hover:bg-executive-gold group relative" />
                  <div className="flex-1 bg-executive-gold/60 rounded-t-lg h-[45%] transition-all hover:bg-executive-gold group relative" />
                  <div className="flex-1 bg-subtext/60 rounded-t-lg h-[20%] transition-all hover:bg-subtext group relative" />
                  {/* Axis Labels */}
                  <div className="absolute bottom-0 left-0 w-full flex justify-around translate-y-full pt-2 font-geist text-xs text-subtext font-bold">
                    <span>Q1</span>
                    <span>Q2</span>
                    <span>Q3</span>
                    <span>Q4</span>
                  </div>
                </div>
                <div className="h-6" />
              </div>

              {/* Signatures Block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10 pt-6 border-t border-blue-border/60">
                <div>
                  <div className="h-12 border-b-2 border-text mb-2 flex items-end pb-1">
                    <span className="font-geist text-lg italic text-executive-gold font-bold">
                      System Authenticated
                    </span>
                  </div>
                  <p className="font-geist text-sm text-text font-bold">
                    DRRT Executive Adviser
                  </p>
                  <p className="text-xs text-subtext">
                    Authorization Validated
                  </p>
                </div>
                <div>
                  <div className="h-12 border-b-2 border-blue-border/60 mb-2 flex items-end justify-center pb-1">
                    <span className="font-geist text-xs text-subtext font-semibold">
                      Awaiting Signature
                    </span>
                  </div>
                  <p className="font-geist text-sm text-text font-bold">
                    Director, Student Affairs
                  </p>
                  <p className="text-xs text-subtext">
                    LVCC Governance Board
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-blue-border/60 flex flex-col sm:flex-row gap-3 justify-end">
              <button className="px-5 py-2.5 rounded-xl border-2 border-executive-gold text-text hover:bg-executive-gold/10 font-geist text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer">
                <span className="material-symbols-outlined text-[18px]!">send</span>
                <span>Email to SOO</span>
              </button>
              <button className="px-5 py-2.5 rounded-xl bg-executive-gold text-slate-950 hover:bg-executive-gold-dark font-geist text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95 cursor-pointer">
                <span className="material-symbols-outlined text-[18px]!">
                  download
                </span>
                <span>Download Official PDF</span>
              </button>
            </div>
          </section>
        </main>
      </div>

      <BottomNav />
    </>
  );
}