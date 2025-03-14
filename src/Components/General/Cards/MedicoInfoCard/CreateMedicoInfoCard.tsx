import GenericCard from "../GenericCard/GenericCard";
import CardItem from "../cardItem/CardItem";
import useModal from "../../../../hooks/useModal";
import { IMedicoResponse } from "../../../../types/Medico/MedicoResponse.type";
import InformacionMedicoModal from "../../../modals/informacionMedicoModal/InformacionMedicoModal";
import { MedicoUpdateRequestDTO } from "../../../../types/Medico/MedicoUpdateRequest.type";

interface ICreateMedicoInfoCard {
  medicoInfo: IMedicoResponse;
  handleConfirm: (updatedPersona: MedicoUpdateRequestDTO) => void;
}

function CreateMedicoInfoCard({
  medicoInfo,
  handleConfirm = () => {},
}: ICreateMedicoInfoCard) {
  const { showModal, closeModal, toggleModal } = useModal();

  function handleUpdatePaciente(e: MedicoUpdateRequestDTO): void {
    let getIdFromespecialidad: number = 1; //e.especialidad;
    handleConfirm({
      especialidadId: getIdFromespecialidad,
      numeroLicencia: e.numeroLicencia,
    });
  }

  return (
    <>
      {medicoInfo != undefined && (
        <>
          <InformacionMedicoModal
            show={toggleModal}
            handleClose={closeModal}
            //modalField={medicoInfo}
            handleConfirm={handleUpdatePaciente}
          />
        </>
      )}
      <GenericCard title={"Información del Médico"} handleEvent={showModal}>
        {medicoInfo && (
          <>
            <CardItem
              key="NumeroLicencia"
              text={medicoInfo.numeroLicencia}
              propertyName="Numero Licencia"
            />
            <CardItem
              key="Especialidad"
              text={medicoInfo.especialidad}
              propertyName="Especialidad"
            />
          </>
        )}
      </GenericCard>
    </>
  );
}

export default CreateMedicoInfoCard;
