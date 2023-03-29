import browser from "webextension-polyfill";
// listen for the browser action being clicked and then open the config page
//

// Firefox does not support service workers yet for manifest v3 so we need
// to keep this manifest v2 implementation for now
if(browser.browserAction) {
  // manifest v2
  browser.browserAction.onClicked.addListener(() => {
    const optionsUrl = browser.runtime.getURL('config/config.html')
    browser.tabs.create({
      url: optionsUrl
    })
  })
} else {
  // manifest v3
  browser.runtime.onInstalled.addListener(() => {
    browser.action.onClicked.addListener(async () => {
      const optionsUrl = browser.runtime.getURL("config/config.html");
      await browser.tabs.create({
        url: optionsUrl,
      });
    });
  });
}

