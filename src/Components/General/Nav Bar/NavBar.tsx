import { useEffect, useRef, useState } from "react";
import Nav from "react-bootstrap/Nav";
import {
  useUserInfo,
  useUserToggleContext,
} from "../../../context/authContext";
import useRedicrects from "../../../hooks/useRedicrects";
import SideMenu from "../sideMenu/SideMenu";
import useRediectHomeByRole from "../../../hooks/roles/useRediectHomeByRole";
import "./NavBar.scss";
import useIsSecretario from "../../../hooks/roles/useIsSecretario";
import useWindowSize from "../../../hooks/ScreenSize";

function NavBar() {
  const [activeKey, setActiveKey] = useState<string>("link");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const user = useUserInfo();
  const rhandleRedirectHome = useRediectHomeByRole();

  const { redirectToNuestrosMedicos, redirectToLogin, redirectToHome } =
    useRedicrects();
  const login = useUserToggleContext();

  useEffect(() => {
    if (user != null) {
      setIsAuthenticated(true);
    } else {
      //en caso de que se desloguee un secretario desde el nav bar se actualiza correctamente
      setIsAuthenticated(false);
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
  //const [lastScrollY, setLastScrollY] = useState<number>(0);
  const lastExecution = useRef<number>(0);
  const lastScrollY = useRef<number>(0);
  const screenSize = useWindowSize();
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null); // Referencia para el timeout

  const handleScroll = () => {
    let now = Date.now();
    let timeSinceLastExecution = now - lastExecution.current;
    //cada cuanto tiempo se puede ejecutar la funcion
    if (timeSinceLastExecution > 500) {
      lastExecution.current = now;

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      //se uasa para que tome el ultimo scroll y no el del comienzo, si no a veces no se muestra
      scrollTimeout.current = setTimeout(() => {
        handleVisibility();
      }, 100);
    }
  };

  const handleVisibility = () => {
    let scrollY = window.scrollY;
    let escrollDown: boolean = lastScrollY.current < scrollY;
    if (!escrollDown || scrollY < 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    lastScrollY.current = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);
  const isSecretario = useIsSecretario();

  return (
    <Nav
      fill
      variant="tabs"
      activeKey={activeKey}
      onSelect={handleSelect}
      className={`d-flex  align-items-center   navBar ${
        isVisible ? "showNavBar" : "hideNavBar"
      }`}
    >
      <Nav.Item>
        <Nav.Link onClick={rhandleRedirectHome} className="logo">
          <img src="/images/logo.png" alt="Logo" style={{ height: "40px" }} />
        </Nav.Link>
      </Nav.Item>

      {screenSize.width > 400 && (
        <Nav.Item>
          {" "}
          <Nav.Link onClick={redirectToNuestrosMedicos} eventKey="a">
            Nuestros Medicos
          </Nav.Link>
        </Nav.Item>
      )}

      {!isAuthenticated ? (
        <>
          <Nav.Item>
            <Nav.Link onClick={redirectToLogin} eventKey="b">
              Ingresar
            </Nav.Link>
          </Nav.Item>
        </>
      ) : isSecretario ? (
        <>
          <Nav.Item>
            <Nav.Link
              eventKey="c"
              onClick={() => {
                login(null);
                redirectToHome();
              }}
            >
              Salir
            </Nav.Link>
          </Nav.Item>
        </>
      ) : (
        <>
          <Nav.Item>
            <Nav.Link eventKey="c" onClick={handleShow}>
              Mi Perfil
            </Nav.Link>
          </Nav.Item>
        </>
      )}
      <SideMenu show={show} handleClose={handleClose} />
    </Nav>
  );
}

export default NavBar;
