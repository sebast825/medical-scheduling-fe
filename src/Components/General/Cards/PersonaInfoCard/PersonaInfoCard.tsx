import { Card } from "react-bootstrap";

interface IPersonaInfoCard{
   title : String;
   nombre: string;
   apellido: string;
   numeroDocumento : string;
   sexo : string;
   telefono : string;
   fechaNac: string
   }

function PersonaInfoCard ({title,nombre,apellido,numeroDocumento,fechaNac,sexo,telefono}:IPersonaInfoCard){
   return (<>
   <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{`${title}`}</Card.Title>
        {/* <Card.Subtitle className="mb-2 text-muted">ID: {numeroDocumento}</Card.Subtitle> */}
        <Card.Text>
          <strong>Nombre:</strong> {new Date(nombre).toLocaleDateString()}
        </Card.Text>
        <Card.Text>
          <strong>Apellido:</strong> {new Date(apellido).toLocaleDateString()}
        </Card.Text>
        <Card.Text>
          <strong>Fecha de Nacimiento:</strong> {new Date(fechaNac).toLocaleDateString()}
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
        <hr />
        {/* <Card.Text>
          <strong>Contacto de Emergencia:</strong> {nombreEmergencia}
        </Card.Text>
        <Card.Text>
          <strong>Teléfono de Emergencia:</strong> {telefonoEmergencia}
        </Card.Text> */}
      </Card.Body>
    </Card>
   </>)
}

export default PersonaInfoCard;