import { useCallback, useEffect, useState } from "react";
import { IPersonaUpdate } from "../../types/Persona/PersonaUpdate.type";
import { IPersonaResponse } from "../../types/Persona/PersonaResponse.type";
import { useUserInfo } from "../../context/authContext";
import { IMedicoResponse } from "../../types/MedicoResponse.type";
import { ErrorTypeAny } from "../../types/Error.type";
import { fetchAllPacientes, fetchPacienteById, fetchUpdatePaciente, fetchUpdatePersona } from "../../services/apiService";
import useToastit from "../useToastit";
import GetJwtContent from "../../utils/jwtUtils";
import { IPacienteUpdate } from "../../types/Paciente/PacienteUpdate.type";
import IPacienteResponse from "../../types/Paciente/PacienteResponse.type";

function usePacientes() {
  const user = useUserInfo();
  const [paciente, setPaciente] = useState<IPacienteResponse>();
  const [pacienteList, setPacientesList] = useState<IPacienteResponse[]>();

  const [errorPaciente, setError] = useState<ErrorTypeAny>(null);

   
  const putPaciente = useCallback(async (dto: IPacienteUpdate, userId : string) => {
    let validarDatos = validarPersona(dto);
    if(validarDatos!= null){
      error(validarDatos)
      return;
    }

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

  
  function validarPersona (dto : IPacienteUpdate){

    if (!dto.NombreEmergencia || dto.NombreEmergencia.length < 2 || dto.NombreEmergencia.length > 150) return "El nombre debe tener entre 2 caracteres y 150 caracteres.";
 
  }

  const getAllPacientes = useCallback(async () => {
    try {
      if (user == null) return;
      const response: IPacienteResponse[] = await fetchAllPacientes(user);

      setPacientesList(response);
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

  const getPacienteById = useCallback(async (id : string) => {
    try {
      if (user == null) return;
      const response: IPacienteResponse = await fetchPacienteById(user,id);

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
    putPaciente,getAllPacientes,pacienteList,getPacienteById
  }
}

export default usePacientes;