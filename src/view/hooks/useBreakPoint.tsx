import { useContext, useState, useEffect } from 'react'
import { ViewPortContext } from '../provider/ViewPortProvider'

const BREAKPOINT_LAPTOP = 1399
const BREAKPOINT_TABLET = 991
const BREAKPOINT_MOBILE = 767

const useBreakPoint = () => {
  const { width } = useContext(ViewPortContext)

  const [isDesktopView, setIsDesktopView] = useState(width > BREAKPOINT_LAPTOP)
  const [isLaptopView, setIsLaptopView] = useState(
    width > BREAKPOINT_TABLET && width <= BREAKPOINT_LAPTOP,
  )
  const [isTabletView, setIsTabletView] = useState(
    width > BREAKPOINT_MOBILE && width <= BREAKPOINT_TABLET,
  )
  const [isMobileView, setIsMobileView] = useState(width <= BREAKPOINT_MOBILE)

  useEffect(() => {
    setIsDesktopView(width > BREAKPOINT_LAPTOP)
    setIsLaptopView(width > BREAKPOINT_TABLET && width <= BREAKPOINT_LAPTOP)
    setIsTabletView(width > BREAKPOINT_MOBILE && width <= BREAKPOINT_TABLET)
    setIsMobileView(width <= BREAKPOINT_MOBILE)
  }, [width])

  return { isDesktopView, isLaptopView, isTabletView, isMobileView }
}
export default useBreakPoint
