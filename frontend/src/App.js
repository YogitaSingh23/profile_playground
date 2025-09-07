import React, { useEffect, useState } from "react";
import {
  getHealth,
  getProfiles,
  createProfile,
  updateProfile,
  queryProjects,
  topSkills,
  search
} from "./services/api";
import ProfileForm from "./components/ProfileForm";
import ProfileView from "./components/ProfileView";
import QueryBar from "./components/QueryBar";
import './styles.css';
import API from "./services/api"; // Axios instance if needed

export default function App() {
  const [profiles, setProfiles] = useState([]);
  const [status, setStatus] = useState("unknown");

  useEffect(() => {
    getHealth().then(setStatus).catch(() => setStatus("down"));
    loadProfiles();
  }, []);

  async function loadProfiles() {
    try {
      const data = await getProfiles();
      setProfiles(data);
    } catch (err) {
      console.error(err);
      setProfiles([]);
    }
  }

  async function handleCreate(profile) {
    try {
      const created = await createProfile(profile);
      setProfiles(prev => [...prev, created]);
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleQuickUpdate(id) {
    const profile = profiles.find(p => p.id === id);
    if (!profile) return;
    const updated = { ...profile, name: profile.name + " " };
    try {
      await updateProfile(id, updated);
      setProfiles(prev => prev.map(p => p.id === updated.id ? updated : p));
      loadProfiles();
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleQueryProjects(skill) {
    try {
      const res = await queryProjects(skill);
      alert(JSON.stringify(res, null, 2));
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleTopSkills() {
    try {
      const res = await topSkills();
      alert(JSON.stringify(res, null, 2));
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleSearch(q) {
    try {
      const res = await search(q);
      setProfiles(res);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="container">
      <h1>Profile Playground</h1>
      <div style={{ marginBottom: 12 }}>
        <small className="hint">Backend status: {status}</small>
      </div>
      <QueryBar
        onSearch={handleSearch}
        onQueryProjects={handleQueryProjects}
        onTopSkills={handleTopSkills}
      />
      <ProfileForm onCreate={handleCreate} />
      <h2>Profiles</h2>
      {profiles.length === 0 && <div className="card">No profiles yet</div>}
      {profiles.map(p => (
        <ProfileView
          key={p.id}
          profile={p}
          onQuickUpdate={handleQuickUpdate}
        />
      ))}
    </div>
  );
}
