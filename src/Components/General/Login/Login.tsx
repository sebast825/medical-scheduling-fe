import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useUserInfo } from "../../../context/authContext";

import useRediectHomeByRole from "../../../hooks/roles/useRediectHomeByRole";
import "./Login.scss";
import useRedirects from "../../../hooks/useRedicrects";
import useLogin from "../../../hooks/login/useLogin";

interface iLoginForm {
  e: () => void;
}
const LoginForm = ({ e }: iLoginForm) => {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const user = useUserInfo();
  const { handleLogin, getUserInfo } = useLogin();
  const [showDemoModal, setShowDemoModal] = useState<boolean>(true);
  const redirectByRol = useRediectHomeByRole();
  const { redirectToCreatePaciente } = useRedirects();

  useEffect(() => {
    if (typeof user == "string") {
      //espera a traer la info del usuario para realizar el redirect
      const executeAsyncTasks = async () => {
        await getUserInfo();
        await redirectByRol();
      };

      executeAsyncTasks();
    }
  }, [user]);

  const handleSubmit =  (event: any) => {
    event.preventDefault();
    handleLogin("a", "b");
  };
  return (
    <>
      {/* <AviableAccountsDemo showModal={showDemoModal} handleClose={()=>setShowDemoModal(false)} /> */}
      <Row className="contenedor justify-content-center align-items-center ">
        {/* ${windowSize.width > 600 ? "p-5" : "p-3"} */}
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
              {error && <p className="text-danger text-center ">{error}</p>}

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
    </>
  );
};

export default LoginForm;
