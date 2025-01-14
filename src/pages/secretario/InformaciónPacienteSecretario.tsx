import Opening from "../../Components/General/Opening/Opening";
import PersonaInfoCard from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import { usePacienteContext, useUserInfo } from "../../context/authContext";
import { useEffect } from "react";
import useRedirects from "../../hooks/useRedicrects";
import PacienteInfoCard from "../../Components/General/Cards/PacienteInfoCard/PacienteInfoCard";
import useIsSecretario from "../../hooks/roles/useIsSecretario";
import "../estiloCompartido.scss";

import usePersonas from "../../hooks/personas/usePersonas";
import BackLink from "../../Components/buttons/BackLink/BackLink";
import usePacientesCacheQuery from "../../hooks/pacientes/usePacientesCacheQuery";
import { IPersonaResponse } from "../../types/Persona/PersonaResponse.type";
import { IPersonaUpdate } from "../../types/Persona/PersonaUpdate.type";

function InformaciónPacienteSecretario() {
  const user = useUserInfo()
  const { pacienteInfo } = usePacienteContext();
  const isSecretario: Boolean = useIsSecretario();
  const { handlePersonaUpdate } = usePersonas();
  const { redirectToLogin } = useRedirects();
  const {addPacienteCache} = usePacientesCacheQuery(user);

  async function handlePersona (pers : IPersonaUpdate){
    var persona = await handlePersonaUpdate(pers);
    if(persona != undefined){
      addPacienteCache(persona);
        console.log(persona)
  }}
  useEffect(() => {
    if (!isSecretario) redirectToLogin();
  }, []);

  return (
    <div className="pb-5">
      <Opening
        title={`Información de ${pacienteInfo?.nombre} ${pacienteInfo?.apellido}`}
      ></Opening>

      <div 
        className="d-flex  informacionPersonal justify-content-center flex-md-row flex-column gap-5 mt-5 mb-5"
        style={{ width: "min-content", margin: "auto" }}
      >
        <PersonaInfoCard handleConfirm={handlePersona} />
        <PacienteInfoCard handleEvent={true} />
      </div>
      <BackLink/>
    </div>
  );
}

export default InformaciónPacienteSecretario;
