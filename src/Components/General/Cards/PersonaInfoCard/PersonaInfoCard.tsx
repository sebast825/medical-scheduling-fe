import { Button, Card } from "react-bootstrap";
import OneButton from "../../../buttons/oneButton/OneButton";
import GenericCard from "../GenericCard/GenericCard";
import CardItem from "../cardItem/CardItem";
import { IPersonaResponse } from "../../../../types/Persona/PersonaResponse.type";
import { useEffect, useState } from "react";
import useGenericObjectFielf, {
  IObjectField,
} from "../../../../hooks/objectField/useGenericObjetField";
import {
  IGenericObject,
  personaModalFields,
} from "../../../../utils/objectsField";

interface IModalFieldPersona {
  key: string;
  label: string;
  value: string;
}
interface IPersonaInfoCard {
  title: string;
  handleEvent: () => void;
  propsPersona: IPersonaResponse;
}

function PersonaInfoCard({
  title,

  handleEvent,
  propsPersona,
}: IPersonaInfoCard) {
  const [modalField, setModalFields] = useState<IGenericObject[]>();

  const { updateModalFields } = useGenericObjectFielf();
  
  useEffect(() => {
    const fields = updateModalFields(personaModalFields, propsPersona);
    setModalFields(fields);
  }, [propsPersona]);

  return (
    <>
      <GenericCard title={title} handleEvent={handleEvent}>
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
