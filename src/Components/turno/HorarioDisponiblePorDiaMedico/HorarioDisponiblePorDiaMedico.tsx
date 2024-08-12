import { useEffect, useState } from "react";
import { TurnoHorarioDisponibleResponseDTO } from "../../../types/turno/TurnoHorarioDisponibleResponseDTO.type";
import { Button, Card } from "react-bootstrap";
import { getDate } from "../../../utils/formatDate";
import ListHorarios from "../ListHorarios/ListHorarios";

interface IHorarioDisponiblePorDiaMedico {
  TurnoHorarioResponse?: TurnoHorarioDisponibleResponseDTO;
  handleSelect: (horario: string) => void;
  nombreMedico?: string;
}
function HorarioDisponiblePorDiaMedico({
  TurnoHorarioResponse,
  handleSelect,
  nombreMedico,
}: IHorarioDisponiblePorDiaMedico) {
  const [horarios, setHorarios] = useState<TurnoHorarioDisponibleResponseDTO>();
  const date: string = TurnoHorarioResponse
    ? getDate(TurnoHorarioResponse?.fecha.toString())
    : "";

  useEffect(() => {
    setHorarios(TurnoHorarioResponse);
  }, []);

  return (
    <>
      <Card style={{ width: "18rem", margin: "1rem" }}>
        <Card.Body
          className="d-flex flex-wrap justify-content-center"
          style={{ gap: "1rem" }}
        >
          {
            nombreMedico ? (
              <div style={{ width: "100vw" }} className="">
              <Card.Title>{nombreMedico}</Card.Title>
            </div>
            ): null
          }
          
          {horarios && <ListHorarios listHorarios={ horarios.horario} handleSelect={handleSelect} date={date}/> }
        
  
        </Card.Body>
      </Card>
    </>
  );
}

export default HorarioDisponiblePorDiaMedico;
