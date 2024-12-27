import { createApiInstance } from "./api";
import { ILogin } from "../types/Login.types";
import { ITurnoCreateRequestDTO } from "../types/turno/TurnoCreateRequest.DTO.type";
import { IPersonaUpdate } from "../types/Persona/PersonaUpdate.type";
import { IPacienteUpdate } from "../types/Paciente/PacienteUpdate.type";
import { IDisponibilidadMedicoUpdateRequest } from "../types/DisponibilidadMedico/IDisponibilidadMedicoUpdateRequest";
import { DisponibilidadMedicoCreate } from "../types/DisponibilidadMedico/DisponibilidadMedicoCreate";
import { IMedicoResponse } from "../types/Medico/MedicoResponse.type";
import { MedicoUpdateRequestDTO } from "../types/Medico/MedicoUpdateRequest.type";
import { CreateUsuarioAndPacienteRequestDto } from "../types/usuario/CreateUsuarioAndPacienteReques";
import axios from "axios";

// Ejemplo de una solicitud GET
export const fetchAllPacientes = async (jwt: string) => {
  const api = createApiInstance(jwt);
  const response = await api.get("/api/pacientes");
  return response.data;
};

export const fetchLogin = async (loginData: ILogin) => {
  const api = createApiInstance("");
  const response = await api.post("api/Login", loginData);
  return response.data;
};

export const fetchPersonaInfo = async (jwt: string, id: string) => {
  const api = createApiInstance(jwt);

  const response = await api.get(`api/personas/${id}`);
  return response.data;
};

export const fetchPacienteInfo = async (jwt: string, id: string) => {
  const api = createApiInstance(jwt);

  const response = await api.get(`api/pacientes/${id}`);
  return response.data;
};

export const fetchMedicos = async () => {
  const api = createApiInstance();
  const response = await api.get(`api/medicos`);
  return response.data;
};

export const fetchTurnosPaciente = async (jwt: string, idPaciente: string) => {
  const api = createApiInstance(jwt);
  const response = await api.get(`api/pacientes/${idPaciente}/turnos`);
  return response.data;
};

export const fetchCancelarTurno = async (jwt: string, idTurno: number) => {
  const api = createApiInstance(jwt);
  const response = await api.patch(`api/pacientes/turnos/${idTurno}/cancelar`);
  return response.data;
};

export const fetchTurnosDisponiblesByMedico = async (
  jwt: string,
  idMedico: string
) => {
  const api = createApiInstance(jwt);
  const response = await api.get(`api/medicos/${idMedico}/turnosdisponible`);
  return response.data;
};

export const fetchTurnosDisponiblesByEspecialdiad = async (
  jwt: string,
  especialidad: string
) => {
  const api = createApiInstance(jwt);
  const response = await api.get(
    `api/especialidad/${especialidad}/turnosdisponible`
  );
  return response.data;
};
export const fetchCrearTurnos = async (
  jwt: string,
  dto: ITurnoCreateRequestDTO
) => {
  const api = createApiInstance(jwt);
  const response = await api.post(`api/turnos/`, dto);
  return response.data;
};

export const fetchUpdatePersona = async (
  jwt: string,
  dto: IPersonaUpdate,
  id: string
) => {
  const api = createApiInstance(jwt);
  const response = await api.put(`api/personas/${id}`, dto);
  return response.data;
};

export const fetchUpdatePaciente = async (
  jwt: string,
  dto: IPacienteUpdate,
  id: string
) => {
  const api = createApiInstance(jwt);
  const response = await api.put(`api/pacientes/${id}`, dto);
  return response.data;
};

export const getDisponibilidadMedicos = async (jwt: string) => {
  const api = createApiInstance(jwt);
  const response = await api.get(`api/disponibilidadMedicos/GetAll`);
  return response.data;
};

export const fetchPacienteById = async (jwt: string, id: string) => {
  const api = createApiInstance(jwt);
  const response = await api.get(`api/pacientes/${id}`);
  return response.data;
};

export const fetchMedicoInfo = async (jwt: string, id: string) => {
  const api = createApiInstance(jwt);

  const response = await api.get(`api/medicos/${id}`);
  return response.data;
};

export const fetchTurnosByMedicoId = async (jwt: string, id: string) => {
  const api = createApiInstance(jwt);

  const response = await api.get(`/FilterByDoctor/?id=${id}`);
  return response.data;
};

export const fetchActualizarEstadoTurno = async (
  jwt: string,
  turnoId: string,
  estadoTurno: string
) => {
  const api = createApiInstance(jwt);

  const response = await api.patch(
    `api/pacientes/turnos/${turnoId}/${estadoTurno}`
  );
  return response.data;
};

export const fetchFilterTurnosMedicoHoy = async (
  jwt: string,
  howa:string,
  idDoctor: string
) => {
  const api = createApiInstance(jwt);
  const response = await api.get(
    `/medico/${idDoctor}/turnosHoy/${howa}`
  );
  return response.data;
};




export const PutUpdateDisponibilidadMedico = async (jwt: string, dto : IDisponibilidadMedicoUpdateRequest)=>{
  const api = createApiInstance(jwt);
  const response = await api.put(
    `api/DisponibilidadMedicos`,dto
  );
  return response.data;
}

export const SetCreateDisponibilidadMedico = async (jwt: string, dto : DisponibilidadMedicoCreate)=>{
  const api = createApiInstance(jwt);
  const response = await api.post(
    `api/DisponibilidadMedicos`,dto
  );
  return response.data;
}

export const DeleteDisponibilidadMedico = async (jwt: string, id : number)=>{
  const api = createApiInstance(jwt);
  const response = await api.delete(
    `api/DisponibilidadMedicos/${id}`
  );
  return response.data;
}

export const fecthUpdateEstadoUsuarioYPersona = async (jwt: string, id : number, estado: number)=>{
 
    const api = createApiInstance(jwt);
    const response = await api.patch(
      `/api/usuario/${id}/estado/${estado}`
    );
    return response.data;
 
}

export const fecthUpdateMedico = async (jwt: string, id : number, dto: MedicoUpdateRequestDTO)=>{
 
  const api = createApiInstance(jwt);
  const response = await api.put(
    `/api/medicos/${id}`,dto
  );
  return response.data;

}

export const fecthGetEspecialidadesMedico = async (jwt: string)=>{
 
  const api = createApiInstance(jwt);
  const response = await api.get(
    `/api/medicos/especialidad/getAll`

  );
  return response.data;

}


export const fecthCreateUsuarioAndPaciente = async (dto : CreateUsuarioAndPacienteRequestDto)=>{
  const source = axios.CancelToken.source();

  const api = createApiInstance();
  const response = await api.post(
    `/api/usuario/paciente`, dto

  );
  console.log(response)
  return response.data;

}
