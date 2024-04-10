/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, type ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { type DocumentData } from 'firebase/firestore'
import {
  getStoredUser,
  doUserLogin,
  doUserLogout,
  doCreateUser,
  getUserStatusUpdate,
} from '../services/auth'
import { type AuthLogin, type AuthState, type LoginValues, type SignUpValues } from '../types/Auth'

const getInitialState = (): AuthState => {
  const initialState: AuthState = {
    status: 'idle',
    isLoggedIn: false,
    isRegistered: false,
    isFetched: false,
  }
  const storedUser: AuthLogin | null = getStoredUser()
  if (storedUser) {
    initialState.data = storedUser
    initialState.isLoggedIn = true
  }
  return initialState
}
export const userLogin = createAsyncThunk<void, LoginValues>('auth/userLogin', doUserLogin)
export const userStatusUpdate = createAsyncThunk<DocumentData, string>(
  'auth/userStatusUpdate',
  getUserStatusUpdate,
)
export const userLogout = createAsyncThunk('auth/userLogout', doUserLogout)
export const userSignUp = createAsyncThunk<void, SignUpValues>('auth/userSignUp', doCreateUser)

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
// Todo: correct the type
const userStatusUpdateBuilder = (builder: ActionReducerMapBuilder<DocumentData>) => {
  builder.addCase(userStatusUpdate.pending, (state) => {
    state.isFetched = false
  })
  builder.addCase(userStatusUpdate.fulfilled, (state, action) => {
    state.data = action.payload
    state.isLoggedIn = !!action.payload.userId
    state.isFetched = true
    delete state.error
  })
  builder.addCase(userStatusUpdate.rejected, (state, action) => {
    state.isFetched = false
    state.error = action.error.message
    state.isLoggedIn = false
    state.isFetched = true
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
const userLogoutBuilder = (builder: ActionReducerMapBuilder<AuthState>) => {
  builder.addCase(userLogout.pending, (state) => {
    state.status = 'pending'
  })
  builder.addCase(userLogout.fulfilled, (state) => {
    state.status = 'idle'
    state.isLoggedIn = false
    delete state.error
  })
  builder.addCase(userLogout.rejected, (state, action) => {
    state.status = 'idle'
    state.isLoggedIn = true
    state.error = action.error.message
  })
}

const createAuthSlice = (initialState: AuthState) =>
  createSlice({
    name: 'auth',
    initialState,
    reducers: {
      // authLoading(state, action: PayloadAction<boolean>) {
      //   state.loading = action.payload
      // },
    },
    extraReducers: (builder) => {
      userLoginBuilder(builder)
      userStatusUpdateBuilder(builder)
      userLogoutBuilder(builder)
      userSignUpBuilder(builder)
    },
  })

const initialState = getInitialState()
const authSlice = createAuthSlice(initialState)

// export const { updateProfile } = authSlice.actions
export default authSlice.reducer
