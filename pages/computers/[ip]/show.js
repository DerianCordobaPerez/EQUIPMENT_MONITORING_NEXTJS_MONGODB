import Layout from 'components/layout'
import { API_COMPUTERS } from 'configs/env'
import { useRouter } from 'next/router'
import { execute } from 'utils/commands'
import { useEffect } from 'react'
import { init } from 'vanilla-tilt'

export default function Show({ computer, commands }) {
  const router = useRouter()
  const { ip } = router.query

  useEffect(() => {
    const boxs = document.querySelectorAll('.contentBox')
    boxs.forEach((box) =>
      init(box, {
        max: 10,
        speed: 100,
        glare: true,
        'max-glare': 1,
      }),
    )
  }, [])

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

        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>

      <div className="row">
        {commands
          .filter((command) => command !== false)
          .map(({ name, output }) => (
            <article key={name} className="col-md-6">
              <pre className="p-2 shadow contentBox">
                <h5 className="text-decoration-underline">{name}</h5>
                <code>{output}</code>
              </pre>
            </article>
          ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const { ip } = params
  const response = await fetch(`${API_COMPUTERS}/${ip}`)
  const { data: computer } = await response.json()

  const commands = computer.commands.map((command) => ({
    name: command,
    output: execute({ command: `./monitoring.sh ${ip} ${command}` }),
  }))

  return {
    props: {
      computer,
      commands,
    },
  }
}
