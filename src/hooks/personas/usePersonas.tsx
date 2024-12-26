import { useCallback, useEffect, useState } from "react";
import { IPersonaUpdate } from "../../types/Persona/PersonaUpdate.type";
import { IPersonaResponse } from "../../types/Persona/PersonaResponse.type";
import { usePacienteContext, usePersonaInfoContext, useUserInfo } from "../../context/authContext";
import { IMedicoResponse } from "../../types/Medico/MedicoResponse.type";
import { ErrorTypeAny } from "../../types/Error.type";
import {
  fecthUpdateEstadoUsuarioYPersona,
  fetchUpdatePersona,
} from "../../services/apiService";
import useToastit from "../useToastit";
import GetJwtContent from "../../utils/jwtUtils";
import IPacienteResponse from "../../types/Paciente/PacienteResponse.type";

function usePersonas() {
  const user = useUserInfo();
  const [persona, setPersona] = useState<IPersonaResponse>();
  const [errorPersona, setError] = useState<ErrorTypeAny>(null);
  const { personaInfo } = usePersonaInfoContext();
  const { pacienteInfo, setPacienteInfo } = usePacienteContext();
  const { setPersonaInfo } = usePersonaInfoContext();

  const putPersona = useCallback(async (dto: IPersonaUpdate) => {

    if (personaInfo == null) return undefined;
 

    try {
      if (user == null) return;
      const response: IPersonaResponse = await fetchUpdatePersona(
        user,
        dto,
        personaInfo.id.toString()
      );
     
      return response;
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setError(err.response.data || "Error desconocido");
      } else {
        setError(err.response.data);
      }
    }
  }, []);
  async function handlePersonaUpdate(persona: IPersonaUpdate) {
    var updatedPersona: IPersonaResponse | undefined = await putPersona(
      persona
    );
    if (updatedPersona != null) {
      actualizarPacienteFe(updatedPersona)

    }
  }
  
  function  actualizarPacienteFe(updatedPersona: IPersonaResponse) {
    setPacienteInfo((prevInfo: IPacienteResponse | null) => ({
      ...updatedPersona,
      telefonoEmergencia: prevInfo?.telefonoEmergencia ?? "",
      nombreEmergencia: prevInfo?.nombreEmergencia ?? "",
    }));
    setPersonaInfo(updatedPersona);
  }


  const updateEstadoPersonaYUsuario = useCallback(
    async (id: number, estadoId: number) => {
      try {
        if (user == null) return;
        const response: IPersonaResponse =
          await fecthUpdateEstadoUsuarioYPersona(user, id, estadoId);
        //setPersona(response);
        return response;
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
          setError(err.response.data || "Error desconocido");
        } else {
          setError(err.response.data);
        }
      }
    },
    []
  );

  const { error } = useToastit();

  useEffect(() => {
    if (errorPersona == null) return;
    error(errorPersona);
  }, [errorPersona]);

  return {
    handlePersonaUpdate,
    updateEstadoPersonaYUsuario,
  };
}

export default usePersonas;
