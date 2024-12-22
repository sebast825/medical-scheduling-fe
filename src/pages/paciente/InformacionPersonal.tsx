import Opening from "../../Components/General/Opening/Opening";
import PersonaInfoCard from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import { usePacienteContext, usePersonaInfoContext, useUserInfo } from "../../context/authContext";
import { useEffect } from "react";
import useRedirects from "../../hooks/useRedicrects";
import PacienteInfoCard from "../../Components/General/Cards/PacienteInfoCard/PacienteInfoCard";
import useWindowSize from "../../hooks/ScreenSize";
import "../estiloCompartido.scss";
import IPacienteResponse from "../../types/Paciente/PacienteResponse.type";
import { IPersonaResponse } from "../../types/Persona/PersonaResponse.type";

function InformaciónPersonal() {
  const user = useUserInfo();
  // const redirectToLogin = useRedirectToLogin();

  const { redirectToLogin } = useRedirects();
  const {pacienteInfo,setPacienteInfo} = usePacienteContext();
  const {setPersonaInfo} = usePersonaInfoContext()

  useEffect(() => {
    if (user == null) {
      redirectToLogin();
    }
  }, []);

  function handlePersonaUpdate(updatedPersona: IPersonaResponse) {
    if (pacienteInfo == null) return;

    setPacienteInfo((prevInfo: IPacienteResponse | null) => ({
      ...updatedPersona,
      telefonoEmergencia: prevInfo?.telefonoEmergencia ?? "",
      nombreEmergencia: prevInfo?.nombreEmergencia ?? "",
    }));
    setPersonaInfo(updatedPersona)
  }

  return (
    <>
      <Opening title="Mi Información"></Opening>
      <div
        className="d-flex  informacionPersonal justify-content-center flex-md-row flex-column gap-5 mt-5 mb-5"
        style={{ width: "min-content", margin: "auto" }}
      >
        <PersonaInfoCard
          handleConfirm={handlePersonaUpdate}
        />
        <PacienteInfoCard
          handleEvent={true}
        />
      </div>
    </>
  );
}

export default InformaciónPersonal;
