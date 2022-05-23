import { useContext } from 'react'
import {
  Modal as BootstrapModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import { ToggleContext } from 'hooks/useToggle'

export default function Modal({ children, title, id }) {
  const { isToggleable, handleToggle } = useContext(ToggleContext)

  return (
    <BootstrapModal isOpen={isToggleable(id)} toggle={() => handleToggle(id)}>
      <ModalHeader toggle={() => handleToggle(id)}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <button className="btn btn-secondary" onClick={() => handleToggle(id)}>
          Close
        </button>
      </ModalFooter>
    </BootstrapModal>
  )
}
