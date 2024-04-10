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
  popoverClassName?: string
  underlayClassName?: string
}
function Dropdown(props: Props) {
  const {
    label = '',
    options,
    children,
    menuOptions,
    onAction,
    menuClassName,
    className,
    popoverClassName,
    underlayClassName,
  } = props
  const ref = useRef<HTMLButtonElement>(null)
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
    <span className={twMerge('tw-gap-2', className)}>
      <Button {...menuTriggerProps} buttonRef={ref} className='tw-inline-block' theme='Ghost'>
        <Text text={label} />
      </Button>
      {state.isOpen && (
        <Popover
          state={state}
          triggerRef={ref}
          popoverClassName={`${popoverClassName}`}
          underlayClassName={underlayClassName}
        >
          {menu}
        </Popover>
      )}
    </span>
  )
}
Dropdown.whyDidYouRender = true
export default Dropdown
