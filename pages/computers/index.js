import Layout from 'components/layout'
import Sidebar from 'components/sidebar'
import { ToggleContext } from 'hooks/useToggle'
import { useVanillaTilt } from 'hooks/useVanillaTilt'
import { useFilterComputer } from 'hooks/useFilterComputers'
import ComputersFeed from 'components/computer/computerFeed'
import { useContext, useEffect } from 'react'
import { useComputer } from 'hooks/useComputer'
import Loading from 'components/loading'
import Modal from 'components/modal'
import { useTopology } from 'hooks/useTopologyNetwork'
import Alert from 'components/alert'

/**
 * It's a function that returns a layout component with a loading component or a sidebar component, a
 * title, and a computers feed component
 * @returns The return statement is returning the following:
 */
export default function Index({ network }) {
  const { data: computers, isLoading } = useComputer({ ip: null })
  const { data: topology, isLoading: isLoadingTopology } = useTopology()
  const { handleToggle, isToggleable } = useContext(ToggleContext)
  const { filteredComputers, handleFilterComputers, changeFilteredComputers } =
    useFilterComputer({
      computers: computers || [],
    })
  useVanillaTilt({ element: '.contentBox' })

  useEffect(() => {
    changeFilteredComputers(computers || [])
  }, [computers])

  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <button
            className="toggle__aside"
            onClick={() => handleToggle('aside')}
          >
            <i className="bi bi-list"></i>
          </button>

          <h2 className="text-center title__computers">
            Select the computer to monitor
          </h2>
          <Sidebar toggle={isToggleable('aside')}>
            <div className="d-flex flex-column align-items-center mb-4">
              <label className="text-white fs-5">Filter computers</label>

              <select
                className="aside__item select__input"
                onChange={handleFilterComputers}
                name="select__input"
              >
                <option value="all">All</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>

              <hr className="hr__computers w-75" />

              <label className="text-white fs-5">
                {!isToggleable('networkModal') ? 'Show' : 'Hide'} topology
              </label>

              <button
                className="aside__item"
                onClick={() => handleToggle('networkModal')}
              >
                {!isToggleable('networkModal') ? 'Show' : 'Hide'} topology
              </button>
            </div>
          </Sidebar>

          <ComputersFeed computers={filteredComputers} />

          <Modal title="Network topology" id="networkModal">
            {isLoadingTopology ? (
              <Alert type="info">Loading topology...</Alert>
            ) : (
              <pre>{topology}</pre>
            )}
          </Modal>
        </>
      )}
    </Layout>
  )
}
