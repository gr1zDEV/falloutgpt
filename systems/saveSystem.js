const SAVE_KEY = "shelter-colony-save";

export function saveGame(state) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

export function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn("Save data was corrupted, starting fresh.", error);
    return null;
  }
}

export function clearSave() {
  localStorage.removeItem(SAVE_KEY);
}
