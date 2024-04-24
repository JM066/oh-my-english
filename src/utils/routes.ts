import { useAppSelector } from '../stores/appStore'
import WebRoute from '../types/WebRoute'
import TestLayout from '../view/layout/TestLayout'
import Home from '../view/pages/Home'
import Join from '../view/pages/Join'
import Test from '../view/pages/Test'

const appRoute = (): Array<WebRoute> => {
  const { data } = useAppSelector((state) => state.auth)

  const routes: Array<WebRoute> = [
    { path: '/', Component: Home },
    { path: '/login', Component: Join },
  ]

  if (data?.userId) {
    routes.push({
      path: '/test',
      Component: TestLayout,
      isPrivate: true,
      subRoutes: [{ path: '/test/:id', Component: Test }],
    })
  }

  return routes
}
export default appRoute
