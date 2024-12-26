import Opening from "../../Components/General/Opening/Opening";
import PersonaInfoCard from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import {
  usePacienteContext,
  usePersonaInfoContext,
  useUserInfo,
} from "../../context/authContext";
import { useEffect } from "react";
import useRedirects from "../../hooks/useRedicrects";
import PacienteInfoCard from "../../Components/General/Cards/PacienteInfoCard/PacienteInfoCard";
import useWindowSize from "../../hooks/ScreenSize";
import "../estiloCompartido.scss";
import IPacienteResponse from "../../types/Paciente/PacienteResponse.type";
import { IPersonaResponse } from "../../types/Persona/PersonaResponse.type";
import { IPersonaUpdate } from "../../types/Persona/PersonaUpdate.type";
import usePersonas from "../../hooks/personas/usePersonas";

function InformaciónPersonal() {
  const user = useUserInfo();
  // const redirectToLogin = useRedirectToLogin();

  const { redirectToLogin } = useRedirects();
  const { pacienteInfo, setPacienteInfo } = usePacienteContext();
  const { setPersonaInfo } = usePersonaInfoContext();
  const { personaInfo } = usePersonaInfoContext();
  const { putPersona } = usePersonas();

  useEffect(() => {
    if (user == null) {
      redirectToLogin();
    }
  }, []);

  async function updatePersona(
    persona: IPersonaUpdate
  ): Promise<IPersonaResponse | undefined> {
    if (personaInfo == null) return undefined;
    var updatedPersona: IPersonaResponse | undefined = await putPersona(
      persona,
      personaInfo.id.toString()
    );
    return updatedPersona;
  }
  async function laLlama(persona: IPersonaUpdate) {
    var updatedPersona = await updatePersona(persona);

    if (updatedPersona == null) {
      //error("Ha ocurrido un error, no se pudo completar la accion con éxito.");
      return;
    }
    handlePersonaUpdate(updatedPersona);
    //handleConfirm(updatedPersona);
  }

  function handlePersonaUpdate(updatedPersona: IPersonaResponse) {
    if (pacienteInfo == null) return;

    setPacienteInfo((prevInfo: IPacienteResponse | null) => ({
      ...updatedPersona,
      telefonoEmergencia: prevInfo?.telefonoEmergencia ?? "",
      nombreEmergencia: prevInfo?.nombreEmergencia ?? "",
    }));
    setPersonaInfo(updatedPersona);
  }

  return (
    <>
      <Opening title="Mi Información" />
      <div
        className="d-flex  informacionPersonal justify-content-center flex-md-row flex-column gap-5 mt-5 mb-5"
        style={{ width: "min-content", margin: "auto" }}
      >
        <PersonaInfoCard handleConfirm={laLlama} />

        <PacienteInfoCard handleEvent={true} />
      </div>
    </>
  );
}

export default InformaciónPersonal;
