import { ToggleContext } from 'hooks/useToggle'
import { useContext } from 'react'

export default function ComputerTopology({ topology }) {
  const { isToggleable } = useContext(ToggleContext)

  return (
    <>
      <h3 className="text-white text-center">Network topology</h3>

      <div className="row row-cols-1 row-cols-md-4 g-4 mt-2 justify-content-evenly">
        {isToggleable('network') ? (
          Object.keys(topology).map((network) => (
            <div
              key={network}
              className="bg-gray p-2 shadow rounded col me-4 contentBox"
            >
              <p className="fw-bold text-white">Network 192.168.{network}.0</p>
              {topology[network].map((ip) => (
                <ul key={ip}>
                  <li className="text-white">{ip}</li>
                </ul>
              ))}
            </div>
          ))
        ) : (
          <div className="bg-gray p-2 shadow rounded col me-4 contentBox">
            <p className="fw-bold text-white">
              Show topology using toggle in Sidebar
            </p>
          </div>
        )}
      </div>
    </>
  )
}
