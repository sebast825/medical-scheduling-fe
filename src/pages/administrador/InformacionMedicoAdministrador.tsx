import { useEffect } from "react";
import MedicoInfoCard from "../../Components/General/Cards/MedicoInfoCard/MedicoInfoCard";
import Opening from "../../Components/General/Opening/Opening";
import { useMedicoInfoContext, useUserContext, useUserInfo } from "../../context/authContext";
import useIsAdministrador from "../../hooks/roles/useIsAdministrador";
import useRedicrects from "../../hooks/useRedicrects";


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
      <MedicoInfoCard/>
      </>
   )
}

export default InformacionMedicoAdministrador;