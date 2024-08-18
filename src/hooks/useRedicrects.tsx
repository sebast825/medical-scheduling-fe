import { useNavigate } from "react-router-dom";

const useRedirects = () => {
  const navigate = useNavigate();

  const useRedirectToNuestrosMedicos = (): void => {
    navigate("/nuestrosMedicos");
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

  return {
    useRedirectToNuestrosMedicos,
    useRedirectToLogin,
    useRedirectToPacienteHome,
    useRedirectToNuevoTurnoFilterMedico,
    useRedirectToNuevoTurnoFilterEspecialidad,
  };
};

export default useRedirects;
