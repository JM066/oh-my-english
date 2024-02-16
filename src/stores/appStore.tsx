import { configureStore } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import logger from 'redux-logger'

export const configureStoreWithMiddlewares = (initialState = {}): EnhancedStore => {
  const store = configureStore({
    reducer: {},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
  })

  return store
}
export const appStore = configureStoreWithMiddlewares()
export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
