import React from "react"

interface Props {
  callback: (newFilter: string) => void
}

interface State {
  filterText: string
  filterType: string
}


class FileFilterForm extends React.Component<Props, State> {
  render() {
    return (
      <form className="row" id="formFilter" action="https://shibbydex.com/files" method="GET" data-turboform="">
      <input className="col-lg-10 col-sm-8 form-control bg-dark text-light" name="filter" id="filter" value="" placeholder="filter"></input>
      <div className="dropdown bootstrap-select col-lg-2 col-sm-4 form-control"><select className="col-lg-2 col-sm-4 form-control selectpicker" data-style="btn-dark" name="sort" id="sort">
      <option value="1" selected={true}>Sort by Newest</option>
      <option value="2">Sort by Oldest</option>
      <option value="3">Sort by Name (A-Z)</option>
      <option value="4">Sort by Name (Z-A)</option>
      <option value="5">Sort by Most Popular</option>
      <option value="6">Sort by Shortest</option>
      <option value="7">Sort by Longest</option>
      <option value="8">Sort by Random</option>
      </select><button type="button" tabIndex={-1} className="btn dropdown-toggle btn-dark" data-toggle="dropdown" role="combobox" aria-owns="bs-select-4" aria-haspopup="listbox" aria-expanded="false" data-id="sort" title="Sort by Newest"><div className="filter-option"><div className="filter-option-inner"><div className="filter-option-inner-inner">Sort by Newest</div></div> </div></button><div className="dropdown-menu "><div className="inner show" role="listbox" id="bs-select-4" tabIndex={-1}><ul className="dropdown-menu inner show" role="presentation"></ul></div></div></div>
      </form>
    )
  }
}

export { FileFilterForm }
