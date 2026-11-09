
const API_URL = "http://localhost:5000/api";

export async function getClubs() {
  const response = await fetch(`${API_URL}/clubs`);
  if (!response.ok) throw new Error("Failed to fetch clubs");
  return response.json();
}

export async function getEvents() {
  const response = await fetch(`${API_URL}/events`);
  if (!response.ok) throw new Error("Failed to fetch events");
  return response.json();
}

export async function getClub(slug) {
  const response = await fetch(`${API_URL}/clubs/${slug}`);
  if (!response.ok) throw new Error("Failed to fetch club");
  return response.json();
}

export async function createUser(user) {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
}
