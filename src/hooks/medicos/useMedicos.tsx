import { useCallback, useEffect, useState } from "react";
import { useUserContext, useUserInfo } from "../../context/authContext";
import { fetchTurnosByMedicoId } from "../../services/apiService";
import { TurnoResponse } from "../../types/turno/TurnoResponse.type";
import useToastit from "../useToastit";
import { ErrorTypeAny } from "../../types/Error.type";


function useMedicos (){

   const user = useUserInfo()

   const [turnosMedicos, setturnosMedicos] = useState<TurnoResponse[]>();
  const [errorturnosMedicos, setErrorturnosMedicos] = useState<ErrorTypeAny>(null);


   const getTurnosById = useCallback(async (userId : string) => {
 
      
      try {
        if (user == null) return;
        const response: TurnoResponse[] = await fetchTurnosByMedicoId(user,userId);
  
        setturnosMedicos(response)
        console.log(response);
        return response;
      } catch (err: any) {
        console.log(err);
        if (err.response && err.response.status === 401) {
          setErrorturnosMedicos(err.response.data || "Error desconocido");
        } else {
          setErrorturnosMedicos(err.response.data);
        }
      }
    }, [user]);
  
    const {error} = useToastit();

    useEffect(()=>{
     if(errorturnosMedicos == null) return
       error(errorturnosMedicos);
    },[errorturnosMedicos])
    
    return {getTurnosById,turnosMedicos}
}

export default useMedicos;