import { db } from '../../firebase/firebase.utils'
import { type Listening } from '../types/Listening'

export const fetchListeningTest = async (): Promise<Listening[] | undefined> => {
  try {
    const querySnapshot = await db.collection('listening').get()
    return querySnapshot.docs.map((docSnapshot) => {
      return {
        id: docSnapshot.id,
        ...(docSnapshot.data() as Listening),
      }
    })
  } catch (error) {
    console.log(error)
  }
}
