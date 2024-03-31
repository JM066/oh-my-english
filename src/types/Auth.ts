import { type Timestamp } from 'firebase/firestore'

export interface UserName {
  name: string
}
export interface AuthState {
  status: 'pending' | 'idle'
  error?: string | null
  data?: AuthLogin
  isLoggedIn: boolean
  isRegistered: boolean
}

export type AuthLogin = {
  userId: string
  email: string
  displayName?: string
  level: number
  token: string
  created_at: Timestamp
}

export type LoginValues = {
  email: string
  password: string
}
export interface SignUpValues {
  displayName?: string
  email: string
  password: string
  passwordConfirmation: string
}
export const FIELD_NAMES = ['email', 'password'] as const
