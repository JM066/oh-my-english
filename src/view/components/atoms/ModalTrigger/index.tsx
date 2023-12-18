import { cloneElement, type ReactElement } from 'react'
import { useOverlayTriggerState } from 'react-stately'
import { useOverlayTrigger, type OverlayTriggerProps } from 'react-aria'
import Modal from '../Modal'
import Button from '../Button'

export interface Props extends OverlayTriggerProps {
  label: string
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  children: (close: () => void) => ReactElement
}

function ModalTrigger(props: Props) {
  const { label, isOpen, onOpenChange, children } = props

  const state = useOverlayTriggerState({ isOpen, onOpenChange })
  const { triggerProps, overlayProps } = useOverlayTrigger(
    {
      type: 'dialog',
    },
    state,
  )

  return (
    <>
      <Button {...triggerProps}>{label}</Button>
      {state.isOpen && (
        <Modal {...props} state={state}>
          {cloneElement(children(state.close), overlayProps)}
        </Modal>
      )}
    </>
  )
}
ModalTrigger.whyDidYouRender = true
export default ModalTrigger
