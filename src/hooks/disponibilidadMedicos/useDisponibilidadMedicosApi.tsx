import { useCallback, useEffect, useState } from "react";
import { useUserInfo } from "../../context/authContext";
import { DeleteDisponibilidadMedico, PutUpdateDisponibilidadMedico, SetCreateDisponibilidadMedico } from "../../services/apiService";
import { IDisponibilidadMedicoUpdateRequest } from "../../types/DisponibilidadMedico/IDisponibilidadMedicoUpdateRequest";
import useToastit from "../useToastit";
import { DisponibilidadMedico } from "../../types/DisponibilidadMedico/DisponibilidadMedico";
import { DisponibilidadMedicoCreate } from "../../types/DisponibilidadMedico/DisponibilidadMedicoCreate";



function useDisponibilidadMedicosApi(){

   const user = useUserInfo();
const [errorDisponibilidadMedico, setErrorDisponibilidadMedico] = useState()


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

     const fetchCreateDisponibilidadMedico = useCallback(
      async (dto : DisponibilidadMedicoCreate) => {
        try {
          if (user == null) return;           
          const response: DisponibilidadMedico = await SetCreateDisponibilidadMedico(
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

    const fetchDeleteDisponibilidadMedico = useCallback(
      async (id : number) => {
        try {
          if (user == null) return;           
          const response: DisponibilidadMedico = await DeleteDisponibilidadMedico(
            user,
            id
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

     return {fetchUpdateDisponibilidadMedico,fetchCreateDisponibilidadMedico,fetchDeleteDisponibilidadMedico}
}

export default useDisponibilidadMedicosApi;