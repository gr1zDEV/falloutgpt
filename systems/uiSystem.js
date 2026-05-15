import { ROOM_DEFINITIONS } from "../data/rooms.js";
import { getAvailableWorkers } from "./workerSystem.js";
import { getRoomDefinition } from "./roomSystem.js";

export function renderResources(state) {
  const bar = document.getElementById("resource-bar");
  const entries = [
    ["⚡ Power", state.resources.power],
    ["🌿 Food", state.resources.food],
    ["💧 Water", state.resources.water],
    ["🪙 Coins", state.resources.coins],
    ["👷 Workers", `${state.workers.length}/${state.workerCapacity}`],
  ];

  bar.innerHTML = entries
    .map(
      ([label, value]) =>
        `<div class="resource-pill"><span>${label}</span><strong>${value}</strong></div>`
    )
    .join("");
}

export function renderGrid(state) {
  const grid = document.getElementById("shelter-grid");

  grid.innerHTML = state.grid
    .map((room, index) => {
      if (!room) {
        return `<button class="grid-cell empty" data-slot-index="${index}">+ Empty Slot</button>`;
      }

      const isSelected = state.selectedSlotIndex === index ? "selected" : "";
      return `<button class="grid-cell ${isSelected}" data-slot-index="${index}">
        <span class="room-name">${room.name}</span>
        <span class="room-meta">Lvl ${room.level}</span>
        <span class="room-meta">👷 ${room.assignedWorkers.length}/${room.maxWorkers}</span>
      </button>`;
    })
    .join("");
}

export function renderBuildMenu(state) {
  const menu = document.getElementById("build-menu");

  menu.innerHTML = ROOM_DEFINITIONS.map((room) => {
    const affordable = state.resources.coins >= room.buildCost;
    return `<button class="build-btn" data-build-type="${room.type}" ${
      affordable ? "" : "disabled"
    }>${room.name}<br/>🪙 ${room.buildCost}</button>`;
  }).join("");
}

export function renderSelectedRoom(state) {
  const panel = document.getElementById("detail-panel");
  const idx = state.selectedSlotIndex;
  const room = Number.isInteger(idx) ? state.grid[idx] : null;

  if (!room) {
    panel.innerHTML = `<h2>Room Details</h2><p class="detail-muted">Select a room tile to manage it.</p>`;
    return;
  }

  const roomDef = getRoomDefinition(room.type);
  const upgradeCost = Math.floor(roomDef.upgradeCostBase * room.level * 1.4);
  const availableWorkers = getAvailableWorkers(state);
  const assignedWorkers = state.workers.filter((w) => w.assignedRoomId === room.id);

  panel.innerHTML = `
    <h2>${room.name}</h2>
    <p>Level ${room.level}</p>
    <p>Production: ${room.productionType} +${room.productionRate}</p>
    <p>Workers: ${room.assignedWorkers.length}/${room.maxWorkers}</p>

    <button class="action-btn" data-action="upgrade-room" data-slot-index="${idx}" ${
    state.resources.coins >= upgradeCost ? "" : "disabled"
  }>Upgrade Room (🪙 ${upgradeCost})</button>

    <h3>Assign Worker</h3>
    <div>
      ${availableWorkers
        .map(
          (worker) =>
            `<button class="action-btn" data-action="assign-worker" data-worker-id="${worker.id}" data-room-id="${room.id}">${worker.name} (Lv ${worker.level})</button>`
        )
        .join(" ") || '<p class="detail-muted">No available workers</p>'}
    </div>

    <h3>Assigned Workers</h3>
    <ul class="worker-list">
      ${assignedWorkers
        .map(
          (worker) => `<li class="worker-chip">${worker.name} <button class="action-btn" data-action="unassign-worker" data-worker-id="${worker.id}">Unassign</button></li>`
        )
        .join("") || '<li class="detail-muted">No workers assigned</li>'}
    </ul>
  `;
}

export function renderApp(state) {
  renderResources(state);
  renderGrid(state);
  renderBuildMenu(state);
  renderSelectedRoom(state);
}

export function bindUIEvents(handlers) {
  const app = document.getElementById("app");

  app.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (!target) return;

    const slotIndex = target.dataset.slotIndex;
    if (slotIndex !== undefined) {
      handlers.onSelectSlot(Number(slotIndex));
      return;
    }

    const buildType = target.dataset.buildType;
    if (buildType) {
      handlers.onBuildRoom(buildType);
      return;
    }

    const action = target.dataset.action;
    if (action === "upgrade-room") {
      handlers.onUpgradeRoom(Number(target.dataset.slotIndex));
    }
    if (action === "assign-worker") {
      handlers.onAssignWorker(target.dataset.workerId, target.dataset.roomId);
    }
    if (action === "unassign-worker") {
      handlers.onUnassignWorker(target.dataset.workerId);
    }
  });

  document.getElementById("save-btn").addEventListener("click", handlers.onSave);
  document.getElementById("reset-btn").addEventListener("click", handlers.onReset);
}
