import GenericCard from "../GenericCard/GenericCard";
import CardItem from "../cardItem/CardItem";
import { useEffect, useState } from "react";
import {
  IGenericObject,
  personaModalFields,
} from "../../../../utils/objectsField";
import { usePersonaInfoContext } from "../../../../context/authContext";
import { IPersonaUpdate } from "../../../../types/Persona/PersonaUpdate.type";
import usePersonas from "../../../../hooks/personas/usePersonas";
import useGenericObjectFielf from "../../../../hooks/objectField/useGenericObjetField";
import GenericModal from "../../../modals/GenericModal/GenericModal";
import useModal from "../../../../hooks/useModal";
import InformacionPersonaModal from "../../../modals/formacionPersonaModal/InformacionPersonaModal";

interface IPersonaInfoCard {
  title: string;
  handleEvent?: boolean;
}

function PersonaInfoCard({ title, handleEvent = false }: IPersonaInfoCard) {
  const [modalField, setModalFields] = useState<IGenericObject[]>();
  const { personaInfo } = usePersonaInfoContext();
  const { updateModalFields } = useGenericObjectFielf();
  const { showModal, closeModal, toggleModal } = useModal();


  useEffect(() => {
    var modalFields = updateModalFields(personaModalFields, personaInfo);
    setModalFields(modalFields);
  }, []);

 
  return (
    <>
      {modalField != undefined && (
        <>
        
          <InformacionPersonaModal  show={toggleModal}
            handleClose={closeModal}
            nombre={modalField[0]}
            apellido={modalField[1]}
            fechaNacimiento={modalField[2]}
            telefono={modalField[3]}
            numeroDocumento={modalField[4]}
            sexo={modalField[5]}
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
