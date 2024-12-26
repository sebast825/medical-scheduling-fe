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
import { IPacienteUpdate } from "../../../../types/Paciente/PacienteUpdate.type";
import PacienteCreateRequest from "../../../../types/Paciente/PacienteCreateRequest.type copy";

interface IPersonaInfoCard {
  pacienteInfo : IPacienteResponse,
  handleConfirm: (updatedPersona: PacienteCreateRequest) => void;

}

function CreatePacienteInfoCard({
  pacienteInfo ,
  handleConfirm = () => {},
}: IPersonaInfoCard) {
  const { showModal, closeModal, toggleModal } = useModal();
  //const { pacienteInfo, setPacienteInfo } = usePacienteContext();
  useEffect(() => {
   console.log(pacienteInfo)

  }, [pacienteInfo]);

  
  function handleUpdatePaciente (e : IPacienteUpdate){
    console.log(e)
  
    handleConfirm({
      telefonoEmergencia : e.TelefonoEmergencia,
      nombreEmergencia : e.NombreEmergencia}
    )

  }

  return (
    <>
      {pacienteInfo != undefined && (
        <>
          
           <InformacionPacienteModal
            show={toggleModal}
            handleClose={closeModal}
            modalField={pacienteInfo}
            handleConfirm={handleUpdatePaciente}
          /> 
        </>
      )}
      <GenericCard title={"Contacto de Emergencia"} handleEvent={showModal}>
        {pacienteInfo && (
          <>
            <CardItem
              key="Nombre"
              text={pacienteInfo.nombreEmergencia}
              propertyName="Nombre"
            />
            <CardItem
              key="Telefono"
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
