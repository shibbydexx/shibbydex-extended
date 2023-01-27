import { Scraper } from './scraper'
import { Page } from './page'
import { FileCard, Tag, Configuration } from './models'



const scraper = new Scraper()
const page = new Page()
const config = new Configuration()


console.log('DEXX: run')

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

refresh()
