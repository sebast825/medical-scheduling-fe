import GenericCard from "../GenericCard/GenericCard";
import CardItem from "../cardItem/CardItem";
import { useEffect } from "react";
import { usePacienteContext } from "../../../../context/authContext";
import useGenericObjectFielf from "../../../../hooks/objectField/useGenericObjetField";
import useModal from "../../../../hooks/useModal";
import InformacionPersonaModal from "../../../modals/formacionPersonaModal/InformacionPersonaModal";
import { IGenericObject } from "../../../../types/IGenericObject.type";
import { IInfoCard } from "../../../../types/InfoCard.type";
import { IPersonaResponse } from "../../../../types/Persona/PersonaResponse.type";
import { IPacienteResponse } from "../../../../types/Paciente/PacienteResponse.type";

function PersonaInfoCard({
  title = "Información Personal",
  handleEvent = false,
}: IInfoCard) {

  const { showModal, closeModal, toggleModal } = useModal();
  const { pacienteInfo, setPacienteInfo } = usePacienteContext();

  useEffect(() => {
 
  }, [pacienteInfo]);

  function actualizarInformacionPersona(updatedPersona: IPersonaResponse) {
    if (pacienteInfo == null) return;

    setPacienteInfo((prevInfo) => ({
      ...updatedPersona,
      TelefonoEmergencia: prevInfo?.TelefonoEmergencia ?? "",
      NombreEmergencia: prevInfo?.NombreEmergencia ?? "",
    }));
  }

  return (
    <>
      {pacienteInfo != undefined && (
        <>
          <InformacionPersonaModal
            show={toggleModal}
            handleClose={closeModal}
            modalField={pacienteInfo}
            handleConfirm={actualizarInformacionPersona}
          />
        </>
      )}
      <GenericCard
        title={title}
        handleEvent={handleEvent ? showModal : undefined}
      >
        {pacienteInfo && (
          <>
            <CardItem
              key={pacienteInfo.nombre}
              text={pacienteInfo.nombre}
              propertyName="Nombre"
            />
            <CardItem
              key={pacienteInfo.apellido}
              text={pacienteInfo.apellido}
              propertyName="Apellido"
            />
            <CardItem
              key={pacienteInfo.numeroDocumento}
              text={pacienteInfo.numeroDocumento}
              propertyName="Numero Documento"
            />
            <CardItem
              key={pacienteInfo.fechaNacimiento}
              text={new Date(pacienteInfo.fechaNacimiento).toLocaleDateString()}
              propertyName="Fecha Nacimiento"
            />
            <CardItem
              key={pacienteInfo.sexo}
              text={pacienteInfo.sexo}
              propertyName="Sexo"
            />
            <CardItem
              key={pacienteInfo.telefono}
              text={pacienteInfo.telefono}
              propertyName="Telefono"
            />
          </>
        )}
      
      </GenericCard>
    </>
  );
}

export default PersonaInfoCard;
