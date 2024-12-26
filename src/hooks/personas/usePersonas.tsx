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
    let validarDatos = validarPersona(dto);
    if (validarDatos != null) {
      error(validarDatos);
      return;
    }

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
  function validarPersona(dto: IPersonaUpdate) {
    if (!dto.nombre || dto.nombre.length < 2 || dto.nombre.length > 100)
      return "El nombre debe tener entre 2 caracteres y 100 caracteres.";
    if (!dto.apellido || dto.apellido.length < 2 || dto.nombre.length > 100)
      return "El apellido debe tener entre 2 caracteres y 100 caracteres.";
    if (!/^\d{8,15}$/.test(dto.telefono))
      return "El teléfono debe contener entre 8 y 15 dígitos.";
    if (!dto.sexoId || dto.sexoId < 1 || dto.sexoId > 3)
      return "El sexo no es válido.";
    if (!dto.numeroDocumento || dto.numeroDocumento.length != 8)
      return "El numero de documento es invalido";

    const fechaNac = new Date(dto.fechaNacimiento);
    const fechaActual = new Date();
    if (fechaNac >= fechaActual) {
      return "La fecha de nacimiento debe ser anterior a la fecha actual.";
    }
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
