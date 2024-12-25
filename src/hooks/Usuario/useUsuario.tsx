import { useState, useCallback, useEffect } from "react";
import { fecthCreateUsuarioAndPaciente } from "../../services/apiService";
import { ErrorTypeAny } from "../../types/Error.type";
import { CreateUsuarioAndPacienteRequestDto } from "../../types/usuario/CreateUsuarioAndPacienteReques";
import useToastit from "../useToastit";


function useUsuario (){

  const [errorUsuario, SetErrorUsuario] = useState<ErrorTypeAny>(null);

     const createUsuarioAndPaciente = useCallback(async (dto : CreateUsuarioAndPacienteRequestDto) => {
       try {
  
         const response= await fecthCreateUsuarioAndPaciente(dto);   
         
         console.log(response);
         return response;
       } catch (err: any) {
         console.log(err);
         if (err.response && err.response.status === 401) {
           SetErrorUsuario(err.response.data.message || "Error desconocido");
         } else {
           SetErrorUsuario("Error desconocido");
         }
       }
     }, []);

     const {error} = useToastit();
     useEffect(()=>{
      if(errorUsuario == null) return
        error(errorUsuario);
     },[errorUsuario])
     
     return (createUsuarioAndPaciente)

}

export default useUsuario;