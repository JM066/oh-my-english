import { type ReactNode } from 'react'
import useBreakPoint from '../../hooks/useBreakPoint'
import NavBar from '../../components/organisms/NavBar'
import { twMerge } from '../../../utils/tailwind'

function MainLayout(props: { children: ReactNode }): JSX.Element {
  const { children } = props
  const { isSmallBreakpoint } = useBreakPoint()
  const className = twMerge(
    isSmallBreakpoint ? 'tw-w-full' : 'tw-w-1/2',
    'tw-h-full tw-items-center tw-p-4',
  )
  return (
    <div className='tw-flex tw-flex-col tw-items-center'>
      <NavBar />
      <div className={className}>{children}</div>
    </div>
  )
}
export default MainLayout
