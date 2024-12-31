
import { useQuery } from "@tanstack/react-query";
import useGetTurnos from "./useGetTurnos";


function useTurnosCacheQuery(){

   const {getPacinteTurnos} = useGetTurnos()
     const {data: turnos, isLoading} = useQuery({
       queryFn: () => getPacinteTurnos(),
       queryKey: ["pacienteTurnos"],
       staleTime:Infinity
     })


   return{
      turnos,
      isLoading
   }
}


export default useTurnosCacheQuery;