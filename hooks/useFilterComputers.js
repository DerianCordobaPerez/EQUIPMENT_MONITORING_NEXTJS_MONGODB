import { useState } from 'react'

export function useFilterComputer({ computers }) {
  const [filteredComputers, setFilteredComputers] = useState(computers)

  const handleFilterComputers = ({ target }) => {
    const { value } = target

    const filtered =
      value !== 'all'
        ? computers.filter((computer) =>
            computer.connected.toLowerCase().includes(value.toLowerCase()),
          )
        : computers

    setFilteredComputers(filtered)
  }

  return { filteredComputers, handleFilterComputers }
}
