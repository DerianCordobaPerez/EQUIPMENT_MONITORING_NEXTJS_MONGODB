import Link from 'next/link'
import ComputersList from './computerList'
import ComputerTopology from './computerTopology'

export default function ComputersFeed({ computers, topology }) {
  return computers.length > 0 ? (
    <>
      <div className="row row-cols-1 row-cols-md-4 g-4 mt-2 justify-content-evenly">
        <ComputersList computers={computers} />
      </div>

      <hr className="hr__computers" />

      <ComputerTopology topology={topology} />
    </>
  ) : (
    <div className="my-4 text-success text-center">
      <h4>
        There are no computers within the monitoring system or there are no
        matches.
      </h4>
      <Link href="/computers/create">
        <a className="btn btn-success mt-5 animation">
          <i className="bi bi-plus-lg"></i>
          Create computer
        </a>
      </Link>
      <i className="bi bi-hand-index-thumb-fill d-block hand"></i>
    </div>
  )
}
