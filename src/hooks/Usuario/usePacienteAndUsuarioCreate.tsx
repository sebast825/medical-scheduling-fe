import { useState, useCallback, useEffect } from "react";
import { fecthCreateUsuarioAndPaciente } from "../../services/apiService";
import { ErrorTypeAny } from "../../types/Error.type";
import { CreateUsuarioAndPacienteRequestDto } from "../../types/usuario/CreateUsuarioAndPacienteReques";
import useToastit from "../useToastit";
import { PacienteAndUsuarioCreate } from "../../pages";
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
import { validarPersona } from "../../utils/validarPersona";
import { validarPaciente } from "../../utils/validatePaciente";

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
  };
  let unUsuarioAndPaciente: CreateUsuarioAndPacienteRequestDto = {
    Paciente: unPaciente,
    Usuario: unUsuario,
  };
  const [errorUsuario, SetErrorUsuario] = useState<ErrorTypeAny>(null);
  const [toggleCreateModal, setToggleCreateModal] = useState<boolean>(false);
  const [usuarioAndPaciente, setUsuarioAndPaciente] =
    useState<CreateUsuarioAndPacienteRequestDto>(unUsuarioAndPaciente);

  const { createUserInfo, setCreateUserInfo } = useCreateUserInfoContext();
  const { pacienteInfo, setPacienteInfo } = usePacienteContext();
  const { personaInfo, setPersonaInfo } = usePersonaInfoContext();
  const [pacienteCreate, setPacienteCreate] = useState<PacienteCreateRequest>();

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

  function handlePacienteCreate(e: PacienteCreateRequest) {
    //el modal de paciente usa pacienteResponse y no pacienteCreate, esto permite guardar toda la info
    setPacienteInfo({
      ...personaInfo,
      nombreEmergencia: e.nombreEmergencia,
      telefonoEmergencia: e.telefonoEmergencia,
    });
    setPacienteCreate(e);
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
  function mergePacienteAndUsuarioInCreateDto() {
    const updatedUsuarioAndPaciente: CreateUsuarioAndPacienteRequestDto = {
      Paciente: {
        ...usuarioAndPaciente.Paciente,
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
        sexo: personaInfo?.sexo || usuarioAndPaciente.Paciente.sexo,
        fechaNacimiento:
          personaInfo?.fechaNacimiento ||
          usuarioAndPaciente.Paciente.fechaNacimiento,
        estadoUsuario: EstadoUsuario.Activo.toString(),
      },
      Usuario: {
        UserName:
          createUserInfo?.UserName || usuarioAndPaciente.Usuario.UserName,
        Password:
          createUserInfo?.Password || usuarioAndPaciente.Usuario.Password,
        Email: createUserInfo?.Email || usuarioAndPaciente.Usuario.Email,
      },
    };
    setUsuarioAndPaciente(updatedUsuarioAndPaciente);
  }
  function validarFormularios(): string | undefined {
    if (!checkBoxForms.pacienteInfo)
      return "Es necesario completar la informacion del contacto de emergencia.";
    if (!checkBoxForms.personaInfo)
      return "Es necesario completar la informacion de personal.";
    if (!checkBoxForms.usuarioInfo)
      return "Es necesario completar la informacion del usuario.";
  }
  function handleCreateUsuarioAndPaciente() {
    let validateMsge = validarFormularios();
    if (validateMsge != undefined) {
      error(validateMsge);
      return;
    }
    mergePacienteAndUsuarioInCreateDto();
  }

  const createUsuarioAndPaciente = useCallback(
    async (dto: CreateUsuarioAndPacienteRequestDto) => {
      try {
        const response = await fecthCreateUsuarioAndPaciente(dto);

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

  const { error } = useToastit();
  useEffect(() => {
    if (errorUsuario == null) return;
    error(errorUsuario);
  }, [errorUsuario]);

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
    handleCreateUsuarioAndPaciente,
  };
}

export default usePacienteAndUsuarioCreate;
