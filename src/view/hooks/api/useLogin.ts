import { useQuery } from '@tanstack/react-query'
import authService from '../../../services/auth'
import { type User } from '../../../types/Auth'

const useLogin = (params: User) => {
  const cacheKey = ['login', params.email]
  const { data, isLoading, isSuccess } = useQuery(cacheKey, () => authService.userLogin(params), {
    enabled: Boolean(params),
  })
  return { loginData: data, isLoading, isSuccess }
}

export default useLogin
