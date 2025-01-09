import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import useRediectHomeByRole from "../../../hooks/roles/useRediectHomeByRole";
import "./Login.scss";
import useRedirects from "../../../hooks/useRedicrects";
import useLogin from "../../../hooks/login/useLogin";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../../statics/Spinner";

interface iLoginForm {
  e: () => void;
}
const LoginForm = ({ e }: iLoginForm) => {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, getUserInfo } = useLogin();
  const redirectByRol = useRediectHomeByRole();
  const { redirectToCreatePaciente } = useRedirects();

  const [callFun, setCallFun] = useState<boolean>(false);

  const {
    data: handle,
    isLoading: isLoadingHandleLogin,
    error: handleError,
  } = useQuery({
    queryKey: ["handleLogin"],
    queryFn: async () => {
      await handleLogin("a", "b");
      return [];
    },
    staleTime: Infinity,
    enabled: callFun, // Habilitar la primera consulta
  });

  const {
    data: userInfo,
    isLoading: isLoadingUserInfo,
    error: userInfoError,
  } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      await getUserInfo();
      redirectByRol();
      return [];
    },
    staleTime: Infinity,
    enabled: !!handle, // Habilitar solo si handleLogin se completó
  });
 
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setCallFun(true);
  };

  // Mostrar el estado de carga y los errores
  if (isLoadingUserInfo || isLoadingHandleLogin) {
    return <Spinner />;
  }
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
