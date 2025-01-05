import { useEffect, useState } from 'react'
import useViewport from '../provider/ViewportProvider'

const Breakpoints = {
  Laptop: 1399,
  Tablet: 991,
  Mobile: 767,
}

const useBreakpoints = () => {
  const { width } = useViewport()
  const [isDesktopView, setIsDesktopView] = useState(width > Breakpoints.Laptop)
  const [isLaptopView, setIsLaptopView] = useState(
    width > Breakpoints.Tablet && width <= Breakpoints.Laptop,
  )
  const [isTabletView, setIsTabletView] = useState(
    width > Breakpoints.Mobile && width <= Breakpoints.Tablet,
  )
  const [isMobileView, setIsMobileView] = useState(width <= Breakpoints.Mobile)

  useEffect(() => {
    setIsDesktopView(width > Breakpoints.Laptop)
    setIsLaptopView(width > Breakpoints.Tablet && width <= Breakpoints.Laptop)
    setIsTabletView(width > Breakpoints.Mobile && width <= Breakpoints.Tablet)
    setIsMobileView(width <= Breakpoints.Mobile)
  }, [width])

  return { isDesktopView, isLaptopView, isTabletView, isMobileView }
}

export default useBreakpoints
