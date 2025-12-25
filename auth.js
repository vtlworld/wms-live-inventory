// js/auth.js
import { CONFIG } from "./config.js";

let accessToken = null;

export async function login(email, password) {
  const res = await fetch(`${CONFIG.WMS_BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      emailAddress: email,
      password: password
    })
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const data = await res.json();

  // adjust if your API wraps token differently
  accessToken = data.data?.accessToken || data.accessToken;

  if (!accessToken) {
    throw new Error("Token not found in response");
  }

  return accessToken;
}

export function getAuthHeaders() {
  if (!accessToken) {
    throw new Error("Not authenticated");
  }

  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${accessToken}`
  };
}

