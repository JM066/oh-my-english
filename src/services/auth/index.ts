/* eslint-disable import/no-extraneous-dependencies */

import { type FirebaseError } from 'firebase/app'
import { serverTimestamp, type DocumentData } from 'firebase/firestore'
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
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
  const userRef = doc(db, 'Users', userId)

  try {
    const userSnap = await getDoc(userRef)
    if (!userSnap.exists()) {
      throw new Error('Missing user information')
    }
    const userInfo = {
      userId: userSnap.id,
      ...userSnap.data(),
    }
    console.log('userInfo', userInfo)
    return userInfo
  } catch (error: unknown) {
    const err = error as FirebaseError
    throw new Error(err.code)
  }
}
export const doUserLogout = async () => {
  try {
    const user = signOut(auth)
    console.log(user)
  } catch (error: unknown) {
    const err = error as FirebaseError
    throw new Error(err.code)
  }
}
export const doUserLogin = async (params: LoginInfo): Promise<void> => {
  try {
    const { email, password } = params
    const { user } = await signInWithEmailAndPassword(auth, email, password)
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
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    const userRef = doc(db, 'Users', user?.uid)
    await setDoc(
      userRef,
      {
        email: user?.email,
        created_at: serverTimestamp(),
        displayName: displayName || '',
        level: 0,
      },
      { merge: true },
    )
  } catch (error: unknown) {
    const err = error as FirebaseError
    throw new Error(err.message)
  }
}
