import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "../RecuperarClave.scss"
import { fecthRecuperarClaveRequest } from "../../../../services/apiService";
import { RecuperarClaveRequest } from "../../../../types/usuario/RecuperarClaveRequest";

function EnviarEmail() {
  const [email, setEmail] = useState<string>("");


  async function handelSubmit (e : any){

   let asd : RecuperarClaveRequest = {
      email : email
   }
   e.preventDefault();
      let rsta = await fecthRecuperarClaveRequest(asd); 
      console.log(rsta)
  }

  return (
    <Row className="contenedor justify-content-center align-items-center ">
      {/* ${windowSize.width > 600 ? "p-5" : "p-3"} */}
      <Col md={4} className={`paddingCol shadow-lg rounded bg-white`}>
        <h2 className="text-center mb-2 text-primary">Recuperar Clave</h2>
        {/* onSubmit={} */}
        <Form onSubmit={handelSubmit}  className="d-flex flex-column ">
          <Form.Group controlId="formBasicNombre">
            <Form.Label className="fw-bold"></Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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

export default EnviarEmail;
