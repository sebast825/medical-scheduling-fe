import { useCallback, useEffect, useState } from "react";
import { useUserInfo } from "../../context/authContext";
import { UpdateDisponibilidadMedico } from "../../services/apiService";
import { IDisponibilidadMedicoUpdateRequest } from "../../types/DisponibilidadMedico/IDisponibilidadMedicoUpdateRequest";
import useToastit from "../useToastit";
import { DisponibilidadMedico } from "../../types/DisponibilidadMedico/DisponibilidadMedico";



function useDisponibilidadMedicos(){

   const user = useUserInfo();
const [errorDisponibilidadMedico, setErrorDisponibilidadMedico] = useState()


   const UpdateDisponibilidadMedico2 = useCallback(
       async (dto : IDisponibilidadMedicoUpdateRequest) => {
         try {
           if (user == null) return;
   
           
           const response: DisponibilidadMedico = await UpdateDisponibilidadMedico(
             user,
             dto
           );
           
          
           return response;
         } catch (err: any) {
           console.log(err);
           if (err.response && err.response.status === 401) {
            setErrorDisponibilidadMedico(err.response.data || "Error desconocido");
           } else {
            setErrorDisponibilidadMedico(err.response.data);
           }
         }
       },
       [user]
     );

     const { error } = useToastit();
     useEffect(() => {
       if (errorDisponibilidadMedico == null) return;
       error(errorDisponibilidadMedico);
     }, [errorDisponibilidadMedico]);

     return {UpdateDisponibilidadMedico2}
}

export default useDisponibilidadMedicos;