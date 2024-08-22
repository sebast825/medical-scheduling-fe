
import Opening from "../../Components/General/Opening/Opening";
import PersonaInfoCard from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import {  useUserInfo } from "../../context/authContext";
import { useEffect } from "react";
import useRedirects from "../../hooks/useRedicrects";
import PacienteInfoCard from "../../Components/General/Cards/PacienteInfoCard/PacienteInfoCard";


function InformaciónPersonal() {
  const user = useUserInfo();
 // const redirectToLogin = useRedirectToLogin();

  const {redirectToLogin} = useRedirects();

  useEffect(() => {
    if(user == null){
      redirectToLogin()
    } 
    
  }, []);


  return (
    <>
      <Opening title="Mi Información"></Opening>
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

export default InformaciónPersonal;
