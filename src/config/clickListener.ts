import browser from "webextension-polyfill"

// listen for the browser action being clicked and then open the config page
browser.browserAction.onClicked.addListener(() => {
  const optionsUrl = browser.runtime.getURL('config/config.html')
  browser.tabs.create({
    url: optionsUrl
  })
})
