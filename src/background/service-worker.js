let latestStats = { scanned: 0, match: 0, noMatch: 0 };

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "csh:stats") {
    latestStats = message.payload;
    return;
  }
  if (message.type === "csh:getStats") {
    sendResponse({ ok: true, stats: latestStats });
  }
});
