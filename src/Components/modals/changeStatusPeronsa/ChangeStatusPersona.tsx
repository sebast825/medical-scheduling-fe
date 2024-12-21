import { Form } from "react-bootstrap";
import GenericModal from "../GenericModal/GenericModal";
import { IPersonaResponse } from "../../../types/Persona/PersonaResponse.type";
import { useEffect, useState } from "react";
import { EstadoUsuario } from "../../../types/usuario/estadoUsuario";
import useModal from "../../../hooks/useModal";
import ConfirmModal from "../ConfirmModal";

interface IChangeStatusPersona {
  modalField: IPersonaResponse;
  show: boolean;
  handleClose: () => void;
  handleConfirm: (personaResponse: IPersonaResponse) => void;
}

function ChangeStatusPersona(props: IChangeStatusPersona) {

  const { modalField, show, handleClose, handleConfirm } = props;
  const { toggleModal, closeModal, showModal } = useModal();
  function confirmar() {}
  const [estado, setEstado] = useState<string>(modalField.estadoUsuario);

  useEffect(() => {
    var estadoUsuarioId = claves.indexOf(estado);

    console.log(estado, estadoUsuarioId);
  });

  function handleConfirmModal(){

  }

  const claves = Object.keys(EstadoUsuario).filter((key) => isNaN(Number(key)));

  function showAndHideModal(){
   showModal()
   handleClose()
  }
  return (
    <>
      <ConfirmModal
        show={toggleModal}
        handleClose={closeModal}
        handleConfirm={handleConfirmModal}
        body={`Estas seguro que deseas cambiar el estado del usuario ${modalField.nombre} ${modalField.apellido} a ${estado.toUpperCase()}`}
      />
      <GenericModal
        show={show}
        handleClose={handleClose}
        handleConfirm={showAndHideModal}
        title="Actualizar estado usuario "
      >
        <Form>
          <Form.Group controlId="formBasicInput">
            <Form.Label>
              <h4>
                {modalField.nombre} {modalField.apellido}
              </h4>
              <p>Dni: {modalField.numeroDocumento}</p>
            </Form.Label>
            <Form.Select
              value={estado}
              onChange={(e) => {
                setEstado(e.target.value);
                console.log(estado);
              }}
            >
              {claves.map((estado) => (
                <option key={estado} value={estado}>
                  {estado}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </GenericModal>
    </>
  );
}

export default ChangeStatusPersona;
