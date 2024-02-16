/* eslint-disable no-param-reassign */
import { createAction, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from '../stores/appStore'
import { clearStoredUser, getStoredUser, setStoredUser } from '../services/auth'
import { type LoggedInUser, type User, type SignInDetails, type SignInStatus } from '../types/User'

export type AuthState = {
  userDetails?: LoggedInUser
  signInStatus: SignInStatus
}

const getInitialState = (): AuthState => {
  const initialState: AuthState = {
    signInStatus: 'idle',
  }
  const storedUser = getStoredUser()
  if (storedUser) initialState.userDetails = storedUser
  return initialState
}

const createAuthSlice = (initialState: AuthState) =>
  createSlice({
    name: 'user',
    initialState,
    reducers: {
      signIn: (state, action: PayloadAction<LoggedInUser>) => {
        state.signInStatus = 'idle'
        state.userDetails = action.payload
        setStoredUser(action.payload)
      },
      signOut: (state) => {
        state.userDetails = undefined
        clearStoredUser()
      },
      startSignIn: (state) => {
        state.signInStatus = 'pending'
      },
      endSignIn: (state) => {
        state.signInStatus = 'idle'
      },
    },
  })

export const signInRequest = createAction<SignInDetails>('signInRequest')
export const cancelSignIn = createAction('cancelSignIn')

export const selectors = {
  getUserDetails: (state: RootState): User | null => state.user.userDetails,
}

const initialState = getInitialState()
const authSlice = createAuthSlice(initialState)

export const { signIn, signOut, startSignIn, endSignIn } = authSlice.actions
export default authSlice.reducer
