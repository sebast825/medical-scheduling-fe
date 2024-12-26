import Opening from "../../Components/General/Opening/Opening";
import PersonaInfoCard from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import { usePacienteContext, usePersonaInfoContext, useUserInfo } from "../../context/authContext";
import { useEffect } from "react";
import useRedirects from "../../hooks/useRedicrects";
import PacienteInfoCard from "../../Components/General/Cards/PacienteInfoCard/PacienteInfoCard";
import useIsSecretario from "../../hooks/roles/useIsSecretario";
import "../estiloCompartido.scss";
import { IPersonaResponse } from "../../types/Persona/PersonaResponse.type";
import IPacienteResponse from "../../types/Paciente/PacienteResponse.type";

function InformaciónPacienteSecretario() {
  const user = useUserInfo();
  const { pacienteInfo,setPacienteInfo } = usePacienteContext();
  const {setPersonaInfo} = usePersonaInfoContext();
  // const redirectToLogin = useRedirectToLogin();
  const isSecretario: Boolean = useIsSecretario();

  const { redirectToLogin } = useRedirects();

  useEffect(() => {
    if (!isSecretario) redirectToLogin();
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
      <Opening
        title={`Información de ${pacienteInfo?.nombre} ${pacienteInfo?.apellido}`}
      ></Opening>

      <div
        className="d-flex  informacionPersonal justify-content-center flex-md-row flex-column gap-5 mt-5 mb-5"
        style={{ width: "min-content", margin: "auto" }}
      >
        {/* <PersonaInfoCard
          handleConfirm={handlePersonaUpdate}
        /> */}
        <PacienteInfoCard
          handleEvent={true}
        />
      </div>
    </>
  );
}

export default InformaciónPacienteSecretario;
