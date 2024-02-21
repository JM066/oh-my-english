export interface User {
  email: string
  password: string
}

export interface AuthState {
  status: 'pending' | 'idle'
  error?: string | null
  data?: AuthLogin
  isLoggedIn: boolean
}

export type AuthLogin = {
  userId: string
  email: string
  displayName?: string
}
