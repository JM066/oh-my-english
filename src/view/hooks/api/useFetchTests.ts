import { useQuery } from '@tanstack/react-query'
import { fetchTests } from '../../../services/listening'

const useFetchTests = (title: string | undefined) => {
  const cacheKey = ['listening', title]
  const { data, isLoading, isSuccess } = useQuery(cacheKey, () => fetchTests(title), {
    enabled: Boolean(title),
  })
  return { tests: data, isLoading, isSuccess }
}

export default useFetchTests
