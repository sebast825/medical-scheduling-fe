import { useState, useCallback, useEffect } from "react";
import { fecthCreateUsuarioAndPaciente } from "../../services/apiService";
import { ErrorTypeAny } from "../../types/Error.type";
import { CreateUsuarioAndPacienteRequestDto } from "../../types/usuario/CreateUsuarioAndPacienteReques";
import useToastit from "../useToastit";
import { PacienteAndUsuarioCreate } from "../../pages";
import PacienteCreateRequest from "../../types/Paciente/PacienteCreateRequest.type copy";
import { CreateUsuarioRequest } from "../../types/usuario/CreateUsuarioRequest";


function usePacienteAndUsuarioCreate (){

  let unPaciente : PacienteCreateRequest={
    telefonoEmergencia: "",
    nombreEmergencia: "",
    id: 0,
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    telefono: 0,
    numeroDocumento: 0,
    sexoId: 0,
    estadoUsuario: ""
  }
  let unUsuario : CreateUsuarioRequest={
    UserName: "",
    Password: "",
    Email: ""
  }
  let unusuarioAndPacientE : CreateUsuarioAndPacienteRequestDto={
    Paciente: unPaciente,
    Usuario: unUsuario
  }
  const [errorUsuario, SetErrorUsuario] = useState<ErrorTypeAny>(null);
  const [toggleCreateModal, setToggleCreateModal] = useState<boolean>(false);
  const [usuarioAndPaciente, setUsuarioAndPaciente] = useState<CreateUsuarioAndPacienteRequestDto>(unusuarioAndPacientE)



  function closeCreateModal() {
    setToggleCreateModal(false);
  }
  function showCreateModal() {
    setToggleCreateModal(true);
  }


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
     
     return {createUsuarioAndPaciente,closeCreateModal,showCreateModal,toggleCreateModal}

}

export default usePacienteAndUsuarioCreate;