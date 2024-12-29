import EnivarNuevaContraseña from "../../Components/modals/RecuperarClave/EnivarNuevaContraseña/EnivarNuevaContraseña";
import EnviarEmail from "../../Components/modals/RecuperarClave/EnviarEmail/EnviarEmail";

function RecuperarClave() {
  return (<>
       <div className="container d-flex justify-content-center alignt-content-center pt-5 " >
   {/* <EnviarEmail/> */}
   <EnivarNuevaContraseña/>
         </div></>);
}

export default RecuperarClave;
