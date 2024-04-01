import { useRef } from 'react'
import { useLink, type AriaLinkOptions } from 'react-aria'
import { Link, resolvePath } from 'react-router-dom'

interface Props {
  path: string
  isDisabled?: boolean
  children?: React.ReactNode
  options?: Omit<AriaLinkOptions, 'isDisabled'>
}

function CustomLink(props: Props) {
  const { path, isDisabled = false, children, options } = props
  const ref = useRef(null)
  const { linkProps, isPressed } = useLink({ ...options, isDisabled }, ref)
  const resolvedPath = resolvePath(path)
  return (
    <Link to={resolvedPath.pathname ?? ''} {...linkProps} ref={ref}>
      {children}
    </Link>
  )
}

CustomLink.whyDidYouRender = true
export default CustomLink
