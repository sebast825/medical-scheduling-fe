import { useEffect } from "react";
import MedicoInfoCard from "../../Components/General/Cards/MedicoInfoCard/MedicoInfoCard";
import Opening from "../../Components/General/Opening/Opening";
import { useMedicoInfoContext } from "../../context/authContext";
import useIsAdministrador from "../../hooks/roles/useIsAdministrador";
import useRedicrects from "../../hooks/useRedicrects";
import PersonaInfoCard from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import "../estiloCompartido.scss";
import usePersonas from "../../hooks/personas/usePersonas";
import BackLink from "../../Components/buttons/BackLink/BackLink";
import { IPersonaUpdate } from "../../types/Persona/PersonaUpdate.type";
import useMedicosCacheQuery from "../../hooks/medicos/useMedicosCacheQuery";

function InformacionMedicoAdministrador() {
  const isAdmin = useIsAdministrador();
  const { redirectToLogin } = useRedicrects();
  const { handleReloadMedicos } = useMedicosCacheQuery();

  useEffect(() => {
    if (!isAdmin) redirectToLogin();
  }, []);

  const { medicoInfo } = useMedicoInfoContext();

  const { handlePersonaUpdate } = usePersonas();
  
  async function handleUpdate(e: IPersonaUpdate) {
    var rsta = await handlePersonaUpdate(e);
    if(rsta){
      handleReloadMedicos();
    }

     
  }
  return (
    <div className="mb-5">
      <Opening
        title={`Información de ${medicoInfo?.nombre} ${medicoInfo?.apellido}`}
      ></Opening>
      <div
        className="d-flex  informacionPersonal justify-content-start flex-md-row flex-column gap-5 mt-5 mb-4 mb-md-5"
        style={{ width: "min-content", margin: "auto" }}
      >
        <PersonaInfoCard handleConfirm={handleUpdate} />
        <MedicoInfoCard />
      </div>
      <BackLink/>
    </div>
  );
}

export default InformacionMedicoAdministrador;
