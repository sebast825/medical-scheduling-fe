import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import {
  fetchLogin,
  fetchMedicoInfo,
  fetchPacienteInfo,
  fetchPersonaInfo,
} from "../../../services/apiService";
import {
  useUserToggleContext,
  useAdministrativoInfoContext,
  useUserInfo,
  usePacienteContext,
  useMedicoInfoContext,
  usePersonaInfoContext,
} from "../../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import GetJwtContent, { DecodedToken } from "../../../utils/jwtUtils";
import { ILogin } from "../../../types/Login.types";
import { Roles } from "../../../types/Roles.type";
import { handleHttpError } from "../../../utils/errorHandler";
import useRediectHomeByRole from "../../../hooks/roles/useRediectHomeByRole";
import "./Login.scss";
import useWindowSize from "../../../hooks/ScreenSize";
import useRedirects from "../../../hooks/useRedicrects";

interface iLoginForm {
  e: () => void;
}
const LoginForm = ({ e }: iLoginForm) => {
  const cambiaLogin = useUserToggleContext();
  const user = useUserInfo();
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setPacienteInfo } = usePacienteContext();
  const { setMedicoInfo } = useMedicoInfoContext();

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

  const { setAdministrativoInfo } = useAdministrativoInfoContext();
  const { setPersonaInfo } = usePersonaInfoContext();

  //busca la info de la persona, hay que reorganizarla
  const getUserInfo = async () => {
    if (user == null) return;

    var params: DecodedToken = GetJwtContent(user);
    var userRole = params.role;

    if (userRole == Roles[Roles.Secretario]) {
      const personaInfo = await fetchPersonaInfo(user, params.PersonaId);
      await setAdministrativoInfo(personaInfo);
    } else if (userRole == Roles[Roles.Paciente]) {
      const pacienteInfo = await fetchPacienteInfo(user, params.PersonaId);
      await setPacienteInfo(pacienteInfo);
      await setPersonaInfo(pacienteInfo);
    } else if (userRole == Roles[Roles.Medico]) {
      const medicoInfo = await fetchMedicoInfo(user, params.PersonaId);
      await setMedicoInfo(medicoInfo);
    } else if (userRole == Roles[Roles.Admin]) {
      const administradorInfo = await fetchPersonaInfo(user, params.PersonaId);
      await setAdministrativoInfo(administradorInfo);
    } else {
      console.log("error");
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // Lógica para manejar el login
    let UserName = "admin";
    let Password = "aro";
    const loginData: ILogin = { UserName, Password };

    //consigue la info del usuario
    try {
      const token: string = await fetchLogin(loginData);
      cambiaLogin(token);
    } catch (error: any) {
      setError(handleHttpError(error));
    }
  };

  return (
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
  );
};

export default LoginForm;
