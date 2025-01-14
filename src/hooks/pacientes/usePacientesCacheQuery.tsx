import { useQuery, useQueryClient } from "@tanstack/react-query";
import usePacientes from "./usePacientes";
import IPacienteResponse from "../../types/Paciente/PacienteResponse.type";
import { IPersonaResponse } from "../../types/Persona/PersonaResponse.type";

function usePacientesCacheQuery(user: string | null) {
  const { getAllPacientes } = usePacientes();

  const queryClient = useQueryClient();

  const { data: pacienteList, isLoading } = useQuery({
    queryFn: () => {
      if (user) {
        return getAllPacientes(user);
      } else {
        return [];
      }
    },
    queryKey: ["pacienteList", user],
    staleTime: Infinity,
  });
  const updatePacienteCache = (paciente: IPacienteResponse) => {
    queryClient.setQueryData(
      ["pacienteList", user],
      (oldData: IPacienteResponse[]) => {
        var updatedData = oldData.map((elem) => {
          if (elem.id == paciente.id) {
            return paciente;
          } else {
            return elem;
          }
        });
        return updatedData;
      }
    );
  };
  const updatePersonaCache = (paciente: IPersonaResponse) => {
    queryClient.setQueryData(
      ["pacienteList", user],
      (oldData: IPacienteResponse[]) => {
        var updatedData = oldData.map((elem) => {
          if (elem.id == paciente.id) {
            return {
              ...elem,
              ...paciente,
              nombreEmergencia: elem.nombreEmergencia,
              telefonoEmergencia: elem.telefonoEmergencia,
            };
          } else {
            return elem;
          }
        });
        return updatedData;
      }
    );
  };

  return { pacienteList, isLoading, updatePersonaCache,updatePacienteCache };
}
export default usePacientesCacheQuery;
