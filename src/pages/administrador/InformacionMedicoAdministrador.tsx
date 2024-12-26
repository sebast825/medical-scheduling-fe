import { useEffect } from "react";
import MedicoInfoCard from "../../Components/General/Cards/MedicoInfoCard/MedicoInfoCard";
import Opening from "../../Components/General/Opening/Opening";
import {
  useMedicoInfoContext,
  usePersonaInfoContext,
  useUserContext,
  useUserInfo,
} from "../../context/authContext";
import useIsAdministrador from "../../hooks/roles/useIsAdministrador";
import useRedicrects from "../../hooks/useRedicrects";
import PersonaInfoCard from "../../Components/General/Cards/PersonaInfoCard/PersonaInfoCard";
import { IPersonaResponse } from "../../types/Persona/PersonaResponse.type";
import { IMedicoResponse } from "../../types/Medico/MedicoResponse.type";
import "../estiloCompartido.scss";

function InformacionMedicoAdministrador() {
  const isAdmin = useIsAdministrador();
  const { redirectToLogin } = useRedicrects();
  useEffect(() => {
    if (!isAdmin) redirectToLogin();
  }, []);
  const { medicoInfo, setMedicoInfo } = useMedicoInfoContext();
  const { setPersonaInfo } = usePersonaInfoContext();

  function handlePersonaUpdate(updatedPersona: IPersonaResponse) {
    if (medicoInfo == null) return;

    setMedicoInfo((prevInfo: IMedicoResponse | null) => ({
      ...updatedPersona,
      numeroLicencia: prevInfo?.numeroLicencia ?? "",
      especialidad: prevInfo?.especialidad ?? "",
    }));
    setPersonaInfo(updatedPersona);
  }

  return (
    <>
      <Opening
        title={`Información de ${medicoInfo?.nombre} ${medicoInfo?.apellido}`}
      ></Opening>
      <div
        className="d-flex  informacionPersonal justify-content-start flex-md-row flex-column gap-5 mt-5 mb-5"
        style={{ width: "min-content", margin: "auto" }}
      >
        {/* <PersonaInfoCard handleConfirm={handlePersonaUpdate} /> */}
        <MedicoInfoCard />
      </div>
    </>
  );
}

export default InformacionMedicoAdministrador;

/*
{
    "nombre": "mauricioo",
    "apellido": "Pérez",
    "numeroDocumento": "DNI12345678",
    "telefono": "123456789",
    "sexoId": 1,
    "fechaNacimiento": "1980-05-20T00:00"
}
*/
