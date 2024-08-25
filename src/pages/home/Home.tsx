import Opening from "../../Components/General/Opening/Opening";
import { usePersonaInfoContext } from "../../context/authContext";
import TwoButtonComponent from "../../Components/buttons/TwoButtonComponent/TwoButtonComponent";
import useRedirects from "../../hooks/useRedicrects";

function Home() {

  const { personaInfo } = usePersonaInfoContext();
  const { redirectToLogin, redirectToNuestrosMedicos } = useRedirects();
  
  return (
    <div>
      <Opening title="Clinica Horizonte" subTitle="" />
      {personaInfo && <p>Hola {personaInfo.nombre}</p>}

      <TwoButtonComponent
        textButton1="Ingresar"
        textButton2="Nuestros Medicos"
        onClickButton1={redirectToLogin}
        onClickButton2={redirectToNuestrosMedicos}
      />
    </div>
  );
}

export default Home;
