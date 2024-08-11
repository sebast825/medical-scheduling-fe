import { useEffect, useState } from "react";
import { TurnoHorarioDisponibleResponseDTO } from "../../types/turno/TurnoHorarioDisponibleResponseDTO.type";
import { Button, Card } from "react-bootstrap";

interface IHorarioDisponiblePorDia {
  TurnoHorarioResponse?: TurnoHorarioDisponibleResponseDTO;
}

function HorarioDisponiblePorDia({
  TurnoHorarioResponse,
}: IHorarioDisponiblePorDia) {

  const [horarios, setHorarios] = useState<TurnoHorarioDisponibleResponseDTO>();

  useEffect(() => {
    setHorarios(TurnoHorarioResponse);
  }, []);

  return (
    <>
      <h2>Horarios Disponibles </h2>
      <Card style={{ width: "18rem", margin: "1rem" }}>
        <Card.Body className="" style={{ gap: "1rem" }}>
          <Card.Title>Hora Disponibles</Card.Title>

          {horarios?.horario.map((elem) => {
            return <Button key={elem} variant="primary">{elem} </Button>;
          })}
        </Card.Body>
      </Card>
    </>
  );
}

export default HorarioDisponiblePorDia;
