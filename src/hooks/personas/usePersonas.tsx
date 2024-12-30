import { useCallback, useEffect, useState } from "react";
import { IPersonaUpdate } from "../../types/Persona/PersonaUpdate.type";
import { IPersonaResponse } from "../../types/Persona/PersonaResponse.type";
import {
  usePacienteContext,
  usePersonaInfoContext,
  useUserInfo,
} from "../../context/authContext";
import { IMedicoResponse } from "../../types/Medico/MedicoResponse.type";
import { ErrorTypeAny } from "../../types/Error.type";
import {
  fecthUpdateEstadoUsuarioYPersona,
  fetchUpdatePersona,
} from "../../services/apiService";
import useToastit from "../useToastit";
import GetJwtContent from "../../utils/jwtUtils";
import IPacienteResponse from "../../types/Paciente/PacienteResponse.type";
import { handleHttpError } from "../../utils/errorHandler";

function usePersonas() {
  const user = useUserInfo();
  const [errorPersona, setError] = useState<ErrorTypeAny>(null);
  const { personaInfo } = usePersonaInfoContext();
  const { setPersonaInfo } = usePersonaInfoContext();
  const { error, success } = useToastit();

  const putPersona = useCallback(async (dto: IPersonaUpdate) => {
    if (personaInfo == null) return undefined;

    try {
      if (user == null) return;
      const response: IPersonaResponse = await fetchUpdatePersona(
        user,
        dto,
        personaInfo.id.toString()
      );
      success("Informacion actualizada exitosamente.");
      return response;
    } catch (err: any) {
      error(handleHttpError(err));
    }
  }, []);
  async function handlePersonaUpdate(persona: IPersonaUpdate) {
    var updatedPersona: IPersonaResponse | undefined = await putPersona(
      persona
    );
    if (updatedPersona != null) {
      actualizarPacienteFe(updatedPersona);
    }
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
        success("Estado actualizado exitosamente");

        return response;
      } catch (err: any) {

        error(handleHttpError(err));
      }
    },
    []
  );

  return {
    handlePersonaUpdate,
    updateEstadoPersonaYUsuario,
  };
}

export default usePersonas;
