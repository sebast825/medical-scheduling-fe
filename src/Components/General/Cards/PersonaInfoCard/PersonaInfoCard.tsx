import { Button, Card } from "react-bootstrap";
import OneButton from "../../../buttons/oneButton/OneButton";
import GenericCard from "../GenericCard/GenericCard";
import CardItem from "../cardItem/CardItem";
import { IPersonaResponse } from "../../../../types/Persona/PersonaResponse.type";
import { useEffect, useState } from "react";
import useGenericObjectFielf from "../../../../hooks/objectField/useGenericObjetField";
import { personaModalFields } from "../../../../utils/objectsField";

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

function PersonaInfoCard({  title,

  handleEvent,
  propsPersona,
}: IPersonaInfoCard) {

  const [modalFields, setModalFields] = useState<IModalFieldPersona[]>();

  function Asd(){
    var a = useGenericObjectFielf(personaModalFields,propsPersona);

  }
  Asd()

  useEffect(() => {
  }, []);

  return (
    <>
      <GenericCard title={title} handleEvent={handleEvent}>
        {modalFields &&
          modalFields.map((item) => (
            <CardItem
              key={item.key}
              text={item.value}
              propertyName={item.label}
            />
          ))}
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
