import Form from 'components/form/form'
import Layout from 'components/layout'
import Loading from 'components/loading'
import { useComputer } from 'hooks/useComputer'
import { useRouter } from 'next/router'
import { getServices } from 'utils/getInfo'

export default function Backup() {
  const router = useRouter()
  const { ip } = router.query
  const { data: computer, isLoading } = useComputer({ ip })
  const services = getServices()

  const formData = [
    {
      component: 'page',
      label: 'Select a backup services',
      uid: 'page-number-one',
      fields: [
        {
          component: 'select',
          label: 'Services',
          uid: 'services',
          options: services,
          multiple: true,
        },
      ],
    },
  ]

  const handleSubmit = async (data) => {
    try {
      const response = await fetch(`/api/computers/${ip}/backup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, ip, name: computer?.role }),
      })
      if (!response.ok) {
        throw new Error(response.status)
      }
      router.push('/computers')
    } catch (err) {
      console.log(`Failed to create computer ${err}`)
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <Layout title={`Backup to computer`}>
      <Form
        data={formData}
        closeRoute="/computers"
        handleSubmit={handleSubmit}
      />
    </Layout>
  )
}
