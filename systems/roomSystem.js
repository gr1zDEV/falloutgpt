import { ROOM_DEFINITIONS } from "../data/rooms.js";

export function getRoomDefinition(type) {
  return ROOM_DEFINITIONS.find((room) => room.type === type);
}

export function buildRoom(state, slotIndex, roomType) {
  const existing = state.grid[slotIndex];
  const def = getRoomDefinition(roomType);

  if (!def || existing) return false;
  if (state.resources.coins < def.buildCost) return false;

  state.resources.coins -= def.buildCost;
  state.grid[slotIndex] = {
    id: `room-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    type: def.type,
    name: def.name,
    level: 1,
    buildCost: def.buildCost,
    productionType: def.productionType,
    productionRate: def.productionRate,
    assignedWorkers: [],
    maxWorkers: def.maxWorkers,
  };
  return true;
}

export function upgradeRoom(state, slotIndex) {
  const room = state.grid[slotIndex];
  if (!room) return false;

  const def = getRoomDefinition(room.type);
  const upgradeCost = Math.floor(def.upgradeCostBase * room.level * 1.4);
  if (state.resources.coins < upgradeCost) return false;

  state.resources.coins -= upgradeCost;
  room.level += 1;
  room.productionRate = Math.round(room.productionRate * 1.25);
  if (room.type === "barracks") {
    room.maxWorkers += 1;
  }
  return true;
}
