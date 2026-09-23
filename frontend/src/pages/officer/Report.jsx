import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function Report() {
    const { user } = useAuth();
    
    // Data from Backend
    const [events, setEvents] = useState([]);
    const [officers, setOfficers] = useState([]);

    // Basic Form State
    const [selectedEventId, setSelectedEventId] = useState("");
    const [formData, setFormData] = useState({
        club_name: "DRRT",
        officer: user?.name || "",
        pos: "Officer",
        option_date: "",
        now_date: new Date().toISOString().split('T')[0], // Defaults to today
        end_time: "",
        text_recomm: "",
        officer_name1: "", officer_pos1: "President",
        officer_name2: "", officer_pos2: "Vice-President",
        officer_name3: "", officer_pos3: "Secretary",
        adviser_name: "Ms. Kethleen Onato"
    });

    // Dynamic Arrays for Tables & Lists
    const [objectives, setObjectives] = useState([{ obj_sent: "" }]);
    const [activities, setActivities] = useState([{ text_act: "", text_desc: "", text_outc: "" }]);
    const [issues, setIssues] = useState([{ text_issue: "", text_sol: "" }]);

    // 9 Image Slots
    const [images, setImages] = useState(Array(9).fill(null));

    useEffect(() => {
        // Fetch Events
        api.get("/events").then(res => setEvents(res.data.reverse())).catch(console.error);
        // Fetch Officers for the dropdowns
        api.get("/officers").then(res => setOfficers(res.data)).catch(console.error);
    }, []);

    const handleBasicChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (index, e) => {
        const newImages = [...images];
        newImages[index] = e.target.files[0] || null;
        setImages(newImages);
    };

    // Not wired up yet: the .docx template the backend export needs was never
    // committed, so generation is disabled. The form still collects everything
    // the report will need once that lands.
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Report generation isn't available yet. The activity report template still needs to be set up.");
    };

    return (
        <>
            <title>Report - DRRT</title>
            <Header />

            <main className="max-w-4xl mx-auto w-full px-4 py-6 pb-28 md:pb-12 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-geist text-2xl md:text-3xl font-bold text-text">Activity Report Builder</h1>
                        <p className="text-subtext text-sm">Automatically fetches event data and formats your official Word Document.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* SECTION 1: EVENT SELECTION & BASIC DETAILS */}
                    <section className="bg-white border border-blue-border rounded-xl p-6 shadow-sm space-y-4">
                        <h2 className="font-geist text-lg font-bold text-blue border-b border-blue-border/40 pb-2">1. Core Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-geist text-sm font-bold text-text mb-1">Select Event *</label>
                                <select required value={selectedEventId} onChange={(e) => setSelectedEventId(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-blue-border bg-surface text-sm">
                                    <option value="" disabled>-- Choose an Event --</option>
                                    {events.map(ev => (
                                        <option key={ev.id} value={ev.id}>{ev.title} ({ev.date})</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block font-geist text-sm font-bold text-text mb-1">End Time</label>
                                <input type="time" name="end_time" value={formData.end_time} onChange={handleBasicChange} className="w-full px-4 py-2 rounded-xl border border-blue-border bg-surface text-sm" />
                            </div>
                            <div>
                                <label className="block font-geist text-sm font-bold text-text mb-1">Report Period Date</label>
                                <input type="date" name="option_date" value={formData.option_date} onChange={handleBasicChange} className="w-full px-4 py-2 rounded-xl border border-blue-border bg-surface text-sm" />
                            </div>
                            <div>
                                <label className="block font-geist text-sm font-bold text-text mb-1">Date Prepared</label>
                                <input type="date" name="now_date" value={formData.now_date} onChange={handleBasicChange} className="w-full px-4 py-2 rounded-xl border border-blue-border bg-surface text-sm" />
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: DYNAMIC LISTS (OBJECTIVES) */}
                    <section className="bg-white border border-blue-border rounded-xl p-6 shadow-sm space-y-4">
                        <h2 className="font-geist text-lg font-bold text-blue border-b border-blue-border/40 pb-2">2. Objectives</h2>
                        {objectives.map((obj, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <span className="font-bold text-subtext">{index + 1}.</span>
                                <input type="text" value={obj.obj_sent} onChange={(e) => {
                                    const newObjs = [...objectives];
                                    newObjs[index].obj_sent = e.target.value;
                                    setObjectives(newObjs);
                                }} placeholder="Enter objective..." className="flex-1 px-4 py-2 rounded-xl border border-blue-border text-sm" />
                                <button type="button" onClick={() => setObjectives(objectives.filter((_, i) => i !== index))} className="text-red hover:bg-red-bg p-2 rounded-lg material-symbols-outlined">delete</button>
                            </div>
                        ))}
                        <button type="button" onClick={() => setObjectives([...objectives, { obj_sent: "" }])} className="text-sm font-bold text-blue bg-blue-bg px-4 py-2 rounded-lg">+ Add Objective</button>
                    </section>

                    {/* SECTION 3: DYNAMIC TABLES (ACTIVITIES & ISSUES) */}
                    <section className="bg-white border border-blue-border rounded-xl p-6 shadow-sm space-y-6">
                        <h2 className="font-geist text-lg font-bold text-blue border-b border-blue-border/40 pb-2">3. Activities & Issues</h2>
                        
                        {/* Activities Table */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-text text-sm">Activities Conducted</h3>
                            {activities.map((act, index) => (
                                <div key={index} className="flex flex-col md:flex-row gap-2 bg-surface-container-low p-3 rounded-lg border border-blue-border/40">
                                    <input type="text" placeholder="Activity" value={act.text_act} onChange={(e) => { const newActs = [...activities]; newActs[index].text_act = e.target.value; setActivities(newActs); }} className="flex-1 px-3 py-1.5 border border-blue-border rounded-lg text-sm" />
                                    <input type="text" placeholder="Description" value={act.text_desc} onChange={(e) => { const newActs = [...activities]; newActs[index].text_desc = e.target.value; setActivities(newActs); }} className="flex-1 px-3 py-1.5 border border-blue-border rounded-lg text-sm" />
                                    <input type="text" placeholder="Outcome" value={act.text_outc} onChange={(e) => { const newActs = [...activities]; newActs[index].text_outc = e.target.value; setActivities(newActs); }} className="flex-1 px-3 py-1.5 border border-blue-border rounded-lg text-sm" />
                                    <button type="button" onClick={() => setActivities(activities.filter((_, i) => i !== index))} className="text-red material-symbols-outlined">close</button>
                                </div>
                            ))}
                            <button type="button" onClick={() => setActivities([...activities, { text_act: "", text_desc: "", text_outc: "" }])} className="text-sm font-bold text-blue">+ Add Activity Row</button>
                        </div>

                        {/* Issues Table */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-text text-sm">Issues and Solutions</h3>
                            {issues.map((issue, index) => (
                                <div key={index} className="flex flex-col md:flex-row gap-2 bg-surface-container-low p-3 rounded-lg border border-blue-border/40">
                                    <input type="text" placeholder="Issue/Challenge" value={issue.text_issue} onChange={(e) => { const newIss = [...issues]; newIss[index].text_issue = e.target.value; setIssues(newIss); }} className="flex-1 px-3 py-1.5 border border-blue-border rounded-lg text-sm" />
                                    <input type="text" placeholder="Solution Implemented" value={issue.text_sol} onChange={(e) => { const newIss = [...issues]; newIss[index].text_sol = e.target.value; setIssues(newIss); }} className="flex-1 px-3 py-1.5 border border-blue-border rounded-lg text-sm" />
                                    <button type="button" onClick={() => setIssues(issues.filter((_, i) => i !== index))} className="text-red material-symbols-outlined">close</button>
                                </div>
                            ))}
                            <button type="button" onClick={() => setIssues([...issues, { text_issue: "", text_sol: "" }])} className="text-sm font-bold text-blue">+ Add Issue Row</button>
                        </div>
                    </section>

                    {/* SECTION 4: THE 9 PICTURES */}
                    <section className="bg-white border border-blue-border rounded-xl p-6 shadow-sm space-y-4">
                        <h2 className="font-geist text-lg font-bold text-blue border-b border-blue-border/40 pb-2">4. Picture Documentation (Max 9)</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {images.map((img, index) => (
                                <div key={index} className="border border-dashed border-blue-border p-2 rounded-xl text-center bg-surface-container-low flex flex-col items-center justify-center">
                                    <label className="cursor-pointer text-xs text-blue font-bold flex flex-col items-center gap-1">
                                        <span className="material-symbols-outlined text-[24px]">add_photo_alternate</span>
                                        Image {index + 1}
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(index, e)} />
                                    </label>
                                    {img && <span className="text-[10px] text-green truncate w-full mt-1">{img.name}</span>}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* SECTION 5: RECOMMENDATIONS & SIGNATORIES */}
                    <section className="bg-white border border-blue-border rounded-xl p-6 shadow-sm space-y-4">
                        <h2 className="font-geist text-lg font-bold text-blue border-b border-blue-border/40 pb-2">5. Recommendations & Signatories</h2>
                        
                        <div>
                            <label className="block font-geist text-sm font-bold text-text mb-1">Recommendation / Comments</label>
                            <textarea name="text_recomm" value={formData.text_recomm} onChange={handleBasicChange} rows="3" className="w-full px-4 py-2 rounded-xl border border-blue-border bg-surface text-sm"></textarea>
                        </div>

                        {/* Signatory 1 */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-text mb-1">Officer 1</label>
                                <select name="officer_name1" value={formData.officer_name1} onChange={handleBasicChange} className="w-full p-2 border rounded-lg text-sm">
                                    <option value="">-- Select Officer --</option>
                                    {officers.map(off => <option key={off.id} value={off.name}>{off.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-text mb-1">Position</label>
                                <select name="officer_pos1" value={formData.officer_pos1} onChange={handleBasicChange} className="w-full p-2 border rounded-lg text-sm">
                                    <option value="President">President</option>
                                    <option value="Vice-President">Vice-President</option>
                                    <option value="Secretary">Secretary</option>
                                </select>
                            </div>
                        </div>

                        {/* Signatory 2 */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-text mb-1">Officer 2</label>
                                <select name="officer_name2" value={formData.officer_name2} onChange={handleBasicChange} className="w-full p-2 border rounded-lg text-sm">
                                    <option value="">-- Select Officer --</option>
                                    {officers.map(off => <option key={off.id} value={off.name}>{off.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-text mb-1">Position</label>
                                <select name="officer_pos2" value={formData.officer_pos2} onChange={handleBasicChange} className="w-full p-2 border rounded-lg text-sm">
                                    <option value="Vice-President">Vice-President</option>
                                    <option value="President">President</option>
                                    <option value="Secretary">Secretary</option>
                                </select>
                            </div>
                        </div>

                        {/* Signatory 3 */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-text mb-1">Officer 3</label>
                                <select name="officer_name3" value={formData.officer_name3} onChange={handleBasicChange} className="w-full p-2 border rounded-lg text-sm">
                                    <option value="">-- Select Officer --</option>
                                    {officers.map(off => <option key={off.id} value={off.name}>{off.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-text mb-1">Position</label>
                                <select name="officer_pos3" value={formData.officer_pos3} onChange={handleBasicChange} className="w-full p-2 border rounded-lg text-sm">
                                    <option value="Secretary">Secretary</option>
                                    <option value="President">President</option>
                                    <option value="Vice-President">Vice-President</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block font-geist text-sm font-bold text-text mb-1">Adviser Name</label>
                            <input type="text" name="adviser_name" value={formData.adviser_name} onChange={handleBasicChange} className="w-full px-4 py-2 rounded-xl border border-blue-border bg-surface text-sm" />
                        </div>
                    </section>

                    <button type="submit" className="w-full py-4 bg-blue text-white rounded-xl font-bold font-geist shadow-md hover:bg-blue/90 disabled:opacity-50 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">description</span>
                        Generate Activity Report (.docx)
                    </button>
                </form>
            </main>
            <BottomNav />
        </>
    );
}