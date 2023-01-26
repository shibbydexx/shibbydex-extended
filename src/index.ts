import { Scraper } from './scraper'
import { Page } from './page'
import { FileCard, Tag } from './models'



const scraper = new Scraper()
const page = new Page()



document.addEventListener("DOMContentLoaded", refresh)

async function refresh() {
  if(page.hasFileCards()) {
    const fileCards: FileCard[] = page.getFileCards()

    fileCards.forEach(async (card) => {
      card.setLoadingState()
      const tags: Tag[] = await scraper.fetchFileTags(card.fileId)
      console.log(`got tags for file ${card.fileId}`)
      card.setTags(tags)
    })
  }
}




