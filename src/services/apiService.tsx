import {createApiInstance} from './api';
import { ILogin } from '../types/Login.types';
import { ITurnoCreateRequestDTO } from '../types/turno/TurnoCreateRequest.DTO.type';
import { IPersonaUpdate } from '../types/Persona/PersonaUpdate.type';
import { IPacienteUpdate } from '../types/Paciente/PacienteUpdate.type';


// Ejemplo de una solicitud GET
export  const fetchAllPacientes = async (jwt : string) => {
  const api = createApiInstance(jwt);
  const response = await api.get('/api/pacientes');
  return response.data;
 
 };

 export const fetchLogin = async (loginData : ILogin) => {
  const api = createApiInstance("");
  const response = await api.post('api/Login', loginData);
  return response.data;
  
};

export const fetchPersonaInfo = async (jwt : string,id : string) => {
  const api = createApiInstance(jwt);

  const response = await api.get(`api/personas/${id}`);
  return response.data;

};

export const fetchPacienteInfo = async (jwt : string,id : string) => {
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

export const fetchCancelarTurno = async (jwt: string, idTurno : number, idPaciente : string ) => {

  const api = createApiInstance(jwt);
  const response = await api.patch(`api/pacientes/${idPaciente}/turnos/${idTurno}/cancelar`);
  return response.data;
 
};

export const fetchTurnosDisponiblesByMedico = async (jwt: string, idMedico : string ) => {
  
  const api = createApiInstance(jwt);
  const response = await api.get(`api/medicos/${idMedico}/turnosdisponible`);
  return response.data;
 
};

export const fetchTurnosDisponiblesByEspecialdiad = async (jwt: string, especialidad : string ) => {
  
  const api = createApiInstance(jwt);
  const response = await api.get(`api/especialidad/${especialidad}/turnosdisponible`);
  return response.data;
 
};
export const fetchCrearTurnos = async (jwt: string,  dto  : ITurnoCreateRequestDTO) => {
  const api = createApiInstance(jwt);
  const response = await api.post(`api/turnos/`,dto);
  return response.data;
 
};

export const fetchUpdatePersona = async (jwt: string,  dto  : IPersonaUpdate, id : string) => {
 
  const api = createApiInstance(jwt);
  const response = await api.put(`api/personas/${id}`,dto);
  return response.data;
 
};

export const fetchUpdatePaciente = async (jwt: string,  dto  : IPacienteUpdate, id : string) => {
 
  const api = createApiInstance(jwt);
  const response = await api.put(`api/pacientes/${id}`,dto);
  return response.data;
 
};

