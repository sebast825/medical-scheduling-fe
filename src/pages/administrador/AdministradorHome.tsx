import { useEffect } from "react";
import { usePersonaInfoContext } from "../../context/authContext";
import useIsAdministrador from "../../hooks/roles/useIsAdministrador";
import { useRedirectToLogin } from "../../routes/navigation";
import Opening from "../../Components/General/Opening/Opening";
import ListaHorariosMedicos from "../../Components/Medico/ListaHorariosMedicos";



function AdministradorHome() {


   const {personaInfo} = usePersonaInfoContext()
   const isAdministrador = useIsAdministrador()
   const redirectToLogin = useRedirectToLogin();
   
   useEffect(()=>{
      if(!isAdministrador) redirectToLogin();
      console.log(personaInfo)
   },[])

  return (
    <>
      <Opening title={`Bienvenido ${personaInfo.nombre}`} />
      <ListaHorariosMedicos />
    </>
  );
}

export default AdministradorHome;
