import { fetchInbound } from "./inbound.js";
import { fetchOutbound } from "./outbound.js";

/**
 * Build live inventory from inbound & outbound movements
 * Expected fields (adjust if names differ):
 *  - sku / partNo
 *  - quantity
 *  - productName
 */
export async function buildInventory() {
  const [inbound, outbound] = await Promise.all([
    fetchInbound(),
    fetchOutbound()
  ]);

  const map = new Map();

  // Add inbound
  inbound.forEach(row => {
    const sku = row.sku || row.partNo;
    if (!sku) return;

    if (!map.has(sku)) {
      map.set(sku, {
        sku,
        productName: row.productName || "",
        inbound: 0,
        outbound: 0,
        available: 0,
        lastMove: null
      });
    }

    const item = map.get(sku);
    item.inbound += Number(row.quantity || 0);
    item.lastMove = row.updatedAt || row.createdAt || item.lastMove;
  });

  // Subtract outbound
  outbound.forEach(row => {
    const sku = row.sku || row.partNo;
    if (!sku) return;

    if (!map.has(sku)) {
      map.set(sku, {
        sku,
        productName: row.productName || "",
        inbound: 0,
        outbound: 0,
        available: 0,
        lastMove: null
      });
    }

    const item = map.get(sku);
    item.outbound += Number(row.quantity || 0);
    item.lastMove = row.updatedAt || row.createdAt || item.lastMove;
  });

  // Calculate available
  map.forEach(item => {
    item.available = item.inbound - item.outbound;
  });

  return Array.from(map.values());
}

