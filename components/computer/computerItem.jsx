import Link from 'next/link'

export default function ComputerItem({ computer }) {
  const { name, role, ip, connected } = computer

  return (
    <div key={role} className="col me-4">
      <div className="card__computers px-4 pt-2">
        <div className="overlay"></div>
        <div className="card-body pt-2">
          <h6 className="card-title fw-bold">{name}</h6>
          <div className="body__details">
            <p className="card-text">{role}</p>
            <p className="card-text">{ip}</p>
            <i className="bi bi-laptop-fill"></i>
          </div>
        </div>

        <div className={`separator__${connected}`}></div>

        <div className="card__footer">
          <Link href={'computers/[id]/show'} as={`computers/${ip}/show`}>
            <a className="me-1">
              <i className={`bi bi-eye-fill icon color-${connected}`}></i>
            </a>
          </Link>

          <Link href={'computers/[id]/edit'} as={`computers/${ip}/edit`}>
            <a className="ms-1">
              <i className={`bi bi-pencil-square icon color-${connected}`}></i>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
