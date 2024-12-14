import { useCallback, useEffect, useState } from "react";
import { IPersonaUpdate } from "../../types/Persona/PersonaUpdate.type";
import { IPersonaResponse } from "../../types/Persona/PersonaResponse.type";
import { useUserInfo } from "../../context/authContext";
import { IMedicoResponse } from "../../types/MedicoResponse.type";
import { ErrorTypeAny } from "../../types/Error.type";
import { fetchUpdatePersona } from "../../services/apiService";
import useToastit from "../useToastit";
import GetJwtContent from "../../utils/jwtUtils";

function usePersonas() {
  const user = useUserInfo();
  const [persona, setPersona] = useState<IPersonaResponse>();
  const [errorPersona, setError] = useState<ErrorTypeAny>(null);

   
  const putPersona = useCallback(async (dto: IPersonaUpdate,userId : string) => {
    let validarDatos = validarPersona(dto);
    if(validarDatos!= null){
      error(validarDatos)
      return;
    }

    try {
      if (user == null) return;
      const response: IPersonaResponse = await fetchUpdatePersona(user, dto,userId);
      setPersona(response);
      return response;

    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setError(err.response.data || "Error desconocido");
      } else {
        setError(err.response.data);
      }
    }
  }, []);

  function validarPersona (dto : IPersonaUpdate){

    if (!dto.nombre || dto.nombre.length < 2 || dto.nombre.length > 100) return "El nombre debe tener entre 2 caracteres y 100 caracteres.";
    if (!dto.apellido || dto.apellido.length < 2 || dto.nombre.length > 100) return "El apellido debe tener entre 2 caracteres y 100 caracteres.";
    if (!/^\d{8,15}$/.test(dto.telefono)) return "El teléfono debe contener entre 8 y 15 dígitos.";
    if (!dto.sexoId || dto.sexoId < 1 || dto.sexoId > 3) return "El sexo no es válido.";
    if(!dto.numeroDocumento || dto.numeroDocumento.length != 8) return "El numero de documento es invalido"

    const fechaNac = new Date(dto.fechaNacimiento); 
    const fechaActual = new Date(); 
    if (fechaNac >= fechaActual) {
      return "La fecha de nacimiento debe ser anterior a la fecha actual.";
    }
  }

  const {error} = useToastit();

  useEffect(()=>{
   if(errorPersona == null) return
     error(errorPersona);
  },[errorPersona])
  
  return{
   putPersona
  }
}

export default usePersonas;