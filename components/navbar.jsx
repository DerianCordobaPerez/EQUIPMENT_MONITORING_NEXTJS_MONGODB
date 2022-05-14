import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-1 border-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Equipment Monitoring
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/computers">
                Computers
              </a>
            </li>
          </ul>
          <Link href="/computers/create">
            <a className="btn btn-success">
              <i className="bi bi-plus-lg"></i>
              Create computer
            </a>
          </Link>
        </div>
      </div>
    </nav>
  )
}
