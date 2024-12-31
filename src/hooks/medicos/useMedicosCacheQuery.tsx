import { useQuery, useQueryClient } from "@tanstack/react-query";
import useMedicos from "./useMedicos";
import { TurnoResponse } from "../../types/turno/TurnoResponse.type";
import { Spinner } from "../../Components/statics/Spinner";


function useMedicosCacheQuery(){
   const queryClient = useQueryClient();
   const { getMedicos, findMedicoById } = useMedicos();


   const {data: medicos, isLoading} = useQuery({
      queryFn: () => getMedicos(),
      queryKey: ["medicos"],
      staleTime:Infinity
    })
 /*   const addTurnoCache = (newTurno: TurnoResponse) => {
     queryClient.setQueryData(["pacienteTurnos"], (oldData: TurnoResponse[]) => {
       const updatedData  = [...oldData, newTurno];
         return orderTurnosByDate(updatedData);
     });
   };*/
   const handleDeleteCache = (id : number) =>{
     queryClient.setQueryData(['medicos'],(prevTurnos:TurnoResponse[])=>{
       return prevTurnos.filter(elem => elem.id != id   )
     })
   } 
   return{
      medicos,
      isLoading
   }
}

export default useMedicosCacheQuery