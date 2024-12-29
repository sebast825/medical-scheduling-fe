
import LoginForm from "../../Components/General/Login/Login";
import useModal from "../../hooks/useModal";
import EnviarEmail from "../../Components/modals/RecuperarClave/EnviarEmail/EnviarEmail";

function Login(){
   const {showModal,closeModal,toggleModal}= useModal();
   return (
      <div className="container d-flex justify-content-center alignt-content-center " >
   {!toggleModal? <LoginForm e={showModal}/> :<EnviarEmail e={closeModal}/>
}
         </div>
   );
}

export default Login;