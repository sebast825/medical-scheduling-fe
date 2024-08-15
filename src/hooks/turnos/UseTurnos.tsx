import { useCallback, useState } from "react";
import { useUserContext } from "../../context/authContext";
import {
  fetchCrearTurnos,
  fetchTurnosDisponiblesByEspecialdiad,
  fetchTurnosDisponiblesByMedico,
  fetchTurnosPaciente,
} from "../../services/apiService";
import { TurnoHorarioDisponibleResponseDTO } from "../../types/turno/TurnoHorarioDisponibleResponseDTO.type";
import { ErrorTypeAny } from "../../types/Error.type";
import { ITurnoCreateRequestDTO } from "../../types/turno/TurnoCreateRequest.DTO.type";

const useTurnos = () => {
  const user = useUserContext();
  const [turnosDisponibles, setTurnosDisponibles] =
    useState<TurnoHorarioDisponibleResponseDTO[]>();
  const [errorTurno, SetErrorTurno] = useState<ErrorTypeAny>(null);

  const getTurnosDisponiblesByMedico = useCallback(async (id: string) => {
    try {
      const response: TurnoHorarioDisponibleResponseDTO[] =
        await fetchTurnosDisponiblesByMedico(user, id);

      setTurnosDisponibles(response);
      console.log(response);
      return response;
    } catch (err: any) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        SetErrorTurno(err.response.data.message || "Error desconocido");
      } else {
        SetErrorTurno("Error desconocido");
      }
    }
  }, []);


  const getTurnosDisponiblesByEspecialidad = useCallback(async (id: string) => {
    try {
      const response: TurnoHorarioDisponibleResponseDTO[] =
        await fetchTurnosDisponiblesByEspecialdiad(user, id);
      setTurnosDisponibles(response);

      console.log(response);
      return response;
    } catch (err: any) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        SetErrorTurno(err.response.data.message || "Error desconocido");
      } else {
        SetErrorTurno("Error desconocido");
      }
    }
  }, []);
  const crearTurno = useCallback(
    async (turnoRequest: ITurnoCreateRequestDTO) => {
      //consigue la info del usuario
      try {
        //const dtoString = JSON.stringify(createTurnoRequest);
        const response: any = await fetchCrearTurnos(user, turnoRequest);
        console.log(response);
      } catch (error: any) {
        console.error("Error al iniciar sesión:", error);
        SetErrorTurno(error.message);
      }
    },
    []
  );

  return {
    getTurnosDisponiblesByMedico,
    crearTurno,
    errorTurno,
    turnosDisponibles,
    getTurnosDisponiblesByEspecialidad,
  };
};

export default useTurnos;
