import { useCallback } from "react";
import { successMessagges } from "../../constants/successMessages";
import { useUserInfo } from "../../context/authContext";
import { fecthActualizarClave, fecthRecuperarClaveRequest } from "../../services/apiService";
import { RecuperarClaveRequest } from "../../types/usuario/RecuperarClaveRequest";
import { handleHttpError } from "../../utils/errorHandler";
import useToastit from "../useToastit";
import { NuevaClaveRequest } from "../../types/usuario/NuevaClaveRequest";

function useRecuperarContraseña(){
   
  const user = useUserInfo();
  const {success,error}=useToastit()

  
     const requestRecuperarContraseña = useCallback(async (email : RecuperarClaveRequest ) : Promise<[]> => {
      console.log("llega")
       try {
         const response = await fecthRecuperarClaveRequest(email);
        
         success("Se ha enviado un email a tu correo.");
         return [];
       } catch (err: any) {
         error(handleHttpError(err));
         return [];
       }  
     }, []);

     const enviarNuevaContrsaeña = useCallback(async (dto : NuevaClaveRequest ) : Promise<[]> => {
  
      try {
        const response = await fecthActualizarClave(dto);
        success(successMessagges.recuperarClave);  
        return [];
      } catch (err: any) {
        error(handleHttpError(err));
        return [];
      }  
    }, []);
    return {requestRecuperarContraseña,enviarNuevaContrsaeña}
}

export default useRecuperarContraseña;