import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { auth } from '../../../firebase/firebase.utils'
import { useAppDispatch, useAppSelector } from '../../../stores/appStore'
import { userLogout, userStatusUpdate } from '../../../redux/authSlice'

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const { data } = useAppSelector((state) => state).auth
  const appDispatch = useAppDispatch()

  function onAuthStateChange() {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        appDispatch(userStatusUpdate(user.uid)).then((action) => {
          if (action.meta.requestId === data?.userId) {
            toast('Logged Updated!', { duration: 1000 })
          }
        })
      } else {
        appDispatch(userLogout()).then((action) => {
          if (action.meta.requestStatus === 'fulfilled') {
            toast('Logged out!', { duration: 1000 })
          }
        })
      }
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChange()
    return () => unsubscribe()
  }, [])

  return children
}

export default AuthProvider
