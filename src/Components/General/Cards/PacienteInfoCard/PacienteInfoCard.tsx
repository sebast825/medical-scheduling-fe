import GenericCard from "../GenericCard/GenericCard";
import CardItem from "../cardItem/CardItem";
import { useEffect, useState } from "react";
import { personaModalFields } from "../../../../utils/objectFields/objectsField";
import {
  usePacienteContext,
  usePersonaInfoContext,
} from "../../../../context/authContext";
import useGenericObjectFielf from "../../../../hooks/objectField/useGenericObjetField";
import useModal from "../../../../hooks/useModal";
import InformacionPersonaModal from "../../../modals/formacionPersonaModal/InformacionPersonaModal";
import { IGenericObject } from "../../../../types/IGenericObject.type";
import { IInfoCard } from "../../../../types/InfoCard.type";
import { pacienteModalFields } from "../../../../utils/objectFields/pacienteModalFields";
import InformacionPacienteModal from "../../../modals/iformacionPacienteModal/InformacionPacienteModal";
import usePacientes from "../../../../hooks/pacientes/usePacientes";
import IPacienteResponse from "../../../../types/Paciente/PacienteResponse.type";
import { IPacienteUpdate } from "../../../../types/Paciente/PacienteUpdate.type";

function PacienteInfoCard({
  title = "Informacion de Emergencia",
  handleEvent = false,
}: IInfoCard) {

  const [modalField, setModalFields] = useState<IGenericObject[]>();
  const { updateModalFields, updatObjectFields } = useGenericObjectFielf();
  const { showModal, closeModal, toggleModal } = useModal();
  const { pacienteInfo, setPacienteInfo } = usePacienteContext();
  const { putPaciente } = usePacientes();

  useEffect(() => {
    var modalFields = updateModalFields(pacienteModalFields, pacienteInfo);
    setModalFields(modalFields);
  }, [pacienteInfo]);

   function actualizarPacienteObjetFields (
    updatedPaciente: IPacienteResponse
  ) {
    if (pacienteInfo == null) return;
    var personaUpdated = updatObjectFields(pacienteInfo, updatedPaciente);
    setPacienteInfo(personaUpdated);
  }

  async function udpatePacienteApi(paciente: IPacienteUpdate) {
    if (pacienteInfo == null) return;

    let updatedPaciente : IPacienteResponse | undefined = await putPaciente(
      paciente,
      pacienteInfo.id.toString()
    );
    if (updatedPaciente != undefined) {
      actualizarPacienteObjetFields(updatedPaciente);
    }
  }

  return (
    <>
      {pacienteInfo != undefined && (
        <>
          <InformacionPacienteModal
            show={toggleModal}
            handleClose={closeModal}
            modalField={pacienteInfo}
            handleConfirm={udpatePacienteApi}
          />
        </>
      )}
      <GenericCard
        title={title}
        handleEvent={handleEvent ? showModal : undefined}
      >
        {modalField &&
          modalField.map((item,index) =>
            item.value ? (
              <CardItem
                key={item.key || index}
                text={item.value}
                propertyName={item.label}
              />
            ) : null
          )}
      
      </GenericCard>
    </>
  );
}

export default PacienteInfoCard;
