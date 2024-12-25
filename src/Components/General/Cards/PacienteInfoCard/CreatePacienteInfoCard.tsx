import GenericCard from "../GenericCard/GenericCard";
import CardItem from "../cardItem/CardItem";
import { useEffect } from "react";
import {
  usePacienteContext,
  usePersonaInfoContext,
} from "../../../../context/authContext";
import useGenericObjectFielf from "../../../../hooks/objectField/useGenericObjetField";
import useModal from "../../../../hooks/useModal";
import InformacionPersonaModal from "../../../modals/formacionPersonaModal/InformacionPersonaModal";
import { IGenericObject } from "../../../../types/IGenericObject.type";
import { IInfoCard } from "../../../../types/InfoCard.type";
import { IPersonaResponse } from "../../../../types/Persona/PersonaResponse.type";
import IPacienteResponse from "../../../../types/Paciente/PacienteResponse.type";
import InformacionPacienteModal from "../../../modals/iformacionPacienteModal/InformacionPacienteModal";

interface IPersonaInfoCard {
  handleConfirm: (updatedPersona: IPacienteResponse) => void;
}

function CreatePacienteInfoCard({
  handleConfirm = () => {},
}: IPersonaInfoCard) {
  const { showModal, closeModal, toggleModal } = useModal();
  const { pacienteInfo, setPacienteInfo } = usePacienteContext();

  useEffect(() => {
  
  }, [pacienteInfo]);

  return (
    <>
      {pacienteInfo != undefined && (
        <>
          
          <InformacionPacienteModal
            show={toggleModal}
            handleClose={closeModal}
            modalField={pacienteInfo}
            handleConfirm={handleConfirm}
          />
        </>
      )}
      <GenericCard title={"Contacto de Emergencia"} handleEvent={showModal}>
        {pacienteInfo && (
          <>
            <CardItem
              key={pacienteInfo.nombreEmergencia}
              text={pacienteInfo.nombreEmergencia}
              propertyName="Nombre"
            />
            <CardItem
              key={pacienteInfo.telefonoEmergencia}
              text={pacienteInfo.telefonoEmergencia}
              propertyName="Telefono"
            />
          </>
        )}
      </GenericCard>
    </>
  );
}

export default CreatePacienteInfoCard;
