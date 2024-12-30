import { useState, useCallback } from "react";
import {
  fetchFilterTurnosMedicoHoy,
  fetchTurnosPaciente,
} from "../../services/apiService";
import { TurnoResponse } from "../../types/turno/TurnoResponse.type";
import { ESTADOS_TURNO } from "../../utils/estadoTurno";
import { usePacienteContext, useUserInfo } from "../../context/authContext";
import useToastit from "../useToastit";
import { handleHttpError } from "../../utils/errorHandler";

const useGetTurnos = () => {
  const user = useUserInfo();

  const { error } = useToastit();
  const [turnos, setTurnos] = useState<TurnoResponse[]>([]);
  const { pacienteInfo } = usePacienteContext();

  const prioridadTurnos = {
    [ESTADOS_TURNO.EN_PROGRESO]: 1,
    [ESTADOS_TURNO.LLAMANDO]: 2,
    [ESTADOS_TURNO.PROGRAMADO]: 3,
    [ESTADOS_TURNO.COMPLETADO]: 4,
    [ESTADOS_TURNO.NO_ASISTIDO]: 5,
    [ESTADOS_TURNO.CANCELADO]: 6,
  };

  const getPacinteTurnos = useCallback(async (pacienteId?: string) => {
    try {
      if (user == null) return;

      var paramId: any = pacienteInfo?.id;

      const response: TurnoResponse[] = await fetchTurnosPaciente(
        user,
        pacienteId ? pacienteId : paramId
      );
      //muestra los turnos con status programado
      const turnosProgramados = response.filter(
        (turno) => turno.estado == ESTADOS_TURNO.PROGRAMADO
      );
      setTurnos(orderTurnosByDate(turnosProgramados));
    } catch (err: any) {
      error(handleHttpError(err));
    }
  }, []);

  function orderTurnosByDate(array: TurnoResponse[]): TurnoResponse[] {
    var sortTurnosByPrioridad = array.sort((a, b) => {
      var fecha1 = new Date(a.fecha);
      var fecha2 = new Date(b.fecha);

      if (fecha1 > fecha2) {
        return 1;
      } else {
        return -1;
      }
    });
    return sortTurnosByPrioridad;
  }

  const getTurnosHoyMedicoById = useCallback(
    async (userId: string) => {
      try {
        if (user == null) return;
        const now = new Date();
        const fechaLocal = new Date(now).toLocaleString().split(",")[0];

        let fechaDividida = fechaLocal.split("/");
        let concat =
          fechaDividida[2] + "-" + fechaDividida[1] + "-" + fechaDividida[0];

        const response: TurnoResponse[] = await fetchFilterTurnosMedicoHoy(
          user,
          concat,
          userId
        );

        let orderByDate = orderTurnosByDate(response);
        setTurnos(sortTurnosByPrioridad(orderByDate));
        return response;
      } catch (err: any) {
        error(handleHttpError(err));
      }
    },
    [user]
  );

  function sortTurnosByPrioridad(turnosList: TurnoResponse[]) {
    //se usa el spread operator para crear una copia y no modificar el estado original
    //el 100 en caso ed que el estad no este definido tiene la priooridad mas alta
    let ordenarTurnos = [...turnosList].sort((a, b) => {
      let prioridadA = prioridadTurnos[a.estado] || 100;
      let prioridadB = prioridadTurnos[b.estado] || 100;
      return prioridadA - prioridadB;
    });
    return ordenarTurnos;
  }

  // Actualiza el turno modificado en el array de turnos.
  function updateStatusTurno(turnoModificado: TurnoResponse) {
    const updateTurnos = turnos.map((turno) => {
      if (turno.id === turnoModificado.id) {
        turno.estado = turnoModificado.estado;
        return turno;
      }
      return turno;
    });
    setTurnos(sortTurnosByPrioridad(updateTurnos));
  }

  return {
    getPacinteTurnos,
    turnos,
    setTurnos,
    getTurnosHoyMedicoById,
    sortTurnosByPrioridad,
    updateStatusTurno,
  };
};

export default useGetTurnos;
