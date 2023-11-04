import { useQuery } from '@tanstack/react-query'
import { fetchListeningTest } from '../../services/ListeningService'

const useFetchListeningTest = () => {
  const { data, isLoading } = useQuery(['listening'], () => fetchListeningTest(), {})
  return { listeningData: data, isLoading }
}

export default useFetchListeningTest
