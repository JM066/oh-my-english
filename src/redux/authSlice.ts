/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, type ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { getStoredUser, doUserLogin } from '../services/auth'
import { type AuthLogin, type User, type AuthState } from '../types/Auth'

const getInitialState = (): AuthState => {
  const initialState: AuthState = {
    status: 'idle',
    isLoggedIn: false,
  }
  const storedUser: AuthLogin | null = getStoredUser()
  if (storedUser) {
    initialState.data = storedUser
    initialState.isLoggedIn = true
  }
  return initialState
}
export const userLogin = createAsyncThunk<AuthLogin, User>('auth/userLogin', doUserLogin)
// export const cancelLogin = createAction('auth/cancelSignIn')

const userLoginBuilder = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder.addCase(userLogin.pending, (state) => {
    state.status = 'pending'
  })
  builder.addCase(userLogin.fulfilled, (state, action) => {
    state.status = 'idle'
    state.data = action.payload
    state.isLoggedIn = true
    delete state.error
  })
  builder.addCase(userLogin.rejected, (state, action) => {
    state.status = 'idle'
    state.isLoggedIn = false
    state.error = action.error.message
  })
}

const createAuthSlice = (initialState: AuthState) =>
  createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      userLoginBuilder(builder)
      // userLogoutBuilder(builder)
      // userSignUpBuilder(builder)
    },
  })

const initialState = getInitialState()
const authSlice = createAuthSlice(initialState)

// export const { updateProfile } = authSlice.actions
export default authSlice.reducer
