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
import { pacienteModalFields } from "../../../../utils/objectFields/pacienteModalFields";




function PacienteInfoCard({ title = "Informacion de Emergencia", handleEvent = false }: IInfoCard) {
  const [modalField, setModalFields] = useState<IGenericObject[]>();
  const { personaInfo } = usePersonaInfoContext();
  const { updateModalFields } = useGenericObjectFielf();
  const { showModal, closeModal, toggleModal } = useModal();

  useEffect(() => {
    var modalFields = updateModalFields(pacienteModalFields, personaInfo);
    setModalFields(modalFields);
  }, [personaInfo]);

  return (
    <>
      {modalField != undefined && (
        <>
          <InformacionPersonaModal
            show={toggleModal}
            handleClose={closeModal}
            modalField={modalField}
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
