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
import { personaModalFields } from "../../utils/objectsField";
import useGenericObjectFielf from "../../hooks/objectField/useGenericObjetField";

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

  async  function updatePersona () {

   var persona : IPersonaUpdate = personaInfo;
   //persona.sexoId = 2;
   var udpatedPersona = await putPersona(persona, personaInfo.id);

   console.log(udpatedPersona)
  }
  const { updateModalFields } = useGenericObjectFielf();

  return (
    <>
      <Opening title="Mi Información"></Opening>
      <PersonaInfoCard
        title="Información Personal"

        handleEvent={updatePersona}
        propsPersona={ updateModalFields(personaModalFields, personaInfo)}
      />
    </>
  );
}

export default InformaciónPersonal;
