import { useUserInfo } from "../../context/authContext";
import { Roles } from "../../types/Roles.type";
import GetJwtContent, { DecodedToken } from "../../utils/jwtUtils";



function useIsMedico() : Boolean{

   const user = useUserInfo();

   if(user == null) return false;

   var params: DecodedToken = GetJwtContent(user);
   var userRole = params.role;
   
   return  userRole == Roles[Roles.Medico] ?  true : false;
   

}

export default useIsMedico;