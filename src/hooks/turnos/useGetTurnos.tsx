import { useState, useCallback, useEffect } from "react";
import { fetchTurnosByMedicoId, fetchTurnosPaciente } from "../../services/apiService";
import { ErrorTypeAny } from "../../types/Error.type";
import { TurnoResponse } from "../../types/turno/TurnoResponse.type";
import { ESTADOS_TURNO } from "../../utils/estadoTurno";
import GetJwtContent from "../../utils/jwtUtils";
import { usePacienteContext, useUserInfo } from "../../context/authContext";
import useToastit from "../useToastit";


const useGetTurnos = () =>{
   const user = useUserInfo();

   const [errorTurno, SetErrorTurno] = useState<ErrorTypeAny>(null);
   const [turnos, setTurnos] = useState<TurnoResponse[]>([]);
   const {pacienteInfo} = usePacienteContext()

  const getPacinteTurnos = useCallback(async (pacienteId ?: string) => {
   try {
    if(user == null)return;

     var paramId: any = pacienteInfo?.id;
   
     console.log(user)
     const response: TurnoResponse[] = await fetchTurnosPaciente(
       user,
       pacienteId ? pacienteId : paramId
     );
     //muestra los turnos con status programado
     const turnosProgramados = response.filter(turno => turno.estado == ESTADOS_TURNO.PROGRAMADO)
     setTurnos(orderTurnos(turnosProgramados))
   } catch (err: any) {
    console.log(err)
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






   const getTurnosMedicoById = useCallback(async (userId : string) => {
 
      
      try {
        if (user == null) return;
        const response: TurnoResponse[] = await fetchTurnosByMedicoId(user,userId);
  
        setTurnos(orderTurnos(response))
        console.log(response);
        return response;
      } catch (err: any) {
        console.log(err);
        if (err.response && err.response.status === 401) {
          SetErrorTurno(err.response.data || "Error desconocido");
        } else {
          SetErrorTurno(err.response.data);
        }
      }
    }, [user]);

 return{
   getPacinteTurnos,
   turnos,
   getTurnosMedicoById
 }
}

export default useGetTurnos;