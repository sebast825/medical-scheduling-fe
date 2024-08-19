import { Modal, Button } from "react-bootstrap";
type IGenericModal = {
   show: boolean,
   handleClose: ()=>void,
   handleConfirm: ()=>void,
   title: string,
   body: string
}

function GenericModal  ({ show, handleClose, handleConfirm, title, body }:IGenericModal){
   return (
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
   )
}

export default GenericModal;