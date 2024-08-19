import { Button, Card } from "react-bootstrap";
import OneButton from "../../../buttons/oneButton/OneButton";
import GenericCard from "../GenericCard/GenericCard";
import CardItem from "../cardItem/CardItem";
import { IPersonaResponse } from "../../../../types/Persona/PersonaResponse.type";
import { useEffect, useState } from "react";

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

  const modalFieldsBase : IModalFieldPersona[] = [
    { key: "nombre", label: "Nombre", value: "" },
    { key: "apellido", label: "Apellido", value: "" },
    { key: "fechaNacimiento", label: "Fecha Nacimiento", value: "" },
    { key: "telefono", label: "Telefono", value: "" },
    { key: "numeroDocumento", label: "numero Documento", value: "" },
    { key: "sexo", label: "Sexo", value: "" },
  ];

  function updateModalFields() {
    // Accediendo a las claves y valores
    const entries = Object.entries(propsPersona); // ["title", "nombre", "apellido", ...]

    entries.map(([key, value]) => {
      const modalField = modalFieldsBase.find(
        (elemModal) => elemModal.key == key
      );

      if (modalField) {
        modalField.value = value;
        if (modalField.key == "fechaNacimiento") {
          modalField.value = new Date(value).toLocaleDateString();
        }
      }
    });
    setModalFields(modalFieldsBase);
  }
  useEffect(() => {
    updateModalFields();
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
