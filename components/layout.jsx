import Head from 'next/head'

export default function Layout({ children, title }) {
  title ??= 'Monitoring App'

  return (
    <main className="container my-4">
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </main>
  )
}
