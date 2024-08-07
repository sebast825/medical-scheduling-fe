import {createApiInstance} from './api';
import { useUserContext } from '../context/authContext';
import { ILogin } from '../types/Login.types';


// Ejemplo de una solicitud GET
export  const fetchPacientes = async () => {
  const api = createApiInstance();
  const response = await api.get('/api/paciente');
  return response.data;
 
 };

 export const fetchLogin = async (loginData : ILogin) => {
  const api = createApiInstance("");
  const response = await api.post('api/Login', loginData);
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