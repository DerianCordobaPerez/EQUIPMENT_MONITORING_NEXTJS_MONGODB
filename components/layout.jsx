import Head from 'next/head'
import Navbar from 'components/navbar'

export default function Layout({ children, title }) {
  title ??= 'Monitoring App'

  return (
    <main>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />

      <div className="container my-4">{children}</div>
    </main>
  )
}
