import { ExtensionElements } from './page'

class Tag {
  title: string
  description: string
  slug: string

  constructor(title: string, description: string, slug: string) {
    this.title = title
    this.description = description
    this.slug = slug
  }
}

class FileCard {
  fileLink: string
  fileId: string = 'temp'
  footer: HTMLElement
  tags: Tag[] | null = null 

  constructor(fileCard: Element) {
    const fileHref: HTMLLinkElement | null = fileCard.querySelector('.card-link')

    if(fileHref == null) {
      console.error('unable to find fileLink for card')
      console.error(fileCard.innerHTML)
      throw new Error('could not find file link for card')
    }
    
    this.fileLink = fileHref.href
    const fileIdRegex = new RegExp('.*\:\/\/shibbydex\.com\/file\/(.*)')

    
    const matchResults: Array<string> | null = fileIdRegex.exec(this.fileLink)

    if(matchResults == null) {
      console.error(`could not determine fileId for file with link ${this.fileLink}`)
      console.error(fileCard)

      throw new Error(`could not determine fileId for file with link ${this.fileLink}`)
    }

    const [_, fileId] = matchResults
    this.fileId = fileId

    this.footer = document.createElement('p')
    
    this.footer.classList.add('h4')
    this.footer.classList.add('col-12')
    this.footer.classList.add('card-text')
    this.footer.classList.add('text-center')
    this.footer.classList.add('text-light')

    this.footer.style.display = 'flex'
    this.footer.style.justifyContent = 'center'
    this.footer.style.margin = '15px'
    this.footer.style.flexWrap = 'wrap'

    fileCard.appendChild(this.footer)
  }


  setLoadingState() {
    this.footer.innerHTML = ''
    this.footer.appendChild(ExtensionElements.createLoadingElement())
  }

  setTags(tags: Tag[]) {
    this.tags = tags
    const tagContainer = document.createElement('div')
    this.tags.forEach((tag: Tag) => {
      tagContainer.appendChild(ExtensionElements.createTagElement(tag))
    })
    console.log('outer')
    console.log(tagContainer.outerHTML)
    console.log('inner')
    console.log(tagContainer.innerHTML)
    this.footer.innerHTML = tagContainer.innerHTML
  }
}



class Configuration {

  // map of tag slug to tag alias
  private tagConfig: Map<string, string> = new Map<string, string>


  getTagAlias(tag: string): string | undefined {
    return this.tagConfig.get(tag)
  }

  setTagAlias(tag: string, alias: string) {
    
  }

  
}



export { Tag, FileCard, Configuration }
