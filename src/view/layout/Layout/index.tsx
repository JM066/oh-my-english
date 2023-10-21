import { type PropsWithChildren } from 'react'

function Layout(props: PropsWithChildren) {
  const { children } = props
  return (
    <div className='w-screen h-screen flex flex-col bg-transparent dark:bg-gray-900'>
      {children}
    </div>
  )
}
export default Layout
