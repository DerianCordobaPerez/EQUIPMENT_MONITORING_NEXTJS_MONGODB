import { useRouter } from 'next/router'
import Form from 'components/form/form'
import Layout from 'components/layout'
import { useDirectory } from 'hooks/useDirectory'
import Loading from 'components/loading'
import { getServices } from 'utils/getInfo'
import Alert from 'components/alert'
import { useComputer } from 'hooks/useComputer'

/**
 * It fetches the backup directory from the server and displays it
 */
export default function Restore() {
  const router = useRouter()
  const { ip } = router.query
  const { data: computer } = useComputer({ ip })
  const { data: directory, isLoading } = useDirectory({
    path: '/api/directories/backup',
  })

  const services = getServices()

  const radioButtonsFiles = directory?.subDirectories.map(({ name, files }) => {
    return {
      component: 'options',
      label: name,
      uid: 'file',
      type: 'radio',
      options: files.map((file) => ({
        component: 'option',
        label: file,
        value: `${name}/${file}`,
      })),
    }
  })

  const formData = [
    {
      component: 'page',
      label: `Restore backup in pc ${ip}`,
      uid: 'page-number-one',
      fields: [
        radioButtonsFiles,
        {
          component: 'select',
          label: 'Services',
          uid: 'services',
          options: services,
          multiple: true,
        },
      ].flat(Infinity),
    },
  ]

  const handleSubmit = async (data) => {
    try {
      const response = await fetch(`/api/computers/${ip}/restore`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(response.status)
      }

      router.push('/computers')
    } catch (e) {
      console.error(e)
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <Layout title="Restore backup">
      {!computer?.connected ? (
        <Alert type="warning">
          <span className="fw-bold">Warning!</span> The computer is not turned
          on.
        </Alert>
      ) : (
        <Form
          data={formData}
          closeRoute="/computers"
          handleSubmit={handleSubmit}
        />
      )}
    </Layout>
  )
}
