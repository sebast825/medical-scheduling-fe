import { useNavigate } from "react-router-dom";

const useRedirects = () => {
  const navigate = useNavigate();

  const useRedirectToNuestrosMedicos = (): void => {
    navigate("/nuestrosMedicos");
  };
  const useRedirectToHome = (): void => {
    navigate("/");
  };
  const useRedirectToLogin = (): void => {
    navigate("/login");
  };
  const useRedirectToPacienteHome = (): void => {
    navigate("/pacientes");
  };
  const useRedirectToNuevoTurnoFilterMedico = (): void => {
    navigate("/crearTurno/listMedicos");
  };
  const useRedirectToNuevoTurnoFilterEspecialidad = (): void => {
    navigate("/crearTurno/listEspecialidades");
  };
  const useRedirectToInformacionPersonal = (): void => {
    navigate("/pacientes/informacion");
  };
  return {
    useRedirectToHome,
    useRedirectToNuestrosMedicos,
    useRedirectToLogin,
    useRedirectToPacienteHome,
    useRedirectToNuevoTurnoFilterMedico,
    useRedirectToNuevoTurnoFilterEspecialidad,
    useRedirectToInformacionPersonal
  };
};

export default useRedirects;
