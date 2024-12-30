import { useCallback, useEffect, useState } from "react";
import { useUserInfo } from "../../context/authContext";
import { DeleteDisponibilidadMedico, PutUpdateDisponibilidadMedico, SetCreateDisponibilidadMedico } from "../../services/apiService";
import { IDisponibilidadMedicoUpdateRequest } from "../../types/DisponibilidadMedico/IDisponibilidadMedicoUpdateRequest";
import useToastit from "../useToastit";
import { DisponibilidadMedico } from "../../types/DisponibilidadMedico/DisponibilidadMedico";
import { DisponibilidadMedicoCreate } from "../../types/DisponibilidadMedico/DisponibilidadMedicoCreate";
import { handleHttpError } from "../../utils/errorHandler";
import { successMessagges } from "../../constants/successMessages";



function useDisponibilidadMedicosApi(){

   const user = useUserInfo();
   const { error, success } = useToastit();


   const fetchUpdateDisponibilidadMedico = useCallback(
       async (dto : IDisponibilidadMedicoUpdateRequest) => {
         try {
           if (user == null) return;           
           const response: DisponibilidadMedico = await PutUpdateDisponibilidadMedico(
             user,
             dto
           );                 
           return response;

         } catch (err: any) {
                error(handleHttpError(err));
        
         }
       },
       [user]
     );

     const fetchCreateDisponibilidadMedico = useCallback(
      async (dto : DisponibilidadMedicoCreate) => {
        try {
          if (user == null) return;           
          const response: DisponibilidadMedico = await SetCreateDisponibilidadMedico(
            user,
            dto
          );               
          success(successMessagges.agregarHorario);  
          return response;

        } catch (err: any) {
          error(handleHttpError(err));

        }
      },
      [user]
    );

    const fetchDeleteDisponibilidadMedico = useCallback(
      async (id : number) => {
        try {
          if (user == null) return;           
          const response: DisponibilidadMedico = await DeleteDisponibilidadMedico(
            user,
            id
          );            
          success(successMessagges.exito)     
          return response;

        } catch (err: any) {
          error(handleHttpError(err));

        }
      },
      [user]
    );


     return {fetchUpdateDisponibilidadMedico,fetchCreateDisponibilidadMedico,fetchDeleteDisponibilidadMedico}
}

export default useDisponibilidadMedicosApi;