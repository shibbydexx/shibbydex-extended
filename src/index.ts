import { Scraper } from './scraper'
import { Page } from './page'
import { FileCard } from './model'




const scraper = new Scraper()
const page = new Page()

if(page.hasFileCards()) {
  const fileCards: FileCard[] = page.getFileCards()

}
