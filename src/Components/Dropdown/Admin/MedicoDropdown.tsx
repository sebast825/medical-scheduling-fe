import { ButtonGroup, Dropdown } from "react-bootstrap";
import useRedirects from "../../../hooks/useRedicrects";
import {
  useMedicoInfoContext,
  usePersonaInfoContext
} from "../../../context/authContext";
import { IMedicoResponse } from "../../../types/Medico/MedicoResponse.type";
import CreateHorarioMedicoModal from "../../modals/horarioMedicoModal/create/CreateHorarioMedicoModal";
import useDisponibilidadMedicosLogic from "../../../hooks/disponibilidadMedicos/useDisponibilidadMedicosLogic";
import CreateLicenseModal from "../../modals/License/CreateLicenseModal";
import { LicenseCreateRequestDto } from "../../../types/Licenses/LicenseCreateRequestDto.type";

interface IMedicoDropdown {
  medico: IMedicoResponse;
}
function MedicoDropdown(props: IMedicoDropdown) {
  const { medico } = props;
  const { redirectInformacionMedicoAdministrador } = useRedirects();
  const { setMedicoInfo } = useMedicoInfoContext();
  const { setPersonaInfo } = usePersonaInfoContext();


  function handleMedicoInfo() {
    setMedicoInfo(medico);
    setPersonaInfo(medico);
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
  
  return (
    <>
    <CreateLicenseModal medicoName={"mabel"} show={true} handleClose={function (): void {
        throw new Error("Function not implemented.");
      } } handleConfirm={function (license: LicenseCreateRequestDto): void {
        throw new Error("Function not implemented.");
      } }></CreateLicenseModal>
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
            }}>
            Crear Horario
          </Dropdown.Item>
          <Dropdown.Item onClick={()=>console.log("asd")}>
            Crear Licencia
          </Dropdown.Item>
          <Dropdown.Item onClick={handleMedicoInfo}>
            Información
          </Dropdown.Item>
          
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default MedicoDropdown;
