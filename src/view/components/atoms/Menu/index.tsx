import { useMemo, useRef } from 'react'
import type { AriaMenuItemProps, AriaMenuProps } from 'react-aria'
import { useTreeState } from 'react-stately'
import { useMenu } from 'react-aria'
import MenuItem from '../MenuItem'
import { twMerge } from '../../../../utils/tailwind'

interface Props extends AriaMenuProps<AriaMenuItemProps> {
  className?: string
}

function Menu(props: Props) {
  const { className } = props
  const state = useTreeState(props)

  const ref = useRef(null)
  const { menuProps } = useMenu(props, state, ref)
  const renderedItems = useMemo(
    () =>
      [...state.collection].map((item) => <MenuItem key={item.key} item={item} state={state} />),
    [state.collection],
  )
  const classNames = twMerge('tw-list-none', className)
  return (
    <ul {...menuProps} ref={ref} className={classNames}>
      {renderedItems}
    </ul>
  )
}
Menu.whyDidYouRender = true
export default Menu
