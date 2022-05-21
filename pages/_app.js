import { fetcher } from 'utils/fetcher'
import { SWRConfig } from 'swr'
import { useEffect } from 'react'
import ToggleProvider from 'hooks/useToggle'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'styles/globals.scss'

/**
 * We're using the `useEffect` hook to import the bootstrap javascript file
 * @returns The return value of the function is the component that is being rendered.
 */
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  return (
    <SWRConfig value={{ fetcher }}>
      <ToggleProvider>
        <Component {...pageProps} />
      </ToggleProvider>
    </SWRConfig>
  )
}

export default MyApp
