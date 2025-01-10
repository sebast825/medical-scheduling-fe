import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "../RecuperarClave.scss";
import { fecthActualizarClave, fecthRecuperarClaveRequest } from "../../../../services/apiService";
import { RecuperarClaveRequest } from "../../../../types/usuario/RecuperarClaveRequest";
import { NuevaClaveRequest } from "../../../../types/usuario/NuevaClaveRequest";
import { useLocation } from "react-router-dom";
import { Spinner } from "../../../statics/Spinner";
import useRedicrects from "../../../../hooks/useRedicrects";
import useUpdatePasswordCacheQuery from "../../../../hooks/recuperarContraseña/useUpdatePasswordCacheQuery copy";
import useToastit from "../../../../hooks/useToastit";
import { genericMessages } from "../../../../constants/genericMessages";
import ConfirmButton from "../../../buttons/confirmButton/ConfirmButton";

function EnivarNuevaContraseña() {
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const location = useLocation();
const { error} = useToastit();
  
  const  {isLoading,newPassword,setDtoRecoverPassword} = useUpdatePasswordCacheQuery();
const {redirectToLogin}= useRedicrects();
  function getUrlToken() : string | null {
    // Obtén el valor del parámetro token de la URL
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    return token;
  }
  function passwordMatch(): boolean {
    return password == password2;
  }
  
  useEffect(()=>{
    if(newPassword){

     setTimeout(() => {
      redirectToLogin()
     }, 100);
    }
  },[newPassword])

  async function handelSubmit() {
    //e.preventDefault();
    if(!passwordMatch()){
        error(genericMessages.passwordDontMatch);
    }
    let token = getUrlToken();
    if(token == null)return;
    let dto: NuevaClaveRequest = {
      Password: password,
      PasswordConfirm: password2,
      Token: token
      //  email : email
    };
    console.log(dto)
    setDtoRecoverPassword(dto)
    //let rsta = await fecthActualizarClave(dto);
    //console.log(rsta);
  }
  if(isLoading) return <Spinner/>;

  return (
    <Row className="contenedor justify-content-center align-items-center ">
      {/* ${windowSize.width > 600 ? "p-5" : "p-3"} */}
      <Col md={4} className={`paddingCol shadow-lg rounded bg-white`}>
        <h2 className="text-center mb-2 text-primary">
          Ingresar nueva Contraseña
        </h2>
        {/* onSubmit={} */}
        <Form  className="d-flex flex-column ">
          <Form.Group controlId="formBasicNombre">
            <Form.Label className="fw-bold"></Form.Label>
            <Form.Control
              type="password"
              placeholder="Nueva Contraseña"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="p-2"
            />
          </Form.Group>
          <Form.Group controlId="formBasicNombre">
            <Form.Label className="fw-bold"></Form.Label>
            <Form.Control
              type="password"
              placeholder="Repetir Contraseña"
              onChange={(e) => setPassword2(e.target.value)}
              value={password2}
              className="p-2"
            />
          </Form.Group>
          <div className="mt-4 d-flex flex-column">
            {/* {error && <p className="text-danger text-center ">{error}</p>} */}
          <ConfirmButton text="Enviar Solicitud"  handleConfirm={handelSubmit}/>
           
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default EnivarNuevaContraseña;
