import { CONFIG } from "./config.js";
import { getAuthHeaders } from "./auth.js";

export async function fetchInbound() {
  const res = await fetch(`${CONFIG.WMS_BASE_URL}/inbound/list`, {
    method: "GET",
    headers: getAuthHeaders()
  });

  if (!res.ok) throw new Error("Inbound fetch failed");

  const json = await res.json();
  return json.data || [];
}
