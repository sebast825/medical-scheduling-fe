import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../context/authContext";
import { Roles } from "../../types/Roles.type";
import GetJwtContent, { DecodedToken } from "../../utils/jwtUtils";


   function  useRedirectHomeByRol  ()  {

      const user = useUserInfo();

      const navigate = useNavigate();

        
      
      const redirectHomeByRol = async() => {

         if (user == null) return;

         var params: DecodedToken = GetJwtContent(user);
         var userRole = params.role;  
      
         if(userRole == Roles[Roles.Secretario]){

           navigate("/secretarios");
           
         }else if(userRole == Roles[Roles.Paciente]){
         
           navigate("/pacientes/informacion");
         }else if(userRole == Roles[Roles.Medico]){
            navigate("/medicos");

         }
      }
  
      return  redirectHomeByRol;
  
 };

 export default useRedirectHomeByRol