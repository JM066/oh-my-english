/* eslint-disable import/no-extraneous-dependencies */
import { FirebaseError } from '@firebase/util'
import { type User, Timestamp, serverTimestamp, DocumentData } from 'firebase/firestore'
import { auth, db } from '../../firebase/firebase.utils'
import { type AuthLogin } from '../../types/Auth'
import { storeItem, clearItem, getItem } from '../../utils/storage'
import { LOCALSTORAGE_USER_KEY } from '../../types/LocalStorage'
import { type LoginInfo } from '../../view/components/organisms/Login'

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

const getToken = async (user: firebase.User | null) => {
  try {
    const token = await user?.getIdToken()
    return token
  } catch (err) {
    throw new Error(err)
  }
}

export const doUserLogin = async (params: LoginInfo): Promise<AuthLogin> => {
  try {
    const { email, password } = params
    const { user } = await auth.signInWithEmailAndPassword(email, password)
    if (!user?.email || !user?.providerId) {
      throw new Error('Missing user information')
    }
    const userInfo: AuthLogin = {
      userId: user.providerId,
      email: user.email,
      displayName: user.displayName || '',
    }
    return userInfo
  } catch (error: unknown) {
    const err = error as FirebaseError
    throw new Error(err.message)
  }
}

export const doCreateUser = async (params: LoginInfo): Promise<any> => {
  try {
    const { email, password, name } = params
    const { user } = await auth.createUserWithEmailAndPassword(email, password)
    console.log('USER', user?.uid, user?.getIdToken(), user?.getIdTokenResult())
    const userRef = db.collection('Users').doc('uid')

    await userRef.set({
      email: user?.email,
      created_at: serverTimestamp(),
      displayName: name || '',
      level: 0,
      token: await getToken(user),
    })
  } catch (error: unknown) {
    const err = error as FirebaseError
    throw new Error(err.message)
  }
}

export const getUserStatus = async () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      return user.uid
    }
    return 'User is signed out'
  })
}
