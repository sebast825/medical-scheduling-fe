import { useEffect } from "react";
import {
  useMedicoInfoContext,
  usePersonaInfoContext,
} from "../../../context/authContext";
import { IPersonaUpdate } from "../../../types/Persona/PersonaUpdate.type";
import { Sexo } from "../../../types/Sexo.type";
import { EstadoUsuario } from "../../../types/usuario/estadoUsuario";
import { IMedicoResponse } from "../../../types/Medico/MedicoResponse.type";
import { MedicoUpdateRequestDTO } from "../../../types/Medico/MedicoUpdateRequest.type";
import MedicoCreateRequest from "../../../types/Medico/MedicoCreateRequest.type";
import useEspecialidades from "../../especialidades/useEspecialidades";

function useCreateMedico() {
  const { medicoInfo, setMedicoInfo } = useMedicoInfoContext();
  const { personaInfo, setPersonaInfo } = usePersonaInfoContext();
  const { getEspecialidadById, getEspecialidadesMedicos } = useEspecialidades();
  useEffect(() => {
    getEspecialidadesMedicos();
  }, []);
  let unMedico: IMedicoResponse = {
    nombre: "asd",
    apellido: "asd",
    numeroDocumento: "12341234",
    telefono: "12341234",
    sexo: "1", // 1: Masculino
    fechaNacimiento: "12/12/2023",
    numeroLicencia: "12341234",
    especialidad: "Cardiología",
    id: 0,
    estadoUsuario: "",
  };
  let unMedicoCreate: MedicoCreateRequest = {
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    telefono: "",
    numeroDocumento: "",
    sexoId: 0,
    NumeroLicencia: "",
    EspecialidadId: 0,
  };
  function setRequiredHooksPaciente() {
    setMedicoInfo(unMedico);
    setPersonaInfo(unMedico);
  }

  function updateMedicoInfo(e: MedicoUpdateRequestDTO) {
    //el modal de paciente usa pacienteResponse y no pacienteCreate, esto permite guardar toda la info
    setMedicoInfo({
      ...personaInfo,
      numeroLicencia: e.numeroLicencia,
      especialidad: getEspecialidadById(e.especialidadId),
    });
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
    personaInfo,
    medicoInfo,
    unMedico,
    unMedicoCreate,
    updatePersonaInfo,
    updateMedicoInfo,
    setRequiredHooksPaciente,
  };
}

export default useCreateMedico;
