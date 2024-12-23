import { Nav, NavDropdown } from "react-bootstrap";
import useRedirects from "../../../../hooks/useRedicrects";
import { ISideMenuGeneric } from "../ISideMenuGeneric";


function SideMenuPaciente(props: ISideMenuGeneric) {
  const { handleClose } = props;
  const {
    redirectToNuevoTurnoFilterMedico,
    redirectToNuevoTurnoFilterEspecialidad,
    redirectToInformacionPersonal,
  } = useRedirects();

  //como no puedo pasar un hook en on click uso una función
  function closeModalAndCallFunction(fn: () => void) {
    fn();
    handleClose();
  }
  return (
    <>
      <NavDropdown title="Nuevo Turno" id="nav-dropdown">
        <NavDropdown.Item
          onClick={() => {
            closeModalAndCallFunction(redirectToNuevoTurnoFilterMedico);
          }}
          eventKey="4.1"
        >
          Buscar Medico
        </NavDropdown.Item>
        <NavDropdown.Item
          onClick={() => {
            closeModalAndCallFunction(redirectToNuevoTurnoFilterEspecialidad);
          }}
          eventKey="4.2"
        >
          Buscar Especialidad
        </NavDropdown.Item>
      </NavDropdown>
      <Nav.Link
        onClick={() => {
          closeModalAndCallFunction(redirectToInformacionPersonal);
        }}
      >
        Mi Perfil
      </Nav.Link>
    </>
  );
}

export default SideMenuPaciente;
