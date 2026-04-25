import { DEFAULT_SEASON } from "../engine/season-palettes.js";

const KEY = "colourSeasonSettings";

export async function getUserPreferences() {
  const stored = await chrome.storage.sync.get(KEY);
  const defaults = {
    season: DEFAULT_SEASON,
    filterMode: "match"
  };
  return {
    ...defaults,
    ...(stored[KEY] ?? {})
  };
}

export async function setUserPreferences(update) {
  const current = await getUserPreferences();
  const next = { ...current, ...update };
  await chrome.storage.sync.set({ [KEY]: next });
  return next;
}
