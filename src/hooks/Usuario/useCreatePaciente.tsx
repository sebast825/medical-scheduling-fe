import { useState } from "react";
import {
  usePacienteContext,
  usePersonaInfoContext,
} from "../../context/authContext";
import PacienteCreateRequest from "../../types/Paciente/PacienteCreateRequest.type copy";
import IPacienteResponse from "../../types/Paciente/PacienteResponse.type";
import { IPacienteUpdate } from "../../types/Paciente/PacienteUpdate.type";
import { IPersonaUpdate } from "../../types/Persona/PersonaUpdate.type";
import { Sexo } from "../../types/Sexo.type";
import { EstadoUsuario } from "../../types/usuario/estadoUsuario";

function useCreatePaciente() {
  const { pacienteInfo, setPacienteInfo } = usePacienteContext();
  const { personaInfo, setPersonaInfo } = usePersonaInfoContext();


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

  function setRequiredHooksPaciente() {
    setPacienteInfo(unPaciente);
    setPersonaInfo(unPaciente);
  }

  function updatePacienteInfo(e: IPacienteUpdate) {
    //el modal de paciente usa pacienteResponse y no pacienteCreate, esto permite guardar toda la info
    setPacienteInfo({
      ...personaInfo,
      nombreEmergencia: e.NombreEmergencia,
      telefonoEmergencia: e.TelefonoEmergencia,
    });
  }
  function updatePersonaInfo(e: IPersonaUpdate) {
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
  }
  return {
    personaInfo,
    pacienteInfo,
    unPaciente,
    unPacienteCreate,
    updatePersonaInfo,
    updatePacienteInfo,
    setRequiredHooksPaciente,
  };
}

export default useCreatePaciente;
