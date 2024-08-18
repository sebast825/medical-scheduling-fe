import { Button } from "react-bootstrap";
import FillExample from "../../Components/General/Nav Bar/NavBar";
import Opening from "../../Components/General/Opening/Opening";
import { fetchPacientes } from "../../services/apiService";
import { usePersonaInfoContext } from "../../context/authContext";
import TwoButtonComponent from "../../Components/buttons/TwoButtonComponent/TwoButtonComponent";
import useRedirects from "../../hooks/useRedicrects";

function Home() {

  const { personaInfo } = usePersonaInfoContext();
  const { useRedirectToLogin, useRedirectToNuestrosMedicos } = useRedirects();
  
  return (
    <div>
      <Opening title="Clinica Horizonte" subTitle="" />
      {personaInfo && <p>Hola {personaInfo.nombre}</p>}

      <TwoButtonComponent
        textButton1="Ingresar"
        textButton2="Nuestros Medicos"
        onClickButton1={useRedirectToLogin}
        onClickButton2={useRedirectToNuestrosMedicos}
      />
    </div>
  );
}

export default Home;
