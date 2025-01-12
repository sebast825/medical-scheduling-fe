import { useCallback, useState } from "react";
import { IPersonaResponse } from "../../types/Persona/PersonaResponse.type";
import { useUserInfo } from "../../context/authContext";
import {
  fetchAllPacientes,
  fetchPacienteById,
  fetchUpdatePaciente,
} from "../../services/apiService";
import useToastit from "../useToastit";
import { IPacienteUpdate } from "../../types/Paciente/PacienteUpdate.type";
import IPacienteResponse from "../../types/Paciente/PacienteResponse.type";
import { EstadoUsuario } from "../../types/usuario/estadoUsuario";
import { handleHttpError } from "../../utils/errorHandler";
import useIsPaciente from "../roles/useIsPaciente";

function usePacientes() {
  const user = useUserInfo();
  const [pacienteList, setPacientesList] = useState<IPacienteResponse[]>();

  const { error, success } = useToastit();

  const putPaciente = useCallback(
    async (dto: IPacienteUpdate, userId: string) => {
      let validarDatos = validarPersona(dto);
      if (validarDatos != null) {
        error(validarDatos);
        return;
      }

      try {
        if (user == null) return;
        const response: IPacienteResponse = await fetchUpdatePaciente(
          user,
          dto,
          userId
        );
        success("Informacion actualizada exitosamente.");
        return response;
      } catch (err: any) {
        error(handleHttpError(err));
      
      }
    },
    []
  );

  function validarPersona(dto: IPacienteUpdate) {
    if (!/^\d{8,15}$/.test(dto.TelefonoEmergencia))
      return "El teléfono debe contener entre 8 y 15 dígitos.";
    if (
      !dto.NombreEmergencia ||
      dto.NombreEmergencia.length < 2 ||
      dto.NombreEmergencia.length > 150
    )
      return "El nombre debe tener entre 2 caracteres y 150 caracteres.";
  }

  const getAllPacientes = useCallback(async (user :string) : Promise<IPacienteResponse[]|[]> => {
  
    try {
      if (user == null) return [];
      const response: IPacienteResponse[] = await fetchAllPacientes(user);
      setPacientesList(response);
      return response;
    } catch (err: any) {
      error(handleHttpError(err));
      return []

    }
  }, []);

  const getPacienteById = useCallback(async (id: string) => {
    try {
      if (user == null) return;
      const response: IPacienteResponse = await fetchPacienteById(user, id);
      return response;
    } catch (err: any) {
      error(handleHttpError(err));

    }
  }, []);

  function RemovePacienteNotActive(dto: IPersonaResponse) {

    if (dto.estadoUsuario != EstadoUsuario[EstadoUsuario.Eliminado]) return;
    let removePaciente: IPacienteResponse[] | undefined = pacienteList?.filter(
      (elem) => elem.id != dto.id
    );
    setPacientesList(removePaciente);
  }



  return {
    putPaciente,
    getAllPacientes,
    pacienteList,
    getPacienteById,
    RemovePacienteNotActive
  };
}

export default usePacientes;
