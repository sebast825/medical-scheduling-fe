import { useUserInfo } from "../../context/authContext";
import { Roles } from "../../types/Roles.type";
import GetJwtContent, { DecodedToken } from "../../utils/jwtUtils";



function useIsAdministrador() : Boolean{

   const user = useUserInfo();

   if(user == null) return false;

   var params: DecodedToken = GetJwtContent(user);
   var userRole = params.role;
   
   return  userRole == Roles[Roles.Admin] ?  true : false;
   

}

export default useIsAdministrador;