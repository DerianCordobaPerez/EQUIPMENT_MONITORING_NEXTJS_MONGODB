import Form from 'components/form/form'
import Layout from 'components/layout'
import { getCommands, getRoles } from 'utils/getInfo'
import { useState } from 'react'
import { useRouter } from 'next/router'

/**
 * It renders a form with two pages, the first page has a name and ip address field, the second page
 * has a role and commands field
 * @returns A function that returns a layout component with a form component.
 */
export default function Create() {
  const [message, setMessage] = useState('')
  const router = useRouter()
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
        },
        {
          component: 'text',
          label: 'Ip address',
          type: 'text',
          uid: 'ip',
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
        },
        {
          component: 'select',
          label: 'Commands',
          uid: 'commands',
          options: commands,
          multiple: true,
        },
      ],
    },
  ]

  const handleSubmit = async (data) => {
    try {
      const response = await fetch('/api/computers', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(res.status)
      }

      router.push('/computers')
    } catch (err) {
      setMessage('Failed to create computer')
    }
  }

  return (
    <Layout>
      <Form
        data={formData}
        closeRoute="/computers"
        handleSubmit={handleSubmit}
      />
      {message && <p>{message}</p>}
    </Layout>
  )
}
