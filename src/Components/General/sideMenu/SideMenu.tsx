import { Offcanvas, Nav, NavDropdown } from "react-bootstrap";
import { useUserToggleContext } from "../../../context/authContext";
import useRedirects from "../../../hooks/useRedicrects";
import { useEffect } from "react";
import SideMenuPaciente from "./Paciente/SideMenuPaciente";

interface ISideMenu {
  show: boolean;
  handleClose: () => void;
}

function SideMenu({ show, handleClose }: ISideMenu) {
  const login = useUserToggleContext();

  const {
    redirectToPacienteHome,
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
          <SideMenuPaciente handleClose={()=>handleClose()}/>
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
