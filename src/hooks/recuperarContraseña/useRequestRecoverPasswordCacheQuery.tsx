import { useQuery } from "@tanstack/react-query";
import {  useState } from "react";
import useRecuperarContraseña from "./useRecuperarContraseña";
import { RecuperarClaveRequest } from "../../types/usuario/RecuperarClaveRequest";

function useRequestRecoverPasswordCacheQuery() {
  const [sendEmail, setSendEmail] = useState<RecuperarClaveRequest | null>();

  
  const { requestRecuperarContraseña } = useRecuperarContraseña();

  const { data: requestRecoverPassword, isLoading ,refetch} = useQuery({
    queryKey: ["requestRecoverPassword"],
    queryFn: () => {
      return sendEmail != null
        ? requestRecuperarContraseña(sendEmail)
        : null;
    },
    enabled: !!sendEmail,
  });
  
  const handleReloadRecuperarContraseña = () => {
    refetch(); 
  };

  return { requestRecoverPassword, isLoading, setSendEmail,handleReloadRecuperarContraseña};
}

export default useRequestRecoverPasswordCacheQuery;
