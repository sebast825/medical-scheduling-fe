import { TurnoHorarioDisponibleResponseDTO } from "../../../types/turno/TurnoHorarioDisponibleResponseDTO.type";
import BackLink from "../../buttons/BackLink/BackLink";
import Opening from "../../General/Opening/Opening";
import Calendario from "../Calendar/Calendar";

interface ICalendarioTurnoDisponible {
  diasDisponible: TurnoHorarioDisponibleResponseDTO[];
  handleSelect: (e: string) => void;
}

function CalendarioTurnoDisponible({
  diasDisponible,
  handleSelect,
}: ICalendarioTurnoDisponible) {
  //toma la fecha de cada disponibilidad para mostrarla resaltada
  var resaltarDias = diasDisponible?.map((elem) => elem.fecha);

  return (
    <>
      <div className="d-flex flex-wrap justify-content-center ">
        <Calendario dateList={resaltarDias} handleSelect={handleSelect} />{" "}
      </div>

      <BackLink />
    </>
  );
}

export default CalendarioTurnoDisponible;
