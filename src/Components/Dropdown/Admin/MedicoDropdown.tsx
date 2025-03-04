import { ButtonGroup, Dropdown } from "react-bootstrap";
import useRedirects from "../../../hooks/useRedicrects";
import {
  useMedicoInfoContext,
  usePersonaInfoContext,
} from "../../../context/authContext";
import { IMedicoResponse } from "../../../types/Medico/MedicoResponse.type";
import CreateHorarioMedicoModal from "../../modals/horarioMedicoModal/create/CreateHorarioMedicoModal";
import useDisponibilidadMedicosLogic from "../../../hooks/disponibilidadMedicos/useDisponibilidadMedicosLogic";
import CreateLicenseModal from "../../modals/License/CreateLicenseModal";
import { LicenseCreateRequestDto } from "../../../types/Licenses/LicenseCreateRequestDto.type";
import useLicense from "../../../hooks/License/useLicense";

interface IMedicoDropdown {
  medico: IMedicoResponse;
}
function MedicoDropdown(props: IMedicoDropdown) {
  const { medico } = props;
  const { redirectInformacionMedicoAdministrador } = useRedirects();
  const { setMedicoInfo } = useMedicoInfoContext();
  const { setPersonaInfo } = usePersonaInfoContext();

  function loadContext(){
    setMedicoInfo(medico);
    setPersonaInfo(medico);
  }
  function handleMedicoInfo() {
    loadContext()
    redirectInformacionMedicoAdministrador();
  }

  const {
    handleCreate,
    estadoDisponibilidad,
    setEstadoDisponibilidad,
    toggleCreateModal,
    closeCreateModal,
    showCreateModal,
  } = useDisponibilidadMedicosLogic();

  function handleCreateHorario() {
    setEstadoDisponibilidad((prevState) => ({
      ...prevState,
      medicoId: medico.id,
      medico: medico.nombre,
    }));
    showCreateModal();
  }

  const {
    toggleCreateLicenseModal,
    closeCreateLicenseModal,
    showCreateLicenseModal,
    handleCreateLicense,
  } = useLicense();
  function handleShowCreateLicense(){
    loadContext();
    showCreateLicenseModal()
  }
  return (
    <>
      <CreateLicenseModal
        show={toggleCreateLicenseModal}
        handleClose={closeCreateLicenseModal}
        handleConfirm={(e)=>handleCreateLicense(e)}
      ></CreateLicenseModal>
      <CreateHorarioMedicoModal
        modalField={estadoDisponibilidad}
        show={toggleCreateModal}
        handleClose={closeCreateModal}
        handleConfirm={(e) => handleCreate(e)}
      />

      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          variant="primary"
          id="dropdown-basic"
        ></Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              handleCreateHorario();
            }}
          >
            Crear Horario
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleShowCreateLicense()}>
            Crear Licencia
          </Dropdown.Item>
          <Dropdown.Item onClick={handleMedicoInfo}>Información</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default MedicoDropdown;
