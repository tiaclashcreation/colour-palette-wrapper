import { DEFAULT_SEASON, SEASON_LABELS } from "../engine/season-palettes.js";
import { getUserPreferences, setUserPreferences } from "../storage/user-preferences.js";

const seasonSelect = document.getElementById("seasonSelect");
const scanButton = document.getElementById("scanButton");
const clearButton = document.getElementById("clearButton");
const onlyMatchesToggle = document.getElementById("onlyMatchesToggle");
const statusText = document.getElementById("statusText");
const debugLog = document.getElementById("debugLog");

const statScanned = document.getElementById("statScanned");
const statStrong = document.getElementById("statStrong");
const statPossible = document.getElementById("statPossible");
const statNoMatch = document.getElementById("statNoMatch");
const debugEntries = [];

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

function applyStats(stats) {
  statScanned.textContent = String(stats.scanned ?? 0);
  statStrong.textContent = String(stats.strong ?? 0);
  statPossible.textContent = String(stats.possible ?? 0);
  statNoMatch.textContent = String(stats.noMatch ?? 0);
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
  onlyMatchesToggle.checked = Boolean(preferences.onlyMatches);

  const statsResponse = await chrome.runtime.sendMessage({ type: "csh:getStats" });
  pushDebug("Background stats response", statsResponse ?? "undefined");
  if (statsResponse?.ok) {
    applyStats(statsResponse.stats);
  }
  pushDebug("Popup", "initialize complete");
}

scanButton.addEventListener("click", async () => {
  const season = seasonSelect.value;
  const onlyMatches = onlyMatchesToggle.checked;
  await setUserPreferences({ season, onlyMatches });

  setStatus("Scanning...");
  pushDebug("Scan click payload", { season, onlyMatches });
  const response = await sendToContent({
    type: "csh:scan",
    payload: { season, onlyMatches }
  });
  if (!response?.ok) {
    pushDebug("Scan failed", response ?? "empty response");
    setStatus("Could not scan this page.");
    return;
  }
  applyStats(response.stats);
  pushDebug("Scan success stats", response.stats);
  setStatus("Scan complete");
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

onlyMatchesToggle.addEventListener("change", async () => {
  const onlyMatches = onlyMatchesToggle.checked;
  await setUserPreferences({ onlyMatches });
  const response = await sendToContent({
    type: "csh:setFilter",
    payload: { onlyMatches }
  });
  if (response?.ok) {
    applyStats(response.stats);
    pushDebug("Filter update success", response.stats);
    setStatus("Filter updated");
  } else {
    pushDebug("Filter update failed", response ?? "empty response");
  }
});

initialize();
