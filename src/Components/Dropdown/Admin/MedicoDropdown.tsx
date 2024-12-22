import { ButtonGroup, Dropdown } from "react-bootstrap";
import useRedirects from "../../../hooks/useRedicrects";
import { usePacienteContext } from "../../../context/authContext";
import IPacienteResponse from "../../../types/Paciente/PacienteResponse.type";
import { IMedicoResponse } from "../../../types/MedicoResponse.type";

interface IMedicoDropdown {
  medico: IMedicoResponse;
}
function MedicoDropdown(props: IMedicoDropdown) {
  const { medico } = props;
  const {
    redirectToNuevoTurnoFilterMedico,
    redirectToNuevoTurnoFilterEspecialidad,
    redirectListadoTurnos,
    redirectInformaciónPacienteSecretario,
  } = useRedirects();
  const { setPacienteInfo } = usePacienteContext();


  return (
    <Dropdown as={ButtonGroup}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic"></Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => {}}>
          Crear Horario
        </Dropdown.Item>

        <Dropdown.Item onClick={() => {}}>
          {" "}
          Mas Información
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MedicoDropdown;
