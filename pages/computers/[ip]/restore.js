import { useRouter } from 'next/router'
import Form from 'components/form/form'
import Layout from 'components/layout'
import { useDirectory } from 'hooks/useDirectory'
import Loading from 'components/loading'

export default function Restore() {
  const { query } = useRouter()
  const { ip } = query
  const { data: parentDirectory, isLoading } = useDirectory({
    path: '/api/directories/backup',
  })

  return isLoading ? (
    <Loading />
  ) : (
    <Layout>
      <div className="mx-auto bg-light shadow rounded">
        {parentDirectory.map(({ name, files }) => (
          <div key={name} className="p-4">
            <h4 className="fw-bold">{name}</h4>
            <ul className="list-disc list-inside">
              {files.map((file) => (
                <li key={file}>{file}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Layout>
  )
}
