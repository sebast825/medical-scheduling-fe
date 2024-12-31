import { useQuery } from "@tanstack/react-query";
import { useUserInfo } from "../../context/authContext";
import useDisponibilidadMedicosApi from "./useDisponibilidadMedicosApi";
import { getDisponibilidadMedicos } from "../../services/apiService";

function useDisponibilidadMedicosCacheQuery() {
  const user = useUserInfo();

  const {} = useDisponibilidadMedicosApi();
  const {
    data: disponibilidadMedico,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: () => {
      if (user != null) {
        return getDisponibilidadMedicos(user) || [];
      }else{
         return []
      }
    },
    queryKey: ["disponibilidadMedico"],
    staleTime: Infinity,
  });
  return { disponibilidadMedico, isLoading };
}

export default useDisponibilidadMedicosCacheQuery;
