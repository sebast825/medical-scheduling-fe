
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useGetTurnos from "./useGetTurnos";
import { TurnoResponse } from "../../types/turno/TurnoResponse.type";
import { usePacienteContext } from "../../context/authContext";


function useTurnosPacienteCacheQuery(pacienteInfoId ?: string | undefined){

   const {getPacinteTurnos,orderTurnosByDate} = useGetTurnos()
   const queryClient = useQueryClient();
   
     const {data: turnos, isFetching,refetch} = useQuery({
       queryFn: () =>getPacinteTurnos(pacienteInfoId),
       queryKey: ["pacienteTurnos"],
       staleTime:Infinity,
       enabled: pacienteInfoId != undefined
     })
     const addTurnoCache = (newTurno: TurnoResponse) => {
      queryClient.setQueryData(["pacienteTurnos"], (oldData: TurnoResponse[]) => {
        const updatedData  = [...oldData, newTurno];
          return orderTurnosByDate(updatedData);
      });
    };
    const handleDeleteCache = (id : number) =>{
      queryClient.setQueryData(['pacienteTurnos'],(prevTurnos:TurnoResponse[])=>{
        return prevTurnos.filter(elem => elem.id != id   )
      })
    } 
    const handleReloadTurnos = () => {
      refetch(); 
    };
   return{
      turnos,
      isFetching,
      addTurnoCache,
      handleDeleteCache,
      handleReloadTurnos
   }
}


export default useTurnosPacienteCacheQuery;