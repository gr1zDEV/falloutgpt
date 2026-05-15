# Shelter Colony Design Notes

## Vision
Shelter Colony is designed as an expandable base-management game with short session loops and long-term growth.

## Future Expansion Ideas

### 1) Random Events
- Activate entries in `data/events.js` as timed or probability-based encounters.
- Add event choices with risk/reward outcomes.
- Tie events to current resource levels and room composition.

### 2) Enemy Raids
- Introduce threat meters and warning timers.
- Add defensive rooms and combat-ready specialists.
- Resolve raids via stat checks, tactical assignment, or optional minigames.

### 3) Quests
- Build objective chains (daily, story, faction).
- Offer rewards such as coins, rare materials, or unique workers.
- Include branching outcomes and replayability.

### 4) Inventory
- Add crafted items, consumables, and equipment slots.
- Connect Workshop output to item crafting recipes.
- Enable room modifiers via tools and upgrades.

### 5) Mobile App Wrapper
- Package as a hybrid app (e.g., Capacitor/Cordova later).
- Add native notifications for completed tasks.
- Tune touch controls and haptics.

### 6) Steam Desktop Wrapper
- Ship with an Electron or Tauri wrapper.
- Add achievements, cloud hooks, and mod-friendly file paths.
- Expand UI scaling and input options for desktop monitors.

### 7) Cloud Saves (Later)
- Keep localStorage as default fallback.
- Add optional account sync when backend exists.
- Support merge resolution between local and cloud snapshots.
