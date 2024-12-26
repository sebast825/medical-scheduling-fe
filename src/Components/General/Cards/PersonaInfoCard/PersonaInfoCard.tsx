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
import { IPersonaUpdate } from "../../../../types/Persona/PersonaUpdate.type";

interface IPersonaInfoCard {
  handleConfirm: (updatedPersona: IPersonaUpdate) => void;
}

function PersonaInfoCard({
  handleConfirm = () => {}
}: IPersonaInfoCard) {
  const { showModal, closeModal, toggleModal } = useModal();
  const { personaInfo } = usePersonaInfoContext();

  useEffect(() => {}, [personaInfo]);
let fechaNacimiento = new Date(personaInfo.fechaNacimiento);
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
      <GenericCard title={"Información Personal"} handleEvent={showModal}>
        {personaInfo && (
          <>
            <CardItem
              key="Nombre"
              text={personaInfo.nombre}
              propertyName="Nombre"
            />
            <CardItem
              key="Apellido"
              text={personaInfo.apellido}
              propertyName="Apellido"
            />
            <CardItem
              key="Numero Documento"
              text={personaInfo.numeroDocumento}
              propertyName="Numero Documento"
            />
            <CardItem
              key="Fecha Nacimiento"
              text={isNaN(fechaNacimiento.getTime())? "": fechaNacimiento.toLocaleDateString() }
              propertyName="Fecha Nacimiento"
            />
            <CardItem
              key="Sexo"
              text={personaInfo.sexo}
              propertyName="Sexo"
            />
            <CardItem
              key="Telefono"
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
