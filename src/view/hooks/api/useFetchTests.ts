import { useQuery } from '@tanstack/react-query'
import listening from '../../services/ListeningService'

const useFetchTests = (title: string | undefined) => {
  const cacheKey = ['listening', title]
  const { data, isLoading, isSuccess } = useQuery(cacheKey, () => listening.fetchTests(title), {
    enabled: Boolean(title),
  })
  return { tests: data, isLoading, isSuccess }
}

export default useFetchTests
