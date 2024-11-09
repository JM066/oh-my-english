import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

import deepEquals from 'fast-deep-equal'

type WindowDimensions = {
  width: number
  height: number
}

const Context = createContext<WindowDimensions>({
  width: typeof window !== 'undefined' ? window?.innerWidth : 1920,
  height: typeof window !== 'undefined' ? window?.innerHeight : 1080,
})

export function ViewportProvider({ children }: { children: ReactNode }): JSX.Element {
  const [viewportSize, setViewportSize] = useState<WindowDimensions>({
    width: typeof window !== 'undefined' ? window?.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window?.innerHeight : 1080,
  })

  const setUsingInnerDimensions = (state: WindowDimensions) => {
    const newState = { ...state }
    if (state.width !== window.innerWidth) newState.width = window.innerWidth
    if (state.height !== window.innerHeight) newState.height = window.innerHeight

    if (!deepEquals(state, newState)) return state
    return newState
  }
  const setUsingEntryDimensions = (state: WindowDimensions, entry: ResizeObserverEntry) => {
    const newState = {
      width: entry.contentRect.width,
      height: entry.contentRect.height,
    }

    return !deepEquals(state, newState) ? newState : state
  }

  const setViewport = (entries?: ResizeObserverEntry[]) => {
    setViewportSize((state) => {
      if (entries) {
        // ssonly use the first border box size
        const entry = entries.shift()
        if (entry) return setUsingEntryDimensions(state, entry)
        return setUsingInnerDimensions(state)
      }
      return setUsingInnerDimensions(state)
    })
  }

  useEffect(() => {
    let timeoutId: number

    const handleWindowResize = (value?: ResizeObserverEntry[] | UIEvent) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(
        () => setViewport(value as ResizeObserverEntry[]),
        100,
      ) as unknown as number
    }

    setViewport()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', handleWindowResize)
      return () => window.removeEventListener('resize', handleWindowResize)
    }
    const observer = new ResizeObserver(handleWindowResize)
    observer.observe(document.body)
    return () => observer.disconnect()
  }, [])

  return <Context.Provider value={viewportSize}>{children}</Context.Provider>
}

const useViewport = (): WindowDimensions => {
  const viewportSize = useContext(Context)
  return viewportSize
}

export default useViewport
