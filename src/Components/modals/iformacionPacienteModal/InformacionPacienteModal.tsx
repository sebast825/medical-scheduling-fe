import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { IGenericObject } from "../../../types/IGenericObject.type";
import useManageObjectList from "../../../hooks/objectField/useManageObjectList";
import GenericModal from "../GenericModal/GenericModal";
import FormInput from "../formInput/formInput";
import { usePacienteContext } from "../../../context/authContext";
import useToastit from "../../../hooks/useToastit";
import validarInputForm from "../../../utils/validarDatos";
import { IPacienteUpdate } from "../../../types/Paciente/PacienteUpdate.type";
import usePacientes from "../../../hooks/pacientes/usePacientes";
import IPacienteResponse from "../../../types/Paciente/PacienteResponse.type";
import useIsPaciente from "../../../hooks/roles/useIsPaciente";

interface IInformacionPacienteModal {
  modalField: IPacienteResponse;
  show: boolean;
  handleClose: () => void;
  handleConfirm: (pacienteResponse: IPacienteResponse) => void;
}

function InformacionPacienteModal({
  modalField,
  show,
  handleClose,
  handleConfirm,
}: IInformacionPacienteModal) {
  const [telefonoEmergencia, setTelefonoEmergencia] = useState<string>(
    modalField.telefonoEmergencia
  );
  const [nombreEmergencia, setNombreEmergencia] = useState<string>(
    modalField.nombreEmergencia
  );

  
  const { pacienteInfo } = usePacienteContext();
  const { putPaciente } = usePacientes();
  const { error } = useToastit();

  useEffect(() => {}, [pacienteInfo]);

  async function handleUpdatePaciente() {
    handleClose();

    let paciente = createPaciente();
    let updatedPaciente = await fetchPacienteUpdate(paciente);

    if (updatedPaciente != undefined) {
      handleConfirm(updatedPaciente);
    }else{
      error("Ocurrio un error, no se pudo actualizar la información.");
    }
  }
  function createPaciente(): IPacienteUpdate {
    const paciente: IPacienteUpdate = {
      TelefonoEmergencia: telefonoEmergencia,
      NombreEmergencia: nombreEmergencia,
    };
    return paciente;
  }
  async function fetchPacienteUpdate(
    paciente: IPacienteUpdate
  ): Promise<IPacienteResponse | undefined> {
    if (pacienteInfo == null) return;

    var updatedPaciente: IPacienteResponse | undefined = await putPaciente(
      paciente,
      pacienteInfo.id.toString()
    );
    return updatedPaciente;
  }

  return (
    <>
      <GenericModal
        show={show}
        handleClose={handleClose}
        handleConfirm={handleUpdatePaciente}
        title="Editar Contacto Emergencia"
      >
        <Form className="d-flex flex-column" style={{ gap: "10px" }}>
   
          <Form.Group>
            <Form.Label style={{ textAlign: "left" }}>
              Contacto de Emergencia
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar Nombre"
              onChange={(e) => setNombreEmergencia(e.target.value)}
              value={nombreEmergencia}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ textAlign: "left" }}>
              Telefono Contacto
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar Telefono"
              onChange={(e) => setTelefonoEmergencia(e.target.value)}
              value={telefonoEmergencia}
            />
          </Form.Group>
        </Form>
      </GenericModal>
    </>
  );
}

export default InformacionPacienteModal;
