import { Modal, Button} from "react-bootstrap";

type IGenericModal = {
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  title: string;
  // body: any;
  children: React.ReactNode;
  handleThirdButton?: () => void;
  textThirdButton ?: string
};

function GenericModal({
  show,
  handleClose,
  handleConfirm,
  title,
  children,
  handleThirdButton,
  textThirdButton
  

}: IGenericModal) {


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {children}
        {/* {inputValues.map((elem) => (
          <Form.Group key={elem.key} controlId="formBasicInput">
            <Form.Label>{elem.label}</Form.Label>
            <Form.Control
              type="text"
              value={elem.value || ""}
              onChange={(e) => {
                handleChange(elem.key, e.target.value);
                // console.log(elem);
              }}
            />
          </Form.Group>
        ))} */}
      </Modal.Body>
   
      <Modal.Footer>
      {
          handleThirdButton &&  <Button variant="danger" onClick={handleThirdButton}>
          {textThirdButton}
        </Button>
        }
        <Button variant="dark" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirmar
        </Button>
      
      </Modal.Footer>
    </Modal>
  );
}

export default GenericModal;
