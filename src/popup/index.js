import { DEFAULT_SEASON, SEASON_LABELS } from "../engine/season-palettes.js";
import { getUserPreferences, setUserPreferences } from "../storage/user-preferences.js";

const seasonSelect = document.getElementById("seasonSelect");
const scanButton = document.getElementById("scanButton");
const clearButton = document.getElementById("clearButton");
const modeMatchButton = document.getElementById("modeMatchButton");
const modeAllButton = document.getElementById("modeAllButton");
const statusText = document.getElementById("statusText");
let currentFilterMode = "match";

const SEASON_THEMES = {
  warmSpring: {
    accent: "#e0725f",
    accentHover: "#cc604e",
    softBg: "#f8ece8",
    softBgHover: "#f3e3dd",
    popupBg: "#fdf7f4"
  },
  clearSpring: {
    accent: "#22aeb5",
    accentHover: "#18969d",
    softBg: "#e9f7f8",
    softBgHover: "#ddf1f3",
    popupBg: "#f4fcfd"
  },
  lightSpring: {
    accent: "#e7a96e",
    accentHover: "#d59253",
    softBg: "#faf3e7",
    softBgHover: "#f5ebdb",
    popupBg: "#fffaf2"
  },
  trueSummer: {
    accent: "#7b88c3",
    accentHover: "#6977b1",
    softBg: "#eef0fb",
    softBgHover: "#e3e6f7",
    popupBg: "#f7f8ff"
  },
  softAutumn: {
    accent: "#8f8a57",
    accentHover: "#7d7848",
    softBg: "#f3f0e4",
    softBgHover: "#ece7d7",
    popupBg: "#faf8f1"
  },
  deepAutumn: {
    accent: "#865637",
    accentHover: "#73482f",
    softBg: "#f4ece7",
    softBgHover: "#ebdfd6",
    popupBg: "#faf6f3"
  },
  trueAutumn: {
    accent: "#a1623f",
    accentHover: "#8d5334",
    softBg: "#f6ede7",
    softBgHover: "#efe2d9",
    popupBg: "#fcf7f3"
  },
  coolSummer: {
    accent: "#8b74b3",
    accentHover: "#7a639f",
    softBg: "#f1edf7",
    softBgHover: "#e8e0f3",
    popupBg: "#f9f7fc"
  },
  lightSummer: {
    accent: "#7ca6bf",
    accentHover: "#6b95ad",
    softBg: "#ebf3f8",
    softBgHover: "#dfecf4",
    popupBg: "#f6fbff"
  },
  brightWinter: {
    accent: "#2a5dd5",
    accentHover: "#214eb7",
    softBg: "#e9effd",
    softBgHover: "#dce6fb",
    popupBg: "#f5f8ff"
  },
  trueWinter: {
    accent: "#3d4fa6",
    accentHover: "#33448f",
    softBg: "#eaedf9",
    softBgHover: "#dde3f4",
    popupBg: "#f4f6fd"
  },
  deepWinter: {
    accent: "#4b4f72",
    accentHover: "#3f4261",
    softBg: "#ececf3",
    softBgHover: "#e0e0eb",
    popupBg: "#f6f6fa"
  }
};

function applySeasonTheme(season) {
  const theme = SEASON_THEMES[season] ?? SEASON_THEMES[DEFAULT_SEASON];
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty("--popup-bg", theme.popupBg);
  rootStyle.setProperty("--accent", theme.accent);
  rootStyle.setProperty("--accent-hover", theme.accentHover);
  rootStyle.setProperty("--soft-bg", theme.softBg);
  rootStyle.setProperty("--soft-bg-hover", theme.softBgHover);
}

function normalizeFilterMode(mode) {
  if (mode === "all") {
    return "all";
  }
  return "match";
}

function renderSeasons() {
  for (const [value, label] of Object.entries(SEASON_LABELS)) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    seasonSelect.appendChild(option);
  }
}

function setFilterModeUi(mode) {
  const normalizedMode = normalizeFilterMode(mode);
  currentFilterMode = normalizedMode;
  modeMatchButton.classList.toggle("active", normalizedMode === "match");
  modeAllButton.classList.toggle("active", normalizedMode === "all");
}

function applyStats(stats) {
  void stats;
}

async function getActiveTabId() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab ?? null;
}

async function injectContentScript(tabId) {
  await chrome.scripting.executeScript({
    target: { tabId },
    files: ["src/content/content-script.js"]
  });
}

async function sendToContent(message) {
  const tab = await getActiveTabId();
  const tabId = tab?.id;
  if (!tabId) {
    return { ok: false, reason: "no-active-tab" };
  }
  try {
    return await chrome.tabs.sendMessage(tabId, message);
  } catch (error) {
    const errorMessage = error?.message ?? "unknown error";
    const isMissingReceiver = errorMessage.includes("Receiving end does not exist");
    if (isMissingReceiver) {
      try {
        await injectContentScript(tabId);
        return await chrome.tabs.sendMessage(tabId, message);
      } catch (retryError) {
        return {
          ok: false,
          reason: "content-unavailable",
          error: retryError?.message ?? null
        };
      }
    }
    return { ok: false, reason: "content-unavailable", error: errorMessage };
  }
}

function setStatus(text) {
  statusText.textContent = text;
}

async function initialize() {
  renderSeasons();
  const preferences = await getUserPreferences();
  seasonSelect.value = preferences.season ?? DEFAULT_SEASON;
  applySeasonTheme(seasonSelect.value);
  setFilterModeUi(preferences.filterMode ?? "match");

  const activeTab = await getActiveTabId();
  const statsResponse = await chrome.runtime.sendMessage({
    type: "csh:getStats",
    payload: { tabId: activeTab?.id ?? null, url: activeTab?.url ?? null }
  });
  if (statsResponse?.ok) {
    applyStats(statsResponse.stats);
  }
}

scanButton.addEventListener("click", async () => {
  const season = seasonSelect.value;
  const filterMode = currentFilterMode;
  await setUserPreferences({ season, filterMode });

  setStatus("Loading first 100...");
  const response = await sendToContent({
    type: "csh:scanBatch",
    payload: { season, filterMode, batchSize: 100 }
  });
  if (!response?.ok) {
    setStatus("Could not scan this page.");
    return;
  }
  applyStats(response.stats);
  setStatus("Batch scan complete");
});

clearButton.addEventListener("click", async () => {
  setStatus("Clearing...");
  const response = await sendToContent({ type: "csh:clear" });
  if (response?.ok) {
    applyStats(response.stats);
    setStatus("Highlights cleared");
  } else {
    setStatus("Nothing to clear");
  }
});

seasonSelect.addEventListener("change", async () => {
  const season = seasonSelect.value;
  applySeasonTheme(season);
  await setUserPreferences({ season });
});

async function updateFilterMode(mode) {
  const normalizedMode = normalizeFilterMode(mode);
  setFilterModeUi(normalizedMode);
  await setUserPreferences({ filterMode: normalizedMode });
  const response = await sendToContent({
    type: "csh:setFilter",
    payload: { filterMode: normalizedMode }
  });
  if (response?.ok) {
    applyStats(response.stats);
    setStatus("Filter mode updated");
  }
}

modeMatchButton.addEventListener("click", async () => updateFilterMode("match"));
modeAllButton.addEventListener("click", async () => updateFilterMode("all"));

initialize();
