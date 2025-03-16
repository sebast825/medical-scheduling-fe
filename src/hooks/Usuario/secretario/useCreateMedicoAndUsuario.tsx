import { useState, useCallback } from "react";
import { successMessagges } from "../../../constants/successMessages";
import {
  useCreateUserInfoContext,
} from "../../../context/authContext";
import {  fecthCreateUsuarioAndSecretario } from "../../../services/apiService";
import { IPersonaUpdate } from "../../../types/Persona/PersonaUpdate.type";
import { Sexo } from "../../../types/Sexo.type";
import { CreateUsuarioRequest } from "../../../types/usuario/CreateUsuarioRequest";
import { handleHttpError } from "../../../utils/errorHandler";
import useToastit from "../../useToastit";

import useCreatePersona from "../Persona/useCreatePersona";
import { CreateUsuarioAndSecretarioRequestDto } from "../../../types/usuario/CreateUsuarioAndSecretario.type";

function useCreateSecretarioAndUsuario() {
  let unUsuario: CreateUsuarioRequest = {
    UserName: "",
    Password: "",
    Email: "",
  };

  const { personaInfo, updatePersonaInfo, setRequiredHookPersona } =
    useCreatePersona();
  let unUsuarioAndSecretario: CreateUsuarioAndSecretarioRequestDto = {
    Secretario: personaInfo,
    Usuario: unUsuario,
  };
  const [toggleCreateModal, setToggleCreateModal] = useState<boolean>(false);
  const [usuarioAndSecretario, setUsuarioAndSecretario] =
    useState<CreateUsuarioAndSecretarioRequestDto>(unUsuarioAndSecretario);

  const { createUserInfo, setCreateUserInfo } = useCreateUserInfoContext();

  const { error, success } = useToastit();

  interface ICheckBoxFrom {
    personaInfo: boolean;
    usuarioInfo: boolean;
  }
  const [checkBoxForms, setCheckBoxForms] = useState<ICheckBoxFrom>({
    personaInfo: false,
    usuarioInfo: false,
  });

  function closeCreateModal() {
    setToggleCreateModal(false);
  }
  function showCreateModal() {
    setToggleCreateModal(true);
  }

  function setRequiredContext() {
    setRequiredHookPersona();
    setCreateUserInfo(unUsuario);
  }

  function handlePersonaUpdate(e: IPersonaUpdate) {
    updatePersonaInfo(e);
    setCheckBoxForms((prevState) => ({
      ...prevState,
      personaInfo: true,
    }));
  }
  function mergeSecretarioAndUsuarioInCreateDto(): CreateUsuarioAndSecretarioRequestDto {
    const claves = Object.keys(Sexo).filter((key) => isNaN(Number(key)));
    var getSexoId: number = claves.indexOf(personaInfo?.sexo) + 1; //arranca en 0 los id son 1,2,3
    
    const updatedusuarioAndSecretario: CreateUsuarioAndSecretarioRequestDto = {
      Secretario: {
        nombre: personaInfo?.nombre || usuarioAndSecretario.Secretario.nombre,
        apellido: personaInfo?.apellido || usuarioAndSecretario.Secretario.apellido,
        numeroDocumento:
          personaInfo?.numeroDocumento ||
          usuarioAndSecretario.Secretario.numeroDocumento,
        telefono: personaInfo?.telefono || usuarioAndSecretario.Secretario.telefono,
        sexoId: getSexoId,
        fechaNacimiento:
          personaInfo?.fechaNacimiento ||
          usuarioAndSecretario.Secretario.fechaNacimiento
       
      },
      Usuario: {
        UserName:
          createUserInfo?.UserName || usuarioAndSecretario.Usuario.UserName,
        Password:
          createUserInfo?.Password || usuarioAndSecretario.Usuario.Password,
        Email: createUserInfo?.Email || usuarioAndSecretario.Usuario.Email,
      },
    };

    const updatedusuarioAndSecretario2: CreateUsuarioAndSecretarioRequestDto = {
      Secretario: {
        nombre: "Juan",
        apellido: "Perez",
        numeroDocumento: "335436789",
        telefono: "987654321",
        sexoId: 1, // 1: Masculino
        fechaNacimiento: "1990-01-01",
      },
      Usuario: {
        UserName: "seasdc",
        Password: "seasdc",
        Email: "seasdc.peraasdaargssdaezaz@email.com",
      },
    };

    return updatedusuarioAndSecretario2;
  }
  function validarFormularios(): string | undefined {
    if (!checkBoxForms.personaInfo)
      return "Es necesario completar la informacion de personal.";
    if (!checkBoxForms.usuarioInfo)
      return "Es necesario completar la informacion del usuario.";
  }
  async function handlecreateUsuarioAndSecretario(): Promise<boolean> {
   /* let validateMsge = validarFormularios();
    if (validateMsge != undefined) {
      error(validateMsge);
      return false;
    }*/
    var usuarioAndSecretario = mergeSecretarioAndUsuarioInCreateDto();
    var rsta = await createUsuarioAndSecretario(usuarioAndSecretario);
    if (rsta != undefined) {
      setTimeout(() => {
        return true;
      }, 100);
      return true;
    } else {
      return false;
    }
  }

  const createUsuarioAndSecretario = useCallback(
    async (
      dto: CreateUsuarioAndSecretarioRequestDto
    ): Promise<string | undefined> => {
      try {
        const response = await fecthCreateUsuarioAndSecretario(dto);

        success(successMessagges.crearUsuario);
        return response;
      } catch (err: any) {
        console.log(err);
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
    createUsuarioAndSecretario,
    closeCreateModal,
    showCreateModal,
    toggleCreateModal,
    setRequiredContext,
    createUserInfo,
    handleUsuarioUpdate,
    handlePersonaUpdate,
    handlecreateUsuarioAndSecretario,
  };
}

export default useCreateSecretarioAndUsuario;
