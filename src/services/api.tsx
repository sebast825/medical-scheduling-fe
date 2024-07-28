import axios from 'axios';

// Configura la instancia de Axios
const api = axios.create({
  baseURL: 'https://localhost:7284', // URL base de tu API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
