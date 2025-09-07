import React from "react";

export default function ProfileView({ profile, onQuickUpdate }) {
  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{profile.name} <small style={{ color: "#6b7280" }}>({profile.email})</small></div>
          <div style={{ marginTop:6 }}>Education: {profile.education}</div>
        </div>
        <div>
          <button onClick={() => onQuickUpdate(profile.id)}>Quick Update</button>
        </div>
      </div>
      <div style={{ marginTop:10 }}>
        <div><strong>Skills:</strong> {profile.skills?.map(s => s.name).join(", ")}</div>
        <div style={{ marginTop:6 }}><strong>Projects:</strong> {profile.projects?.map(p => p.title).join(", ")}</div>
        <div style={{ marginTop:6 }}><strong>Work:</strong> {profile.work?.map(w => `${w.company} - ${w.role}`).join(", ")}</div>
        <div style={{ marginTop:6 }}><strong>Links:</strong> {profile.links?.map(l => {
          const k = Object.keys(l)[0];
          return `${k}:${l[k]}`;
        }).join(", ")}</div>
      </div>
    </div>
  );
}
