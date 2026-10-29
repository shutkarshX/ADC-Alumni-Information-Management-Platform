import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Activity, ArrowDownRight, ArrowUpRight, BriefcaseBusiness, GraduationCap, MapPin, Plus, Search, Users, X, Pencil, RefreshCw } from "lucide-react";
import "./styles.css";

const blank = { full_name: "", email: "", graduation_year: "", branch: "", degree: "", company: "", job_title: "", location: "" };
const fields = [
  ["full_name", "Full name", true],
  ["email", "Email address", true],
  ["graduation_year", "Graduation year", false],
  ["branch", "Branch / specialization", false],
  ["degree", "Degree", false],
  ["company", "Company", false],
  ["job_title", "Job title", false],
  ["location", "Location", false],
];

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || "Something went wrong. Please try again.");
  return body;
}

function App() {
  const [alumni, setAlumni] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [dialog, setDialog] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [saving, setSaving] = useState(false);

  async function load(search = query) {
    setLoading(true);
    setError("");
    try {
      const rows = await api("/api/alumni" + (search.trim() ? "?q=" + encodeURIComponent(search.trim()) : ""));
      setAlumni(rows);
    } catch (e) {
      setError(e.message + " Make sure the Flask API is running on port 5000.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(""); }, []);

  const stats = useMemo(() => ({
    total: alumni.length,
    years: new Set(alumni.map((a) => a.graduation_year).filter(Boolean)).size,
    companies: new Set(alumni.map((a) => a.company.trim()).filter(Boolean)).size,
  }), [alumni]);

  function openCreate() {
    setEditing(null); setForm(blank); setError(""); setNotice(""); setDialog(true);
  }
  function openEdit(person) {
    setEditing(person.id);
    setForm(Object.fromEntries(Object.keys(blank).map((key) => [key, person[key] ?? ""])));
    setError(""); setNotice(""); setDialog(true);
  }
  function closeDialog() { setDialog(false); setEditing(null); setForm(blank); }

  async function save(event) {
    event.preventDefault();
    setSaving(true); setError(""); setNotice("");
    try {
      const payload = { ...form, graduation_year: form.graduation_year || null };
      await api(editing ? `/api/alumni/${editing}` : "/api/alumni", {
        method: editing ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });
      closeDialog();
      setNotice(editing ? "Alumni profile updated." : "Alumni profile added.");
      await load(query);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Users size={20}/></div><div><strong>alumni<span>.</span></strong><small>INFORMATION PLATFORM</small></div></div>
      <div className="workspace-label">WORKSPACE</div>
      <div className="nav-item active"><Users size={17}/> Alumni directory <span className="nav-count">{alumni.length}</span></div>
      <div className="sidebar-bottom"><div className="status-dot"/> Local development <small>ADC · Group project</small></div>
    </aside>

    <main className="main">
      <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> Alumni directory</div><div className="top-actions"><span className="live"><i/> API-connected UI</span><div className="avatar">A</div></div></header>
      <section className="content">
        <div className="eyebrow"><span className="eyebrow-line"/> ALUMNI RELATIONS</div>
        <div className="hero-row"><div><h1>Alumni directory<span>.</span></h1><p className="subtitle">One connected place to organize alumni profiles and keep the network up to date.</p></div><button className="primary-btn" onClick={openCreate}><Plus size={17}/> Add alumni</button></div>

        {error && !dialog && <div className="alert error">{error}<button onClick={() => load()}><RefreshCw size={14}/> Retry</button></div>}
        {notice && <div className="alert success">{notice}<button onClick={() => setNotice("")}><X size={14}/></button></div>}

        <div className="stats-grid">
          <div className="stat-card"><div className="stat-top"><span>Total profiles</span><div className="stat-icon blue"><Users size={18}/></div></div><div className="stat-value">{loading ? "—" : stats.total}</div><div className="stat-foot">Matching current view</div></div>
          <div className="stat-card"><div className="stat-top"><span>Graduation years</span><div className="stat-icon purple"><GraduationCap size={18}/></div></div><div className="stat-value">{loading ? "—" : stats.years}</div><div className="stat-foot">Distinct years in results</div></div>
          <div className="stat-card"><div className="stat-top"><span>Organizations</span><div className="stat-icon green"><BriefcaseBusiness size={18}/></div></div><div className="stat-value">{loading ? "—" : stats.companies}</div><div className="stat-foot">Companies represented</div></div>
        </div>

        <section className="directory-card">
          <div className="directory-head"><div><h2>All alumni</h2><p>Search profiles by name, email, company, branch or location.</p></div><span className="record-badge">{alumni.length} RECORD{alumni.length === 1 ? "" : "S"}</span></div>
          <div className="search-row"><div className="search-box"><Search size={17}/><input value={query} onChange={(e) => { setQuery(e.target.value); load(e.target.value); }} placeholder="Search alumni..." aria-label="Search alumni"/></div><button className="icon-btn" title="Refresh directory" onClick={() => load()}><RefreshCw size={16}/></button></div>
          <div className="table-wrap"><table><thead><tr><th>ALUMNI</th><th>GRADUATION</th><th>ROLE / ORGANIZATION</th><th>LOCATION</th><th></th></tr></thead>
            <tbody>{loading ? <tr><td colSpan="5" className="empty"><span className="spinner"/> Loading records…</td></tr> : alumni.length === 0 ? <tr><td colSpan="5" className="empty"><div className="empty-icon"><Users size={22}/></div><strong>No alumni records yet</strong><span>Add a profile to begin building the directory.</span><button className="text-btn" onClick={openCreate}><Plus size={14}/> Add first profile</button></td></tr> : alumni.map((person) => <tr key={person.id}><td><div className="person"><div className="person-avatar">{person.full_name.split(/\s+/).map((n) => n[0]).slice(0,2).join("").toUpperCase()}</div><div><strong>{person.full_name}</strong><span>{person.email}</span></div></div></td><td>{person.graduation_year || "—"}<small className="sub-cell">{person.degree || person.branch || ""}</small></td><td><div className="role">{person.job_title || "Role not added"}</div><small className="sub-cell">{person.company || "Organization not added"}</small></td><td>{person.location ? <span className="location"><MapPin size={13}/>{person.location}</span> : "—"}</td><td><button className="edit-btn" onClick={() => openEdit(person)} aria-label={`Edit ${person.full_name}`}><Pencil size={15}/></button></td></tr>)}</tbody>
          </table></div>
          <div className="table-footer"><span>Records are stored in the local SQLite database.</span><span><Activity size={13}/> Data updates when the API responds</span></div>
        </section>
        <footer>ADC · Alumni Information Management Platform <span>Phase 1 · Core records</span></footer>
      </section>
    </main>

    {dialog && <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) closeDialog(); }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-head"><div><span className="eyebrow">PROFILE MANAGEMENT</span><h2 id="modal-title">{editing ? "Edit alumni profile" : "Add alumni profile"}</h2><p>Enter the details you have. Name and email are required.</p></div><button className="icon-btn" onClick={closeDialog} aria-label="Close dialog"><X size={18}/></button></div>
      {error && <div className="alert error">{error}</div>}
      <form onSubmit={save}><div className="form-grid">{fields.map(([key, label, required]) => <label className={key === "full_name" || key === "email" ? "wide" : ""} key={key}>{label}{required && <em> *</em>}<input required={required} type={key === "email" ? "email" : key === "graduation_year" ? "number" : "text"} min={key === "graduation_year" ? 1950 : undefined} max={key === "graduation_year" ? 2100 : undefined} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={key === "graduation_year" ? "e.g. 2024" : ""}/></label>)}</div><div className="modal-actions"><button type="button" className="secondary-btn" onClick={closeDialog}>Cancel</button><button className="primary-btn" disabled={saving}>{saving ? "Saving…" : editing ? "Save changes" : "Create profile"} <ArrowUpRight size={16}/></button></div></form>
    </section></div>}
  </div>;
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App/></React.StrictMode>);
