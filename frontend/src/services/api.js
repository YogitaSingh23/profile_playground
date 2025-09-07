import axios from "axios";

// Axios instance for backend API
const API = axios.create({
  baseURL: "http://localhost:9090/api", // adjust to your Spring Boot port
});

// ✅ Only one default export
export default API;

// Base URL for fetch-based functions
const BASE = process.env.REACT_APP_API_URL || "http://localhost:9090/api";

// Health check
export async function getHealth() {
  const r = await fetch(`${BASE}/health`);
  return r.text();
}

// Get all profiles
export async function getProfiles() {
  const r = await fetch(`${BASE}/profiles`);
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json();
}

// Create profile
export async function createProfile(profile) {
  const r = await fetch(`${BASE}/profiles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
  if (!r.ok) {
    const text = await r.text();
    throw new Error(`Create failed: ${r.status} ${text}`);
  }
  return r.json();
}

// Update profile
export async function updateProfile(id, profile) {
  const r = await fetch(`${BASE}/profiles/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
  if (!r.ok) {
    const text = await r.text();
    throw new Error(`Update failed: ${r.status} ${text}`);
  }
  return r.json();
}

// Query projects by skill
export async function queryProjects(skill) {
  const r = await fetch(`${BASE}/projects?skill=${encodeURIComponent(skill)}`);
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json();
}

// Get top skills
export async function topSkills() {
  const r = await fetch(`${BASE}/skills/top`);
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json();
}

// Search profiles/projects
export async function search(q) {
  const r = await fetch(`${BASE}/search?q=${encodeURIComponent(q)}`);
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json();
}
