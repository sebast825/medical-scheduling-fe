import { useState, useCallback, useEffect } from "react";
import { fecthCreateUsuarioAndPaciente } from "../../services/apiService";
import { ErrorTypeAny } from "../../types/Error.type";
import { CreateUsuarioAndPacienteRequestDto } from "../../types/usuario/CreateUsuarioAndPacienteReques";
import useToastit from "../useToastit";
import PacienteCreateRequest from "../../types/Paciente/PacienteCreateRequest.type copy";
import { CreateUsuarioRequest } from "../../types/usuario/CreateUsuarioRequest";
import {
  useCreateUserInfoContext,
  usePacienteContext,
  usePersonaInfoContext,
} from "../../context/authContext";
import IPacienteResponse from "../../types/Paciente/PacienteResponse.type";
import { IPersonaUpdate } from "../../types/Persona/PersonaUpdate.type";
import { EstadoUsuario } from "../../types/usuario/estadoUsuario";
import { Sexo } from "../../types/Sexo.type";
import { IPacienteUpdate } from "../../types/Paciente/PacienteUpdate.type";
import { successMessagges } from "../../constants/successMessages";
import { handleHttpError } from "../../utils/errorHandler";
import useRedirects from "../useRedicrects";
import useCreatePaciente from "./useCreatePaciente";

function usePacienteAndUsuarioCreate() {



  let unUsuario: CreateUsuarioRequest = {
    UserName: "",
    Password: "",
    Email: "",
  };
  const {pacienteInfo,personaInfo,unPaciente,unPacienteCreate,updatePersonaInfo,updatePacienteInfo,setRequiredHooksPaciente} = useCreatePaciente();

  let unUsuarioAndPaciente: CreateUsuarioAndPacienteRequestDto = {
    Paciente: unPacienteCreate,
    Usuario: unUsuario,
  };
  const [toggleCreateModal, setToggleCreateModal] = useState<boolean>(false);
  const [usuarioAndPaciente, setUsuarioAndPaciente] =
    useState<CreateUsuarioAndPacienteRequestDto>(unUsuarioAndPaciente);

  const { createUserInfo, setCreateUserInfo } = useCreateUserInfoContext();

  const { error, success } = useToastit();

  interface ICheckBoxFrom {
    personaInfo: boolean;
    pacienteInfo: boolean;
    usuarioInfo: boolean;
  }
  const [checkBoxForms, setCheckBoxForms] = useState<ICheckBoxFrom>({
    personaInfo: false,
    pacienteInfo: false,
    usuarioInfo: false,
  });

  function closeCreateModal() {
    setToggleCreateModal(false);
  }
  function showCreateModal() {
    setToggleCreateModal(true);
  }

  function setRequiredContext() {
    setRequiredHooksPaciente()
    setCreateUserInfo(unUsuario);
  }

  function handlePacienteCreate(e: IPacienteUpdate) {
    updatePacienteInfo(e);
    setCheckBoxForms((prevState) => ({
      ...prevState,
      pacienteInfo: true,
    }));
  }
  function handlePersonaUpdate(e: IPersonaUpdate) {
    updatePersonaInfo(e);
    setCheckBoxForms((prevState) => ({
      ...prevState,
      personaInfo: true,
    }));
  }
  function mergePacienteAndUsuarioInCreateDto() : CreateUsuarioAndPacienteRequestDto {
    const claves = Object.keys(Sexo).filter((key) => isNaN(Number(key)));
    var getSexoId: number = claves.indexOf(personaInfo?.sexo) + 1; //arranca en 0 los id son 1,2,3
  
    const updatedUsuarioAndPaciente: CreateUsuarioAndPacienteRequestDto = {
      Paciente: {
        telefonoEmergencia:
          pacienteInfo?.telefonoEmergencia ||
          usuarioAndPaciente.Paciente.telefonoEmergencia,
        nombreEmergencia:
          pacienteInfo?.nombreEmergencia ||
          usuarioAndPaciente.Paciente.nombreEmergencia,
        nombre: personaInfo?.nombre || usuarioAndPaciente.Paciente.nombre,
        apellido: personaInfo?.apellido || usuarioAndPaciente.Paciente.apellido,
        numeroDocumento:
          personaInfo?.numeroDocumento ||
          usuarioAndPaciente.Paciente.numeroDocumento,
        telefono: personaInfo?.telefono || usuarioAndPaciente.Paciente.telefono,
        sexoId: getSexoId,
        fechaNacimiento:
          personaInfo?.fechaNacimiento ||
          usuarioAndPaciente.Paciente.fechaNacimiento,
      },
      Usuario: {
        UserName:
          createUserInfo?.UserName || usuarioAndPaciente.Usuario.UserName,
        Password:
          createUserInfo?.Password || usuarioAndPaciente.Usuario.Password,
        Email: createUserInfo?.Email || usuarioAndPaciente.Usuario.Email,
      },
    };
    
    /*
    const updatedUsuarioAndPaciente2: CreateUsuarioAndPacienteRequestDto = {
      Paciente: {
        telefonoEmergencia: '1122334455',
        nombreEmergencia: 'Maria Lopez',
        nombre: 'Juan',
        apellido: 'Perez',
        numeroDocumento: '123456789',
        telefono: '987654321',
        sexoId: 1, // 1: Masculino
        fechaNacimiento: '1990-01-01',
      },
      Usuario: {
        UserName: 'mabel3235',
        Password: 'mabel',
        Email: 'juan.peraezz@email.com',
      },
    };  */


    return updatedUsuarioAndPaciente;
  }
  function validarFormularios(): string | undefined {
    if (!checkBoxForms.pacienteInfo)
      return "Es necesario completar la informacion del contacto de emergencia.";
    if (!checkBoxForms.personaInfo)
      return "Es necesario completar la informacion de personal.";
    if (!checkBoxForms.usuarioInfo)
      return "Es necesario completar la informacion del usuario.";
  }
  async function handleCreateUsuarioAndPaciente() : Promise<boolean> {
    
    let validateMsge = validarFormularios();
    if (validateMsge != undefined) {
      error(validateMsge);
      return false;
    }
    var usuarioAndPaciente = mergePacienteAndUsuarioInCreateDto();
    var rsta = await createUsuarioAndPaciente(usuarioAndPaciente);
    if(rsta != undefined){
        setTimeout(() => {
          return true;
        }, 100)
        return true;
    }else{
      return false;
    }
  }

  const createUsuarioAndPaciente = useCallback(
    async (dto: CreateUsuarioAndPacienteRequestDto) :Promise<string | undefined> => {
      try {
        const response = await fecthCreateUsuarioAndPaciente(dto);

        success(successMessagges.crearUsuario);
        return response;
      } catch (err: any) {
        console.log(err)
        //.response.data.Message
             error(handleHttpError(err));
          return undefined;
       
      }
    },
    []
  );

  function handleUsuarioUpdate(e: CreateUsuarioRequest) {
    setCreateUserInfo(e);
    setCheckBoxForms((prevState) => ({
      ...prevState,
      usuarioInfo: true,
    }));
  }


  return {
    createUsuarioAndPaciente,
    closeCreateModal,
    showCreateModal,
    toggleCreateModal,
    setRequiredContext,
    createUserInfo,
    handleUsuarioUpdate,
    pacienteInfo,

    handlePacienteCreate,
    handlePersonaUpdate,
    handleCreateUsuarioAndPaciente
  };
}

export default usePacienteAndUsuarioCreate;
