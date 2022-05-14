import useSWR from 'swr'

export function useComputer({ ip }) {
  const { data, error } = useSWR(`/api/computers/${ip}`)

  return {
    computer: data,
    isLoading: !data && !error,
    isError: error,
  }
}
