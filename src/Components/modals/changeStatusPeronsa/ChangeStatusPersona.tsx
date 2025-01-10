import { Form } from "react-bootstrap";
import GenericModal from "../GenericModal/GenericModal";
import { IPersonaResponse } from "../../../types/Persona/PersonaResponse.type";
import { useEffect, useState } from "react";
import { EstadoUsuario } from "../../../types/usuario/estadoUsuario";
import useModal from "../../../hooks/useModal";
import ConfirmModal from "../ConfirmModal";
import { useUserInfo } from "../../../context/authContext";
import usePersonas from "../../../hooks/personas/usePersonas";
import useToastit from "../../../hooks/useToastit";
import { genericMessages } from "../../../constants/genericMessages";

interface IChangeStatusPersona {
  modalField: IPersonaResponse;
  show: boolean;
  handleClose: () => void;
  handleConfirm: (personaResponse: IPersonaResponse) => void;
}

function ChangeStatusPersona(props: IChangeStatusPersona) {
  const user = useUserInfo();
  const { modalField, show, handleClose, handleConfirm } = props;
  const { toggleModal, closeModal, showModal } = useModal();
  const [estado, setEstado] = useState<string>(modalField.estadoUsuario);
  const { updateEstadoPersonaYUsuario } = usePersonas();

 const {warning} = useToastit();
  async function handleConfirmModal() {
    warning(genericMessages.funcionalidadAdministradorRestringido);
    closeModal();
    return;
    /*
    var estadoUsuarioId = claves.indexOf(estado);
    if (user == null) return;
    var personaUpdated = await updateEstadoPersonaYUsuario(
      modalField.id,
      estadoUsuarioId
    );
    if(personaUpdated == undefined)return;
      
    if(estado ==  EstadoUsuario[2]){
    handleConfirm(personaUpdated)}*/
  }

  const claves = Object.keys(EstadoUsuario).filter((key) => isNaN(Number(key)));

  function showConfirmModalAndHideGenericModal() {
    showModal();
    handleClose();
  }


  return (
    <>
      <ConfirmModal
        show={toggleModal}
        handleClose={closeModal}
        handleConfirm={handleConfirmModal}
        body={`Estas seguro que deseas cambiar el estado del usuario ${
          modalField.nombre
        } ${modalField.apellido} a ${estado.toUpperCase()}`}
      />
      <GenericModal
        show={show}
        handleClose={handleClose}
        handleConfirm={showConfirmModalAndHideGenericModal}
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
