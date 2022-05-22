import Form from 'components/form/form'
import Layout from 'components/layout'
import Loading from 'components/loading'
import { useComputer } from 'hooks/useComputer'
import { useRouter } from 'next/router'

/**
 * It renders a form that allows the user to select a backup service and then sends a POST request to
 * the server to create a backup
 */
export default function Backup() {
  const router = useRouter()
  const { ip } = router.query
  const { data: computer, isLoading } = useComputer({ ip })

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
          options: [
            { label: 'Dhcp', value: 'dhcp' },
            { label: 'Dns', value: 'dns' },
            { label: 'Web', value: 'web' },
            { label: 'Snmp', value: 'snmp' },
            { label: 'All', value: 'all' },
          ],
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
