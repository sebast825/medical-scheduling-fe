import axios from 'axios';
import { useUserContext } from '../context/authContext';

const api = axios.create({
 baseURL: 'https://www.sistematurnosapi.somee.com/', 
 //baseURL: 'https://localhost:7284/',
 headers: {
    'Content-Type': 'application/json',
  }
});

// Función para establecer el token JWT dinámicamente
export const setAuthToken = (jwt: string) => {
  api.defaults.headers.Authorization = `Bearer ${jwt}`;
};

/*
api.interceptors.request.use(
  (config) => {
   // config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    console.log("Headers de solicitud:", config.headers);
    console.log("Body antes de enviar:", config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);*/
export default api;


