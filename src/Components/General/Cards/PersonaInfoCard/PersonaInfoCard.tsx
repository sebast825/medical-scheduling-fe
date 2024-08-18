import { Button, Card } from "react-bootstrap";
import OneButton from "../../../buttons/oneButton/OneButton";

interface IPersonaInfoCard {
  title: String;
  nombre: string;
  apellido: string;
  numeroDocumento: string;
  sexo: string;
  telefono: string;
  fechaNac: string;
  handleEvent: ()=>void;
}

function PersonaInfoCard({
  title,
  nombre,
  apellido,
  numeroDocumento,
  fechaNac,
  sexo,
  telefono,
  handleEvent
}: IPersonaInfoCard) {
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center p-5 flex-column" >
        <Card style={{ width: "18rem" }}>
          <Card.Body >
            <Card.Title>{`${title}`}</Card.Title>
            {/* <Card.Subtitle className="mb-2 text-muted">ID: {numeroDocumento}</Card.Subtitle> */}
            <hr />
            <Card.Text>
              <strong>Nombre:</strong> {nombre}
            </Card.Text>
            <Card.Text>
              <strong>Apellido:</strong> {apellido}
            </Card.Text>
            <Card.Text>
              <strong>Fecha de Nacimiento:</strong>{" "}
              {new Date(fechaNac).toLocaleDateString()}
            </Card.Text>
            <Card.Text>
              <strong>Teléfono:</strong> {telefono}
            </Card.Text>
            <Card.Text>
              <strong>Sexo:</strong> {sexo}
            </Card.Text>

            <Card.Text>
              <strong>Numero Documento:</strong> {numeroDocumento}
            </Card.Text>

            {/* <Card.Text>
          <strong>Contacto de Emergencia:</strong> {nombreEmergencia}
        </Card.Text>
        <Card.Text>
          <strong>Teléfono de Emergencia:</strong> {telefonoEmergencia}
        </Card.Text> */}   <hr />
        <Card.Text>
        <OneButton text="Editar" handleSubmit={handleEvent}/>

        </Card.Text>
     
          </Card.Body>

        </Card>
        {/* <Button variant="primary" onClick={handleEvent}>Editar</Button> */}

      </div>

    </>
  );
}

export default PersonaInfoCard;
