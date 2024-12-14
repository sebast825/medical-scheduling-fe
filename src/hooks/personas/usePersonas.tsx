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


    try {
      if (user == null) return;
      const response: IPersonaResponse = await fetchUpdatePersona(user, dto,userId);

      setPersona(response);

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
   if(errorPersona == null) return
     error(errorPersona);
  },[errorPersona])
  
  return{
   putPersona
  }
}

export default usePersonas;