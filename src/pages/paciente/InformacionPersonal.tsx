import Opening from "../../Components/General/Opening/Opening";
import PersonaInfoCard from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import { useUserInfo } from "../../context/authContext";
import { useEffect } from "react";
import useRedirects from "../../hooks/useRedicrects";
import PacienteInfoCard from "../../Components/General/Cards/PacienteInfoCard/PacienteInfoCard";
import "../estiloCompartido.scss";
import { IPersonaResponse } from "../../types/Persona/PersonaResponse.type";
import { IPersonaUpdate } from "../../types/Persona/PersonaUpdate.type";
import usePersonas from "../../hooks/personas/usePersonas";
import BackLink from "../../Components/buttons/BackLink/BackLink";

function InformaciónPersonal() {
  const user = useUserInfo();
  const { redirectToLogin } = useRedirects();
  const { handlePersonaUpdate } = usePersonas();

  useEffect(() => {
    if (user == null) {
      redirectToLogin();
    }
  }, []);

  return (
    <div className="mb-5">

      <Opening title="Mi Información" />
      <div
        className="d-flex  informacionPersonal justify-content-center flex-md-row flex-column gap-5 mt-5  mb-4 mb-md-5"
        style={{ width: "min-content", margin: "auto" }}
      >
        <PersonaInfoCard handleConfirm={handlePersonaUpdate} />

        <PacienteInfoCard handleEvent={true} />
      </div>

      <BackLink/>
    </div>
  );
}

export default InformaciónPersonal;
