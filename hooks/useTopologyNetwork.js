import useSWR from 'swr'
import { useState, useEffect } from 'react'

export function useTopology() {
  const [autoRefresh, setAutoRefresh] = useState(false)

  const { data, error } = useSWR('/api/computers/topology', {
    refreshInterval: autoRefresh ? 5000 : null,
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
