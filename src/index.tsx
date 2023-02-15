import React from "react"
import ReactDOM from "react-dom"
import { Page } from './page'
import { FileList } from "./FileList"

/*
import { Scraper } from './scraper'
import { FileCard, Tag } from './models'
import { Config } from './config/model'
*/


const page = new Page()


// New way - totally replace container object with react
async function refresh() {
  if(page.hasFileCards()) {
    const container = document.querySelector('.container')
    if(container) {
      // TODO: Get all file cards on the page, pass to FileList
      // FileList should then make a request to get all advanced details of the file
      container.innerHTML = ''
      ReactDOM.render(<FileList files={[]} />, container)

    } else {
      console.log('could not find container element')
    }

  }
}

/* *** Old way, minimal invasiveness ***
async function refresh() {
  const config = await Config.loadConfig()
  const scraper = new Scraper(config)

  if(page.hasFileCards()) {
    const fileCards: FileCard[] = page.getFileCards(config)

    fileCards.forEach(async (card) => {
      card.setLoadingState()
      const tags: Tag[] = await scraper.fetchFileTags(card.fileId)
      card.setTags(tags)
    })
  }
}
*/


function refreshWhenTurboReplacesBody() {
  // Shibbydex uses Turbo. Turbo occasionally replaces the <body> element so
  // to make sure our generated content persists we need
  // to detect this and re-apply our modifications.
  // see: https://turbo.hotwired.dev/handbook/drive#custom-rendering


  const targetNode: Node = document.querySelector('html')!!

  const observerConfig = { childList: true }
  const observer = new MutationObserver((mutationList: MutationRecord[], _) => {
    mutationList.forEach((mutation: MutationRecord) => {
      if(mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if(node.nodeName === "BODY") {
            refresh()
          }
        })
      }
    })
  })
  observer.observe(targetNode, observerConfig)

}


refresh()
refreshWhenTurboReplacesBody()
