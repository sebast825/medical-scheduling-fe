import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "../RecuperarClave.scss";
import { fecthActualizarClave, fecthRecuperarClaveRequest } from "../../../../services/apiService";
import { RecuperarClaveRequest } from "../../../../types/usuario/RecuperarClaveRequest";
import { NuevaClaveRequest } from "../../../../types/usuario/NuevaClaveRequest";
import { useLocation } from "react-router-dom";

function EnivarNuevaContraseña() {
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const location = useLocation();

  function getUrlToken() : string | null {
    // Obtén el valor del parámetro token de la URL
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    return token;
  }

  async function handelSubmit(e: any) {
    e.preventDefault();

    let token = getUrlToken();
    if(token == null)return;
    let dto: NuevaClaveRequest = {
      Password: password,
      PasswordConfirm: password2,
      Token: token
      //  email : email
    };
    console.log(dto)
    let rsta = await fecthActualizarClave(dto);
    console.log(rsta);
  }
  return (
    <Row className="contenedor justify-content-center align-items-center ">
      {/* ${windowSize.width > 600 ? "p-5" : "p-3"} */}
      <Col md={4} className={`paddingCol shadow-lg rounded bg-white`}>
        <h2 className="text-center mb-2 text-primary">
          Ingresar nueva Contraseña
        </h2>
        {/* onSubmit={} */}
        <Form onSubmit={handelSubmit} className="d-flex flex-column ">
          <Form.Group controlId="formBasicNombre">
            <Form.Label className="fw-bold"></Form.Label>
            <Form.Control
              type="text"
              placeholder="Nueva Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="p-2"
            />
          </Form.Group>
          <Form.Group controlId="formBasicNombre">
            <Form.Label className="fw-bold"></Form.Label>
            <Form.Control
              type="text"
              placeholder="Repetir Contraseña"
              onChange={(e) => setPassword2(e.target.value)}
              value={password2}
              className="p-2"
            />
          </Form.Group>
          <div className="mt-4 d-flex flex-column">
            {/* {error && <p className="text-danger text-center ">{error}</p>} */}

            <Button className="" variant="primary" type="submit">
              Enviar Solicitud
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default EnivarNuevaContraseña;
