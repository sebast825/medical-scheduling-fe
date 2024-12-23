import { Offcanvas, Nav } from "react-bootstrap";
import { useUserToggleContext } from "../../../context/authContext";
import useRedirects from "../../../hooks/useRedicrects";
import SideMenuPaciente from "./Paciente/SideMenuPaciente";
import usePacientes from "../../../hooks/pacientes/usePacientes";
import SideMenuAdministrador from "./Administrador/SideMenuAdministrador";
import useIsAdministrador from "../../../hooks/roles/useIsAdministrador";
import useIsPaciente from "../../../hooks/roles/useIsPaciente";

interface ISideMenu {
  show: boolean;
  handleClose: () => void;
}

function SideMenu({ show, handleClose }: ISideMenu) {
  const login = useUserToggleContext();
  const isPaciente = useIsPaciente();
  const isAdmin = useIsAdministrador();
  const { redirectToPacienteHome } = useRedirects();

  //como no puedo pasar un hook en on click uso una función
  function closeModalAndCallFunction(fn: () => void) {
    fn();
    handleClose();
  }
  return (
    <Offcanvas show={show} onHide={handleClose} style={{ width: "300px" }}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="offcanvas-body">
        <Nav className="flex-column">
          <Nav.Link
            onClick={() => {
              closeModalAndCallFunction(redirectToPacienteHome);
            }}
          >
            Mis Turnos
          </Nav.Link>
          {isPaciente && <SideMenuPaciente handleClose={() => handleClose()} />}
          {isAdmin && 
            <SideMenuAdministrador handleClose={() => handleClose()} />
          }
          <Nav.Link
            href="/"
            onClick={() => {
              handleClose();
              login(null);
            }}
          >
            Salir
          </Nav.Link>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SideMenu;
