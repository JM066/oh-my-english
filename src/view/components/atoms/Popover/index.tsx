import { useRef, type ReactNode } from 'react'
import { DismissButton, Overlay, usePopover, type AriaPopoverProps } from 'react-aria'
import { type OverlayTriggerState } from 'react-stately'

interface Props {
  triggerRef: React.RefObject<HTMLElement>
  children?: ReactNode
  state: OverlayTriggerState
  offset?: number
  popoverClassName?: string
  underlayClassName?: string
  options?: Omit<AriaPopoverProps, 'triggerRef' | 'popoverRef' | 'offset'>
}

function Popover(props: Props): JSX.Element {
  const {
    triggerRef,
    children,
    state,
    offset,
    popoverClassName,
    underlayClassName,
    options = {},
  } = props

  const popoverRef = useRef(null)

  const { popoverProps, underlayProps } = usePopover(
    {
      ...options,
      offset,
      popoverRef,
      triggerRef,
    },
    state,
  )

  return (
    <Overlay>
      <div {...underlayProps} className={underlayClassName} />
      <div {...popoverProps} ref={popoverRef} className={popoverClassName}>
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  )
}

Popover.whyDidYouRender = true
export default Popover
