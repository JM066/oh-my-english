import { type PropsWithChildren } from 'react'

function Layout(props: PropsWithChildren) {
  const { children } = props
  return (
    <div className='tw-w-screen tw-h-screen tw-p-8'>
      <header>
        <nav>
          <h1>HIHIHI</h1>
        </nav>
      </header>
      {children}
      <div> Footer</div>
    </div>
  )
}
export default Layout
