import { Card } from "react-bootstrap";
import Opening from "../../Components/General/Opening/Opening";
import CardInfo from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import PersonaInfoCard from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import { usePersonaInfoContext } from "../../context/authContext";
import usePersonas from "../../hooks/personas/usePersonas";
import { IPersonaUpdate } from "../../types/Persona/PersonaUpdate.type";

function InformaciónPersonal() {
  const { personaInfo } = usePersonaInfoContext();
  
  const {putPersona} = usePersonas();

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
        nombre={personaInfo.nombre}
        apellido={personaInfo.apellido}
        telefono={personaInfo.telefono}
        numeroDocumento={personaInfo.numeroDocumento}
        sexo={personaInfo.sexo}
        fechaNac={personaInfo.fechaNacimiento}
        handleEvent={saludar}
      />
    </>
  );
}

export default InformaciónPersonal;
