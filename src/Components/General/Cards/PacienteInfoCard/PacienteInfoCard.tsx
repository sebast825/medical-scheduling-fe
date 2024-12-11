import GenericCard from "../GenericCard/GenericCard";
import CardItem from "../cardItem/CardItem";
import { useEffect, useState } from "react";
import { personaModalFields } from "../../../../utils/objectFields/objectsField";
import { usePacienteContext, usePersonaInfoContext } from "../../../../context/authContext";
import useGenericObjectFielf from "../../../../hooks/objectField/useGenericObjetField";
import useModal from "../../../../hooks/useModal";
import InformacionPersonaModal from "../../../modals/formacionPersonaModal/InformacionPersonaModal";
import { IGenericObject } from "../../../../types/IGenericObject.type";
import { IInfoCard } from "../../../../types/InfoCard.type";
import { pacienteModalFields } from "../../../../utils/objectFields/pacienteModalFields";
import InformacionPacienteModal from "../../../modals/iformacionPacienteModal/InformacionPacienteModal";
import { IPacienteResponse } from "../../../../types/Paciente/PacienteResponse.type";




function PacienteInfoCard({ title = "Informacion de Emergencia", handleEvent = false }: IInfoCard) {
  const [modalField, setModalFields] = useState<IGenericObject[]>();
  const { personaInfo,setPersonaInfo } = usePersonaInfoContext();
  const { updateModalFields,updatObjectFields } = useGenericObjectFielf();
  const { showModal, closeModal, toggleModal } = useModal();
  const {pacienteInfo, setPacienteInfo} = usePacienteContext();

  useEffect(() => {
    var modalFields = updateModalFields(pacienteModalFields, pacienteInfo);
    setModalFields(modalFields);
  }, [pacienteInfo]);

  function actualizarInformacionPaciente(updatedPaciente : IPacienteResponse){
    if(pacienteInfo == null) return;
    var personaUpdated = updatObjectFields(pacienteInfo, updatedPaciente);
    setPacienteInfo(personaUpdated);

  }
   
  return (
    <>
      {modalField != undefined && (
        <>
          <InformacionPacienteModal
            show={toggleModal}
            handleClose={closeModal}
            modalField={modalField}
            handleConfirm={actualizarInformacionPaciente}
          />
        </>
      )}
      <GenericCard
        title={title}
        handleEvent={handleEvent ? showModal : undefined}
      >
        {modalField &&
          modalField.map((item) =>
            item.value ? (
              <CardItem
                key={item.key}
                text={item.value}
                propertyName={item.label}
              />
            ) : null
          )}
        {/* <Card.Text>
          <strong>Contacto de Emergencia:</strong> {nombreEmergencia}
        </Card.Text>
        <Card.Text>
          <strong>Teléfono de Emergencia:</strong> {telefonoEmergencia}
        </Card.Text> */}{" "}
      </GenericCard>
    </>
  );
}

export default PacienteInfoCard;
