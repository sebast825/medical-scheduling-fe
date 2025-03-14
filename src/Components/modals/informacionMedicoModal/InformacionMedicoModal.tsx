import { Form } from "react-bootstrap";
import GenericModal from "../GenericModal/GenericModal";
import { useEffect, useState } from "react";
import { useMedicoInfoContext } from "../../../context/authContext";
import { MedicoUpdateRequestDTO } from "../../../types/Medico/MedicoUpdateRequest.type";
import useMedicosCacheQuery from "../../../hooks/medicos/useMedicosCacheQuery";
import { genericMessages } from "../../../constants/genericMessages";
import useToastit from "../../../hooks/useToastit";
import { permisosEdicion } from "../../../constants/permisosEdicion";
import useEspecialidades from "../../../hooks/especialidades/useEspecialidades";

interface IInformacionMedicoModal {
  show: boolean;
  handleClose: () => void;
  handleConfirm: (personaResponse: MedicoUpdateRequestDTO) => void;
}

function InformacionMedicoModal(props: IInformacionMedicoModal) {
  const { show, handleClose, handleConfirm } = props;
  const [numLicencia, setNumLicencia] = useState<string>("");
  const { medicoInfo } = useMedicoInfoContext();
  const {
    getEspecialidadesMedicos,
    especialidadesMedico,
    getIdEspecialidad,
  } = useEspecialidades();
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
    if (!permisosEdicion.admin) {
      warning(genericMessages.funcionalidadAdministradorRestringido);
      handleClose();
    }
    if (medicoInfo == undefined) return;
    let medicoUpdate: MedicoUpdateRequestDTO = {
      especialidadId: getIdEspecialidad(especialidad),
      numeroLicencia: numLicencia,
    };
    if(!medicoUpdate.especialidadId || !medicoUpdate.numeroLicencia){
      warning(genericMessages.camposIncompletos)
      return;
    }
    await handleConfirm(medicoUpdate);
    handleReloadMedicos();
    handleClose();
  }

  return (
    <GenericModal
      show={show}
      handleClose={handleClose}
      handleConfirm={confirmar}
      title="Editar Información Profesional"
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
          <Form.Label style={{ textAlign: "left" }}>Especialdiad</Form.Label>
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
