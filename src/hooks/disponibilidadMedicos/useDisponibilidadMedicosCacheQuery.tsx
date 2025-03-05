import { useQuery } from "@tanstack/react-query";
import { useUserInfo } from "../../context/authContext";
import { getDisponibilidadMedicos } from "../../services/apiService";

function useDisponibilidadMedicosCacheQuery() {
  const user = useUserInfo();

  const {
    data: disponibilidadMedico,
    isLoading,
    refetch,
  } = useQuery({
    
    queryFn: () => {
      console.log("carga medicos")
      if (user != null) {
        return getDisponibilidadMedicos(user) || [];
      }else{
         return []
      }
    },
    queryKey: ["disponibilidadMedico"],
    staleTime: Infinity,
  });


  const handleReloadDisponibilidadMedicos = () => {
    refetch(); 
  };
  return { disponibilidadMedico, isLoading ,handleReloadDisponibilidadMedicos};
}

export default useDisponibilidadMedicosCacheQuery;
