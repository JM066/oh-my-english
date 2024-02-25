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
