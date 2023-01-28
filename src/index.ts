import { Scraper } from './scraper'
import { Page } from './page'
import { FileCard, Tag } from './models'



const scraper = new Scraper()
const page = new Page()

async function refresh() {
  if(page.hasFileCards()) {
    const fileCards: FileCard[] = page.getFileCards()

    fileCards.forEach(async (card) => {
      card.setLoadingState()
      const tags: Tag[] = await scraper.fetchFileTags(card.fileId)
      card.setTags(tags)
    })
  }
}


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
