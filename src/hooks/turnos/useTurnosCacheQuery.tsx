
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useGetTurnos from "./useGetTurnos";
import { TurnoResponse } from "../../types/turno/TurnoResponse.type";


function useTurnosCacheQuery(){

   const {getPacinteTurnos,orderTurnosByDate} = useGetTurnos()
   const queryClient = useQueryClient();

     const {data: turnos, isFetching,refetch} = useQuery({
       queryFn: () => getPacinteTurnos(),
       queryKey: ["pacienteTurnos"],
       staleTime:Infinity
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


export default useTurnosCacheQuery;