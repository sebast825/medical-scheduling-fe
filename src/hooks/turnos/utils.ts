import { TurnoResponse } from "../../types/turno/TurnoResponse.type";
import { ESTADOS_TURNO } from "../../utils/estadoTurno";
import { parseDateFromResponseStringToDate } from "../../utils/formatDate";

export function sortTurnosByDate(array: TurnoResponse[]): TurnoResponse[] {
  return [...array].sort((a: TurnoResponse, b: TurnoResponse) => {
    const fecha1: Date | null = parseDateFromResponseStringToDate(a.fecha);
    const fecha2: Date | null = parseDateFromResponseStringToDate(b.fecha);
    if (fecha1 != null && fecha2 != null) {
      return fecha1.getTime() - fecha2.getTime();
    }
    //If parseISO fails, 0 is returned to avoid errors.
    return 0;
  });
}

const priorityTurnos = {
  [ESTADOS_TURNO.EN_PROGRESO]: 1,
  [ESTADOS_TURNO.LLAMANDO]: 2,
  [ESTADOS_TURNO.PROGRAMADO]: 3,
  [ESTADOS_TURNO.COMPLETADO]: 4,
  [ESTADOS_TURNO.NO_ASISTIDO]: 5,
  [ESTADOS_TURNO.CANCELADO]: 6,
};

export function sortTurnosByPriority(turnosList: TurnoResponse[]) {
  // The spread operator is used to create a copy without modifying the original state.
  // The value 100 takes highest priority if the state is undefined.
  let ordenarTurnos = [...turnosList].sort((a, b) => {
    let prioridadA = priorityTurnos[a.estado] || 100;
    let prioridadB = priorityTurnos[b.estado] || 100;
    return prioridadA - prioridadB;
  });
  return ordenarTurnos;
}