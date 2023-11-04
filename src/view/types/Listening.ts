import { type Timestamp } from 'firebase/firestore'

export interface Listening {
  title: string
  content: {
    answerKr: string
    distractors: string[]
    tts: string
    words: string[]
  }
  created_at: Timestamp
}
