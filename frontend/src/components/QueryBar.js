import React, { useState } from "react";

export default function QueryBar({ onSearch, onQueryProjects, onTopSkills }) {
  const [q, setQ] = useState("");
  const [skill, setSkill] = useState("");
  return (
    <div className="card">
      <div className="row">
        <div className="col">
          <input placeholder="Search profiles (name/email/education)" value={q} onChange={e => setQ(e.target.value)} />
        </div>
        <div>
          <button onClick={() => onSearch(q)}>Search</button>
        </div>
      </div>
      <div style={{ marginTop: 8 }} className="row">
        <div className="col">
          <input placeholder="Query projects by skill e.g. Python" value={skill} onChange={e => setSkill(e.target.value)} />
        </div>
        <div>
          <button onClick={() => onQueryProjects(skill)}>Query Projects</button>
        </div>
        <div>
          <button onClick={onTopSkills}>Top Skills</button>
        </div>
      </div>
    </div>
  );
}
