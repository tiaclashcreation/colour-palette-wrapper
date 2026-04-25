import { DEFAULT_SEASON, SEASON_LABELS } from "../engine/season-palettes.js";
import { getUserPreferences, setUserPreferences } from "../storage/user-preferences.js";

const seasonSelect = document.getElementById("seasonSelect");
const scanButton = document.getElementById("scanButton");
const loadNextButton = document.getElementById("loadNextButton");
const clearButton = document.getElementById("clearButton");
const modeMatchButton = document.getElementById("modeMatchButton");
const modeAllButton = document.getElementById("modeAllButton");
const statusText = document.getElementById("statusText");
const debugLog = document.getElementById("debugLog");

const statScanned = document.getElementById("statScanned");
const statParsed = document.getElementById("statParsed");
const statUnparsed = document.getElementById("statUnparsed");
const statUntracked = document.getElementById("statUntracked");
const statMatch = document.getElementById("statMatch");
const statNoMatch = document.getElementById("statNoMatch");
const debugEntries = [];
let currentFilterMode = "match";

function normalizeFilterMode(mode) {
  if (mode === "all") {
    return "all";
  }
  return "match";
}

function pushDebug(label, value) {
  const timestamp = new Date().toLocaleTimeString();
  const payload =
    typeof value === "string"
      ? value
      : value === undefined
        ? ""
        : JSON.stringify(value);
  const line = `[${timestamp}] ${label}${payload ? `: ${payload}` : ""}`;
  debugEntries.unshift(line);
  if (debugEntries.length > 12) {
    debugEntries.pop();
  }
  debugLog.textContent = debugEntries.join("\n");
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
  statScanned.textContent = String(stats.scanned ?? 0);
  statParsed.textContent = String(stats.parsed ?? 0);
  statUnparsed.textContent = String(stats.unparsed ?? 0);
  statUntracked.textContent = String(stats.untracked ?? 0);
  statMatch.textContent = String(stats.match ?? 0);
  statNoMatch.textContent = String(stats.noMatch ?? 0);
  if (stats.unparsedReasons && Object.keys(stats.unparsedReasons).length > 0) {
    pushDebug("Unparsed reasons", stats.unparsedReasons);
  }
}

async function getActiveTabId() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  pushDebug("Active tab", {
    id: tab?.id ?? null,
    url: tab?.url ?? null
  });
  return tab ?? null;
}

async function injectContentScript(tabId) {
  pushDebug("Injecting content script", { tabId });
  await chrome.scripting.executeScript({
    target: { tabId },
    files: ["src/content/content-script.js"]
  });
  pushDebug("Inject complete", { tabId });
}

async function sendToContent(message) {
  const tab = await getActiveTabId();
  const tabId = tab?.id;
  if (!tabId) {
    pushDebug("sendToContent", "No active tab");
    return { ok: false, reason: "no-active-tab" };
  }
  try {
    pushDebug("sendMessage", { tabId, type: message.type });
    const response = await chrome.tabs.sendMessage(tabId, message);
    pushDebug("message response", response ?? "undefined");
    return response;
  } catch (error) {
    const errorMessage = error?.message ?? "unknown error";
    pushDebug("sendMessage error", errorMessage);
    const isMissingReceiver = errorMessage.includes("Receiving end does not exist");
    if (isMissingReceiver) {
      try {
        await injectContentScript(tabId);
        pushDebug("Retry sendMessage", { tabId, type: message.type });
        const retryResponse = await chrome.tabs.sendMessage(tabId, message);
        pushDebug("retry response", retryResponse ?? "undefined");
        return retryResponse;
      } catch (retryError) {
        pushDebug("Retry failed", retryError?.message ?? "unknown retry error");
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
  pushDebug("Popup", "initialize start");
  renderSeasons();
  const preferences = await getUserPreferences();
  pushDebug("Preferences loaded", preferences);
  seasonSelect.value = preferences.season ?? DEFAULT_SEASON;
  setFilterModeUi(preferences.filterMode ?? "match");

  const statsResponse = await chrome.runtime.sendMessage({ type: "csh:getStats" });
  pushDebug("Background stats response", statsResponse ?? "undefined");
  if (statsResponse?.ok) {
    applyStats(statsResponse.stats);
  }
  pushDebug("Popup", "initialize complete");
}

scanButton.addEventListener("click", async () => {
  const season = seasonSelect.value;
  const filterMode = currentFilterMode;
  await setUserPreferences({ season, filterMode });

  setStatus("Loading first 100...");
  pushDebug("Scan click payload", { season, filterMode, batchSize: 100 });
  const response = await sendToContent({
    type: "csh:scanBatch",
    payload: { season, filterMode, batchSize: 100 }
  });
  if (!response?.ok) {
    pushDebug("Scan failed", response ?? "empty response");
    setStatus("Could not scan this page.");
    return;
  }
  applyStats(response.stats);
  pushDebug("Scan success stats", response.stats);
  setStatus("Batch scan complete");
});

loadNextButton.addEventListener("click", async () => {
  const season = seasonSelect.value;
  const filterMode = currentFilterMode;
  await setUserPreferences({ season, filterMode });

  setStatus("Loading next 100...");
  pushDebug("Load next payload", { season, filterMode, batchSize: 100 });
  const response = await sendToContent({
    type: "csh:loadNextBatch",
    payload: { season, filterMode, batchSize: 100 }
  });
  if (!response?.ok) {
    pushDebug("Load next failed", response ?? "empty response");
    setStatus("Could not load next batch.");
    return;
  }
  applyStats(response.stats);
  pushDebug("Load next success stats", response.stats);
  setStatus("Next batch complete");
});

clearButton.addEventListener("click", async () => {
  setStatus("Clearing...");
  const response = await sendToContent({ type: "csh:clear" });
  if (response?.ok) {
    applyStats(response.stats);
    pushDebug("Clear success", response.stats);
    setStatus("Highlights cleared");
  } else {
    pushDebug("Clear failed", response ?? "empty response");
    setStatus("Nothing to clear");
  }
});

seasonSelect.addEventListener("change", async () => {
  const season = seasonSelect.value;
  await setUserPreferences({ season });
  pushDebug("Season updated", season);
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
    pushDebug("Filter mode update success", { mode: normalizedMode, stats: response.stats });
    setStatus("Filter mode updated");
  } else {
    pushDebug("Filter mode update failed", response ?? "empty response");
  }
}

modeMatchButton.addEventListener("click", async () => updateFilterMode("match"));
modeAllButton.addEventListener("click", async () => updateFilterMode("all"));

initialize();
