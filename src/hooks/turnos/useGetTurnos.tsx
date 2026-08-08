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
import { sortTurnosByDate, sortTurnosByPriority } from "./utils";

const useGetTurnos = () => {
  const user = useUserInfo();

  const { error, success } = useToastit();
  const [turnosDisponibles, setTurnosDisponibles] =
    useState<TurnoHorarioDisponibleResponseDTO[]>();
  const [turnos, setTurnos] = useState<TurnoResponse[]>([]);
  const { pacienteInfo } = usePacienteContext();

  
  const getTurnosDisponiblesByMedico = useCallback(async (id: string) : Promise<TurnoHorarioDisponibleResponseDTO[] | []>=> {
    try {
      if (user == null) return [];
      const response: TurnoHorarioDisponibleResponseDTO[] =
        await fetchTurnosDisponiblesByMedico(user, id);
      setTurnosDisponibles(response);
      return response
    } catch (err: any) {
      error(handleHttpError(err));
      return []
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
  const getPacinteTurnos = useCallback(async (pacienteId: string) : Promise<TurnoResponse[] | []>=> {

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
      let sort: TurnoResponse[] = sortTurnosByDate(turnosProgramados);

      //comentado para resolver todo en cache
      //setTurnos(sort);

      return sort || [];
    } catch (err: any) {
      error(handleHttpError(err));
      return [];
    }
  }, []);



  const getTurnosHoyMedicoById = useCallback(
    async (userId: string) :Promise<TurnoResponse[] | []> => {
      try {
        if (user == null) return [];
 
        const response: TurnoResponse[] = await fetchFilterTurnosMedicoHoy(
          user,
          new Date().toISOString(),
          userId
        );

        let orderByDate = sortTurnosByDate(response);
        let orderByPrio = sortTurnosByPriority(orderByDate)
        //setTurnos(orderByPrio);
        return orderByPrio;
  
      } catch (err: any) {
        error(handleHttpError(err));
        return []
      }
    },
    [user]
  );



  // Actualiza el turno modificado en el array de turnos.
  function updateStatusTurno(turnoModificado: TurnoResponse) {
    const updateTurnos = turnos.map((turno) => {
      if (turno.id === turnoModificado.id) {
        turno.estado = turnoModificado.estado;
        return turno;
      }
      return turno;
    });
    setTurnos(sortTurnosByPriority(updateTurnos));
  }

  return {
    getPacinteTurnos,
    turnos,
    setTurnos,
    getTurnosHoyMedicoById,
    updateStatusTurno,
    sortTurnosByDate,
    getTurnosDisponiblesByMedico,
    crearTurno,
    turnosDisponibles,
    getTurnosDisponiblesByEspecialidad,
  };
};

export default useGetTurnos;
