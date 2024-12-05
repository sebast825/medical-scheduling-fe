import { useNavigate } from "react-router-dom";

const useRedirects = () => {
  const navigate = useNavigate();

  const redirectToNuestrosMedicos = (): void => {
    navigate("/nuestrosMedicos");
  };
  const redirectToHome = (): void => {
    navigate("/");
  };
  const redirectToLogin = (): void => {
    navigate("/login");
  };
  const redirectToPacienteHome = (): void => {
    navigate("/pacientes");
  };
  const redirectToNuevoTurnoFilterMedico = (): void => {
    navigate("/crearTurno/listMedicos");
  };
  const redirectToNuevoTurnoFilterEspecialidad = (): void => {
    navigate("/crearTurno/listEspecialidades");
  };
  const redirectToInformacionPersonal = (): void => {
    navigate("/pacientes/informacion");
  };
  const redirectToSecretarioHome = (): void => {
    navigate("/secretarios");
  };
  const redirectListadoTurnos = (): void => {
    navigate("/secretarios/TurnosDePaciente");
  };
  const redirectInformaciónPacienteSecretario = (): void => {
    navigate("/secretarios/InformaciónPacienteSecretario");
  };
  
  return {
    redirectToHome,
    redirectToNuestrosMedicos,
    redirectToLogin,
    redirectToPacienteHome,
    redirectToNuevoTurnoFilterMedico,
    redirectToNuevoTurnoFilterEspecialidad,
    redirectToInformacionPersonal,
    redirectToSecretarioHome,
    redirectListadoTurnos,
    redirectInformaciónPacienteSecretario
  };
};

export default useRedirects;
