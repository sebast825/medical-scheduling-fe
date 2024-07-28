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

 