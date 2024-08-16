import { useState, useCallback, useEffect } from "react";
import { fetchTurnosPaciente } from "../../services/apiService";
import { ErrorTypeAny } from "../../types/Error.type";
import { TurnoResponse } from "../../types/turno/TurnoResponse.type";
import { ESTADOS_TURNO } from "../../utils/estadoTurno";
import GetJwtContent from "../../utils/jwtUtils";
import { useUserContext } from "../../context/authContext";
import useToastit from "../useToastit";


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
     setTurnos(orderTurnos(turnosProgramados))
   } catch (err: any) {
   
     SetErrorTurno(err.response.data || "Error desconocido");

   }
 },[]);
 const {error} =useToastit();
 useEffect(()=>{
  if(errorTurno == null) return
    error(errorTurno);
 },[errorTurno])
 
 function orderTurnos( array : TurnoResponse[]) : TurnoResponse[]{
  var sortTurnos = array.sort((a, b) => {
    var fecha1 = new Date(a.fecha);
    var fecha2 = new Date(b.fecha) 
    
    if ( fecha1 < fecha2 ) {
      return 1;
    } else {
      return -1;
    }
  });
  return sortTurnos
}
 return{
   getPacinteTurnos,
   turnos
 }
}

export default useGetTurnos;