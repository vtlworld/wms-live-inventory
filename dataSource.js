// dataSource.js
const USE_MOCK = true; // later: false

export async function getInbound() {
  if (USE_MOCK) return mockInbound();
  const { getInboundData } = await import("./inbound.js");
  return getInboundData();
}

export async function getOutbound() {
  if (USE_MOCK) return mockOutbound();
  const { getOutboundData } = await import("./outbound.js");
  return getOutboundData();
}

function mockInbound() {
  return [
    { sku: "SKU-001", qty: 100 },
    { sku: "SKU-002", qty: 50 }
  ];
}

function mockOutbound() {
  return [
    { sku: "SKU-001", qty: 30 }
  ];
}
