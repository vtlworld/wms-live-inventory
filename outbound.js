import { CONFIG } from "./config.js";
import { getAuthHeaders } from "./auth.js";

export async function fetchOutbound() {
  const res = await fetch(`${CONFIG.WMS_BASE_URL}/outbound/list`, {
    method: "GET",
    headers: getAuthHeaders()
  });

  if (!res.ok) throw new Error("Outbound fetch failed");

  const json = await res.json();
  return json.data || [];
}

