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
import { IPacienteUpdate } from "../../types/Paciente/PacienteUpdate.type";

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
  function mergePacienteAndUsuarioInCreateDto() {
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

const usuarioAndPacient2 : CreateUsuarioAndPacienteRequestDto = {
  Paciente: {
    telefonoEmergencia: '9876543210',
    nombreEmergencia: 'Ana Rodríguez',
    nombre: 'Luis',
    apellido: 'Martínez',
    numeroDocumento: '1987654321',
    telefono: '1956789012',
    sexoId: 2, // Mujer
    fechaNacimiento: '1985-05-10',
  },
  Usuario: {
    UserName: 'lmartinez',
    Password: 'password123',
    Email: 'lmartinez@example.com',
  },
};
    console.log(usuarioAndPacient2);
    setUsuarioAndPaciente(usuarioAndPacient2);
    createUsuarioAndPaciente(usuarioAndPacient2);
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
    console.log("entra");
    /*
    let validateMsge = validarFormularios();
    if (validateMsge != undefined) {
      error(validateMsge);
      return;
    }*/
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
