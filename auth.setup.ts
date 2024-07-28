// auth.setup.ts
import playwrightFirebasePlugin from '@nearform/playwright-firebase'
import { test as base } from '@playwright/test'

import firebaseConfig from './src/firebase/firebaseConfig.json'

const serviceAccount = {
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  clientEmail: import.meta.env.VITE_FB_CLIENT_EMAIL,
  privateKey: import.meta.env.VITE_FB_PRIVATE_KEY,
}
const uid = import.meta.env.VITE_FB_APP_UID
const options = firebaseConfig

export const test = playwrightFirebasePlugin(serviceAccount, options, uid, base)
