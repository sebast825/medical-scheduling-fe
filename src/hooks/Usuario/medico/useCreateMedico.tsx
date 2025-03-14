import { useState } from "react";
import IPacienteResponse from "../../../types/Paciente/PacienteResponse.type";
import { useMedicoInfoContext, usePacienteContext, usePersonaInfoContext } from "../../../context/authContext";
import PacienteCreateRequest from "../../../types/Paciente/PacienteCreateRequest.type copy";
import { IPacienteUpdate } from "../../../types/Paciente/PacienteUpdate.type";
import { IPersonaUpdate } from "../../../types/Persona/PersonaUpdate.type";
import { Sexo } from "../../../types/Sexo.type";
import { EstadoUsuario } from "../../../types/usuario/estadoUsuario";
import { IMedicoResponse } from "../../../types/Medico/MedicoResponse.type";
import { MedicoUpdateRequestDTO } from "../../../types/Medico/MedicoUpdateRequest.type";
import MedicoCreateRequest from "../../../types/Medico/MedicoCreateRequest.type";


function useCreateMedico() {
  const { medicoInfo, setMedicoInfo } = useMedicoInfoContext();
  const { personaInfo, setPersonaInfo } = usePersonaInfoContext();


  let unMedico: IMedicoResponse = {
      nombre: '',
      apellido: '',
      numeroDocumento: '',
      telefono: '',
      sexo: "", // 1: Masculino
      fechaNacimiento: '',
      numeroLicencia: "",
      especialidad: "",
      id: 0,
      estadoUsuario: ""
    }
    let unMedicoCreate: MedicoCreateRequest = {
      nombre: "",
      apellido: "",
      fechaNacimiento: "",
      telefono: "",
      numeroDocumento: "",
      sexoId: 0,
      NumeroLicencia: "",
      EspecialidadId: 0
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
      especialidad: e.especialidadId,
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
