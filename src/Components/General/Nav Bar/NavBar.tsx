import { useEffect, useRef, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { useUserInfo } from "../../../context/authContext";
import useRedicrects from "../../../hooks/useRedicrects";
import SideMenu from "../sideMenu/SideMenu";
import useRediectHomeByRole from "../../../hooks/roles/useRediectHomeByRole";
import "./NavBar.scss";

function NavBar() {
  const [activeKey, setActiveKey] = useState<string>("link");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const user = useUserInfo();
  const rhandleRedirectHome = useRediectHomeByRole();

  const { redirectToNuestrosMedicos, redirectToLogin, redirectToHome } =
    useRedicrects();

  useEffect(() => {
    if (user != null) {
      setIsAuthenticated(true);
    }
  }, [user]);

  const handleSelect = (selectedKey: string | null) => {
    if (selectedKey) {
      setActiveKey(selectedKey);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const lastExecution = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      let now = Date.now();
      let mayorATimeOut = now - lastExecution.current;
      if (mayorATimeOut > 500) {
        lastExecution.current = now;
        handleVisibility();
      }
    };
    const handleVisibility = () => {
      let escrollDown: boolean = lastScrollY < window.scrollY;
      if (escrollDown) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <Nav
      fill
      variant="tabs"
      activeKey={activeKey}
      onSelect={handleSelect}
      className={`d-flex  align-items-center navBar ${
        isVisible ? "showNavBar" : "hideNavBar"
      }`}
    >
      <Nav.Item>
        <Nav.Link onClick={rhandleRedirectHome}>
          <img src="/images/logo.png" alt="Logo" style={{ height: "40px" }} />
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link onClick={redirectToNuestrosMedicos} eventKey="a">
          Nuestros Medicos
        </Nav.Link>
      </Nav.Item>
      {!isAuthenticated ? (
        <>
          <Nav.Item>
            <Nav.Link onClick={redirectToLogin} eventKey="b">
              Ingresar
            </Nav.Link>
          </Nav.Item>
        </>
      ) : (
        <Nav.Item>
          <Nav.Link eventKey="c" onClick={handleShow}>
            Mi Perfil
          </Nav.Link>
        </Nav.Item>
      )}
      <SideMenu show={show} handleClose={handleClose} />
    </Nav>
  );
}

export default NavBar;
