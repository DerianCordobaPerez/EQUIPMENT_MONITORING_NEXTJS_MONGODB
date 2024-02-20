export default function NotFoundComputers() {
  return (
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
  );
}
