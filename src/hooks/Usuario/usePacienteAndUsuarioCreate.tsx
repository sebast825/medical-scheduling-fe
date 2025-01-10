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

function usePacienteAndUsuarioCreate() {


  let unPaciente: IPacienteResponse = {
    telefonoEmergencia: "",
    nombreEmergencia: "",
    id: 0,
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    telefono: "",
    numeroDocumento: "",
    sexo: "",
    estadoUsuario: "",
  };
  let unUsuario: CreateUsuarioRequest = {
    UserName: "",
    Password: "",
    Email: "",
  };
  let unPacienteCreate: PacienteCreateRequest = {
    telefonoEmergencia: "",
    nombreEmergencia: "",
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    telefono: "",
    numeroDocumento: "",
    sexoId: 0,
  };
  let unUsuarioAndPaciente: CreateUsuarioAndPacienteRequestDto = {
    Paciente: unPacienteCreate,
    Usuario: unUsuario,
  };
  const [toggleCreateModal, setToggleCreateModal] = useState<boolean>(false);
  const [usuarioAndPaciente, setUsuarioAndPaciente] =
    useState<CreateUsuarioAndPacienteRequestDto>(unUsuarioAndPaciente);

  const { createUserInfo, setCreateUserInfo } = useCreateUserInfoContext();
  const { pacienteInfo, setPacienteInfo } = usePacienteContext();
  const { personaInfo, setPersonaInfo } = usePersonaInfoContext();
  const [pacienteCreate, setPacienteCreate] = useState<PacienteCreateRequest>();
  const {redirectToLogin}= useRedirects()
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
    setPacienteInfo(unPaciente);
    setPersonaInfo(unPaciente);
    setCreateUserInfo(unUsuario);
    setPacienteCreate(unPacienteCreate);
  }

  function handlePacienteCreate(e: IPacienteUpdate) {
    //el modal de paciente usa pacienteResponse y no pacienteCreate, esto permite guardar toda la info
    setPacienteInfo({
      ...personaInfo,
      nombreEmergencia: e.NombreEmergencia,
      telefonoEmergencia: e.TelefonoEmergencia,
    });
    //setPacienteCreate();
    setCheckBoxForms((prevState) => ({
      ...prevState,
      pacienteInfo: true,
    }));
  }
  function handlePersonaUpdate(e: IPersonaUpdate) {
    console.log(e, Sexo[e.sexoId - 1]);
    setPersonaInfo({
      id: 1,
      nombre: e.nombre,
      apellido: e.apellido,
      numeroDocumento: e.numeroDocumento,
      telefono: e.telefono,
      sexo: Sexo[e.sexoId - 1],
      fechaNacimiento: e.fechaNacimiento,
      estadoUsuario: EstadoUsuario.Activo.toString(),
    });
    setCheckBoxForms((prevState) => ({
      ...prevState,
      personaInfo: true,
    }));
  }
  function mergePacienteAndUsuarioInCreateDto() : CreateUsuarioAndPacienteRequestDto {
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
        sexoId: personaInfo?.sexo + 1,
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
        UserName: 'mabel32',
        Password: 'mabel',
        Email: 'juan.perez@email.com',
      },
    };
    
//console.log(updatedUsuarioAndPaciente2)
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
  async function handleCreateUsuarioAndPaciente() {
    /*
    let validateMsge = validarFormularios();
    if (validateMsge != undefined) {
      error(validateMsge);
      return;
    }*/
    var usuarioAndPaciente = mergePacienteAndUsuarioInCreateDto();
    var rsta = await createUsuarioAndPaciente(usuarioAndPaciente);
    if(rsta != undefined){
        setTimeout(() => {
          redirectToLogin();
        }, 100);
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
    setPacienteInfo,
    pacienteCreate,
    handlePacienteCreate,
    handlePersonaUpdate,
    handleCreateUsuarioAndPaciente
  };
}

export default usePacienteAndUsuarioCreate;
