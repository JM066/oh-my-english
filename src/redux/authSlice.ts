/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, type ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { getStoredUser, doUserLogin, doCreateUser, doUserLogout } from '../services/auth'
import { type AuthLogin, type AuthState } from '../types/Auth'
import { type LoginInfo } from '../view/components/organisms/Login'

const getInitialState = (): AuthState => {
  const initialState: AuthState = {
    status: 'idle',
    isLoggedIn: false,
    isRegistered: false,
  }
  const storedUser: AuthLogin | null = getStoredUser()
  if (storedUser) {
    initialState.data = storedUser
    initialState.isLoggedIn = true
  }
  return initialState
}
export const userLogin = createAsyncThunk<void, LoginInfo>('auth/userLogin', doUserLogin)
export const userLogout = createAsyncThunk('auth/userLogout', doUserLogout)
// export const cancelLogin = createAction('auth/cancelSignIn')
export const userSignUp = createAsyncThunk<void, LoginInfo>('auth/userSignUp', doCreateUser)

const userLoginBuilder = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder.addCase(userLogin.pending, (state) => {
    state.status = 'pending'
  })
  builder.addCase(userLogin.fulfilled, (state) => {
    state.status = 'idle'
    state.isLoggedIn = true
    delete state.error
  })
  builder.addCase(userLogin.rejected, (state, action) => {
    state.status = 'idle'
    state.isLoggedIn = false
    state.error = action.error.message
  })
}
const userLogoutBuilder = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder.addCase(userLogout.pending, (state) => {
    state.status = 'pending'
  })
  builder.addCase(userLogout.fulfilled, (state, action) => {
    state.status = 'idle'
    state.data = action.payload
    state.isLoggedIn = true
    delete state.error
  })
  builder.addCase(userLogout.rejected, (state, action) => {
    state.status = 'idle'
    state.isLoggedIn = false
    state.error = action.error.message
  })
}
const userSignUpBuilder = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder.addCase(userSignUp.pending, (state) => {
    state.status = 'pending'
  })
  builder.addCase(userSignUp.fulfilled, (state) => {
    state.status = 'idle'
    state.isRegistered = true
    delete state.error
  })
  builder.addCase(userSignUp.rejected, (state, action) => {
    state.status = 'idle'
    state.isRegistered = false
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
      userLogoutBuilder(builder)
      userSignUpBuilder(builder)
    },
  })

const initialState = getInitialState()
const authSlice = createAuthSlice(initialState)

// export const { updateProfile } = authSlice.actions
export default authSlice.reducer
