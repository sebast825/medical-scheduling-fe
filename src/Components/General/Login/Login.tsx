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
  usePersonaInfoContext,
  useUserInfo,
  usePacienteContext,
  useMedicoInfoContext,
} from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
import GetJwtContent, { DecodedToken } from "../../../utils/jwtUtils";
import { ILogin } from "../../../types/Login.types";
import { Roles } from "../../../types/Roles.type";
import { handleHttpError } from "../../../utils/errorHandler";
import useRediectHomeByRole from "../../../hooks/roles/useRediectHomeByRole";

const LoginForm = () => {
  const navigate = useNavigate();
  const cambiaLogin = useUserToggleContext();
  const user = useUserInfo();
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setPacienteInfo } = usePacienteContext();
  const { setMedicoInfo ,medicoInfo} = useMedicoInfoContext();

  const redirectByRol = useRediectHomeByRole();

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

  const { setPersonaInfo } = usePersonaInfoContext();

  //busca la info de la persona, hay que reorganizarla
  const getUserInfo = async () => {
    if (user == null) return;

    var params: DecodedToken = GetJwtContent(user);
    var userRole = params.role;

    if (userRole == Roles[Roles.Secretario]) {
      const personaInfo = await fetchPersonaInfo(user, params.PersonaId);
      await setPersonaInfo(personaInfo);
    } else if (userRole == Roles[Roles.Paciente]) {
      const pacienteInfo = await fetchPacienteInfo(user, params.PersonaId);
      await setPacienteInfo(pacienteInfo);   
    }
    else if (userRole == Roles[Roles.Medico]) {

     const medicoInfo = await fetchMedicoInfo(user, params.PersonaId);
      await setMedicoInfo(medicoInfo);

    console.log(medicoInfo)
   
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // Lógica para manejar el login
    let UserName = "paciente";
    let Password = "a";
    const loginData: ILogin = { UserName, Password };

    //consigue la info del usuario
    try {
      const token: string = await fetchLogin(loginData);
      console.log(token);
      cambiaLogin(token);
    } catch (error: any) {
      setError(handleHttpError(error));
    }
  };

  return (
    <Container className="mt-2">
      <Row className="justify-content-md-center">
        <Col md={4}>
          <h2 className="text-center">Login</h2>
          <Form
            onSubmit={handleSubmit}
            className="d-flex flex-column"
            style={{ gap: "20px" }}
          >
            <Form.Group controlId="formBasicnombre">
              <Form.Label style={{ textAlign: "left" }}>nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar nombre"
                onChange={(e) => setNombre(e.target.value)}
                value={nombre}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {error && <p className="text-danger">{error}</p>}

            <Button className="mt-2" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
