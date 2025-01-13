import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import useRediectHomeByRole from "../../../hooks/roles/useRediectHomeByRole";
import "./Login.scss";
import useRedirects from "../../../hooks/useRedicrects";
import useLogin from "../../../hooks/login/useLogin";
import { Spinner } from "../../statics/Spinner";
import { spinnerMessages } from "../../../constants/spinnerMessages";
import { useUserInfo } from "../../../context/authContext";

interface iLoginForm {
  e: () => void;
}
const LoginForm = ({ e }: iLoginForm) => {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, getUserInfo } = useLogin();
  const redirectByRol = useRediectHomeByRole();
  const { redirectToCreatePaciente } = useRedirects();
  const [msgeSpinner, setMsgeSpinner] = useState<string>("");
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const user = useUserInfo();

  useEffect(() => {
    if (user != null) {
      initializeUserSession()
    }
  }, [user]);

  async function initializeUserSession(){
     await getUserInfo();
     await redirectByRol();
    setLoadingLogin(false);
  }
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setMsgeSpinner(spinnerMessages.login);
    setLoadingLogin(true);
    handleLogin("a", "b");
  };

  return (
    <>
      {loadingLogin ? (
        <Spinner msge={msgeSpinner} />
      ) : (
        <Row className="contenedor justify-content-center align-items-center">
          <Col md={4} className={`paddingCol shadow-lg rounded bg-white`}>
            <h2 className="text-center mb-2 text-primary">Iniciar Sesión</h2>
            <Form onSubmit={handleSubmit} className="d-flex flex-column ">
              <Form.Group controlId="formBasicNombre">
                <Form.Label className="fw-bold"></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar usuario"
                  onChange={(e) => setNombre(e.target.value)}
                  value={nombre}
                  className="p-2"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className=""></Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresar contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2"
                />
              </Form.Group>
              <div className="mt-4 d-flex flex-column">
                <Button className="" variant="primary" type="submit">
                  Iniciar Sesión
                </Button>
              </div>
            </Form>
            <div className="mt-2 d-flex flex-column">
              <Button
                onClick={redirectToCreatePaciente}
                variant="secondary"
                type="submit"
              >
                Crear Usuario
              </Button>
            </div>
            <div className="mt-4 d-flex flex-column align-items-end">
              <Button
                variant="link"
                onClick={e}
                className="text-decoration-underline p-0"
              >
                Recuperar Clave
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default LoginForm;
