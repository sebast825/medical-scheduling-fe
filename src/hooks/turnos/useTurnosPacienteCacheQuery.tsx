import { useQuery, useQueryClient } from "@tanstack/react-query";
import useGetTurnos from "./useGetTurnos";
import { TurnoResponse } from "../../types/turno/TurnoResponse.type";
import { usePacienteContext } from "../../context/authContext";

function useTurnosPacienteCacheQuery(pacienteInfoId: string | undefined) {
  const { getPacinteTurnos, sortTurnosByDate } = useGetTurnos();
  const queryClient = useQueryClient();

  const {
    data: turnos,
    isFetching,
    refetch,
  } = useQuery<TurnoResponse[] | []>({
    queryFn: () => {
      if (pacienteInfoId != undefined) {
        return getPacinteTurnos(pacienteInfoId);
      } else {
        return [];
      }
    },
    queryKey: ["pacienteTurnos"],
    staleTime: Infinity,
    enabled: pacienteInfoId != undefined,
  });
  const addTurnoCache = (newTurno: TurnoResponse) => {
    queryClient.setQueryData(["pacienteTurnos"], (oldData: TurnoResponse[]) => {
      const updatedData = [...oldData, newTurno];
      return sortTurnosByDate(updatedData);
      
    });
  };
  const handleDeleteCache = (id: number) => {
    queryClient.setQueryData(
      ["pacienteTurnos"],
      (prevTurnos: TurnoResponse[]) => {
        return prevTurnos.filter((elem) => elem.id != id);
      }
    );
  };
  const handleReloadTurnos = () => {
    refetch();
  };
  return {
    turnos,
    isFetching,
    addTurnoCache,
    handleDeleteCache,
    handleReloadTurnos,
  };
}

export default useTurnosPacienteCacheQuery;
