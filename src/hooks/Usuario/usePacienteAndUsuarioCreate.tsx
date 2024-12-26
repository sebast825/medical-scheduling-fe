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
    estadoUsuario: ""
  };
  let unUsuario: CreateUsuarioRequest = {
    UserName: "",
    Password: "",
    Email: "",
  };
  let unPacienteCreate : PacienteCreateRequest = {
    telefonoEmergencia: "",
    nombreEmergencia: "",
  }
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

  function closeCreateModal() {
    setToggleCreateModal(false);
  }
  function showCreateModal() {
    setToggleCreateModal(true);
  }

  function setRequiredContext() {
    setPacienteInfo(unPaciente);
    setPersonaInfo(unPaciente);
    setCreateUserInfo(unUsuario)
    setPacienteCreate(unPacienteCreate)
  }

  function handlePacienteCreate(e :PacienteCreateRequest){
//el modal de paciente usa pacienteResponse y no pacienteCreate, esto permite guardar toda la info
    setPacienteInfo({
      ...personaInfo,
      nombreEmergencia : e.nombreEmergencia,
      telefonoEmergencia : e.telefonoEmergencia
    });
    setPacienteCreate(e)
  }
   function handlePersonaUpdate(e: IPersonaUpdate) {
    setPersonaInfo(
      {
        id:1,
        nombre :  e.nombre,
        apellido : e.apellido,
        numeroDocumento : e.numeroDocumento,
        telefono : e.telefono,
        sexo : Sexo[e.sexoId],
        fechaNacimiento : e.fechaNacimiento,
        estadoUsuario : EstadoUsuario.Activo.toString(),
      }
    )
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
    createUserInfo, setCreateUserInfo ,
    pacienteInfo, setPacienteInfo,
    pacienteCreate, handlePacienteCreate,
    handlePersonaUpdate
  };
}

export default usePacienteAndUsuarioCreate;
