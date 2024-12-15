
import Opening from "../../Components/General/Opening/Opening";
import PersonaInfoCard from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import {  useUserInfo } from "../../context/authContext";
import { useEffect } from "react";
import useRedirects from "../../hooks/useRedicrects";
import PacienteInfoCard from "../../Components/General/Cards/PacienteInfoCard/PacienteInfoCard";
import useWindowSize from "../../hooks/ScreenSize";
import "../estiloCompartido.scss"


function InformaciónPersonal() {
  const user = useUserInfo();
 // const redirectToLogin = useRedirectToLogin();

  const {redirectToLogin} = useRedirects();

  useEffect(() => {
    if(user == null){
      redirectToLogin()
    } 
    
  }, []);
const windowSize= useWindowSize()
/*function changeLayout(){
  if(windowSize.width > 768){
    return "align-items-strech"
  }else{
    return "align-items-center"
  }
}*/

  return (
    <>
      <Opening title="Mi Información"></Opening>
      <div className="d-flex  informacionPersonal justify-content-center flex-md-row flex-column gap-5 mt-5 mb-5" style={{ width: "min-content", margin: "auto"}}>
      <PersonaInfoCard
        // title="Información Personal"
        handleEvent={true}
      />
        <PacienteInfoCard
        // title="Información Personal"
        handleEvent={true}
      />

      </div>
     
    </>
  );
}

export default InformaciónPersonal;
