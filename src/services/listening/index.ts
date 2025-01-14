import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebase.utils'
import { type Category, type Listening } from '../../types/Listening'

export const categories: Category[] = ['food', 'job']

export const getListening = async (title?: string) => {
  if (!title) return []
  try {
    const querySnapshot = await getDocs(collection(db, title))
    return querySnapshot.docs.map((docSnapshot) => {
      return {
        id: docSnapshot.id,
        ...docSnapshot.data(),
      } as Listening
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('An unknown error occurred')
    }
  }
}
