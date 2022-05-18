import useSWR from 'swr'
import { useState, useEffect } from 'react'

/**
 * It fetches the computer data from the API and returns it, along with some metadata about the fetch
 * @returns computer: data,
 *   isLoading: !data && !error,
 *   isError: error,
 */
export function useComputer({ ip }) {
  const [autoRefresh, setAutoRefresh] = useState(false)

  const { data, error } = useSWR(`/api/computers${ip ? `/${ip}` : ''}`, {
    refreshInterval: autoRefresh ? 5000 : null,
  })

  useEffect(() => {
    if (data) {
      setAutoRefresh(true)
    }
  }, [data])

  return {
    data,
    isLoading: !data && !error,
    isError: error,
  }
}
