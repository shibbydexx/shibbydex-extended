import React from "react"
import { FileDetails } from "./models"

interface Props {
  details: FileDetails
}


const FileCard: React.FC<Props> = ({details}) => <div className="col-md-12">
  <div className="card-body">
    <h3 className="card-title">
      <a href={details.link} className="card-link">{details.title}</a>
    </h3>
    <hr className="bg-light"></hr>
    <p className="card-text text-light">
      {details.description}
    </p>
  </div>
  <div className="card-footer p-0">
    <small className="text-muted">
      <dl className="row">
        <dt className="text-center col-sm-2">Tier: {details.tier}</dt>
        <dt className="text-center col-sm-2 ">
          Audience: {details.audience}
        </dt>
        <dt className="text-center col-sm-3">Hypnosis Type: {details.type}</dt>
        <dt className="text-center col-sm-2">File Length: {details.length}</dt>
        <dt className="text-center col-sm-3">Release Date: {details.releaseDate}</dt>
      </dl>
    </small>
  </div>
</div>

export { FileCard }
