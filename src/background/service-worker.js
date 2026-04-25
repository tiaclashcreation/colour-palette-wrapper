const DEFAULT_STATS = { scanned: 0, match: 0, noMatch: 0, parsed: 0, unparsed: 0, untracked: 0, unparsedReasons: {} };
const sessionByTab = new Map();

function getOrCreateSession(tabId) {
  const existing = sessionByTab.get(tabId);
  if (existing) {
    return existing;
  }
  const session = {
    isActive: false,
    season: null,
    filterMode: "match",
    latestStats: { ...DEFAULT_STATS },
    pageHistory: {}
  };
  sessionByTab.set(tabId, session);
  return session;
}

function getStatsForTabAndUrl(tabId, url) {
  const session = sessionByTab.get(tabId);
  if (!session) {
    return { ...DEFAULT_STATS };
  }
  if (url && session.pageHistory[url]) {
    return session.pageHistory[url];
  }
  return session.latestStats ?? { ...DEFAULT_STATS };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "csh:stats") {
    const tabId = sender?.tab?.id;
    const url = sender?.tab?.url;
    if (typeof tabId === "number") {
      const session = getOrCreateSession(tabId);
      session.isActive = Boolean(message.payload?.isActive);
      session.season = message.payload?.season ?? session.season;
      session.filterMode = message.payload?.filterMode ?? session.filterMode;
      session.latestStats = message.payload?.stats ?? { ...DEFAULT_STATS };
      if (url) {
        session.pageHistory[url] = session.latestStats;
      }
    }
    return;
  }

  if (message.type === "csh:getStats") {
    const tabId = message.payload?.tabId ?? sender?.tab?.id;
    const url = message.payload?.url ?? sender?.tab?.url;
    if (typeof tabId !== "number") {
      sendResponse({ ok: true, stats: { ...DEFAULT_STATS } });
      return;
    }
    sendResponse({ ok: true, stats: getStatsForTabAndUrl(tabId, url) });
    return;
  }

  if (message.type === "csh:getSessionState") {
    const tabId = sender?.tab?.id;
    const url = sender?.tab?.url;
    if (typeof tabId !== "number") {
      sendResponse({ ok: true, session: null });
      return;
    }
    const session = getOrCreateSession(tabId);
    sendResponse({
      ok: true,
      session: {
        isActive: session.isActive,
        season: session.season,
        filterMode: session.filterMode,
        stats: getStatsForTabAndUrl(tabId, url)
      }
    });
    return;
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  sessionByTab.delete(tabId);
});
