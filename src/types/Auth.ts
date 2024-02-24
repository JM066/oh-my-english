export interface LoginInfo {
  email: string
  password: string
}
export interface UserName {
  name: string
}
export interface AuthState {
  status: 'pending' | 'idle'
  error?: string | null
  data?: AuthLogin
  isLoggedIn: boolean
}
export type SignUpInfo = LoginInfo & UserName

export type AuthLogin = {
  userId: string
  email: string
  displayName?: string
}
