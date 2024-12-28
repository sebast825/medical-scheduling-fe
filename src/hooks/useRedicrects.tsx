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
  const redirectInformacionMedicoAdministrador = () : void =>{
    navigate("/administrador/informacionMedico");

  }
  const redirectTablePacienteAdministrador = () : void =>{
    navigate("/administrador/pacientes");

  }
  const redirectToAdministradorHome = () : void =>{
    navigate("/administrador");

  }
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
    redirectInformaciónPacienteSecretario,
    redirectInformacionMedicoAdministrador,
    redirectTablePacienteAdministrador,
    redirectToAdministradorHome
  };
};

export default useRedirects;
