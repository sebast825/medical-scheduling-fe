import { useQuery } from "@tanstack/react-query";
import usePacientes from "./usePacientes";

function usePacientesCacheQuery (){
   const {getAllPacientes}=usePacientes()
   const {
      data: pacienteList,
      isLoading,
      
    } = useQuery({
      queryFn:  () => {
        return getAllPacientes() || []; 
      },
      queryKey: ['pacienteList'], 
      staleTime: Infinity,
    });

    return {pacienteList,isLoading}
}
export default usePacientesCacheQuery;