import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebase.utils'
import { type Category, type ListeningTest } from '../../types/Listening'

export const categories: Category[] = ['food', 'job']

export const fetchTests = async (title?: string): Promise<ListeningTest[] | undefined> => {
  if (!title) return undefined
  try {
    const querySnapshot = await getDocs(collection(db, title))
    return querySnapshot.docs.map((docSnapshot) => {
      return {
        id: docSnapshot.id,
        ...docSnapshot.data(),
      } as ListeningTest
    })
  } catch (error) {
    console.log(error)
    return undefined
  }
}
