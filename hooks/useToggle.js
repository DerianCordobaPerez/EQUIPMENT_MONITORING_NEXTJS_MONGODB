import { createContext, useState } from 'react'

export const ToggleContext = createContext()

/**
 * It provides a context object with a handleToggle function and an isToggleable function
 */
export default function ToggleProvider({ children }) {
  const [toggle, setToggle] = useState({})

  const handleToggle = (name) => {
    const index = toggle[name]
    setToggle({ ...toggle, [name]: !index })
  }

  const isToggleable = (name) => toggle[name]

  return (
    <ToggleContext.Provider value={{ handleToggle, isToggleable }}>
      {children}
    </ToggleContext.Provider>
  )
}
