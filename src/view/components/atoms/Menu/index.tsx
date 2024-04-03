import { useMemo, useRef } from 'react'
import type { AriaMenuItemProps, AriaMenuProps } from 'react-aria'
import { useTreeState } from 'react-stately'
import { useMenu } from 'react-aria'
import MenuItem from '../MenuItem'

interface Props extends AriaMenuProps<AriaMenuItemProps> {
  className?: string
  options?: AriaMenuProps<AriaMenuItemProps>
}

function Menu(props: Props) {
  const state = useTreeState(props)

  const ref = useRef(null)
  const { menuProps } = useMenu(props, state, ref)

  const renderedItems = useMemo(
    () =>
      [...state.collection].map((item) => <MenuItem key={item.key} item={item} state={state} />),
    [state.collection],
  )
  return (
    <ul {...menuProps} ref={ref}>
      {renderedItems}
    </ul>
  )
}
Menu.whyDidYouRender = true
export default Menu
