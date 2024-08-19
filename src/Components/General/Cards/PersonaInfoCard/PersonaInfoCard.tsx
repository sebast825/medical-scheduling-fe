import { Button, Card } from "react-bootstrap";
import OneButton from "../../../buttons/oneButton/OneButton";
import GenericCard from "../GenericCard/GenericCard";
import CardItem from "../cardItem/CardItem";

interface IPersonaInfoCard {
  title: string;
  nombre: string;
  apellido: string;
  numeroDocumento: string;
  sexo: string;
  telefono: string;
  fechaNac: string;
  handleEvent: () => void;
}

function PersonaInfoCard({
  title,
  nombre,
  apellido,
  numeroDocumento,
  fechaNac,
  sexo,
  telefono,
  handleEvent,
}: IPersonaInfoCard) {
  return (
    <>
      <GenericCard title={title} handleEvent={handleEvent}>
        <CardItem
          text={nombre}
          propertyName="Nombre"          
        />
         <CardItem
          text={apellido}
          propertyName="Apellido"          
        />
         <CardItem
          text={new Date(fechaNac).toLocaleDateString()}
          propertyName="Fecha de Nacimiento"          
        />
         <CardItem
          text={telefono}
          propertyName="Telefono"          
        />
 
        <CardItem
          text={sexo}
          propertyName="Sexo"          
        />
        <CardItem
          text={numeroDocumento}
          propertyName="Numero Documento"          
        />
   
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

