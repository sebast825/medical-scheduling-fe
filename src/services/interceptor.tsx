import api from "./api"
import { useRefreshToken, useUserToggleContext } from "../context/authContext";
import { useEffect } from "react";
import useRedirects from "../hooks/useRedicrects";
 
function UseSetupAxiosInterceptorResponse(){


    let refreshToken = useRefreshToken();
  let updateLogin = useUserToggleContext();
  let useRedirect = useRedirects();

 
  useEffect(() => {
    console.log("Configurando interceptor de respuesta...");

    // Evitar múltiples interceptores
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            console.log("Intentando renovar el token...");
            if (!refreshToken) throw new Error("Refresh token no disponible");

            const response = await api.post("api/login/refreshToken", {
              AccessToken: refreshToken.accessToken,
              Refreshoken: refreshToken.refreshoken,
            });

            updateLogin(response.data);

            // Agregar el nuevo token a la solicitud original y reintentar
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return api(originalRequest);
          } catch (ex) {
            console.error("Error al renovar el token:", ex);
            updateLogin(null);
            useRedirect.redirectToLogin();
            return Promise.reject(ex);
          }
        }
        return Promise.reject(error);
      }
    );

    // Limpiar el interceptor cuando el componente se desmonte
    return () => api.interceptors.response.eject(interceptor);
  }, [refreshToken, updateLogin]);
}


export default UseSetupAxiosInterceptorResponse;
/*
const setupAxiosInterceptorResponse = (
    updateLogin: (auth: AuthResponseDto | null) => void,
    refreshToken: AuthResponseDto | null,
    user: string | null
  ) => {
    console.log("Configurando interceptor de respuesta...");
  
    api.interceptors.response.use(
      (response) => response, // Si la respuesta es exitosa, simplemente retórnala
      async (error) => {
        const originalRequest = error.config;
          console.log("Paciente")
        // Si el error es 401 (no autorizado) y no es una solicitud de refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true; // Marcar que ya se intentó renovar el token
          console.log("Paciente2")
          try {
             console.log("entraa");
             console.log(refreshToken)
             if(!refreshToken)throw "undefined refreshToken";
             let asd :AuthRequestDto = {
                AccessToken: refreshToken.accessToken,
                Refreshoken: refreshToken.refreshoken
             }
            // Intentar renovar el token usando el refresh token
            const response = await api.post("api/login/refreshToken",  refreshToken );
            console.log("Token renovado:", response);
  
            // Actualizar el estado de autenticación con el nuevo token
            updateLogin(response.data);
  
            // Reenviar la solicitud original con el nuevo token
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setTimeout(() => {
 
            return api(originalRequest);
          }, 100);
 
 
          } catch (ex) {
            console.error("Error al renovar el token:", ex);
            updateLogin(null); // Limpiar el estado de autenticación
            redirect("./login")
            return Promise.reject(ex);
          }
        }
  
        // Para otros errores, rechazar la promesa
        return Promise.reject(error);
      }
    );
  }; */