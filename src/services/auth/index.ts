/* eslint-disable import/no-extraneous-dependencies */
import { FirebaseError } from '@firebase/util'
// import { type UserCredential } from 'firebase/auth'
import { auth } from '../../firebase/firebase.utils'
import { type User, type AuthLogin } from '../../types/Auth'
import { storeItem, clearItem, getItem } from '../../utils/storage'
import { LOCALSTORAGE_USER_KEY } from '../../types/LocalStorage'

export const setStoredUser = (user: AuthLogin): void => {
  storeItem(LOCALSTORAGE_USER_KEY.User, JSON.stringify(user))
}

export const clearStoredUser = (): void => {
  clearItem(LOCALSTORAGE_USER_KEY.User)
}

export const getStoredUser = (): AuthLogin | null => {
  const storedUser = getItem(LOCALSTORAGE_USER_KEY.User)
  return storedUser ? JSON.parse(storedUser) : null
}

const authService = {
  createUser: async (email: string, password: string) => {
    let user
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password)
      user = userCredential.user
      return user
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code
        // const errorMessage = error.message
        console.log('errorcode', errorCode)
        if (errorCode === 'auth/invalid-credential') {
          console.log('wrong password')
        }
      }
    }
    return user
  },
  userLogin: async (params: User): Promise<AuthLogin> => {
    try {
      const { email, password } = params
      let userInfo: AuthLogin
      const { user } = await auth.signInWithEmailAndPassword(email, password)
      if (user?.email && user?.providerId) {
        userInfo = {
          userId: user.providerId,
          email: user.email,
          displayName: user.displayName || '',
        }
      } else {
        throw new Error('incomplete user info')
      }
      return userInfo
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const errorMessage = error.message
        throw new Error(errorMessage)
      } else {
        throw new Error('errorMessage')
      }
    }
  },
  getUserStatus: async () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        return user.uid
      }
      return 'User is signed out'
    })
  },
}

export default authService
