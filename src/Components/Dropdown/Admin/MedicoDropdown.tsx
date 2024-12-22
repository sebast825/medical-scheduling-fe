import { ButtonGroup, Dropdown } from "react-bootstrap";
import useRedirects from "../../../hooks/useRedicrects";
import { useMedicoInfoContext, useMedicosContext, usePacienteContext, usePersonaInfoContext } from "../../../context/authContext";
import IPacienteResponse from "../../../types/Paciente/PacienteResponse.type";
import { IMedicoResponse } from "../../../types/MedicoResponse.type";

interface IMedicoDropdown {
  medico: IMedicoResponse;
}
function MedicoDropdown(props: IMedicoDropdown) {
  const { medico } = props;
  const {
    redirectInformacionMedicoAdministrador
  } = useRedirects();

    const {setMedicoInfo} = useMedicoInfoContext()
  const {setPersonaInfo} = usePersonaInfoContext()
  function handleMedicoInfo(){
    setMedicoInfo(medico);
    setPersonaInfo(medico);
    redirectInformacionMedicoAdministrador()

  }
  return (
    <Dropdown as={ButtonGroup}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic"></Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => {}}>
          Crear Horario
        </Dropdown.Item>

        <Dropdown.Item onClick={handleMedicoInfo }>
          {" "}
          Mas Información
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MedicoDropdown;
