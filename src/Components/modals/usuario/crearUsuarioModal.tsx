import GenericModal from "../GenericModal/GenericModal";
import { CreateUsuarioRequest } from "../../../types/usuario/CreateUsuarioRequest";
import { Form } from "react-bootstrap";
import { useState } from "react";


interface ICrearUsuarioModal {
  show: boolean;
  handleClose: () => void;
  handleConfirm: (personaResponse: CreateUsuarioRequest) => void;
}

function CrearUsuarioModal (props:ICrearUsuarioModal){

   const { show, handleClose, handleConfirm } = props;

   const [nombre, setNombre] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [email, setEmail] = useState<string>("");
   const [confirmEmail, setConfirmEmail] = useState<string>("");

   function confirmar (){
      let usuario : CreateUsuarioRequest = {
         UserName : nombre,
         Password : password,
         Email : email

      }
      handleConfirm(usuario);
   }

   return (
      <>
      <GenericModal
        show={show}
        handleClose={handleClose}
        handleConfirm={confirmar}
        title="Editar Información Personal"
      >
        <Form className="d-flex flex-column" style={{ gap: "10px" }}>
         
          <Form.Group controlId="formBasicnumLicencia">
            <Form.Label style={{ textAlign: "left" }}>Nombre Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar Nombre"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
            />
          </Form.Group>
          <Form.Group controlId="Contraseña">
            <Form.Label style={{ textAlign: "left" }}>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresar contraseña"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>
          <Form.Group controlId="Contraseña">
            <Form.Label style={{ textAlign: "left" }}>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresar email"  
                          onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>
          <Form.Group controlId="ContraseñaEmail">
            <Form.Label style={{ textAlign: "left" }}>Confirmar Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresar email"
              onChange={(e) => setConfirmEmail(e.target.value)}
              value={confirmEmail}
            />
          </Form.Group>
        </Form>
      </GenericModal>
      </>
    );
}

export default CrearUsuarioModal;