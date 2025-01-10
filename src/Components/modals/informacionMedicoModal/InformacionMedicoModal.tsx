import { Form } from "react-bootstrap";
import { IMedicoResponse } from "../../../types/Medico/MedicoResponse.type";
import GenericModal from "../GenericModal/GenericModal";
import { useEffect, useState } from "react";
import useMedicos from "../../../hooks/medicos/useMedicos";
import { useMedicoInfoContext } from "../../../context/authContext";
import { MedicoUpdateRequestDTO } from "../../../types/Medico/MedicoUpdateRequest.type";
import useMedicosCacheQuery from "../../../hooks/medicos/useMedicosCacheQuery";
import { genericMessages } from "../../../constants/genericMessages";
import useToastit from "../../../hooks/useToastit";

interface IInformacionMedicoModal {
  show: boolean;
  handleClose: () => void;
  handleConfirm: (personaResponse: IMedicoResponse) => void;
}

function InformacionMedicoModal(props: IInformacionMedicoModal) {
  const { show, handleClose, handleConfirm } = props;
  const [numLicencia, setNumLicencia] = useState<string>("");
  const { medicoInfo } = useMedicoInfoContext();
  const {
    updateMedicos,
    getEspecialidadesMedicos,
    especialidadesMedico,
    getIdEspecialidad,
  } = useMedicos();
  const [especialidad, setEspecialidad] = useState<string>("");
  const { handleReloadMedicos } = useMedicosCacheQuery();
  const { warning } = useToastit();

  useEffect(() => {
    if (medicoInfo == undefined) return;
    getEspecialidadesMedicos();
    setNumLicencia(medicoInfo.numeroLicencia);
    setEspecialidad(medicoInfo.especialidad);
  }, []);

  async function confirmar() {
    warning(genericMessages.funcionalidadAdministradorRestringido);
 
  /*  if (medicoInfo == undefined) return;
    let medicoUpdate: MedicoUpdateRequestDTO = {
      especialidadId: getIdEspecialidad(especialidad),
      numeroLicencia: numLicencia,
    };
    await updateMedicos(medicoInfo?.id, medicoUpdate);
    handleReloadMedicos();*/
    handleClose();
  }

  return (
    <GenericModal
      show={show}
      handleClose={handleClose}
      handleConfirm={confirmar}
      title="Editar Información Personal"
      useDisableConfirmBtn={true}

    >
      <Form className="d-flex flex-column" style={{ gap: "10px" }}>
        <Form.Group controlId="formBasicnumLicencia">
          <Form.Label style={{ textAlign: "left" }}>numLicencia</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresar numLicencia"
            onChange={(e) => setNumLicencia(e.target.value)}
            value={numLicencia}
          />
        </Form.Group>
        <Form.Group key="6">
          <Form.Label style={{ textAlign: "left" }}>Sexo</Form.Label>
          <Form.Select
            onChange={(e) => setEspecialidad(e.target.value)}
            value={especialidad}
          >
            {especialidadesMedico &&
              especialidadesMedico.map((elem) => {
                return (
                  <option key={elem.id} value={elem.nombre}>
                    {elem.nombre}
                  </option>
                );
              })}
          </Form.Select>
        </Form.Group>
      </Form>
    </GenericModal>
  );
}

export default InformacionMedicoModal;
