import { Alert, Button, ListGroup, Modal } from "react-bootstrap";
import ConfirmButton from "../../buttons/confirmButton/ConfirmButton";

interface IAviableAccountsDemo {
  showModal: boolean;
  handleClose: () => void;
}
function AviableAccountsDemo(props: IAviableAccountsDemo) {
  const { showModal, handleClose } = props;

  const demoAccounts = [
    { role: "Paciente", username: "paciente", password: "paciente" },
    { role: "Médico", username: "medico", password: "medico" },
    { role: "Secretario", username: "secretario", password: "secretario" },
    { role: "Administrador", username: "admin", password: "admin" },
  ];
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cuentas Demo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="info">
          <h5>Podés usar las siguientes credenciales para probar el sistema</h5>
        </Alert>

        <ListGroup>
          {demoAccounts.map((account, index) => (
            <ListGroup.Item key={index} className="d-flex flex-column">
              <div>
                {/* <strong>{account.role}</strong> */}
              </div>
              <div className="text-muted d-flex justify-content-between ">
                <span className="text-start">Usuario y Clave: <b>{account.username}</b></span>
                {/* <span className="text-start">Clave: <b>{account.password}</b></span> */}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
      <ConfirmButton handleConfirm ={handleClose} text= "Aceptar"/>
       
      </Modal.Footer>
    </Modal>
  );
}
export default AviableAccountsDemo;
