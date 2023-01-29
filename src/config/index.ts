import { Config } from './model'

const FORM_ID = 'sdx-config-form'
const NUMBER_OF_BLANK_ROWS = 5

const configPromise: Promise<Config> = Config.loadConfig()


document.addEventListener('DOMContentLoaded', async () => {
  const form = document.querySelector(`#${FORM_ID}`)
  const existingConfig: Config = await configPromise

  if(form) {
    const aliasesGroup: HTMLElement = form.querySelector('#sdx-aliases-group')!!
    const buttonsGroup: HTMLElement = form.querySelector('#sdx-buttons-group')!!

    // set form to match stored config
    Array.from(existingConfig.aliases).forEach(([alias, slug]) => {
      aliasesGroup.appendChild(createFormRow(alias, slug))
    })

    const showAllCheckbox: HTMLInputElement = form.querySelector('#showAllTags')!!

    if(existingConfig.showAll) {
      showAllCheckbox.checked = existingConfig.showAll
    } else {
      showAllCheckbox.removeAttribute('checked')
    }

    // add a few blank rows
    for(let i = 0; i < NUMBER_OF_BLANK_ROWS; i++) {
      aliasesGroup.appendChild(createFormRow())
    }
    
    // finally add buttons
    buttonsGroup.appendChild(createFormButtonsRow())
  } else { console.error(`could not locate form with id ${FORM_ID}`) }
});

function createFormRow(alias: string = '', slug: string = ''): HTMLElement {
  const formRow = document.createElement('div')
  formRow.classList.add('row')

  const firstCol = document.createElement('div')
  firstCol.classList.add('col')

  const aliasInput: HTMLInputElement = document.createElement('input')
  aliasInput.type = 'text'
  aliasInput.value = alias
  aliasInput.classList.add('form-control')
  aliasInput.classList.add('sdx-alias-input')
  aliasInput.placeholder = 'Alias'


  const secondCol = document.createElement('div')
  secondCol.classList.add('col')

  const tagSlugInput: HTMLInputElement = document.createElement('input')
  tagSlugInput.type = 'text'
  tagSlugInput.value = slug
  tagSlugInput.classList.add('form-control')
  tagSlugInput.classList.add('sdx-slug-input')
  tagSlugInput.placeholder = 'Tag Slug'

  firstCol.appendChild(aliasInput)
  secondCol.appendChild(tagSlugInput)
  formRow.appendChild(firstCol)
  formRow.appendChild(secondCol)

  return formRow
}

function createFormButtonsRow(): HTMLElement {

  const formRow = document.createElement('div')
  formRow.classList.add('row')

  const firstCol = document.createElement('div')
  firstCol.classList.add('col')

  const addRowsButton = document.createElement('button')
  addRowsButton.classList.add('btn')
  addRowsButton.classList.add('btn-secondary')
  addRowsButton.innerText = 'Add More'
  addRowsButton.onclick = onAddRows

  const secondCol = document.createElement('div')
  secondCol.classList.add('col')

  const saveButton = document.createElement('button')
  saveButton.classList.add('btn')
  saveButton.classList.add('btn-primary')
  saveButton.id = 'sdx-config-save'
  saveButton.innerText = 'Save'
  saveButton.onclick = onSave

  firstCol.appendChild(addRowsButton)
  secondCol.appendChild(saveButton)
  formRow.appendChild(firstCol)
  formRow.appendChild(secondCol)

  return formRow

}


async function saveConfig(aliases: Map<string, string>, showAll: boolean) {
  const config = { aliases, show_all: showAll }

  await browser.storage.local.set(config)
}


async function onSave(e: Event) {
  e.preventDefault()

  const saveButton: HTMLButtonElement = document.querySelector('#sdx-config-save')!!
  saveButton.setAttribute('disabled', '')
  saveButton.innerText = 'Saving...'

  const aliasGroup: HTMLElement = document.querySelector('#sdx-aliases-group')!!
  const showAllCheckbox: HTMLInputElement = document.querySelector('#showAllTags')!!
  const showAll: boolean = showAllCheckbox.checked
  
  const aliases: Map<string, string> = new Map()

  const aliasRows = Array.from(aliasGroup.querySelectorAll('.row'))

  aliasRows.forEach((row: Element) => {
    const aliasInput: HTMLInputElement = row.querySelector('.sdx-alias-input')!!
    const slugInput: HTMLInputElement = row.querySelector('.sdx-slug-input')!!

    if(!isNullOrWhitespace(aliasInput.value) && !isNullOrWhitespace(slugInput.value)) {
      aliases.set(slugInput.value, aliasInput.value)
    }
  })

  const updatedConfig = new Config(aliases, showAll)

  await Config.saveConfig(updatedConfig)

  const saveSuccessBanner = document.createElement('div')
  saveSuccessBanner.classList.add('alert')
  saveSuccessBanner.classList.add('alert-success')
  saveSuccessBanner.setAttribute('role', 'alert')
  saveSuccessBanner.innerText = 'Save successful!'

  saveButton.removeAttribute('disabled')
  saveButton.innerText = 'Save'

  const container = document.querySelector('.container')!!
  container.appendChild(saveSuccessBanner)
}

function onAddRows(e: Event) {
  e.preventDefault()
  const form = document.querySelector(`#${FORM_ID}`)!!
  const aliasesGroup: HTMLElement = form.querySelector('#sdx-aliases-group')!!
  for(let i = 0; i < NUMBER_OF_BLANK_ROWS; i++) {
    aliasesGroup.appendChild(createFormRow())
  }
}

function isNullOrWhitespace(input: string | undefined | null): boolean {
  if (typeof input === 'undefined' || input === null) {
    return true;
  }
  return input.replace(/\s/g, '').length < 1;
}
