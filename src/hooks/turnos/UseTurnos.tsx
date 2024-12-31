import { useCallback, useState } from "react";
import { useUserInfo } from "../../context/authContext";
import {
  fetchCrearTurnos,
  fetchTurnosDisponiblesByEspecialdiad,
  fetchTurnosDisponiblesByMedico,
} from "../../services/apiService";
import { TurnoHorarioDisponibleResponseDTO } from "../../types/turno/TurnoHorarioDisponibleResponseDTO.type";
import { ITurnoCreateRequestDTO } from "../../types/turno/TurnoCreateRequest.DTO.type";
import useToastit from "../useToastit";
import { handleHttpError } from "../../utils/errorHandler";
import { TurnoResponse } from "../../types/turno/TurnoResponse.type";

const useTurnos = () => {
  const user = useUserInfo();
  const [turnosDisponibles, setTurnosDisponibles] =
    useState<TurnoHorarioDisponibleResponseDTO[]>();
  const { error, success } = useToastit();

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
    async (turnoRequest: ITurnoCreateRequestDTO): Promise<TurnoResponse| undefined> => {
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

  return {
    getTurnosDisponiblesByMedico,
    crearTurno,
    turnosDisponibles,
    getTurnosDisponiblesByEspecialidad,
  };
};

export default useTurnos;
