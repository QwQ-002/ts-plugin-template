import type { BrowserWindow } from "electron";

function onBrowserWindowCreated(window: BrowserWindow) {
  console.log("onBrowserWindowCreated");
}

if ("qwqnt" in globalThis) {
  qwqnt.main.hooks.whenBrowserWindowCreated.peek(onBrowserWindowCreated);
}

module.exports = { onBrowserWindowCreated };
