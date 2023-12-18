import { useRef, type ReactNode, useEffect } from 'react'
import { Overlay, Underlay, useModalOverlay, type AriaModalOverlayProps } from 'react-aria'
import { type OverlayTriggerState } from 'react-stately'

export interface Props {
  state: OverlayTriggerState
  children?: ReactNode
  underlayClassName?: string
  modalClassName?: string
  options?: AriaModalOverlayProps
}
function Modal(props: Props) {
  const { state, children, modalClassName, options = {} } = props
  const modalRef = useRef<HTMLDivElement>(null)
  const underlayRef = useRef<HTMLDivElement>(null)
  const { modalProps, underlayProps } = useModalOverlay({ ...options }, state, ref)

  return (
    <Overlay>
      <div ref={underlayRef} {...underlayProps}>
        <div {...modalProps} ref={modalRef} className={modalClassName}>
          {children}
        </div>
      </div>
    </Overlay>
  )
}
Modal.whyDidYouRender = true
export default Modal
