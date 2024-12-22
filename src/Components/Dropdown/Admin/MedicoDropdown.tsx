import { ButtonGroup, Dropdown } from "react-bootstrap";
import useRedirects from "../../../hooks/useRedicrects";
import { useMedicoInfoContext, useMedicosContext, usePacienteContext } from "../../../context/authContext";
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
  const { setPacienteInfo } = usePacienteContext();

    const {setMedicoInfo} = useMedicoInfoContext()

  function handleMedicoInfo(){
    setMedicoInfo(medico);
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
