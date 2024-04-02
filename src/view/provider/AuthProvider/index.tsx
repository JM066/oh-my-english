import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../../firebase/firebase.utils'
import { useAppDispatch, useAppSelector } from '../../../stores/appStore'
import { userLogout, userStatusUpdate } from '../../../redux/authSlice'

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const { data } = useAppSelector((state) => state.auth)
  const appDispatch = useAppDispatch()

  function onAuthStateChange() {
    return onAuthStateChanged(auth, (user) => {
      console.error('user', user)
      if (user) {
        appDispatch(userStatusUpdate(user.uid)).then((action) => {
          if (action.meta.requestId === data?.userId) {
            toast('Logged Updated!', { duration: 1000 })
            appDispatch(authLoading(false))
          }
        })
      } else {
        appDispatch(userLogout()).then((action) => {
          if (action.meta.requestStatus === 'fulfilled') {
            toast('Logged out!', { duration: 1000 })
            appDispatch(authLoading(false))
          }
        })
      }
    })
  }

  useEffect(() => {
    const authListener = onAuthStateChange()

    return () => {
      if (authListener) {
        authListener()
      }
    }
  }, [])

  return children
}

export default AuthProvider
