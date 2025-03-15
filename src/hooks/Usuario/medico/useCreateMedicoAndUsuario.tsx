import { useState, useCallback } from "react";
import { successMessagges } from "../../../constants/successMessages";
import { useCreateUserInfoContext } from "../../../context/authContext";
import { fecthCreateUsuarioAndMedico, fecthCreateUsuarioAndPaciente } from "../../../services/apiService";
import { IPacienteUpdate } from "../../../types/Paciente/PacienteUpdate.type";
import { IPersonaUpdate } from "../../../types/Persona/PersonaUpdate.type";
import { Sexo } from "../../../types/Sexo.type";
import { CreateUsuarioAndPacienteRequestDto } from "../../../types/usuario/CreateUsuarioAndPacienteReques";
import { CreateUsuarioRequest } from "../../../types/usuario/CreateUsuarioRequest";
import { handleHttpError } from "../../../utils/errorHandler";
import useToastit from "../../useToastit";
import useCreatePaciente from "../useCreatePaciente";
import useCreateMedico from "./useCreateMedico";
import { CreateUsuarioAndMedicoRequestDto } from "../../../types/usuario/CreateUsuarioAndMedicoRequest.type";
import { IMedicoResponse } from "../../../types/Medico/MedicoResponse.type";
import { MedicoUpdateRequestDTO } from "../../../types/Medico/MedicoUpdateRequest.type";


function useCreateMedicoAndUsuario() {



  let unUsuario: CreateUsuarioRequest = {
    UserName: "",
    Password: "",
    Email: "",
  };
  const {personaInfo,medicoInfo,unMedico,unMedicoCreate,updateMedicoInfo,updatePersonaInfo,setRequiredHooksPaciente} = useCreateMedico();

  let unUsuarioAndMedico: CreateUsuarioAndMedicoRequestDto = {
    Medico: unMedicoCreate,
    Usuario: unUsuario,
  };
  const [toggleCreateModal, setToggleCreateModal] = useState<boolean>(false);
  const [usuarioAndPaciente, setUsuarioAndPaciente] =
    useState<CreateUsuarioAndMedicoRequestDto>(unUsuarioAndMedico);

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

  function handleMedicoInfo(e: MedicoUpdateRequestDTO) {
    updateMedicoInfo(e);
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
  function mergeMedicoAndUsuarioInCreateDto() : CreateUsuarioAndMedicoRequestDto {
    const claves = Object.keys(Sexo).filter((key) => isNaN(Number(key)));
    var getSexoId: number = claves.indexOf(personaInfo?.sexo) + 1; //arranca en 0 los id son 1,2,3
  
    const updatedUsuarioAndPaciente: CreateUsuarioAndMedicoRequestDto = {
      Medico: {
        nombre: personaInfo?.nombre || usuarioAndPaciente.Medico.nombre,
        apellido: personaInfo?.apellido || usuarioAndPaciente.Medico.apellido,
        numeroDocumento: personaInfo?.numeroDocumento ||
          usuarioAndPaciente.Medico.numeroDocumento,
        telefono: personaInfo?.telefono || usuarioAndPaciente.Medico.telefono,
        sexoId: getSexoId,
        fechaNacimiento: personaInfo?.fechaNacimiento ||
          usuarioAndPaciente.Medico.fechaNacimiento,
        NumeroLicencia: medicoInfo?.numeroLicencia || usuarioAndPaciente.Medico.NumeroLicencia,
        EspecialidadId: Number(medicoInfo?.especialidad) || unUsuarioAndMedico.Medico.EspecialidadId
      },
      Usuario: {
        UserName:
          createUserInfo?.UserName || usuarioAndPaciente.Usuario.UserName,
        Password:
          createUserInfo?.Password || usuarioAndPaciente.Usuario.Password,
        Email: createUserInfo?.Email || usuarioAndPaciente.Usuario.Email,
      },
    };
    
    
    const updatedUsuarioAndPaciente2: CreateUsuarioAndMedicoRequestDto = {
      Medico: {
        nombre: 'Juan',
        apellido: 'Perez',
        numeroDocumento: '135436789',
        telefono: '987654321',
        sexoId: 1, // 1: Masculino
        fechaNacimiento: '1990-01-01',
        NumeroLicencia: "1234",
        EspecialidadId: 1
      },
      Usuario: {
        UserName: 'args',
        Password: 'args',
        Email: 'juan.peraasdaargssdaezaz@email.com',
      },
    }; 


    return updatedUsuarioAndPaciente2;
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
    
    /*let validateMsge = validarFormularios();
    if (validateMsge != undefined) {
      error(validateMsge);
      return false;
    }*/
    var usuarioAndMedico = mergeMedicoAndUsuarioInCreateDto();
    var rsta = await createUsuarioAndPaciente(usuarioAndMedico);
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
    async (dto: CreateUsuarioAndMedicoRequestDto) :Promise<string | undefined> => {
      try {
        const response = await fecthCreateUsuarioAndMedico(dto);

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
    updateMedicoInfo,
    medicoInfo,
    handleMedicoInfo,
    handlePersonaUpdate,
    handleCreateUsuarioAndPaciente
  };
}

export default useCreateMedicoAndUsuario;
