import { TurnoHorarioDisponibleResponseDTO } from "../../../types/turno/TurnoHorarioDisponibleResponseDTO.type";
import Calendario from "../../turno/Calendar/Calendar";

interface ICalendarioTurnoDisponible {
  diasDisponible: TurnoHorarioDisponibleResponseDTO[];
  handleSelect: (e: string) => void;
}

function CalendarioTurnoDisponible({
  diasDisponible,
  handleSelect
}: ICalendarioTurnoDisponible) {
  //toma la fecha de cada disponibilidad para mostrarla resaltada
  var resaltarDias = diasDisponible?.map((elem) => elem.fecha);


  return (
    <>
      <Calendario
        dateList={resaltarDias}
        handleSelect={handleSelect}
      />
    </>
  );
}

export default CalendarioTurnoDisponible;