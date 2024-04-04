import { useRef } from 'react'
import { type AriaMenuItemProps, useMenuItem } from 'react-aria'
import { type Node, type TreeState } from 'react-stately'
import { twMerge } from '../../../../utils/tailwind'

interface Props {
  item: Node<AriaMenuItemProps>
  state: TreeState<AriaMenuItemProps>
  options?: Omit<AriaMenuItemProps, 'key'>
  menuItemClassName?: string
}
function MenuItem(props: Props) {
  const { item, state, options, menuItemClassName } = props
  const ref = useRef(null)
  const { menuItemProps, isSelected } = useMenuItem(
    { 'aria-label': `dropdown item ${item.key}`, ...options, key: item.key },
    state,
    ref,
  )
  const classNames = twMerge(isSelected ? 'tw-bg-gray-300' : '', menuItemClassName)
  return (
    <li {...menuItemProps} ref={ref} className={classNames}>
      {item.rendered}
    </li>
  )
}
MenuItem.whyDidYouRender = true
export default MenuItem
