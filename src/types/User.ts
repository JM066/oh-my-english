export interface Id {
  id: number
}

export interface NewUser {
  email: string
  name?: string
}

export type User = Id & NewUser

export type LoggedInUser = {
  userToken?: string
} & User

export interface SignInDetails {
  email: string
  password: string
}
export type SignInStatus = 'idle' | 'pending'
