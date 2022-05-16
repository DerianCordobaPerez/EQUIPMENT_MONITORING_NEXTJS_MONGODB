import ComputerItem from './computerItem'

export default function ComputersList({ computers }) {
  return computers.map((computer) => (
    <ComputerItem key={computer.ip} computer={computer} />
  ))
}
