import { cloneElement, useRef, type ReactElement, type ComponentProps } from 'react'
import { useOverlayTriggerState } from 'react-stately'
import { mergeProps, useOverlayTrigger } from 'react-aria'
import Modal from '../Modal'
import Button from '../Button'

export interface Props {
  trigger: React.ReactNode
  modal: (close: () => void) => ReactElement
  customTriggerProps?: ComponentProps<typeof Button>
  modalClassName?: string
  triggerClassname?: string
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

function ModalTrigger(props: Props) {
  const { trigger, isOpen, onOpenChange, modal, modalClassName, customTriggerProps } = props
  const ref = useRef(null)
  const state = useOverlayTriggerState({ isOpen, onOpenChange })
  const { triggerProps: ariaTriggerProps, overlayProps } = useOverlayTrigger(
    {
      type: 'dialog',
    },
    state,
    ref,
  )
  const triggerProps = mergeProps(ariaTriggerProps, customTriggerProps)

  return (
    <>
      <Button
        className='tw-bg-transparent tw-border-none tw-outline-none'
        {...triggerProps}
        buttonRef={ref}
      >
        {trigger}
      </Button>
      {state.isOpen && (
        <Modal {...overlayProps} state={state} modalClassName={modalClassName}>
          {cloneElement(modal(state.close), overlayProps)}
        </Modal>
      )}
    </>
  )
}
ModalTrigger.whyDidYouRender = true
export default ModalTrigger
