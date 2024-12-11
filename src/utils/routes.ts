import { useAppSelector } from '../stores/appStore'
import type WebRoute from '../types/WebRoute'
import TestLayout from '../view/layout/TestLayout'
import Home from '../view/pages/Home'
import Join from '../view/pages/Join'
import Listening from '../view/pages/Listening'

const AppRoute = (): Array<WebRoute> => {
  const auth = useAppSelector((state) => state.auth)

  const routes: Array<WebRoute> = [
    { path: '/', Component: Home },
    { path: '/login', Component: Join },
  ]

  if (auth?.isLoggedIn) {
    routes.push({
      path: '/listening',
      Component: TestLayout,
      isPrivate: true,
      subRoutes: [{ path: '/listening/:id', Component: Listening }],
    })
  }

  return routes
}
export default AppRoute
