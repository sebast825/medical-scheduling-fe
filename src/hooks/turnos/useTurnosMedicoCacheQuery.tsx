import { useQuery, useQueryClient } from "@tanstack/react-query";
import useGetTurnos from "./useGetTurnos";
import { TurnoResponse } from "../../types/turno/TurnoResponse.type";
import { useMedicoInfoContext } from "../../context/authContext";
import { IMedicoResponse } from "../../types/Medico/MedicoResponse.type";
import { useEffect } from "react";

function useTurnosMedicoCacheQuery() {
  const { medicoInfo } = useMedicoInfoContext();
  const { getTurnosHoyMedicoById, sortTurnosByPrioridad,orderTurnosByDate} = useGetTurnos();

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
      return orderTurnosByDate(updatedData);
    });
  };

  const updateTurnoCache = (updatedTurno: TurnoResponse) => {
    queryClient.setQueryData(
      ["medicoTurnos"],
      (prevTurnos: TurnoResponse[]) => {
        let updateTurno = prevTurnos.map((turno) =>
          turno.id === updatedTurno.id ? updatedTurno : turno
        );
        return sortTurnosByPrioridad(updateTurno)
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
