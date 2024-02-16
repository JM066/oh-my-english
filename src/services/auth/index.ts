import { auth } from '../../firebase/firebase.utils'
import { type LoggedInUser } from '../../types/User'
import { storeItem, clearItem, getItem } from '../../view/utils/storage'
import { LOCALSTORAGE_USER_KEY } from '../../types/LocalStorage'

export const setStoredUser = (user: LoggedInUser): void => {
  storeItem(LOCALSTORAGE_USER_KEY.User, JSON.stringify(user))
}

export const clearStoredUser = (): void => {
  clearItem(LOCALSTORAGE_USER_KEY.User)
}

export const getStoredUser = (): LoggedInUser | null => {
  const storedUser = getItem(LOCALSTORAGE_USER_KEY.User)
  return storedUser ? JSON.parse(storedUser) : null
}

const authService = {
  createUser: async (email: string, password: string) => {
    let user
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password)
      user = userCredential.user
    } catch (error) {
      console.log(error)
    }

    return user
  },
  userLogin: async (email: string, password: string) => {
    let user
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password)
      user = userCredential.user
    } catch (error) {
      console.log(error)
    }
    return user
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
