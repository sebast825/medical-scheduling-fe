import { ButtonGroup, Dropdown } from "react-bootstrap";
import useRedirects from "../../../hooks/useRedicrects";
import { useMedicoInfoContext, useMedicosContext, usePacienteContext, usePersonaInfoContext } from "../../../context/authContext";
import IPacienteResponse from "../../../types/Paciente/PacienteResponse.type";
import { IMedicoResponse } from "../../../types/Medico/MedicoResponse.type";
import CreateHorarioMedicoModal from "../../modals/horarioMedicoModal/create/CreateHorarioMedicoModal";
import useModal from "../../../hooks/useModal";
import useDisponibilidadMedicosLogic from "../../../hooks/disponibilidadMedicos/useDisponibilidadMedicosLogic";

interface IMedicoDropdown {
  medico: IMedicoResponse;
}
function MedicoDropdown(props: IMedicoDropdown) {
  const { medico } = props;
  const {
    redirectInformacionMedicoAdministrador
  } = useRedirects();
const {toggleModal,closeModal,showModal} = useModal();
    const {setMedicoInfo} = useMedicoInfoContext()
  const {setPersonaInfo} = usePersonaInfoContext()
  function handleMedicoInfo(){
    setMedicoInfo(medico);
    setPersonaInfo(medico);
    redirectInformacionMedicoAdministrador()

  }

  const {handleCreate,estadoDisponibilidad} = useDisponibilidadMedicosLogic();
  return (
    <>
    
    <CreateHorarioMedicoModal
        modalField={estadoDisponibilidad}
        show={toggleModal}
        handleClose={closeModal}
        handleConfirm={(e) => handleCreate(e)}
      />
    <Dropdown as={ButtonGroup}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic"></Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => {showModal()}}>
          Crear Horario
        </Dropdown.Item>

        <Dropdown.Item onClick={handleMedicoInfo }>
          {" "}
          Mas Información
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </>
  );
}

export default MedicoDropdown;
