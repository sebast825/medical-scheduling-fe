import GenericModal from "../GenericModal/GenericModal";
import { CreateUsuarioRequest } from "../../../types/usuario/CreateUsuarioRequest";
import { Form } from "react-bootstrap";
import { useState } from "react";
import useToastit from "../../../hooks/useToastit";
import { error } from "console";

interface ICrearUsuarioModal {
  show: boolean;
  handleClose: () => void;
  handleConfirm: (personaResponse: CreateUsuarioRequest) => void;
}

function CrearUsuarioModal(props: ICrearUsuarioModal) {
  const { show, handleClose, handleConfirm } = props;

  const [nombre, setNombre] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const { error } = useToastit();

  function confirmar() {
    let validarMsge = validarUsuario();
    if (validarMsge != null) {
      error(validarMsge);
      return;
    }

    let usuario: CreateUsuarioRequest = {
      UserName: nombre,
      Password: password,
      Email: email,
    };
    handleConfirm(usuario);
  }

  function validarUsuario(): string | undefined {
    if (!validarNombreUsuario())
      return "El nombre de usuario debe tener al menos 4 caracteres";
    if (!validarPassword())
      return "La contraseña debe tener al menos 4 caracteres";
    if (!validarEmailFormat()) return "El formato del email no es valido";
    if (!emailsMatch()) return "Los emails no coinciden";
  }
  function validarNombreUsuario(): boolean {
    return nombre.length < 4 ? false : true;
  }
  function validarPassword(): boolean {
    return password.length < 4 ? false : true;
  }
  function validarEmail(): boolean {
    if (!validarEmailFormat()) {
      error("El formato del email no es valido");
      return false;
    } else if (!emailsMatch()) {
      error("Los emails no coinciden");
      return false;
    } else {
      return true;
    }
  }
  function validarEmailFormat(): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  function emailsMatch(): boolean {
    return email == confirmEmail;
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
            <Form.Label style={{ textAlign: "left" }}>
              Nombre Usuario
            </Form.Label>
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
            <Form.Label style={{ textAlign: "left" }}>
              Confirmar Email
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresar email"
              onChange={(e) => setConfirmEmail(e.target.value)}
              value={confirmEmail}
              onPaste={(e) => e.preventDefault()}
              autoComplete="off"
            />
          </Form.Group>
        </Form>
      </GenericModal>
    </>
  );
}

export default CrearUsuarioModal;
