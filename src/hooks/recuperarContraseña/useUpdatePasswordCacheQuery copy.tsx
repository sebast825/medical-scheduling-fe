import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserInfo } from "../../context/authContext";

import { useState } from "react";
import { NuevaClaveRequest } from "../../types/usuario/NuevaClaveRequest";
import useToastit from "../useToastit";
import useRecuperarContraseña from "./useRecuperarContraseña";

function useUpdatePasswordCacheQuery() {

  const user = useUserInfo();
  const queryClient = useQueryClient();
  const [dtoRecoverPassword, setDtoRecoverPassword] = useState<NuevaClaveRequest | null>();
  const {error} = useToastit()
const  {enviarNuevaContrsaeña}= useRecuperarContraseña();


  const {
    data: newPassword,
    isLoading,
    
  } = useQuery({
    queryKey: ['recoverPassword'], 
    queryFn:  () => {
      return dtoRecoverPassword != null ? enviarNuevaContrsaeña(dtoRecoverPassword) : undefined ; 
    },
    enabled: !!dtoRecoverPassword,
  });
 

  return { newPassword, isLoading,setDtoRecoverPassword};
}

export default useUpdatePasswordCacheQuery;