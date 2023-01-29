console.log('creating form')

const FORM_ID = 'sdx-config-form'



document.addEventListener('DOMContentLoaded', () => {
  console.log('creating form')
  const form = document.querySelector(`#${FORM_ID}`)

  if(form) {
    form.appendChild(createFormRow())
    form.appendChild(createFormButtonsRow())
  } else { console.error(`could not locate form with id ${FORM_ID}`) }
});

function createFormRow(alias: string = '', slug: string = ''): HTMLElement {
  const formRow = document.createElement('div')
  formRow.classList.add('row')

  const firstCol = document.createElement('div')
  firstCol.classList.add('col')

  const aliasInput: HTMLInputElement = document.createElement('input')
  aliasInput.type = 'text'
  aliasInput.textContent = alias
  aliasInput.classList.add('form-control')
  aliasInput.placeholder = 'Alias'


  const secondCol = document.createElement('div')
  secondCol.classList.add('col')

  const tagSlugInput: HTMLInputElement = document.createElement('input')
  tagSlugInput.type = 'text'
  tagSlugInput.textContent = slug
  tagSlugInput.classList.add('form-control')
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
  addRowsButton.innerText = 'Add more rows'
  addRowsButton.onclick = onAddRows

  const secondCol = document.createElement('div')
  secondCol.classList.add('col')

  const saveButton = document.createElement('button')
  saveButton.classList.add('btn')
  saveButton.classList.add('btn-primary')
  saveButton.innerText = 'Save'
  saveButton.onclick = onSave

  firstCol.appendChild(addRowsButton)
  secondCol.appendChild(saveButton)
  formRow.appendChild(firstCol)
  formRow.appendChild(secondCol)

  return formRow

}


function onSave(e: Event) {
  e.preventDefault()
  console.log('save')
}

function onAddRows(e: Event) {
  e.preventDefault()
  console.log('add rows')
}
