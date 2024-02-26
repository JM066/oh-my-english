/* eslint-disable import/no-extraneous-dependencies */

import { type FirebaseError } from 'firebase/app'
import { serverTimestamp, type DocumentData } from 'firebase/firestore'
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

export const getUserStatusUpdate = async (userId: string): Promise<DocumentData> => {
  const userRef = db.collection('Users').doc(userId)
  try {
    const userData = await userRef.get()
    if (!userData.exists) {
      throw new Error('Missing user information')
    }
    const userInfo = {
      userId: userData.id,
      ...userData.data(),
    }
    return userInfo
  } catch (error: unknown) {
    const err = error as FirebaseError
    throw new Error(err.code)
  }
}
export const doUserLogout = async () => {
  try {
    const dd = auth.signOut()
    console.log(dd)
  } catch (error: unknown) {
    const err = error as FirebaseError
    throw new Error(err.code)
  }
}
export const doUserLogin = async (params: LoginInfo): Promise<void> => {
  try {
    const { email, password } = params
    const { user } = await auth.signInWithEmailAndPassword(email, password)
    if (!user?.email || !user?.providerId) {
      throw new Error('Missing user information')
    }
  } catch (error: unknown) {
    const err = error as FirebaseError
    throw new Error(err.code)
  }
}

export const doCreateUser = async (params: LoginInfo): Promise<void> => {
  try {
    const { email, password, displayName } = params
    const { user } = await auth.createUserWithEmailAndPassword(email, password)
    const userRef = db.collection('Users').doc(user?.uid)
    await userRef.set({
      email: user?.email,
      created_at: serverTimestamp(),
      displayName: displayName || '',
      level: 0,
    })
  } catch (error: unknown) {
    const err = error as FirebaseError
    throw new Error(err.message)
  }
}
