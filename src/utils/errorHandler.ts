import axios, { AxiosError } from 'axios';

export function handleHttpError(error: object): string {
  console.log(error)

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    if ( error.response != undefined ) {
      const status = error.response.data.statusCode;
      const msge =  error.response.data.message;
      if (status === 400) {
        return "400 - Error de validación: " + (msge || "Los datos proporcionados no son válidos.");
      } else if (status === 401) {console.log("request")
        return "401 - No tienes permiso para realizar esta acción.";
      } else if (status === 403) {        
        return "403 - Acceso prohibido: No tiene permisos para realizar esta acción.";
      } else if (status === 404) {
        return "" + (msge || "El recurso solicitado no existe.");
      } else if (status >= 500) {
        return "500 - Error del servidor: Por favor, intente más tarde.";
      } else {
        return "Error desconocido: " + (msge || "Ha ocurrido un error inesperado.");
      }
    } else if (error.request) {
      return "Ha ocurrido un erorr";
    } else {
      return "Error de configuración: " + axiosError.message;
    }
  } else {
    return "Error desconocido: Ha ocurrido un error inesperado.";
  }
}