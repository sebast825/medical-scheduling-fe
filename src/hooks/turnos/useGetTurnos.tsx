import { useState, useCallback } from "react";
import {
  fetchCrearTurnos,
  fetchFilterTurnosMedicoHoy,
  fetchTurnosDisponiblesByEspecialdiad,
  fetchTurnosDisponiblesByMedico,
  fetchTurnosPaciente,
} from "../../services/apiService";
import { TurnoResponse } from "../../types/turno/TurnoResponse.type";
import { ESTADOS_TURNO } from "../../utils/estadoTurno";
import { usePacienteContext, useUserInfo } from "../../context/authContext";
import useToastit from "../useToastit";
import { handleHttpError } from "../../utils/errorHandler";
import { parseDateFromResponseStringToDate } from "../../utils/formatDate";
import { success } from "toastr";
import { ITurnoCreateRequestDTO } from "../../types/turno/TurnoCreateRequest.DTO.type";
import { TurnoHorarioDisponibleResponseDTO } from "../../types/turno/TurnoHorarioDisponibleResponseDTO.type";

const useGetTurnos = () => {
  const user = useUserInfo();

  const { error, success } = useToastit();
  const [turnosDisponibles, setTurnosDisponibles] =
    useState<TurnoHorarioDisponibleResponseDTO[]>();
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

  const getTurnosDisponiblesByMedico = useCallback(async (id: string) => {
    try {
      if (user == null) return;
      const response: TurnoHorarioDisponibleResponseDTO[] =
        await fetchTurnosDisponiblesByMedico(user, id);

      setTurnosDisponibles(response);
      return response;
    } catch (err: any) {
      error(handleHttpError(err));
    }
  }, []);

  const getTurnosDisponiblesByEspecialidad = useCallback(async (id: string) => {
    try {
      if (user == null) return;

      const response: TurnoHorarioDisponibleResponseDTO[] =
        await fetchTurnosDisponiblesByEspecialdiad(user, id);
      setTurnosDisponibles(response);
      return response;
    } catch (err: any) {
      error(handleHttpError(err));
    }
  }, []);
  const crearTurno = useCallback(
    //devuelve un bool para que en caso de que no pueda hacer la consulta maneje el error y no actue el redirect en la función
    async (
      turnoRequest: ITurnoCreateRequestDTO
    ): Promise<TurnoResponse | undefined> => {
      //consigue la info del usuario
      try {
        if (user == null) return;
        //const dtoString = JSON.stringify(createTurnoRequest);
        const response: any = await fetchCrearTurnos(user, turnoRequest);
        success("Turno agendado exitosamente.");
        return response;
      } catch (err: any) {
        error(handleHttpError(err));
      }
    },
    []
  );
  const getPacinteTurnos = useCallback(async (pacienteId?: string) : Promise<TurnoResponse[] | []>=> {
    console.log("entra y llama");

    try {
      if (user == null) return [];

      var paramId: any = pacienteInfo?.id;

      const response: TurnoResponse[] = await fetchTurnosPaciente(
        user,
        pacienteId ? pacienteId : paramId
      );
      //muestra los turnos con status programado
      const turnosProgramados = response.filter(
        (turno) => turno.estado == ESTADOS_TURNO.PROGRAMADO
      );
      let sort: TurnoResponse[] = orderTurnosByDate(turnosProgramados);

      //comentado para resolver todo en cache
      //setTurnos(sort);

      return sort || [];
    } catch (err: any) {
      error(handleHttpError(err));
      return [];
    }
  }, []);

  function orderTurnosByDate(array: TurnoResponse[]): TurnoResponse[] {
    return [...array].sort((a: TurnoResponse, b: TurnoResponse) => {
      const fecha1: Date | null = parseDateFromResponseStringToDate(a.fecha);
      const fecha2: Date | null = parseDateFromResponseStringToDate(b.fecha);
      if (fecha1 != null && fecha2 != null) {
        return fecha1.getTime() - fecha2.getTime();
      }
      //Si parseISO falla, se retorna 0 para evitar errores.

      return 0;
    });
  }

  const getTurnosHoyMedicoById = useCallback(
    async (userId: string) :Promise<TurnoResponse[] | []> => {
      try {
        if (user == null) return [];
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
        let orderByPrio = sortTurnosByPrioridad(orderByDate)
        //setTurnos(orderByPrio);
        return orderByPrio;
  
      } catch (err: any) {
        error(handleHttpError(err));
        return []
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
    orderTurnosByDate,
    getTurnosDisponiblesByMedico,
    crearTurno,
    turnosDisponibles,
    getTurnosDisponiblesByEspecialidad,
  };
};

export default useGetTurnos;
