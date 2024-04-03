import { useRef } from 'react'
import { type AriaMenuItemProps, useMenuTrigger, AriaMenuProps } from 'react-aria'
import { type MenuTriggerProps, useMenuTriggerState } from 'react-stately'
import { type CollectionChildren } from '@react-types/shared'
import Popover from '../Popover'
import Button from '../Button'
import Menu from '../Menu'

interface Props {
  label?: string
  options?: MenuTriggerProps
  children: CollectionChildren<AriaMenuItemProps>
  menuOptions?: AriaMenuProps<AriaMenuItemProps>
}
function MenueTriggerButton(props: Props) {
  const { label, options, children, menuOptions } = props
  const ref = useRef(null)
  const state = useMenuTriggerState({
    ...options,
  })
  const { menuTriggerProps, menuProps } = useMenuTrigger<AriaMenuItemProps>({}, state, ref)

  return (
    <>
      <Button {...menuTriggerProps} buttonRef={ref}>
        {label}
        <span aria-hidden='true' style={{ paddingLeft: 5 }}>
          ▼
        </span>
      </Button>
      {state.isOpen && (
        <Popover state={state} triggerRef={ref} placement='bottom start'>
          <Menu {...menuOptions} {...menuProps}>
            {children}
          </Menu>
        </Popover>
      )}
    </>
  )
}
MenueTriggerButton.whyDidYouRender = true
export default MenueTriggerButton
