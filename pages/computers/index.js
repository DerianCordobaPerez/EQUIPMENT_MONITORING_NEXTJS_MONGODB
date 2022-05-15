import Link from 'next/link'
import { API_COMPUTERS } from 'configs/env'
import Layout from 'components/layout'
import { isConnected } from 'models/computer'

export default function Index({ computers, connected }) {
  return (
    <Layout>
      <div className="computers__container">
        <h2 className="text-center title__computers">
          Select the computer to monitor
        </h2>

        {computers.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-4 g-4 mt-2 justify-content-evenly">
            {computers.map(({ name, role, ip }, index) => (
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

                  <div className={`separator__${connected[index]}`}></div>

                  <div className="card__footer">
                    <Link
                      href={'computers/[id]/show'}
                      as={`computers/${ip}/show`}
                    >
                      <a className="me-1">
                        <i className="bi bi-eye-fill"></i>
                      </a>
                    </Link>

                    <Link
                      href={'computers/[id]/edit'}
                      as={`computers/${ip}/edit`}
                    >
                      <a className="ms-1">
                        <i className="bi bi-pencil-square"></i>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="my-4 text-success text-center">
            <h4>There are no computers within the monitoring system</h4>
            <Link href="/computers/create">
              <a className="btn btn-success mt-5 animation">
                <i className="bi bi-plus-lg"></i>
                Create computer
              </a>
            </Link>
            <i className="bi bi-hand-index-thumb-fill d-block hand"></i>
          </div>
        )}
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${API_COMPUTERS}`)
  const { data: computers } = await res.json()

  const connected = computers.map((computer) =>
    isConnected({ ip: computer.ip }) ? 'online' : 'offline',
  )

  console.log(connected)

  return {
    props: {
      computers,
      connected,
    },
  }
}
