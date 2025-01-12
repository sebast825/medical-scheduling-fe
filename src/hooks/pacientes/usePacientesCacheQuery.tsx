import { useQuery } from "@tanstack/react-query";
import usePacientes from "./usePacientes";

function usePacientesCacheQuery (user:string|null){
   const {getAllPacientes}=usePacientes()
   const {
      data: pacienteList,
      isLoading,
      
    } = useQuery({
      queryFn:  () => {
         if(user){
            return getAllPacientes(user)
         }else{
            return  []; 
         }
      },
      queryKey: ['pacienteList',user], 
      staleTime: Infinity,
    });

    return {pacienteList,isLoading}
}
export default usePacientesCacheQuery;