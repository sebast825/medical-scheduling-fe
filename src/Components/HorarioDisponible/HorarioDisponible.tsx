import { useEffect, useState } from "react";
import { TurnoHorarioDisponibleResponseDTO } from "../../types/turno/TurnoHorarioDisponibleResponseDTO.type";
import { Button, Card } from "react-bootstrap";
import { getDate } from "../../utils/formatDate";

interface IHorarioDisponiblePorDia {
  TurnoHorarioResponse?: TurnoHorarioDisponibleResponseDTO;
  handleSelect: (horario : string) => void;
}
function HorarioDisponiblePorDia({
  TurnoHorarioResponse,
  handleSelect
}: IHorarioDisponiblePorDia) {

  const [horarios, setHorarios] = useState<TurnoHorarioDisponibleResponseDTO>();
  const date : string= TurnoHorarioResponse ? getDate(TurnoHorarioResponse?.fecha.toString()): "";

  useEffect(() => {

    setHorarios(TurnoHorarioResponse);
  }, []);

  return (
    <>
   
      <Card style={{ width: "18rem", margin: "1rem" }}>
        <Card.Body className="" style={{ gap: "1rem" }}>
          <Card.Title>Fecha {date}</Card.Title>
         
          {horarios?.horario.map((elem) => {
             const timeString = elem;
             const formattedTime = timeString.substring(0, 5);
            return <Button key={formattedTime} variant="primary" onClick={()=>handleSelect(formattedTime)}>{formattedTime} </Button>;
          })}
        </Card.Body>
      </Card>
    </>
  );
}

export default HorarioDisponiblePorDia;
