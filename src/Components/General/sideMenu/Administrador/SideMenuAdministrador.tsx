import { Nav, NavDropdown } from "react-bootstrap";
import useRedirects from "../../../../hooks/useRedicrects";
import { ISideMenuGeneric } from "../ISideMenuGeneric";

function SideMenuAdministrador(props: ISideMenuGeneric) {
  const { handleClose } = props;
  const { redirectToAdministradorHome, redirectTablePacienteAdministrador ,redirectToLicenses,redirectToCreateMedico} =
    useRedirects();

  //como no puedo pasar un hook en on click uso una función
  function closeModalAndCallFunction(fn: () => void) {
    fn();
    handleClose();
  }

  return (
    <>
      <Nav.Link
        onClick={() => {
          closeModalAndCallFunction(redirectToAdministradorHome);
        }}
      >
        Home
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          closeModalAndCallFunction(redirectTablePacienteAdministrador);
        }}
      >
        Usuarios
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          closeModalAndCallFunction(redirectToLicenses);
        }}
      >
        Licencias
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          closeModalAndCallFunction(redirectToCreateMedico);
        }}
      >
        Crear Médico
      </Nav.Link>
    </>
  );
}

export default SideMenuAdministrador;
