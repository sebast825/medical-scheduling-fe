import GenericCard from "../GenericCard/GenericCard";
import CardItem from "../cardItem/CardItem";
import { useEffect } from "react";
import useModal from "../../../../hooks/useModal";
import IPacienteResponse from "../../../../types/Paciente/PacienteResponse.type";
import InformacionPacienteModal from "../../../modals/iformacionPacienteModal/InformacionPacienteModal";
import { IPacienteUpdate } from "../../../../types/Paciente/PacienteUpdate.type";
import PacienteCreateRequest from "../../../../types/Paciente/PacienteCreateRequest.type copy";

interface IPersonaInfoCard {
  pacienteInfo: IPacienteResponse;
  handleConfirm: (updatedPersona: IPacienteUpdate) => void;
}

function CreatePacienteInfoCard({
  pacienteInfo,
  handleConfirm = () => {},
}: IPersonaInfoCard) {
  const { showModal, closeModal, toggleModal } = useModal();

  useEffect(() => {
    console.log(pacienteInfo);
  }, [pacienteInfo]);

  function handleUpdatePaciente(e: IPacienteUpdate) {
    handleConfirm({
      TelefonoEmergencia: e.TelefonoEmergencia,
      NombreEmergencia: e.NombreEmergencia,
    });
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
