import api, { setAuthToken } from "./api";
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
import { RecuperarClaveRequest } from "../types/usuario/RecuperarClaveRequest";
import { NuevaClaveRequest } from "../types/usuario/NuevaClaveRequest";


// Ejemplo de una solicitud GET
export const fetchAllPacientes = async (jwt: string) => {
  setAuthToken(jwt);
  const response = await api.get("/api/pacientes");
  return response.data;
};

export const fetchLogin = async (loginData: ILogin) => {
  setAuthToken("");
  const response = await api.post("api/Login", loginData);
  return response.data;
};

export const fetchPersonaInfo = async (jwt: string, id: string) => {
  setAuthToken(jwt);

  const response = await api.get(`api/personas/${id}`);
  return response.data;
};

export const fetchPacienteInfo = async (jwt: string, id: string) => {
  setAuthToken(jwt);

  const response = await api.get(`api/pacientes/${id}`);
  return response.data;
};

export const fetchMedicos = async () => {
  const response = await api.get(`api/medicos`);
  return response.data;
};

export const fetchTurnosPaciente = async (jwt: string, idPaciente: string) => {
  setAuthToken(jwt);
  const response = await api.get(`api/turnos/pacientes/${idPaciente}`);
  return response.data;
};

export const fetchCancelarTurno = async (jwt: string, idTurno: number) => {
  setAuthToken(jwt);
  const response = await api.patch(`api/turnos/${idTurno}/cancelar`);
  return response.data;
};

export const fetchTurnosDisponiblesByMedico = async (
  jwt: string,
  idMedico: string
) => {
  setAuthToken(jwt);
  const response = await api.get(`api/medicos/${idMedico}/turnos-disponibles`);
  return response.data;
};

export const fetchTurnosDisponiblesByEspecialdiad = async (
  jwt: string,
  especialidad: string
) => {
  setAuthToken(jwt);
  const response = await api.get(
    `api/turnos-disponibles/especialidades`,{
      params : {especialidad : especialidad}
    }

  );
  return response.data;
};
export const fetchCrearTurnos = async (
  jwt: string,
  dto: ITurnoCreateRequestDTO
) => {
  setAuthToken(jwt);
  const response = await api.post(`api/turnos/`, dto);
  return response.data;
};

export const fetchUpdatePersona = async (
  jwt: string,
  dto: IPersonaUpdate,
  id: string
) => {
  setAuthToken(jwt);
  const response = await api.put(`api/personas/${id}`, dto);
  return response.data;
};

export const fetchUpdatePaciente = async (
  jwt: string,
  dto: IPacienteUpdate,
  id: string
) => {
  setAuthToken(jwt);
  const response = await api.put(`api/pacientes/${id}`, dto);
  return response.data;
};

export const getDisponibilidadMedicos = async (jwt: string) => {
  setAuthToken(jwt);
  const response = await api.get(`api/disponibilidad`);
  return response.data;
};

export const fetchPacienteById = async (jwt: string, id: string) => {
  setAuthToken(jwt);
  const response = await api.get(`api/pacientes/${id}`);
  return response.data;
};

export const fetchMedicoInfo = async (jwt: string, id: string) => {
  setAuthToken(jwt);

  const response = await api.get(`api/medicos/${id}`);
  return response.data;
};

export const fetchActualizarEstadoTurno = async (
  jwt: string,
  turnoId: string,
  estadoTurno: string
) => {
  setAuthToken(jwt);

  const response = await api.patch(
    `api/turnos/${turnoId}/estado/${estadoTurno}`
  );
  return response.data;
};

export const fetchFilterTurnosMedicoHoy = async (
  jwt: string,
  fecha: string,
  idDoctor: string
) => {
  setAuthToken(jwt);
  const response = await api.get(`api/medicos/${idDoctor}/turnos`, {
    params: { dateTime: fecha }
  });
  return response.data;
};

export const PutUpdateDisponibilidadMedico = async (
  jwt: string,
  dto: IDisponibilidadMedicoUpdateRequest
) => {
  setAuthToken(jwt);
  const response = await api.put(`api/Disponibilidad`, dto);
  return response.data;
};

export const SetCreateDisponibilidadMedico = async (
  jwt: string,
  dto: DisponibilidadMedicoCreate
) => {
  setAuthToken(jwt);
  const response = await api.post(`api/Disponibilidad`, dto);
  return response.data;
};

export const DeleteDisponibilidadMedico = async (jwt: string, id: number) => {
  setAuthToken(jwt);
  const response = await api.delete(`api/Disponibilidad/${id}`);
  return response.data;
};

export const fecthUpdateEstadoUsuarioYPersona = async (
  jwt: string,
  id: number,
  estado: number
) => {
  setAuthToken(jwt);
  const response = await api.patch(`/api/usuario/${id}/estado/${estado}`);
  return response.data;
};

export const fecthUpdateMedico = async (
  jwt: string,
  id: number,
  dto: MedicoUpdateRequestDTO
) => {
  setAuthToken(jwt);
  const response = await api.put(`/api/medicos/${id}`, dto);
  return response.data;
};

export const fecthGetEspecialidadesMedico = async (jwt: string) => {
  setAuthToken(jwt);
  const response = await api.get(`/api/especialidades`);
  return response.data;
};

export const fecthCreateUsuarioAndPaciente = async (
  dto: CreateUsuarioAndPacienteRequestDto
) => {
  const source = axios.CancelToken.source();

  const response = await api.post(`/api/usuario/paciente`, dto);
  return response.data;
};

export const fecthRecuperarClaveRequest = async (
  email: RecuperarClaveRequest
) => {

    const response = await api.post(
      `/api/usuario/request-update-password`,
      email
    );
    return response.status;

};


export const fecthActualizarClave = async (dto: NuevaClaveRequest) => {
  const response = await api.post(`/api/usuario/update-password`, dto);
  return response.data;
};

export const fetchGetPersonasIncludeInactive = async () => {
  const response = await api.get(`/api/personas`);
  return response.data;
};
