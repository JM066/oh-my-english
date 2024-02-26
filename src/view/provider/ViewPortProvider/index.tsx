import { createContext, useState, useEffect, type ReactNode } from 'react'

type WindowDimensions = {
  width: number
  height: number
}
export const ViewPortContext = createContext<WindowDimensions>({
  width: typeof window !== 'undefined' ? window?.innerWidth : 1920,
  height: typeof window !== 'undefined' ? window?.innerHeight : 1080,
})
export function ViewportProvider({ children }: { children: ReactNode }): JSX.Element {
  const [windowSize, setWindowSize] = useState<WindowDimensions>({
    width: typeof window !== 'undefined' ? window?.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window?.innerHeight : 1080,
  })

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  // Todo : Listen to resize event and set the setWindowSize
  return <ViewPortContext.Provider value={windowSize}>{children}</ViewPortContext.Provider>
}
export default ViewportProvider
