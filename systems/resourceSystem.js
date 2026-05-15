export function calculateProduction(room) {
  const workerBonus = 1 + room.assignedWorkers.length * 0.2;
  return Math.round(room.productionRate * room.level * workerBonus);
}

export function tickResources(state) {
  let extraCapacity = 0;

  state.grid.forEach((room) => {
    if (!room) return;
    const amount = calculateProduction(room);

    if (room.productionType === "capacity") {
      extraCapacity += amount;
      return;
    }

    state.resources[room.productionType] += amount;
  });

  state.workerCapacity = state.baseWorkerCapacity + extraCapacity;
}
