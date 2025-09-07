import React, { useState } from "react";

export default function ProfileForm({ onCreate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [education, setEducation] = useState("");
  const [skillsRaw, setSkillsRaw] = useState("");
  const [projectsRaw, setProjectsRaw] = useState("");
  const [workRaw, setWorkRaw] = useState("");
  const [linksRaw, setLinksRaw] = useState("");

  function buildPayload() {
    const skills = skillsRaw.split(",").map(s => s.trim()).filter(s => s).map(s => ({ name: s }));
    const projects = projectsRaw.split("\n").map(l => l.trim()).filter(l => l).map(line => {
      const parts = line.split("::").map(x => x.trim());
      return { title: parts[0] || "", description: parts[1] || "", links: parts[2] || "" };
    });
    const work = workRaw.split("\n").map(l => l.trim()).filter(l => l).map(line => {
      const parts = line.split("::").map(x => x.trim());
      return { company: parts[0] || "", role: parts[1] || "" };
    });
    const links = linksRaw.split(",").map(l => l.trim()).filter(l => l).map(pair => {
      const parts = pair.split("::").map(x => x.trim());
      const key = parts[0] || "github";
      const value = parts[1] || "";
      return { [key]: value };
    });
    return { name, email, education, skills, projects, work, links };
  }

  async function submit() {
    try {
      const payload = buildPayload();
      await onCreate(payload);
      setName(""); setEmail(""); setEducation("");
      setSkillsRaw(""); setProjectsRaw(""); setWorkRaw(""); setLinksRaw("");
      alert("Profile created");
    } catch (err) {
      alert(err.message || "Create failed");
    }
  }

  return (
    <div className="card">
      <h3>Create profile</h3>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        <label>Email</label>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Education</label>
        <input type="text" value={education} onChange={e => setEducation(e.target.value)} />
      </div>
      <div>
        <label>Skills (comma separated)</label>
        <input placeholder="Java, Spring Boot, Python" value={skillsRaw} onChange={e => setSkillsRaw(e.target.value)} />
        <small className="hint">Example: Java, Spring Boot, Python</small>
      </div>
      <div>
        <label>Projects (one per line, format title::description::links)</label>
        <textarea rows="3" placeholder="Title::Description::https://..." value={projectsRaw} onChange={e => setProjectsRaw(e.target.value)} />
        <small className="hint">Example line: Budgeting Tool::Microservices::https://github.com/you/repo</small>
      </div>
      <div>
        <label>Work (one per line, format company::role)</label>
        <textarea rows="2" placeholder="Company::Role" value={workRaw} onChange={e => setWorkRaw(e.target.value)} />
      </div>
      <div>
        <label>Links (comma separated, format key::url)</label>
        <input placeholder="github::https://github.com/you, linkedin::https://..." value={linksRaw} onChange={e => setLinksRaw(e.target.value)} />
      </div>
      <div style={{ marginTop: 10 }}>
        <button onClick={submit}>Create</button>
      </div>
      <div style={{ marginTop: 10 }}>
        <small className="hint">When created successfully use the Profiles list below to view. Use Postman to confirm server data too.</small>
      </div>
    </div>
  );
}
