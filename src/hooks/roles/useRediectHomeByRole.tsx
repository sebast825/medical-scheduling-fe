import { useUserInfo } from "../../context/authContext";
import { Roles } from "../../types/Roles.type";
import GetJwtContent, { DecodedToken } from "../../utils/jwtUtils";
import useRedicrects from "../useRedicrects";

function useRedirectHomeByRol() {
  const user = useUserInfo();

  const {
    redirectToPacienteHome,
    redirectToSecretarioHome,
    redirectToAdministradorHome,
    redirectToMedicoHome,
    redirectToHome
  } = useRedicrects();

  const redirectHomeByRol = async () => {
    if (user == null) {
      redirectToHome();
      return;
    }

    var params: DecodedToken = GetJwtContent(user);
    var userRole = params.role;

    if (userRole == Roles[Roles.Secretario]) {
      redirectToSecretarioHome();
    } else if (userRole == Roles[Roles.Paciente]) {
      redirectToPacienteHome();
    } else if (userRole == Roles[Roles.Medico]) {
      redirectToMedicoHome();
    } else if (userRole == Roles[Roles.Admin]) {
      redirectToAdministradorHome();
    } else {
      console.log("error");
    }
  };

  return redirectHomeByRol;
}

export default useRedirectHomeByRol;
