
import Opening from "../../Components/General/Opening/Opening";
import PersonaInfoCard from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import {  useUserInfo } from "../../context/authContext";
import { useEffect } from "react";
import { useRedirectToLogin } from "../../routes/navigation";


function InformaciónPersonal() {
  const user = useUserInfo();
  const redirectToLogin = useRedirectToLogin();

  //const {useRedirectToLogin} = useRedirects();

  useEffect(() => {
    if(user == null){
      redirectToLogin()
    } 
    
  }, []);


  return (
    <>
      <Opening title="Mi Información"></Opening>
      <PersonaInfoCard
        title="Información Personal"
        handleEvent={true}
      />
    </>
  );
}

export default InformaciónPersonal;
