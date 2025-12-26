import { calculateInventory } from "./inventory.js";

let inventory = [];

function applyFilters() {
  const q = document.getElementById("searchInput").value.toLowerCase();
  const f = document.getElementById("stockFilter").value;

  const filtered = inventory.filter(i => {
    const matchText = i.sku.toLowerCase().includes(q);
    const matchStock =
      f === "all" ||
      (f === "in" && i.available > 0) ||
      (f === "out" && i.available <= 0);
    return matchText && matchStock;
  });

  renderTable(filtered);
  renderStats(filtered);
}

function renderStats(data) {
  const totalInbound = data.reduce((s, i) => s + i.inbound, 0);
  const totalOutbound = data.reduce((s, i) => s + i.outbound, 0);

  document.getElementById("totalSKUs").textContent = data.length;
  document.getElementById("totalInbound").textContent = totalInbound;
  document.getElementById("totalOutbound").textContent = totalOutbound;
  document.getElementById("netStock").textContent =
    totalInbound - totalOutbound;
}

function renderTable(data) {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";
  data.forEach(i => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i.sku}</td>
      <td>${i.inbound}</td>
      <td>${i.outbound}</td>
      <td>${i.available}</td>
    `;
    tbody.appendChild(tr);
  });
}

export async function renderInventoryUI() {
  inventory = await calculateInventory();
  renderStats(inventory);
  renderTable(inventory);

  document.getElementById("searchInput").addEventListener("input", applyFilters);
  document.getElementById("stockFilter").addEventListener("change", applyFilters);
}
