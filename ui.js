import { buildInventory } from "./inventory.js";

export async function renderUI() {
  const data = await buildInventory();

  // Totals
  let totalInbound = 0;
  let totalOutbound = 0;

  data.forEach(i => {
    totalInbound += i.inbound;
    totalOutbound += i.outbound;
  });

  document.getElementById("totalInbound").innerText = totalInbound;
  document.getElementById("totalOutbound").innerText = totalOutbound;
  document.getElementById("totalSkus").innerText = data.length;
  document.getElementById("netStock").innerText =
    totalInbound - totalOutbound;

  // Table
  const tbody = document.getElementById("inventoryBody");
  tbody.innerHTML = "";

  data.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.sku}</td>
      <td>${item.productName}</td>
      <td>${item.inbound}</td>
      <td>${item.outbound}</td>
      <td>${item.available}</td>
      <td>${item.lastMove || "-"}</td>
    `;
    tbody.appendChild(tr);
  });
}
