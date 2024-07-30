import api from './api';

// Ejemplo de una solicitud GET
export  const fetchPacientes = async () => {
   try {
     const response = await api.get('/api/paciente');
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

export const fetchPersonaById = async (loginData) => {
  try {
    const response = await api.post('api/Login', loginData);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const fetchInformacionPaciente = async (id, token) => {
  //const decoded = jwt_decode(token);

  try {
    const response = await api.get(`api/paciente/${id}`, {
      headers: {
        Authorization: `Bearer ${token}` // Incluir el token en la cabecera
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};