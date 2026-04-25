# colour-palette-wrapper

Chrome extension MVP that scans ASOS product grids, estimates product colours, and highlights items that match a user's colour season.

## Features implemented
- MV3 extension with popup, background worker, and content script.
- Season selector with saved user preference (`chrome.storage.sync`).
- Product scanning and colour-season matching:
  - metadata-first colour extraction from title + visible swatch text,
  - fallback dominant colour extraction from product image.
- Match labels on each product card:
  - `Match`
  - `Not Match`
- Toggle to hide non-matching items.
- Live counters for scanned and matched products.
- Mutation observer to rescan on infinite-scroll pages.
- Unit and fixture-based integration tests for matching and ASOS adapter extraction.

## Project structure
- `manifest.json`
- `src/popup/*`
- `src/background/service-worker.js`
- `src/content/content-script.js`
- `src/adapters/*`
- `src/engine/*`
- `src/image/dominant-color.js`
- `src/storage/user-preferences.js`
- `tests/engine/*`
- `docs/asos-selector-strategy.md`

## Run tests
```bash
npm test
```

## Load in Chrome
1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select this repo folder.
4. Open an ASOS listing/search page.
5. Click the extension icon, pick your season, and click **Scan page**.
