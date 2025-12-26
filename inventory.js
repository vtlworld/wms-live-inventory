// inventory.js
import { getInbound, getOutbound } from "./dataSource.js";

export async function calculateInventory() {
  const inbound = await getInbound();
  const outbound = await getOutbound();

  const map = {};

  // add inbound
  inbound.forEach(item => {
    if (!map[item.sku]) {
      map[item.sku] = {
        sku: item.sku,
        inbound: 0,
        outbound: 0
      };
    }
    map[item.sku].inbound += item.qty;
  });

  // subtract outbound
  outbound.forEach(item => {
    if (!map[item.sku]) {
      map[item.sku] = {
        sku: item.sku,
        inbound: 0,
        outbound: 0
      };
    }
    map[item.sku].outbound += item.qty;
  });

  // final calculation
  return Object.values(map).map(item => ({
    sku: item.sku,
    inbound: item.inbound,
    outbound: item.outbound,
    available: item.inbound - item.outbound
  }));
}
