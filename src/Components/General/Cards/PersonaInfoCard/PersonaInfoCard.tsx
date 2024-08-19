import GenericCard from "../GenericCard/GenericCard";
import CardItem from "../cardItem/CardItem";
import { useEffect, useState } from "react";
import {
  IGenericObject,
} from "../../../../utils/objectsField";


interface IPersonaInfoCard {
  title: string;
  handleEvent: () => void;
  propsPersona: IGenericObject[];
}

function PersonaInfoCard({
  title,
  handleEvent,
  propsPersona,
}: IPersonaInfoCard) {

  const [modalField, setModalFields] = useState<IGenericObject[]>(propsPersona);

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
