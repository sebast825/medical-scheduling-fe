import { Nav, NavDropdown } from "react-bootstrap";
import useRedirects from "../../../../hooks/useRedicrects";
import { ISideMenuGeneric } from "../ISideMenuGeneric";

function SideMenuAdministrador(props: ISideMenuGeneric) {
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
      <NavDropdown title="Crear" id="nav-dropdown">
        <NavDropdown.Item
          onClick={() => {
            closeModalAndCallFunction(redirectToNuevoTurnoFilterMedico);
          }}
          eventKey="4.1"
        >
          Medico
        </NavDropdown.Item>
        <NavDropdown.Item
          onClick={() => {
            closeModalAndCallFunction(redirectToNuevoTurnoFilterEspecialidad);
          }}
          eventKey="4.2"
        >
          Secretario
        </NavDropdown.Item>
      </NavDropdown>

      <NavDropdown title="Medicos" id="nav-dropdown">
        <NavDropdown.Item
          onClick={() => {
            closeModalAndCallFunction(redirectToNuevoTurnoFilterMedico);
          }}
          eventKey="4.1"
        >
          Listado Medicos
        </NavDropdown.Item>
        <NavDropdown.Item
          onClick={() => {
            closeModalAndCallFunction(redirectToNuevoTurnoFilterEspecialidad);
          }}
          eventKey="4.2"
        >
          Horarios
        </NavDropdown.Item>
      </NavDropdown>

      <Nav.Link
        onClick={() => {
          closeModalAndCallFunction(redirectToInformacionPersonal);
        }}
      >
        Pacientes{" "}
      </Nav.Link>
    </>
  );
}

export default SideMenuAdministrador;
