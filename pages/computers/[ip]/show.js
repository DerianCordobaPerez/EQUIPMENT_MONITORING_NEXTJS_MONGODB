import Layout from 'components/layout'
import { API_COMPUTERS } from 'configs/env'
import { useRouter } from 'next/router'
import { isConnected, run } from 'models/computer'
import { ToggleContext } from 'hooks/useToggle'
import { useVanillaTilt } from 'hooks/useVanillaTilt'
import { useContext } from 'react'

export default function Show({ computer, commands }) {
  const { handleToggle, isToggleable } = useContext(ToggleContext)
  const router = useRouter()
  const { ip } = router.query
  useVanillaTilt({ element: '.contentBox' })

  const handleDelete = async () => {
    try {
      await fetch(`/api/computers/${ip}`, {
        method: 'DELETE',
      })

      router.push('/computers')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <div className="d-flex align-items-center w-100 justify-content-between bg-light px-4 py-2 shadow rounded mb-4">
        <h4>Monitoring {computer.name} pc</h4>

        <button
          disabled={!computer.connected}
          className="btn btn-danger"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

      {computer.connected ? (
        commands
          .filter((command) => command !== false)
          .map(({ name, output, time }) => (
            <pre key={name} className="p-2 shadow contentBox">
              <div className="d-flex justify-content-between align-items-center">
                <button
                  className="btn btn-link text-white"
                  onClick={() => handleToggle(name)}
                >
                  <i className="bi bi-caret-down-fill"></i>
                </button>

                <h5 className="text-decoration-underline">{name}</h5>

                <span className="text-white fw-bold opacity-50">
                  Execute time: {time}
                </span>
              </div>

              {!isToggleable(name) && <code>{output}</code>}
            </pre>
          ))
      ) : (
        <pre className="p-2 shadow contentBox">
          <h2 className="text-center">Computer Offline</h2>
          <div className="separator__offline"></div>
        </pre>
      )}
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const { ip } = params
  const response = await fetch(`${API_COMPUTERS}/${ip}`)
  const { data: computer } = await response.json()

  const { role, commands } = computer

  const connected = isConnected({ ip })

  return {
    props: {
      computer: {
        ...computer,
        connected,
      },
      commands: connected && run({ ip, role, commands }),
    },
  }
}
