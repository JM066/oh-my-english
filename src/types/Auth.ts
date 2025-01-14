export interface UserName {
  name: string
}
export interface AuthState {
  status: 'pending' | 'idle' | 'failed'
  error?: string | null
  data: AuthLogin
  isLoggedIn: boolean
  isRegistered: boolean
  isFetched: boolean
}

export type AuthLogin = {
  userId: string
  email: string
  displayName?: string
  created_at: Date
}

export type LoginRequest = {
  email: string
  password: string
}
export interface SignUpValues {
  displayName: string
  email: string
  password: string
  passwordConfirmation: string
}
export const FIELD_NAMES = ['email', 'password'] as const
