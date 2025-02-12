import api from "../../services/api";
import {
  useRefreshToken,
  useUserToggleContext,
} from "../../context/authContext";
import { useEffect } from "react";
import useRedirects from "../useRedicrects";

function UseSetupAxiosInterceptorResponse() {
  let refreshToken = useRefreshToken();
  let updateLogin = useUserToggleContext();
  let useRedirect = useRedirects();

  useEffect(() => {
    // console.log("Configurando interceptor de respuesta...");

    // Evitar múltiples interceptores
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // console.log("Intentando renovar el token...");
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
            //console.error("Error al renovar el token:", ex);
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
