import Opening from "../../Components/General/Opening/Opening";
import PersonaInfoCard from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import { usePacienteContext } from "../../context/authContext";
import { useEffect } from "react";
import useRedirects from "../../hooks/useRedicrects";
import PacienteInfoCard from "../../Components/General/Cards/PacienteInfoCard/PacienteInfoCard";
import useIsSecretario from "../../hooks/roles/useIsSecretario";
import "../estiloCompartido.scss";

import usePersonas from "../../hooks/personas/usePersonas";
import BackLink from "../../Components/buttons/BackLink/BackLink";

function InformaciónPacienteSecretario() {
  const { pacienteInfo } = usePacienteContext();
  const isSecretario: Boolean = useIsSecretario();
  const { handlePersonaUpdate } = usePersonas();
  const { redirectToLogin } = useRedirects();

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
        <PersonaInfoCard handleConfirm={handlePersonaUpdate} />
        <PacienteInfoCard handleEvent={true} />
      </div>
      <BackLink/>
    </div>
  );
}

export default InformaciónPacienteSecretario;
