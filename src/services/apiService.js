import {createApiInstance} from './api';
import { useUserContext } from '../context/authContext';
// Ejemplo de una solicitud GET
export  const fetchPacientes = async () => {
  const api = createApiInstance();
  const response = await api.get('/api/paciente');
  return response.data;
 
 };

 export const fetchLogin = async (loginData) => {
  const api = createApiInstance("");
  const response = await api.post('api/Login', loginData);
  return response.data;
  
};


export const fetchPacienteInfo = async (jwt,id) => {
  const api = createApiInstance(jwt);

  const response = await api.get(`api/paciente/${id}`);
  return response.data;

};

export const fetchMedicos = async (id) => {

  const api = createApiInstance();
  const response = await api.get(`api/medico`);
  return response.data;
 
};