import { useCallback, useEffect, useState } from "react";
import { IPersonaUpdate } from "../../types/Persona/PersonaUpdate.type";
import { IPersonaResponse } from "../../types/Persona/PersonaResponse.type";
import {
  useMedicoInfoContext,
  usePacienteContext,
  usePersonaInfoContext,
  useUserInfo,
} from "../../context/authContext";
import { IMedicoResponse } from "../../types/Medico/MedicoResponse.type";
import { ErrorTypeAny } from "../../types/Error.type";
import {
  fecthUpdateEstadoUsuarioYPersona,
  fetchGetPersonasIncludeInactive,
  fetchUpdatePersona,
} from "../../services/apiService";
import useToastit from "../useToastit";
import GetJwtContent from "../../utils/jwtUtils";
import IPacienteResponse from "../../types/Paciente/PacienteResponse.type";
import { handleHttpError } from "../../utils/errorHandler";
import { successMessagges } from "../../constants/successMessages";
import { EstadoUsuario } from "../../types/usuario/estadoUsuario";
import useMedicosCacheQuery from "../medicos/useMedicosCacheQuery";
import useIsAdministrador from "../roles/useIsAdministrador";

function usePersonas() {
  const user = useUserInfo();
  const { personaInfo } = usePersonaInfoContext();
  const { setPersonaInfo } = usePersonaInfoContext();
  const { error, success } = useToastit();
  const [personasList, setPersonasList] = useState<
    IPersonaResponse[] | undefined
  >(undefined);


  const putPersona = useCallback(async (dto: IPersonaUpdate) : Promise<IPersonaResponse | undefined> => {
    if (personaInfo == null) return undefined;

    try {
      if (user == null) return undefined;
      const response: IPersonaResponse = await fetchUpdatePersona(
        user,
        dto,
        personaInfo.id.toString()
      );
      success(successMessagges.exito);

      return response;
    } catch (err: any) {
      error(handleHttpError(err));
    }
  }, []);
  async function handlePersonaUpdate(persona: IPersonaUpdate) : Promise<IPersonaResponse | undefined> {
 
    var rsta: IPersonaResponse | undefined = await putPersona(
      persona
    );
    if(rsta){
      actualizarPacienteFe(rsta)
    }
    return rsta; 
  }
  const getAllPersonasIncludeInactive = useCallback(async ()  => {
    try {

      if (user == null) return [];
      const response: IPersonaResponse[] =
        await fetchGetPersonasIncludeInactive();
      setPersonasList(response);

      return response;
    } catch (err: any) {
      error(handleHttpError(err));

      return []
    }
  }, []);
  function RemovePersona(dto: IPersonaResponse) {
    let removePaciente: IPersonaResponse[] | undefined = personasList?.filter(
      (elem) => elem.id != dto.id
    );

    setPersonasList(removePaciente);
  }
  function actualizarPacienteFe(updatedPersona: IPersonaResponse) {
    setPersonaInfo(updatedPersona);
  
  }

  const updateEstadoPersonaYUsuario = useCallback(
    async (id: number, estadoId: number) => {
      try {
        if (user == null) return;
        const response: IPersonaResponse =
          await fecthUpdateEstadoUsuarioYPersona(user, id, estadoId);
        success(successMessagges.actualizarEstado);

        return response;
      } catch (err: any) {
        error(handleHttpError(err));
      }
    },
    []
  );

  return {
    putPersona,
    handlePersonaUpdate,
    updateEstadoPersonaYUsuario,
    RemovePersona,
    getAllPersonasIncludeInactive,
    personasList,
  };
}

export default usePersonas;
