import Form from 'components/form/form'
import Layout from 'components/layout'

export default function Create() {
  const formData = {
    component: 'field_group',
    label: 'Create Computer',
    uid: 'field-group-computers',
    fields: [
      {
        component: 'text',
        label: 'Name',
        uid: 'name',
        uid: 'name',
      },
      {
        component: 'text',
        label: 'IP Address',
        uid: 'ip',
        type: 'text',
      },
      {
        component: 'select',
        label: 'Role',
        uid: 'role',
        options: [
          { label: 'Dhcp', value: 'dhcp' },
          { label: 'Dns', value: 'dns' },
          { label: 'Web', value: 'web' },
          { label: 'Snmp', value: 'snmp' },
          { label: 'Client', value: 'client' },
        ],
      },
    ],
  }

  return (
    <Layout>
      <Form data={formData} />
    </Layout>
  )
}
