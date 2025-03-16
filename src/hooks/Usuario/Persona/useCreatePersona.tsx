import { usePersonaInfoContext } from "../../../context/authContext";
import { IPersonaResponse } from "../../../types/Persona/PersonaResponse.type";
import { IPersonaUpdate } from "../../../types/Persona/PersonaUpdate.type";
import { Sexo } from "../../../types/Sexo.type";
import { EstadoUsuario } from "../../../types/usuario/estadoUsuario";

function useCreatePersona() {
  const { personaInfo, setPersonaInfo } = usePersonaInfoContext();

  let unaPersona: IPersonaResponse = {
    nombre: "",
    apellido: "",
    numeroDocumento: "",
    telefono: "",
    sexo: "", // 1: Masculino
    fechaNacimiento: "",
    id: 0,
    estadoUsuario: "",
  };

  function setRequiredHookPersona() {
    setPersonaInfo(unaPersona);
  }
  function updatePersonaInfo(e: IPersonaUpdate) {
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
  }
  return {
    updatePersonaInfo,
    personaInfo,
    setRequiredHookPersona
  };
}

export default useCreatePersona;
