import { cloneElement, useRef, type ReactElement, type ComponentProps } from 'react'
import { useOverlayTriggerState } from 'react-stately'
import { useOverlayTrigger } from 'react-aria'
import Modal from '../Modal'
import Button from '../Button'

export interface Props {
  trigger: React.ReactNode
  modal: (close: () => void) => ReactElement
  triggerProps?: ComponentProps<typeof Button>
  modalClassName?: string
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

function ModalTrigger(props: Props) {
  const { trigger, isOpen, onOpenChange, modal, modalClassName } = props
  const ref = useRef(null)
  const state = useOverlayTriggerState({ isOpen, onOpenChange })
  const { triggerProps, overlayProps } = useOverlayTrigger(
    {
      type: 'dialog',
    },
    state,
    ref,
  )

  return (
    <>
      <Button
        size='Custom'
        theme='Custom'
        className='tw-border-none'
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
