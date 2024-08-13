import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { crearFecha } from "../../../utils/formatDate";
import { TurnoHorarioDisponibleResponseDTO } from "../../../types/turno/TurnoHorarioDisponibleResponseDTO.type";

interface IListHorarios {
  listHorarios: TurnoHorarioDisponibleResponseDTO;
  handleSelect: (horario: string, medicoId : number) => void;
  date:string;
}

function ListHorarios({ listHorarios, handleSelect,date }: IListHorarios) {
  const [horarios, setHorarios] = useState<string[]>();
  const [idMedico, setIdMedico] = useState <number>(0);
  useEffect(() => {
    setHorarios(listHorarios.horario);
    setIdMedico(listHorarios.medicoId)
  }, []);

  return (
    <>
      {horarios?.map((elem) => {
           const timeString = elem;
           const formattedTime = timeString.substring(0, 5);

        return (
          <Button key={elem} variant="primary" onClick={() => handleSelect(crearFecha(elem,date),idMedico)}>
            {formattedTime}
          </Button>
        );
      })}
    </>
  );
}

export default ListHorarios;
