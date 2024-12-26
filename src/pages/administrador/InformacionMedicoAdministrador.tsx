import { useEffect } from "react";
import MedicoInfoCard from "../../Components/General/Cards/MedicoInfoCard/MedicoInfoCard";
import Opening from "../../Components/General/Opening/Opening";
import { useMedicoInfoContext } from "../../context/authContext";
import useIsAdministrador from "../../hooks/roles/useIsAdministrador";
import useRedicrects from "../../hooks/useRedicrects";
import PersonaInfoCard from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import "../estiloCompartido.scss";
import usePersonas from "../../hooks/personas/usePersonas";

function InformacionMedicoAdministrador() {
  const isAdmin = useIsAdministrador();
  const { redirectToLogin } = useRedicrects();

  useEffect(() => {
    if (!isAdmin) redirectToLogin();
  }, []);

  const { medicoInfo } = useMedicoInfoContext();

  const { handlePersonaUpdate } = usePersonas();

  return (
    <>
      <Opening
        title={`Información de ${medicoInfo?.nombre} ${medicoInfo?.apellido}`}
      ></Opening>
      <div
        className="d-flex  informacionPersonal justify-content-start flex-md-row flex-column gap-5 mt-5 mb-5"
        style={{ width: "min-content", margin: "auto" }}
      >
        <PersonaInfoCard handleConfirm={handlePersonaUpdate} />
        <MedicoInfoCard />
      </div>
    </>
  );
}

export default InformacionMedicoAdministrador;
