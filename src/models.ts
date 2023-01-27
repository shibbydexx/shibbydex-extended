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
  config: Configuration = new Configuration()

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
    this.footer.classList.add('sdx-generated-content')
    this.footer.classList.add('sdx-filecard-footer')

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


    // do aliases first
    this.tags.forEach((tag: Tag) => {
      const alias = this.config.getTagAlias(tag)
      if(alias) {
        tagContainer.appendChild(ExtensionElements.createAliasElement(tag, alias))
      }
    })

    // then plain tags
    //
    if(!this.config.showOnlyAliasedTags) {
      this.tags.forEach((tag: Tag) => {
        const alias = this.config.getTagAlias(tag)
        if(!alias) {
          tagContainer.appendChild(ExtensionElements.createTagElement(tag))
        }
      })

    }
    this.footer.innerHTML = tagContainer.innerHTML
  }
}



class Configuration {

  // map of tag slug to tag alias
  private tagConfig: Map<string, string> = new Map<string, string>

  readonly showOnlyAliasedTags: boolean = true

  constructor() {
    this.tagConfig.set('my-pet', '🐱')
    this.tagConfig.set('intimate', '🫂')
    this.tagConfig.set('loop', '🔁')
    this.tagConfig.set('short-length', '⏩️')
    this.tagConfig.set('playful', '😜')
    this.tagConfig.set('shy', '🫢')
    this.tagConfig.set('obedience', '🙇‍♀️')
    this.tagConfig.set('kissing', '😘')
    this.tagConfig.set('gamer', '🎮️')
  }

  getTagAlias(tag: Tag): string | undefined {
    return this.tagConfig.get(tag.slug)
  }

  setTagAlias(tag: string, alias: string) {
    this.tagConfig.set(tag, alias)
  }

}



export { Tag, FileCard, Configuration }
