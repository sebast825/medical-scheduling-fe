import { useCallback, useEffect, useState } from "react";
import { IPersonaUpdate } from "../../types/Persona/PersonaUpdate.type";
import { IPersonaResponse } from "../../types/Persona/PersonaResponse.type";
import { useUserInfo } from "../../context/authContext";
import { IMedicoResponse } from "../../types/MedicoResponse.type";
import { ErrorTypeAny } from "../../types/Error.type";
import { fetchUpdatePaciente, fetchUpdatePersona } from "../../services/apiService";
import useToastit from "../useToastit";
import GetJwtContent from "../../utils/jwtUtils";
import { IPacienteResponse } from "../../types/Paciente/PacienteResponse.type";
import { IPacienteUpdate } from "../../types/Paciente/PacienteUpdate.type";


function usePacientes() {
  const user = useUserInfo();
  const [paciente, setPaciente] = useState<IPacienteResponse>();
  const [errorPaciente, setError] = useState<ErrorTypeAny>(null);

   
  const putPaciente = useCallback(async (dto: IPacienteUpdate, userId : string) => {


    try {
      if (user == null) return;
      const response: IPacienteResponse = await fetchUpdatePaciente(user, dto,userId);

      setPaciente(response);
      console.log(response);
      return response;
    } catch (err: any) {
      console.log(err);
      if (err.response && err.response.status === 401) {
        setError(err.response.data || "Error desconocido");
      } else {
        setError(err.response.data);
      }
    }
  }, []);
  const {error} = useToastit();

  useEffect(()=>{
   if(errorPaciente == null) return
     error(errorPaciente);
  },[errorPaciente])
  
  return{
    putPaciente
  }
}

export default usePacientes;