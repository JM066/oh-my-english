/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, type ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { getStoredUser, doUserLogin, doCreateUser } from '../services/auth'
import { type AuthLogin, type LoginInfo, type AuthState, type SignUpInfo } from '../types/Auth'

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
export const userLogin = createAsyncThunk<AuthLogin, LoginInfo>('auth/userLogin', doUserLogin)
// export const cancelLogin = createAction('auth/cancelSignIn')
export const userSignUp = createAsyncThunk<AuthLogin, SignUpInfo>('auth/userSignUp', doCreateUser)

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
const userSignUpBuilder = (builder: ActionReducerMapBuilder<AuthState>) => {
  // builder.addCase(userSignUp.pending, (state) => {
  //   state.status = 'pending'
  // })
  // builder.addCase(userSignUp.fulfilled, (state, action) => {
  //   state.status = 'idle'
  //   state.data = action.payload
  //   state.isLoggedIn = true
  //   delete state.error
  // })
  // builder.addCase(userSignUp.rejected, (state, action) => {
  //   state.status = 'idle'
  //   state.isLoggedIn = false
  //   state.error = action.error.message
  // })
}

const createAuthSlice = (initialState: AuthState) =>
  createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      userLoginBuilder(builder)
      // userLogoutBuilder(builder)
      userSignUpBuilder(builder)
    },
  })

const initialState = getInitialState()
const authSlice = createAuthSlice(initialState)

// export const { updateProfile } = authSlice.actions
export default authSlice.reducer
