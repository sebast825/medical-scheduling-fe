
import Opening from "../../Components/General/Opening/Opening";
import PersonaInfoCard from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import {  usePacienteContext, useUserInfo } from "../../context/authContext";
import { useEffect } from "react";
import useRedirects from "../../hooks/useRedicrects";
import PacienteInfoCard from "../../Components/General/Cards/PacienteInfoCard/PacienteInfoCard";
import useIsSecretario from "../../hooks/roles/useIsSecretario";


function InformaciónPacienteSecretario() {
  const user = useUserInfo();
  const {pacienteInfo}= usePacienteContext()
 // const redirectToLogin = useRedirectToLogin();
 const isSecretario : Boolean = useIsSecretario()
  
  const {redirectToLogin} = useRedirects();

  useEffect(() => {
    if(!isSecretario) redirectToLogin() 

    
  }, []);


  return (
    <>
      <Opening title={`Información de ${pacienteInfo?.nombre} ${pacienteInfo?.apellido}`}></Opening>
      <PersonaInfoCard
        // title="Información Personal"
        handleEvent={true}
      />
        <PacienteInfoCard
        // title="Información Personal"
        handleEvent={true}
      />
    </>
  );
}

export default InformaciónPacienteSecretario;
