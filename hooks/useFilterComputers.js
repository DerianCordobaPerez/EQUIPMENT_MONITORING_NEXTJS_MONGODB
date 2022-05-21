import { useState } from 'react'

/**
 * It returns an object with three properties:
 *
 * - filteredComputers: an array of computers that is filtered based on the value of the select element
 * - handleFilterComputers: a function that filters the computers based on the value of the select
 * element
 * - changeFilteredComputers: a function that changes the value of filteredComputers
 *
 * The first property is a state variable that is initialized with the computers array. The second
 * property is a function that filters the computers based on the value of the select element. The
 * third property is a function that changes the value of filteredComputers
 * @returns An object with three properties: filteredComputers, handleFilterComputers, and
 * changeFilteredComputers.
 */
export function useFilterComputer({ computers }) {
  const [filteredComputers, setFilteredComputers] = useState(computers)

  const changeFilteredComputers = (values) => setFilteredComputers(values)

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

  return { filteredComputers, handleFilterComputers, changeFilteredComputers }
}
