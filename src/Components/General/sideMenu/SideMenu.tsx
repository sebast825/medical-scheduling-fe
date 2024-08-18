import { Offcanvas, Nav, NavDropdown } from "react-bootstrap";
import { useUserToggleContext } from "../../../context/authContext";
import useRedirects from "../../../hooks/useRedicrects";

interface ISideMenu {
  show: boolean;
  handleClose: () => void;
}

function SideMenu({ show, handleClose }: ISideMenu) {
  const login = useUserToggleContext();

  const {
   useRedirectToPacienteHome,
   useRedirectToNuevoTurnoFilterMedico,
   useRedirectToNuevoTurnoFilterEspecialidad,
 } = useRedirects();
  return (
    <Offcanvas show={show} onHide={handleClose} style={{ width: "300px" }}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="flex-column">
          <Nav.Link onClick={useRedirectToPacienteHome}>Mis Turnos</Nav.Link>
          <NavDropdown title="Nuevo Turno" id="nav-dropdown">
            <NavDropdown.Item
              onClick={useRedirectToNuevoTurnoFilterMedico}
              eventKey="4.1"
            >
              Buscar Medico
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={useRedirectToNuevoTurnoFilterEspecialidad}
              eventKey="4.2"
            >
              Buscar Especialdiad
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/settings">Mi Perfil</Nav.Link>
          <Nav.Link href="/" onClick={()=>login(null)}>
            Salir
          </Nav.Link>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SideMenu;
