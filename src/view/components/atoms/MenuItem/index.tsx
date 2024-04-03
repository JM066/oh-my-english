import { useRef } from 'react'
import { type AriaMenuItemProps, useMenuItem } from 'react-aria'
import { type Node, type TreeState } from 'react-stately'

interface Props {
  item: Node<AriaMenuItemProps>
  state: TreeState<AriaMenuItemProps>
  options?: Omit<AriaMenuItemProps, 'key'>
}
function MenuItem(props: Props) {
  const { item, state, options } = props
  const ref = useRef(null)
  const { menuItemProps, isSelected } = useMenuItem(
    { 'aria-label': `dropdown item ${item.key}`, ...options, key: item.key },
    state,
    ref,
  )

  return (
    <li {...menuItemProps} ref={ref}>
      {item.rendered}
      {isSelected && <span aria-hidden='true'>✅</span>}
    </li>
  )
}
MenuItem.whyDidYouRender = true
export default MenuItem
