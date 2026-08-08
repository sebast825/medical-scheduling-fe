import { useQuery, useQueryClient } from "@tanstack/react-query";
import useGetTurnos from "./useGetTurnos";
import { TurnoResponse } from "../../types/turno/TurnoResponse.type";
import { useMedicoInfoContext } from "../../context/authContext";
import { sortTurnosByPriority } from "./utils";

function useTurnosMedicoCacheQuery() {
  const { medicoInfo } = useMedicoInfoContext();
  const { getTurnosHoyMedicoById,sortTurnosByDate} = useGetTurnos();

  const queryClient = useQueryClient();

  const {
    data: turnos,
    isFetching,
    refetch,
  } = useQuery({
    queryFn: () => getTurnosHoyMedicoById(medicoInfo!.id.toString()),
    queryKey: ["medicoTurnos"],
    enabled: !!medicoInfo, // ✅ Solo se ejecuta si medicoInfo no es null
    staleTime: Infinity,
  });
  const addTurnoCache = (newTurno: TurnoResponse) => {
    queryClient.setQueryData(["medicoTurnos"], (oldData: TurnoResponse[]) => {
      const updatedData = [...oldData, newTurno];
      return sortTurnosByDate(updatedData);
    });
  };

  const updateTurnoCache = (updatedTurno: TurnoResponse) => {
    queryClient.setQueryData(
      ["medicoTurnos"],
      (prevTurnos: TurnoResponse[]) => {
        let updateTurno = prevTurnos.map((turno) =>
          turno.id === updatedTurno.id ? updatedTurno : turno
        );
        return sortTurnosByPriority(updateTurno)
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
    handleReloadTurnos,
    updateTurnoCache,
  };
}

export default useTurnosMedicoCacheQuery;
