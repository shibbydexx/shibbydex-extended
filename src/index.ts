import { Scraper } from './scraper'
import { Page } from './page'
import { FileCard, Tag } from './models'




const scraper = new Scraper()
const page = new Page()


if(page.hasFileCards()) {
  const fileCards: FileCard[] = page.getFileCards()

  const fileIdToTagPromises: Map<string, Promise<Tag[]>> = fileCards.reduce(
    (acc: Map<string, Promise<Tag[]>>, card: FileCard): Map<string, Promise<Tag[]>> => {
      acc.set(card.fileId, scraper.fetchFileTags(card.fileId))
      return acc
    },
    new Map<string, Promise<Tag[]>>())

    const fileIdToTags: Map<string, Tag[]> = new Map()

    fileIdToTagPromises.forEach(async (tagsPromise, fileId) => {
      fileIdToTags.set(fileId, await tagsPromise)
    })

}



