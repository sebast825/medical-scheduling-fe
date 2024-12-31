import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserInfo } from "../../context/authContext";
import useDisponibilidadMedicosApi from "./useDisponibilidadMedicosApi";
import { getDisponibilidadMedicos } from "../../services/apiService";
import { DisponibilidadMedico } from "../../types/DisponibilidadMedico/DisponibilidadMedico";

function useDisponibilidadMedicosCacheQuery() {
  const user = useUserInfo();
  const queryClient = useQueryClient();

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
    const addTurnoCache = (disponibilidad: DisponibilidadMedico) => {
     queryClient.setQueryData(["disponibilidadMedico"], (oldData: DisponibilidadMedico[]) => {
       const updatedData  = [...oldData, disponibilidad];
         return updatedData;
     });
   };
  const handleDeleteCache = (id: number) => {
    queryClient.setQueryData(["disponibilidadMedico"], (oldData : DisponibilidadMedico[]) => {
      return oldData.filter(item => item.id !== id);
    });
  };

  const handleReloadDisponibilidadMedicos = () => {
    refetch(); 
  };
  return { disponibilidadMedico, isLoading ,handleReloadDisponibilidadMedicos};
}

export default useDisponibilidadMedicosCacheQuery;
