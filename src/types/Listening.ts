import { type Timestamp } from 'firebase/firestore'

export type Category = 'food' | 'job'

export interface Listening {
  id: string
  answerKr: string
  distractors: string[]
  tts: string
  words: string[]
  created_at: Timestamp
}
export type ListItem = {
  id: string
  name: string
}
