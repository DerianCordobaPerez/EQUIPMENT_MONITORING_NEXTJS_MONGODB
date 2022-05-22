import Form from 'components/form/form'
import { useComputer } from 'hooks/useComputer'
import { useRouter } from 'next/router'
import Layout from 'components/layout'
import Loading from 'components/loading'
import { getCommands, getRoles } from 'utils/getInfo'
import { mutate } from 'swr'

export default function Edit() {
  const router = useRouter()
  const { ip } = router.query
  const { data: computer, isLoading } = useComputer({ ip })
  const commands = getCommands()
  const roles = getRoles()

  const formData = [
    {
      component: 'page',
      label: 'Name and Ip address',
      uid: 'page-number-one',
      fields: [
        {
          component: 'text',
          label: 'Name',
          type: 'text',
          uid: 'name',
          value: computer?.name,
        },
        {
          component: 'text',
          label: 'Ip address',
          type: 'text',
          uid: 'ip',
          value: computer?.ip,
        },
      ],
    },
    {
      component: 'page',
      label: 'Role and commands',
      uid: 'page-number-two',
      fields: [
        {
          component: 'select',
          label: 'Role',
          uid: 'role',
          options: roles,
          value: computer?.role,
        },
        {
          component: 'select',
          label: 'Commands',
          uid: 'commands',
          options: commands,
          multiple: true,
          value: computer?.commands,
        },
      ],
    },
  ]

  const handleSubmit = async (data) => {
    try {
      const response = await fetch(`/api/computers/${ip}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error(response.status)
      }

      mutate(`/api/computers/${ip}`, data, false)
      router.push('/computers')
    } catch (e) {
      console.error(e)
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <Layout>
      <Form
        data={formData}
        closeRoute="/computer"
        handleSubmit={handleSubmit}
      />
    </Layout>
  )
}
