# Shelter Colony (MVP)

Shelter Colony is a vanilla HTML/CSS/JavaScript shelter management browser game MVP.

## Features
- 2D shelter grid with buildable slots
- Core resources: power, food, water, coins
- 5 room types (Generator, Garden, Water Pump, Barracks, Workshop)
- Worker assignment and unassignment per room
- 5-second production tick based on room level and staffing
- Room upgrade system
- Autosave every 10 seconds
- Manual Save and Reset controls
- LocalStorage persistence
- Responsive desktop/mobile layout

## Project Structure
- `index.html`
- `style.css`
- `main.js`
- `data/rooms.js`
- `data/workers.js`
- `data/events.js`
- `systems/saveSystem.js`
- `systems/resourceSystem.js`
- `systems/roomSystem.js`
- `systems/workerSystem.js`
- `systems/uiSystem.js`
- `docs/design-notes.md`
- `assets/` (placeholder for future art)

## Run Locally
1. Clone or download this repository.
2. Open `index.html` directly in your browser.

That is enough for MVP testing. For best ES module behavior across all browsers, you can also serve with any static host.

## Deploy to GitHub Pages
1. Push this project to a GitHub repository.
2. In GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select your branch (usually `main`) and folder (`/root`).
5. Save and wait for Pages to publish.

Because all imports are relative and there is no build tooling, deployment is static-site friendly.

## Notes
- No backend, package manager, or build step is required.
- Saves are browser-local via `localStorage`.
