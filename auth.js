import { CONFIG } from "./config.js";

let token = null;

export async function login(email, password) {
  const res = await fetch(`${CONFIG.WMS_BASE_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      emailAddress: email,
      password: password
    })
  });

  if (!res.ok) throw new Error("Login failed");

  const data = await res.json();
  token = data.data?.accessToken || data.accessToken;
  return token;
}

export function getAuthHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
}
