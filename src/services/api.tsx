import axios from 'axios';

export const createApiInstance = (jwt: string = "") => {
  const api = axios.create({
    baseURL: 'https://localhost:7284', // URL base de tu API
    headers: {
      'Content-Type': 'application/json',
     'Authorization': `Bearer ${jwt}` // Agrega el token al header
    }
  });

  return api;
};