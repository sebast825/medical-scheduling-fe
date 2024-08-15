import { useState, useCallback } from "react";
import { fetchTurnosPaciente } from "../../services/apiService";
import { ErrorTypeAny } from "../../types/Error.type";
import { TurnoResponse } from "../../types/turno/TurnoResponse.type";
import { ESTADOS_TURNO } from "../../utils/estadoTurno";
import GetJwtContent from "../../utils/jwtUtils";
import { useUserContext } from "../../context/authContext";


const useGetTurnos = () =>{
   const user = useUserContext();

   const [errorTurno, SetErrorTurno] = useState<ErrorTypeAny>(null);
   const [turnos, setTurnos] = useState<TurnoResponse[]>([]);
   
  const getPacinteTurnos = useCallback(async (pacienteId ?: string) => {
   try {
     var params: any = GetJwtContent(user);
     const response: TurnoResponse[] = await fetchTurnosPaciente(
       user,
       pacienteId ? pacienteId : params.PersonaId
     );
     //muestra los turnos con status programado
     const turnosProgramados = response.filter(turno => turno.estado == ESTADOS_TURNO.PROGRAMADO)
     setTurnos(turnosProgramados);
   } catch (err: any) {
     console.log(err);
     if (err.response && err.response.status === 401) {
       SetErrorTurno(err.response.data.message || "Error desconocido");
     } else {
       SetErrorTurno("Error desconocido");
     }
   }
 },[]);
 return{
   getPacinteTurnos,
   turnos,
 errorTurno
 }
}

export default useGetTurnos;