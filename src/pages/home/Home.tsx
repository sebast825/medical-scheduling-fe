import { Button } from "react-bootstrap";
import FillExample from "../../Components/Nav Bar/NavBar";
import Opening from "../../Components/Opening/Opening";
import { fetchPacientes } from "../../services/apiService";
import {
  useUserContext,
  useUserToggleContext,
  usePersonaInfoContext,
} from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import {
  useRedirectToLogin,
  useRedirectToNuestrosMedicos,
} from "../../routes/navigation";
import ResponsiveCard from "../../Components/CardPaciente/CardPaciente";
import ConfirmModal from "../../Components/modals/ConfirmModal";
import { useState } from "react";
import TwoButtonComponent from "../../Components/TwoButtonComponent/TwoButtonComponent";
function Home() {
  const { personaInfo } = usePersonaInfoContext();
  const cambiaLogin = useUserToggleContext();
  const navigate = useNavigate();

  const redirectToNuestrosMedicos = useRedirectToNuestrosMedicos();
  const recirectToLogin = useRedirectToLogin();

  return (
    <div>
      {/* <FillExample />  */}
      <Opening title="Clinica Horizonte" subTitle="" />
      {personaInfo && <p>Hola {personaInfo.nombre}</p>}



          <TwoButtonComponent 
          textButton1="Ingresar"
          textButton2="Nuestros Medicos"
          onClickButton1={recirectToLogin}
          onClickButton2={redirectToNuestrosMedicos}
          />
       
      
    </div>
  );
}

export default Home;
