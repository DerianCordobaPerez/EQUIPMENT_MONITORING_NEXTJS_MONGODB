import Link from 'next/link'
import { API_COMPUTERS } from 'configs/env'

export default function Index({ computers }) {
  if (!computers.length) {
    return <div>Loading...</div>
  }

  return computers.map((computer) => (
    <div key={computer.ip}>
      <Link href={`/computers/[id]/show`} as={`/computers/${computer.ip}/show`}>
        <a>{computer.ip}</a>
      </Link>
    </div>
  ))
}

export async function getServerSideProps() {
  const res = await fetch(`${API_COMPUTERS}`)
  const { data: computers } = await res.json()

  return {
    props: {
      computers,
    },
  }
}
