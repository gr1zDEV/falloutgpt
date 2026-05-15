export function getAvailableWorkers(state) {
  return state.workers.filter((worker) => !worker.assignedRoomId);
}

export function unassignWorker(state, workerId) {
  const worker = state.workers.find((w) => w.id === workerId);
  if (!worker || !worker.assignedRoomId) return false;

  const room = state.grid.find((r) => r && r.id === worker.assignedRoomId);
  if (room) {
    room.assignedWorkers = room.assignedWorkers.filter((id) => id !== worker.id);
  }
  worker.assignedRoomId = null;
  return true;
}

export function assignWorkerToRoom(state, workerId, roomId) {
  const worker = state.workers.find((w) => w.id === workerId);
  const room = state.grid.find((r) => r && r.id === roomId);

  if (!worker || !room) return false;
  if (room.assignedWorkers.length >= room.maxWorkers) return false;

  if (worker.assignedRoomId) {
    unassignWorker(state, worker.id);
  }

  worker.assignedRoomId = room.id;
  room.assignedWorkers.push(worker.id);
  return true;
}
