import { Card } from "react-bootstrap";
import Opening from "../../Components/General/Opening/Opening";
import CardInfo from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import PersonaInfoCard from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import { usePersonaInfoContext, useUserInfo } from "../../context/authContext";
import usePersonas from "../../hooks/personas/usePersonas";
import { IPersonaUpdate } from "../../types/Persona/PersonaUpdate.type";
import useRedirects from "../../hooks/useRedicrects";
import { useEffect } from "react";
import { useRedirectToLogin } from "../../routes/navigation";

function InformaciónPersonal() {
  const { personaInfo } = usePersonaInfoContext();
  const user = useUserInfo();
  const {putPersona} = usePersonas();
  const redirectToLogin = useRedirectToLogin();

  //const {useRedirectToLogin} = useRedirects();

  useEffect(() => {
    if(user == null){
      redirectToLogin()
    } 
    
  }, []);

  async  function saludar () {

   var persona : IPersonaUpdate = personaInfo;
   //persona.sexoId = 2;
   var asd = await putPersona(persona, personaInfo.id);

   console.log(asd)
    console.log("hola");
  }
  return (
    <>
      <Opening title="Mi Información"></Opening>
      <PersonaInfoCard
        title="Información Personal"

        handleEvent={saludar}
        propsPersona={personaInfo}
      />
    </>
  );
}

export default InformaciónPersonal;
