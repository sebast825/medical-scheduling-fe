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

interface IPersonaInfoCard {
  title: string;
  handleConfirm: (updatedPersona: IPersonaResponse) => void;
}

function PersonaInfoCard({
  title = "Información Personal",
  handleConfirm = () => {},
}: IPersonaInfoCard) {
  const { showModal, closeModal, toggleModal } = useModal();
  const { personaInfo } = usePersonaInfoContext();

  useEffect(() => {}, [personaInfo]);

  return (
    <>
      {personaInfo != undefined && (
        <>
          <InformacionPersonaModal
            show={toggleModal}
            handleClose={closeModal}
            modalField={personaInfo}
            handleConfirm={handleConfirm}
          />
        </>
      )}
      <GenericCard title={title} handleEvent={showModal}>
        {personaInfo && (
          <>
            <CardItem
              key={personaInfo.nombre}
              text={personaInfo.nombre}
              propertyName="Nombre"
            />
            <CardItem
              key={personaInfo.apellido}
              text={personaInfo.apellido}
              propertyName="Apellido"
            />
            <CardItem
              key={personaInfo.numeroDocumento}
              text={personaInfo.numeroDocumento}
              propertyName="Numero Documento"
            />
            <CardItem
              key={personaInfo.fechaNacimiento}
              text={new Date(personaInfo.fechaNacimiento).toLocaleDateString()}
              propertyName="Fecha Nacimiento"
            />
            <CardItem
              key={personaInfo.sexo}
              text={personaInfo.sexo}
              propertyName="Sexo"
            />
            <CardItem
              key={personaInfo.telefono}
              text={personaInfo.telefono}
              propertyName="Telefono"
            />
          </>
        )}
      </GenericCard>
    </>
  );
}

export default PersonaInfoCard;
