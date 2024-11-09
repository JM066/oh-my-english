import { useMediaQuery } from 'react-responsive'

const Breakpoints = {
  SmallMax: 969,
  LargeMin: 970,
  ShortMax: 475,
}

function useBreakPoint() {
  const isSmallBreakpoint = useMediaQuery({ maxWidth: Breakpoints.SmallMax })
  const isLargeBreakpoint = useMediaQuery({ minWidth: Breakpoints.LargeMin })
  const isShortViewport = useMediaQuery({ maxHeight: Breakpoints.ShortMax })

  return { isSmallBreakpoint, isLargeBreakpoint, isShortViewport }
}
export default useBreakPoint
