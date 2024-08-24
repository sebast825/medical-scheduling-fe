import { useEffect } from "react";
import { useUserContext, useUserInfo } from "../../context/authContext";
import { useRedirectToLogin } from "../../routes/navigation";

function SecreatarioHome (){
   const user = useUserInfo();
   const redirectToLogin = useRedirectToLogin();

   useEffect(() => {
      user == null ? redirectToLogin() : console.log("asd");
      
    }, []);

   return <>secretario</>
}

export default SecreatarioHome;