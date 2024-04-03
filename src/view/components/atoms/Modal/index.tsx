import { useRef, type ReactNode } from 'react'
import { Overlay, useModalOverlay, type AriaModalOverlayProps } from 'react-aria'
import { type OverlayTriggerState } from 'react-stately'

export interface Props {
  state: OverlayTriggerState
  children?: ReactNode
  underlayClassName?: string
  modalClassName?: string
  options?: AriaModalOverlayProps
}
function Modal(props: Props) {
  const { state, children, modalClassName, underlayClassName, options = {} } = props
  const ref = useRef<HTMLDivElement>(null)
  const underlayRef = useRef<HTMLDivElement>(null)
  const { modalProps, underlayProps } = useModalOverlay({ ...options }, state, ref)

  return (
    <Overlay>
      <div ref={underlayRef} className={underlayClassName} {...underlayProps}>
        <div {...modalProps} ref={ref} className={modalClassName}>
          {children}
        </div>
      </div>
    </Overlay>
  )
}
Modal.whyDidYouRender = true
export default Modal
