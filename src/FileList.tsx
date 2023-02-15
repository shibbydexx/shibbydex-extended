import React from "react"
import { FileDetails } from "./models"
import { FileCard } from "./FileCard"
import { FileFilterForm } from "./FileFilterForm"

interface Props {
  files: FileDetails[]
}

const FileList: React.FC<Props> = ({files}) => <>
  <FileFilterForm callback={() => {}}></FileFilterForm>
  <div className="row justify-content-center">
    {files.map((file: FileDetails) => ( 
      <div className="col-12">
        <FileCard details={file}></FileCard>
      </div>
    ))}
  </div>
</>


export { FileList }
