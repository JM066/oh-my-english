import { useRef, type ReactNode } from 'react'
import {
  DismissButton,
  Overlay,
  usePopover,
  type AriaPopoverProps,
  type Placement,
} from 'react-aria'
import { type OverlayTriggerState } from 'react-stately'

interface Props {
  triggerRef: React.RefObject<HTMLElement>
  children?: ReactNode
  state: OverlayTriggerState
  offset?: number
  placement?: Placement
  popoverClassName?: string
  underlayClassName?: string
  options?: Omit<AriaPopoverProps, 'triggerRef' | 'popoverRef' | 'offset' | 'placement'>
}

function Popover(props: Props): JSX.Element {
  const {
    triggerRef,
    children,
    state,
    offset,
    placement = 'bottom start',
    popoverClassName,
    underlayClassName,
    options = {},
  } = props

  const popoverRef = useRef(null)

  const { popoverProps, underlayProps } = usePopover(
    {
      ...options,
      offset,
      placement,
      popoverRef,
      triggerRef,
    },
    state,
  )

  return (
    <Overlay>
      <div {...underlayProps} className={underlayClassName} />
      <div {...popoverProps} ref={popoverRef} className={popoverClassName}>
        <svg className='arrow' data-placement={placement} viewBox='0 0 12 12'>
          <path d='M0 0 L6 6 L12 0' />
        </svg>
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  )
}

Popover.whyDidYouRender = true
export default Popover
