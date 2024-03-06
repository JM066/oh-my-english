import { db } from '../../firebase/firebase.utils'
import { type Category, type Listening } from '../../types/Listening'

export const categories: Category[] = ['food', 'job']

const listening = {
  fetchTests: async (title?: string): Promise<Listening[] | undefined> => {
    if (!title) return undefined
    try {
      const querySnapshot = await db.collection(title).get()
      return querySnapshot.docs.map((docSnapshot) => {
        return {
          id: docSnapshot.id,
          ...docSnapshot.data(),
        } as Listening
      })
    } catch (error) {
      console.log(error)
      return undefined
    }
  },
}

export default listening
