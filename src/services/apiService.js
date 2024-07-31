import {createApiInstance} from './api';
import { useUserContext } from '../context/authContext';
// Ejemplo de una solicitud GET
export  const fetchPacientes = async () => {
   try {
      const api = createApiInstance();
     const response = await api.get('/api/paciente');
     return response.data;
   } catch (error) {
     console.error('Error fetching pacientes:', error);
     throw error;
   }
 };

 export const fetchLogin = async (loginData) => {
  try {
      const api = createApiInstance("");
    const response = await api.post('api/Login', loginData);
    return response.data;
  } catch (error) {
    
    console.error('Error during login:', error);
    throw error;
  }
};


export const fetchPacienteInfo = async (jwt,id) => {
  //const decoded = jwt_decode(token);

  try {
      const api = createApiInstance(jwt);

    const response = await api.get(`api/paciente/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};