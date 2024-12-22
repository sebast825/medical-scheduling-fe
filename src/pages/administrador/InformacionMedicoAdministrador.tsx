import { useEffect } from "react";
import MedicoInfoCard from "../../Components/General/Cards/MedicoInfoCard/MedicoInfoCard";
import Opening from "../../Components/General/Opening/Opening";
import { useMedicoInfoContext, useUserContext, useUserInfo } from "../../context/authContext";
import useIsAdministrador from "../../hooks/roles/useIsAdministrador";
import useRedicrects from "../../hooks/useRedicrects";
import PersonaInfoCard from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";


function InformacionMedicoAdministrador(){

  const isAdmin = useIsAdministrador()
  const {redirectToLogin}=useRedicrects()
  useEffect(()=>{
   if(!isAdmin) redirectToLogin();
  },[])
   const {medicoInfo} = useMedicoInfoContext();
   return(

      <>
      <Opening title={`Información de ${medicoInfo?.nombre} ${medicoInfo?.apellido}`}/>
      {/* <PersonaInfoCard/> */}
      <MedicoInfoCard/>
      </>
   )
}

export default InformacionMedicoAdministrador;