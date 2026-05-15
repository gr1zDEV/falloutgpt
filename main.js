import { STARTER_WORKERS } from "./data/workers.js";
import { buildRoom, upgradeRoom } from "./systems/roomSystem.js";
import { assignWorkerToRoom, unassignWorker } from "./systems/workerSystem.js";
import { tickResources } from "./systems/resourceSystem.js";
import { saveGame, loadGame, clearSave } from "./systems/saveSystem.js";
import { renderApp, bindUIEvents } from "./systems/uiSystem.js";

const GRID_SIZE = 20;
const RESOURCE_TICK_MS = 5000;
const AUTOSAVE_MS = 10000;

function createNewGameState() {
  return {
    resources: {
      power: 100,
      food: 100,
      water: 100,
      coins: 250,
    },
    baseWorkerCapacity: 6,
    workerCapacity: 6,
    workers: structuredClone(STARTER_WORKERS),
    grid: Array.from({ length: GRID_SIZE }, () => null),
    selectedSlotIndex: null,
  };
}

const state = loadGame() ?? createNewGameState();

function refreshUI() {
  renderApp(state);
}

function handleSelectSlot(slotIndex) {
  state.selectedSlotIndex = slotIndex;
  refreshUI();
}

function handleBuildRoom(roomType) {
  if (!Number.isInteger(state.selectedSlotIndex)) return;
  const built = buildRoom(state, state.selectedSlotIndex, roomType);
  if (built) refreshUI();
}

function handleUpgradeRoom(slotIndex) {
  const upgraded = upgradeRoom(state, slotIndex);
  if (upgraded) refreshUI();
}

function handleAssignWorker(workerId, roomId) {
  const assigned = assignWorkerToRoom(state, workerId, roomId);
  if (assigned) refreshUI();
}

function handleUnassignWorker(workerId) {
  const removed = unassignWorker(state, workerId);
  if (removed) refreshUI();
}

function handleSave() {
  saveGame(state);
}

function handleReset() {
  clearSave();
  Object.assign(state, createNewGameState());
  refreshUI();
}

bindUIEvents({
  onSelectSlot: handleSelectSlot,
  onBuildRoom: handleBuildRoom,
  onUpgradeRoom: handleUpgradeRoom,
  onAssignWorker: handleAssignWorker,
  onUnassignWorker: handleUnassignWorker,
  onSave: handleSave,
  onReset: handleReset,
});

setInterval(() => {
  tickResources(state);
  refreshUI();
}, RESOURCE_TICK_MS);

setInterval(() => {
  saveGame(state);
}, AUTOSAVE_MS);

refreshUI();
