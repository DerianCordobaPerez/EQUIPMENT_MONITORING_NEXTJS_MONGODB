import { API_COMPUTERS } from 'configs/env'
import Layout from 'components/layout'
import { isConnected } from 'models/computer'
import Sidebar from 'components/sidebar'
import { getNetworkTopology } from 'utils/network'
import { ToggleContext } from 'hooks/useToggle'
import { useVanillaTilt } from 'hooks/useVanillaTilt'
import { useFilterComputer } from 'hooks/useFilterComputers'
import ComputersFeed from 'components/computer/computerFeed'
import { useContext } from 'react'

export default function Index({ computers, topology }) {
  const { handleToggle, isToggleable } = useContext(ToggleContext)
  const { filteredComputers, handleFilterComputers } = useFilterComputer({
    computers,
  })
  useVanillaTilt({ element: '.contentBox' })

  return (
    <Layout>
      <button className="toggle__aside" onClick={() => handleToggle('aside')}>
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
        </div>

        <div className="d-flex flex-column align-items-center">
          <span className="text-white fs-5">Show topology networks</span>
          <button
            className="aside__item"
            onClick={() => handleToggle('network')}
          >
            {isToggleable('network') ? 'Hide' : 'Show'} topology
          </button>
        </div>
      </Sidebar>

      <ComputersFeed computers={filteredComputers} topology={topology} />
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${API_COMPUTERS}`)
  const { data: computers } = await res.json()

  const connected = computers.map((computer) =>
    isConnected({ ip: computer.ip }) ? 'online' : 'offline',
  )

  return {
    props: {
      computers: computers.map((computer, index) => ({
        ...computer,
        connected: connected[index],
      })),
      topology: getNetworkTopology({
        ips: computers.map((computer) => computer.ip),
      }),
    },
  }
}
