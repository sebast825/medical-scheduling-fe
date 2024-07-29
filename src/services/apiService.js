import api from './api';

// Ejemplo de una solicitud GET
export  const fetchPacientes = async () => {
   try {
     const response = await api.get('/GetAll');
     return response.data;
   } catch (error) {
     console.error('Error fetching pacientes:', error);
     throw error;
   }
 };

 export const fetchLogin = async (loginData) => {
  try {
    const response = await api.post('api/Login', loginData);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// export toggleTypePersonaById(typePersona,id){
  
// }
export const fetchPersonaById = async (loginData) => {
  try {
    const response = await api.post('api/Login', loginData);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};