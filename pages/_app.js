import { fetcher } from 'utils/fetcher'
import { SWRConfig } from 'swr'
import 'bootstrap/dist/css/bootstrap.css'
import 'styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
