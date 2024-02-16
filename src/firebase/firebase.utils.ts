import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCI1g83s_2avoBemXd7hHJiL0OUvhptOhU',
  authDomain: 'oh-my-english-961db.firebaseapp.com',
  projectId: 'oh-my-english-961db',
  storageBucket: 'oh-my-english-961db.appspot.com',
  messagingSenderId: 266152271431,
  appId: '1:266152271431:web:c65298b31c8ff883c49b62',
  measurementId: 'G-1V3SRZDY2H',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const functions = firebase.functions()
