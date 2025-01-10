import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "../RecuperarClave.scss";
import { RecuperarClaveRequest } from "../../../../types/usuario/RecuperarClaveRequest";
import { Spinner } from "../../../statics/Spinner";
import useRequestRecoverPasswordCacheQuery from "../../../../hooks/recuperarContraseña/useRequestRecoverPasswordCacheQuery";
import useToastit from "../../../../hooks/useToastit";
import { genericMessages } from "../../../../constants/genericMessages";
import useRedirects from "../../../../hooks/useRedicrects";

interface IEnviarEmail {
  e: () => void;
}
function EnviarEmail({ e }: IEnviarEmail) {
  const [email, setEmail] = useState<string>("");
  const {error} = useToastit();
    const { isLoading, setSendEmail, isSuccess } =
    useRequestRecoverPasswordCacheQuery();


async function handelSubmit() {
    let dto: RecuperarClaveRequest = {
      email: email,
    };
    if(!validarEmailFormat()){
      error(genericMessages.errorEmail);
      return;
    }else{
      setSendEmail(dto);
    }

 
  }

  function validarEmailFormat(): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

   

  return (

    (
      isLoading ? <Spinner /> :
 
    <Row className="contenedor justify-content-center align-items-center ">
      {/* ${windowSize.width > 600 ? "p-5" : "p-3"} */}
      <Col md={4} className={`paddingCol shadow-lg rounded bg-white`}>
        <h2 className="text-center mb-2 text-primary">Recuperar Clave</h2>
        {/* onSubmit={} */}
        <Form className="d-flex flex-column ">
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

            <Button className="" variant="primary" onClick={handelSubmit} >
              Enviar Solicitud
            </Button>
          </div>
      
        </Form>
 
        <div className="mt-4 d-flex flex-column align-items-end">
          <Button
            variant="link"
            onClick={e}
            className="text-decoration-underline p-0"
          >
            Volver
          </Button>
        </div>
      </Col>
    </Row>   )
  );
}

export default EnviarEmail;
