import { type ElementType } from 'react'

type WebRoute = {
  path: string
  isPrivate?: boolean
  isAdmin?: boolean
  Component: ElementType
  subRoutes?: Array<WebRoute>
}
export default WebRoute
