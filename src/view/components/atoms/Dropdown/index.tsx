import { type Key, useRef, useMemo } from 'react'
import { type AriaMenuItemProps, useMenuTrigger, type AriaMenuProps } from 'react-aria'
import { type MenuTriggerProps, useMenuTriggerState } from 'react-stately'
import { type CollectionChildren } from '@react-types/shared'
import Popover from '../Popover'
import Button from '../Button'
import Menu from '../Menu'
import Text from '../Text'
import { twMerge } from '../../../../utils/tailwind'

interface Props {
  label?: string
  options?: MenuTriggerProps
  children: CollectionChildren<AriaMenuItemProps>
  menuOptions?: AriaMenuProps<AriaMenuItemProps>
  onAction?: (key: Key) => void
  menuClassName?: string
  className?: string
}
function Dropdown(props: Props) {
  const { label = '', options, children, menuOptions, onAction, menuClassName, className } = props
  const ref = useRef(null)
  const state = useMenuTriggerState({
    ...options,
  })
  const { menuTriggerProps, menuProps } = useMenuTrigger<AriaMenuItemProps>({}, state, ref)

  const menu = useMemo(
    () => (
      <Menu {...menuOptions} {...menuProps} onAction={onAction} className={menuClassName}>
        {children}
      </Menu>
    ),
    [menuOptions, menuProps, children, onAction],
  )

  return (
    <span className={twMerge(' tw-flex tw-flex-col tw-gap-1', className)}>
      <Button {...menuTriggerProps} buttonRef={ref} theme='Ghost'>
        <Text text={label} />
      </Button>
      {state.isOpen && (
        <Popover
          state={state}
          triggerRef={ref}
          placement='bottom start'
          popoverClassName='tw-absolute top-0 left-0 tw-bg-red-500 tw-h-[300px] tw-w-[300px]'
        >
          {menu}
        </Popover>
      )}
    </span>
  )
}
Dropdown.whyDidYouRender = true
export default Dropdown
