import { useEffect, useState } from "react";
import { TurnoHorarioDisponibleResponseDTO } from "../../types/turno/TurnoHorarioDisponibleResponseDTO.type";
import { Button, Card } from "react-bootstrap";
import { getDate } from "../../utils/formatDate";

interface IHorarioDisponiblePorDia {
  TurnoHorarioResponse: TurnoHorarioDisponibleResponseDTO | undefined;
}

function HorarioDisponiblePorDia({
  TurnoHorarioResponse,
}: IHorarioDisponiblePorDia) {
  const [horarios, setHorarios] = useState<TurnoHorarioDisponibleResponseDTO>();
  useEffect(() => {
    console.log(TurnoHorarioResponse);

    setHorarios(TurnoHorarioResponse);
  }, []);
  return (
    <>
      <h2>Horarios Disponibles </h2>
      <Card style={{ width: "18rem", margin: "1rem" }}>
        <Card.Body className="" style={{ gap: "1rem" }}>
          <Card.Title>Hora Disponibles</Card.Title>

          {horarios?.horario.map((elem) => {
            return <Button variant="primary">{elem} </Button>;
          })}
        </Card.Body>
      </Card>
    </>
  );
}

export default HorarioDisponiblePorDia;
