import { useQuery } from '@tanstack/react-query'
import { getListening } from '../../../services/listening'

const useListeningQuestion = (title?: string) => {
  const cacheKey = ['listening', title]
  const { data, isLoading, isSuccess } = useQuery(cacheKey, () => getListening(title), {
    enabled: Boolean(title),
  })
  return { listeningData: data, isLoading, isSuccess }
}

export default useListeningQuestion
