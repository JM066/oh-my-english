import { useEffect, useCallback } from 'react'
import { auth } from '../../../firebase/firebase.utils'
import { useAppDispatch } from '../../../stores/appStore'

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  //   const appDispatch = useAppDispatch()

  // TOdo: move to auth file and call it as callback
  function onAuthStateChange() {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        // Todo: getUSer and update the store
      } else {
        // Todo: update the store
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
