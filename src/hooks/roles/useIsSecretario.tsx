import { useUserInfo } from "../../context/authContext";
import { Roles } from "../../types/Roles.type";
import GetJwtContent, { DecodedToken } from "../../utils/jwtUtils";



function useIsSecretario () : Boolean{

   const user = useUserInfo();

   if(user == null) return false;

   var params: DecodedToken = GetJwtContent(user);
   var userRole = params.role;
   
   return  userRole == Roles[Roles.Secretario] ?  true : false;
   

}

export default useIsSecretario;