import { genericMessages } from "../../constants/genericMessages";
import { useAdministrativoInfoContext, useMedicoInfoContext, usePacienteContext, usePersonaInfoContext, useUserInfo, useUserToggleContext } from "../../context/authContext";
import { fetchLogin, fetchMedicoInfo, fetchPacienteInfo, fetchPersonaInfo } from "../../services/apiService";
import { ILogin } from "../../types/Login.types";
import { Roles } from "../../types/Roles.type";
import { handleHttpError } from "../../utils/errorHandler";
import GetJwtContent, { DecodedToken } from "../../utils/jwtUtils";
import useToastit from "../useToastit";

function useLogin() {
  const cambiaLogin = useUserToggleContext();
  const { setPacienteInfo } = usePacienteContext();
  const { setMedicoInfo } = useMedicoInfoContext();
  const { setAdministrativoInfo } = useAdministrativoInfoContext();
  const { setPersonaInfo } = usePersonaInfoContext();
  const user = useUserInfo();
  const { error } = useToastit();

  
  async function handleLogin(userName: string, password: string) {
    let UserName = "Secretario";
    let Password = "Secretario";
    const loginData: ILogin = { UserName, Password };

    //consigue la info del usuario
    try {
      const token: string = await fetchLogin(loginData);
      cambiaLogin(token);
    } catch (err: any) {
      console.log(err)
      error(handleHttpError(err));
    }
  }

    //busca la info de la persona, hay que reorganizarla
    const getUserInfo = async () => {
      if (user == null) return;

      var params: DecodedToken = GetJwtContent(user);
      var userRole = params.role;
  
      if (userRole == Roles[Roles.Secretario]) {
        const personaInfo = await fetchPersonaInfo(user, params.PersonaId);
        await setAdministrativoInfo(personaInfo);
      } else if (userRole == Roles[Roles.Paciente]) {
        const pacienteInfo = await fetchPacienteInfo(user, params.PersonaId);
        await setPacienteInfo(pacienteInfo);
        await setPersonaInfo(pacienteInfo);
      } else if (userRole == Roles[Roles.Medico]) {
        const medicoInfo = await fetchMedicoInfo(user, params.PersonaId);
        await setMedicoInfo(medicoInfo);
      } else if (userRole == Roles[Roles.Admin]) {
        const administradorInfo = await fetchPersonaInfo(user, params.PersonaId);
        await setAdministrativoInfo(administradorInfo);
      } else {
         error(genericMessages.standardError);
      }
    };
  return { handleLogin ,getUserInfo};
}

export default useLogin;

