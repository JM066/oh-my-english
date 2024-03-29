import {
  type EnhancedStore,
  combineReducers,
  configureStore,
  type ThunkAction,
  type Action,
} from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import logger from 'redux-logger'
import authSlice from '../redux/authSlice'

const rootReducer = combineReducers({
  auth: authSlice,
})

export const configureStoreWithMiddlewares = (preloadedState = {}) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
  })

  return store
}

export const appStore = configureStoreWithMiddlewares()
export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch
export type AppStore = ReturnType<typeof configureStoreWithMiddlewares>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default appStore
