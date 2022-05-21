import Layout from 'components/layout'
import { useRouter } from 'next/router'
import { ToggleContext } from 'hooks/useToggle'
import { useVanillaTilt } from 'hooks/useVanillaTilt'
import { useContext } from 'react'
import { useComputer } from 'hooks/useComputer'
import Loading from 'components/loading'

/**
 * It renders a loading component while the data is being fetched, and then it renders the computer's
 * name, a delete button, and a list of commands
 * @returns The Show component is being returned.
 */
export default function Show() {
  const router = useRouter()
  const { ip } = router.query
  const { data: computer, isLoading } = useComputer({ ip })
  const { handleToggle, isToggleable } = useContext(ToggleContext)
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
      {isLoading ? (
        <Loading />
      ) : (
        <>
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
            computer.commands
              .filter((command) => command !== false)
              .map(({ name, output, time }) => (
                <pre key={name} className="p-2 shadow contentBox">
                  <div className="d-flex justify-content-between align-items-center bg__command">
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
        </>
      )}
    </Layout>
  )
}
