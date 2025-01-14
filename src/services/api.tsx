import axios from 'axios';

const api = axios.create({
  baseURL: 'http://www.sistematurnosapi.somee.com/', 
 //baseURL: 'https://localhost:7284/',
 headers: {
    'Content-Type': 'application/json',
  }
});

// Función para establecer el token JWT dinámicamente
export const setAuthToken = (jwt: string) => {
  api.defaults.headers.Authorization = `Bearer ${jwt}`;
};

export default api;