import { useQuery } from '@tanstack/react-query'
import { fetchTests } from '../../../services/listening'

const useFetchListeningTest = (title: string | undefined) => {
  const cacheKey = ['listening', title]
  const { data, isLoading, isSuccess } = useQuery(cacheKey, () => fetchTests(title), {
    enabled: Boolean(title),
  })
  return { testItems: data, isLoading, isSuccess }
}

export default useFetchListeningTest
