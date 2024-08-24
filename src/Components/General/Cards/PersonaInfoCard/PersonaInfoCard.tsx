import GenericCard from "../GenericCard/GenericCard";
import CardItem from "../cardItem/CardItem";
import { useEffect, useState } from "react";
import { personaModalFields } from "../../../../utils/objectFields/objectsField";
import { usePersonaInfoContext } from "../../../../context/authContext";
import useGenericObjectFielf from "../../../../hooks/objectField/useGenericObjetField";
import useModal from "../../../../hooks/useModal";
import InformacionPersonaModal from "../../../modals/formacionPersonaModal/InformacionPersonaModal";
import { IGenericObject } from "../../../../types/IGenericObject.type";
import { IInfoCard } from "../../../../types/InfoCard.type";
import { IPersonaResponse } from "../../../../types/Persona/PersonaResponse.type";
import { IPacienteResponse } from "../../../../types/Paciente/PacienteResponse.type";



function PersonaInfoCard({ title = "Información Personal", handleEvent = false }: IInfoCard) {
  const [modalField, setModalFields] = useState<IGenericObject[]>();
  const { personaInfo,setPersonaInfo } = usePersonaInfoContext();
  const { updateModalFields,updatObjectFields } = useGenericObjectFielf();
  const { showModal, closeModal, toggleModal } = useModal();
  useEffect(() => {
 

    var modalFields = updateModalFields(personaModalFields, personaInfo);
    setModalFields(modalFields);
  }, [personaInfo]);

  function actualizarInformacionPersona(infoPersona : IPersonaResponse){
    var personaUpdated : IPacienteResponse = updatObjectFields(infoPersona,personaInfo);
    setPersonaInfo(personaUpdated);

  }
  return (
    <>
      {modalField != undefined && (
        <>
          <InformacionPersonaModal
            show={toggleModal}
            handleClose={closeModal}
            modalField={modalField}
            handleConfirm={actualizarInformacionPersona}
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

export default PersonaInfoCard;
