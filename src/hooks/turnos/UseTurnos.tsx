import { useCallback, useEffect, useState } from "react";
import { useUserInfo } from "../../context/authContext";
import {
  fetchCrearTurnos,
  fetchTurnosDisponiblesByEspecialdiad,
  fetchTurnosDisponiblesByMedico

} from "../../services/apiService";
import { TurnoHorarioDisponibleResponseDTO } from "../../types/turno/TurnoHorarioDisponibleResponseDTO.type";
import { ErrorTypeAny } from "../../types/Error.type";
import { ITurnoCreateRequestDTO } from "../../types/turno/TurnoCreateRequest.DTO.type";
import useToastit from "../useToastit";

const useTurnos = () => {
  const user = useUserInfo();
  const [turnosDisponibles, setTurnosDisponibles] =
    useState<TurnoHorarioDisponibleResponseDTO[]>();
  const [errorTurno, SetErrorTurno] = useState<ErrorTypeAny>(null);

  const getTurnosDisponiblesByMedico = useCallback(async (id: string) => {
    try {
      if(user == null)return;
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
      if(user == null)return;

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
    //devuelve un bool para que en caso de que no pueda hacer la consulta maneje el error y no actue el redirect en la función
    async (turnoRequest: ITurnoCreateRequestDTO) : Promise<boolean> => {
      //consigue la info del usuario
      try {
        if(user == null) return false;     
        //const dtoString = JSON.stringify(createTurnoRequest);
        const response: any = await fetchCrearTurnos(user, turnoRequest);
        console.log(response);  
        return true;
      } catch (error: any) {
        console.error("Error al iniciar sesión:", error);
        SetErrorTurno(error.response.data);
        return false;
      }
    },
    []
  );

  const {error} = useToastit();
  useEffect(()=>{
   if(errorTurno == null) return
     error(errorTurno);
  },[errorTurno])
  
  return {
    getTurnosDisponiblesByMedico,
    crearTurno,
    turnosDisponibles,
    getTurnosDisponiblesByEspecialidad,
  };
};

export default useTurnos;
