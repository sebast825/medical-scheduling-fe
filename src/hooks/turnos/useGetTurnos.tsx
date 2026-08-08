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
import { ITurnoCreateRequestDTO } from "../../types/turno/TurnoCreateRequest.DTO.type";
import { TurnoHorarioDisponibleResponseDTO } from "../../types/turno/TurnoHorarioDisponibleResponseDTO.type";
import { sortTurnosByDate, sortTurnosByPriority } from "./utils";

const useGetTurnos = () => {
  const user = useUserInfo();

  const { pacienteInfo } = usePacienteContext();


  const getTurnosDisponiblesByMedico = useCallback(
    async (id: string): Promise<TurnoHorarioDisponibleResponseDTO[]> => {
      if (!user) throw new Error("User not authenticated");

      const response = await fetchTurnosDisponiblesByMedico(user, id);
      return response;
    },
    [user]
  );

  const getTurnosDisponiblesByEspecialidad = useCallback(
    async (id: string): Promise<TurnoHorarioDisponibleResponseDTO[]> => {
      if (!user) throw new Error("User not authenticated");
      const response = await fetchTurnosDisponiblesByEspecialdiad(user, id);
      return response;
    },
    [user]
  );
  const crearTurno = useCallback(
    async (dto: ITurnoCreateRequestDTO): Promise<TurnoResponse> => {
      if (!user) throw new Error("User not authenticated");
      return fetchCrearTurnos(user, dto);
    },
    [user]
  );
  const getPacienteTurnos = useCallback(
    async (pacienteId?: string): Promise<TurnoResponse[]> => {
      if (!user) throw new Error("User not authenticated");

      const effectiveId = pacienteId || pacienteInfo?.id;
      if (!effectiveId || typeof effectiveId !== "string") {
        throw new Error("Paciente ID is required");
      }

      const response = await fetchTurnosPaciente(user, effectiveId);

      const turnosProgramados = response.filter(
        (turno: TurnoResponse) => turno.estado === ESTADOS_TURNO.PROGRAMADO
      );

      return sortTurnosByDate(turnosProgramados);
    },
    [user, pacienteInfo?.id]
  );
  const getTurnosHoyMedicoById = useCallback(
    async (userId: string): Promise<TurnoResponse[]> => {
      if (!user) return [];

      const response = await fetchFilterTurnosMedicoHoy(user, new Date().toISOString(), userId);
      const sorted = sortTurnosByDate(response);
      return sortTurnosByPriority(sorted);
    },
    [user]
  );



  return {
    getPacienteTurnos,
    getTurnosHoyMedicoById,
    sortTurnosByDate,
    getTurnosDisponiblesByMedico,
    crearTurno,
    getTurnosDisponiblesByEspecialidad,
  };
};

export default useGetTurnos;
