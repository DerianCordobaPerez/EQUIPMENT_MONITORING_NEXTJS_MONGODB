import useSWR from 'swr'
import { useState, useEffect } from 'react'

/**
 * It returns a `data` object, a `isLoading` boolean, and an `isError` boolean
 */
export function useDirectory({ path }) {
  const [autoRefresh, setAutoRefresh] = useState(false)

  const { data, error } = useSWR(path, {
    refreshInterval: autoRefresh ? 2500 : null,
  })

  useEffect(() => {
    if (data) {
      setAutoRefresh(true)
    }
  }, [data])

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
