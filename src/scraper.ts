import { Tag, FileCard, Cache } from './models'
import { Config } from './config/model'

const MAX_REQUESTS = 10

class Scraper {
  private host: string = 'shibbydex.com'
  private filePath: string = 'file'
  private config: Config

  constructor(config: Config) {
    this.config = config
  }

  async scrapeFileCards(): Promise<FileCard[]> {
    const rawFileCards: NodeListOf<Element> = document.querySelectorAll('.file-card')
    const fileCards: FileCard[] = []

    rawFileCards.forEach((value: Element) => {
      const newCard = new FileCard(value, this.config)
      fileCards.push(newCard)
      value.appendChild(newCard.footer)
    })

    fileCards.slice(0, MAX_REQUESTS).forEach(async (card: FileCard) => {
      card.setLoadingState()
      const fileId = ''
      const tags = await this.fetchFileTags(fileId)

      card.setTags(tags)
    })
    return fileCards
  }

  async fetchFileTags(fileId: string): Promise<Tag[]> {
    const cachedTags = Cache.tagCache.get(fileId)
    if(cachedTags) {
      return Promise.resolve(cachedTags)
    }

    const doc = await this.fetchFilePage(fileId)
    const links: NodeListOf<HTMLLinkElement> = doc.querySelectorAll("a.badge")
    const tags: Tag[] = []

    links.forEach((element: HTMLLinkElement) => {
      const linkElement: HTMLLinkElement = element
      const tagLinkRegex = new RegExp('.*/tag/(.*)')
      const groups = tagLinkRegex.exec(linkElement.href)

      const isTagElement = groups != null && groups.length == 2
      if(isTagElement) {
        const title: string = linkElement.innerText
        const description: string = linkElement.title
        const slug: string = groups[1]
        tags.push(new Tag(title, description, slug))
      }
    })
    Cache.tagCache.set(fileId, tags)
    return tags
  }


  private async fetchFilePage(fileId: string): Promise<Document> {
    const filePageUrl = `https://${this.host}/${this.filePath}/${fileId}/?spoilers=1`
    const response = await fetch(filePageUrl)
    const html = await response.text()
    const parser = new DOMParser()
    return parser.parseFromString(html, "text/html")
  }


}


export { Scraper }
