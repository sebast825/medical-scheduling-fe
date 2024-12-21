import { ButtonGroup, Dropdown } from "react-bootstrap";
import useRedirects from "../../../hooks/useRedicrects";
import { usePacienteContext } from "../../../context/authContext";
import IPacienteResponse from "../../../types/Paciente/PacienteResponse.type";

interface IpacienteDropwdown{
   paciente : IPacienteResponse
}
function PacienteDropdown (props:IpacienteDropwdown ) {

   const {paciente} = props;
   const {
      redirectToNuevoTurnoFilterMedico,
      redirectToNuevoTurnoFilterEspecialidad,
      redirectListadoTurnos,
      redirectInformaciónPacienteSecretario,
    } = useRedirects();
    const { setPacienteInfo } = usePacienteContext();

    
  function nuevoTurnoByMedico(): void {
   setPacienteInfo(paciente);
   redirectToNuevoTurnoFilterMedico();
 }
 function nuevoTurnoByEspecialidad(): void {
   setPacienteInfo(paciente);
   redirectToNuevoTurnoFilterEspecialidad();
 }

 function redirectTurnosPaciente(): void {
   setPacienteInfo(paciente);
   redirectListadoTurnos();
 }
 function redirectInformacionPaciente(): void {
   setPacienteInfo(paciente);
   redirectInformaciónPacienteSecretario();
 }
   return(
      <Dropdown as={ButtonGroup}>
      <Dropdown.Toggle
        variant="primary"
        id="dropdown-basic"
      ></Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          //className="tezt-algin-right"
          onClick={() => nuevoTurnoByMedico()}
        >
          Nuevo Turno por Medico
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => nuevoTurnoByEspecialidad()}
        >
          Nuevo Turno por Especialidad
        </Dropdown.Item>

        <Dropdown.Item
          onClick={() => redirectInformacionPaciente()}
        >
          {" "}
          Mas Información
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => redirectTurnosPaciente()}
        >
          Turnos
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
   )
}

export default PacienteDropdown;